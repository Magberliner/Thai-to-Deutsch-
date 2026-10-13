const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const {vocabulary}=require('../week15.js');

(async()=>{
  const browser=await chromium.launch({headless:true,chromiumSandbox:true,ignoreDefaultArgs:['--unsafely-disable-devtools-self-xss-warnings','--enable-unsafe-swiftshader'],executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:1000}});
    // Test the local lesson only; do not access YouTube or other external services.
    await context.route('**/*',route=>route.request().url().startsWith('file:')?route.continue():route.abort());
    const page=await context.newPage(),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve('index.html')).href+'#woche15');
    await page.waitForSelector('#woche15.active .w14-word-trigger');
    assert.equal(await page.locator('#woche15 table.vocab tbody tr').count(),40);
    assert.equal(await page.locator('#a22 .week-card').count(),10);
    assert(await page.locator('nav [data-tab="a22"]').evaluate(el=>el.classList.contains('active')));
    assert.equal(await page.locator('#woche15 .video-player.file-mode').count(),2);
    for(let session=1;session<=2;session++){
      const tools=page.locator(`#w15-s${session}-role-tools`);
      assert.equal(await tools.locator('input').count(),16);
      await tools.locator('[data-filter="type-noun"]').check();
      await tools.locator('[data-filter="subject"]').check();
      assert(await page.locator(`#w15-s${session}-role-reader`).evaluate(el=>el.classList.contains('show-type-noun')&&el.classList.contains('show-subject')));
      await tools.locator('button').click();
      assert.equal(await tools.locator('input:checked').count(),0);
    }
    const shots=process.env.SCREENSHOT_DIR||'/private/tmp/thai-week15-check';
    fs.mkdirSync(shots,{recursive:true});
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:path.join(shots,'week15-desktop.png')});
    for(const [index,word]of vocabulary.entries()){
      if(index===0)await page.locator('#woche15 .w14-word-trigger').first().click();
      else await page.locator('#w15-word-next').click();
      assert.equal(await page.locator('#w15-word-title').textContent(),word.word);
      assert.equal(await page.locator('#w15-word-counter').textContent(),`${index+1} / 40`);
      assert.equal(await page.locator('#w15-word-sentence mark').first().textContent(),word.target);
      await page.locator('#w15-word-photo').evaluate(img=>img.decode());
      assert(await page.locator('#w15-word-photo').evaluate(img=>img.naturalWidth===640&&img.naturalHeight===400));
      if(index===6)await page.screenshot({path:path.join(shots,'word-card-desktop.png')});
    }
    assert(await page.locator('#w15-word-next').isDisabled());
    await page.locator('#w15-word-previous').click();assert.equal(await page.locator('#w15-word-counter').textContent(),'39 / 40');
    await page.keyboard.press('Escape');assert.equal(await page.locator('#w15-word-card').getAttribute('open'),null);
    for(const [quiz,result]of [['w15-s1-quiz','w15-s1-result'],['w15-s2-quiz','w15-s2-result'],['w15-grammar-quiz','w15-grammar-result'],['w15-role-quiz','w15-role-result']]){
      const count=await page.locator(`#${quiz} .w6-mc`).count();
      await page.evaluate(id=>{for(const q of document.querySelectorAll(`#${id} .w6-mc`))q.querySelector(`[data-choice="${q.dataset.answer}"]`).click();},quiz);
      await page.evaluate(([quiz,result])=>window.w11CheckSession(quiz,result),[quiz,result]);
      assert.equal(await page.locator('#'+result).textContent(),`Ergebnis: ${count} / ${count} richtig`);
    }
    assert.equal(await page.locator('#w15-role-quiz mark').count(),8);
    await page.evaluate(()=>{for(const item of document.querySelectorAll('#w15-build-history .w6-build'))for(const word of item.dataset.answer.split(' ')){const tile=[...item.querySelectorAll('.w6-bank .w6-tile')].find(t=>t.textContent===word);tile.click();}window.w6CheckBuildSet('w15-build-history');});
    assert.equal(await page.locator('#w15-build-history .w6-result').textContent(),'Ergebnis: 6 / 6 richtig');
    await page.locator('#woche15 textarea').focus();assert(await page.locator('#w15Keyboard').isVisible());
    await page.locator('#w15Keys button').filter({hasText:/^ก$/}).click();assert.equal(await page.locator('#woche15 textarea').inputValue(),'ก');
    await page.evaluate(()=>window.showTab('woche14'));
    await page.locator('#woche14 .w14-word-trigger').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await page.locator('#woche14 .w14-word-trigger').first().click();
    assert.equal(await page.locator('#w14-word-counter').textContent(),'1 / 40');
    await page.locator('#w14-word-next').click();assert.equal(await page.locator('#w14-word-counter').textContent(),'2 / 40');
    await page.keyboard.press('Escape');
    await page.evaluate(()=>window.showTab('vokabeltest'));
    assert.equal(await page.locator('#vtest-set').inputValue(),'recent');
    assert((await page.locator('#vtest-set-description').textContent()).includes('56'));
    const seen=new Set();
    for(let index=0;index<20;index++){
      const front=await page.locator('#vtest-front').innerText();assert(!/[\u0e00-\u0e7f]/.test(front));
      assert.equal(await page.locator('#vtest-answer').textContent(),'');
      assert(['Woche 12','Woche 13','Woche 14'].includes(await page.locator('#vtest-week').textContent()));
      const image=await page.locator('#vtest-photo').getAttribute('src');assert(!seen.has(image));seen.add(image);
      await page.locator('#vtest-photo').evaluate(img=>img.decode());
      await page.locator('#vtest-next').click();
    }
    assert(await page.locator('#vtest-summary').isVisible());assert(!(await page.locator('#vtest-results').innerText()).match(/[\u0e00-\u0e7f]/));
    await page.locator('#vtest-again').click();
    const nextImage=await page.locator('#vtest-photo').getAttribute('src');
    await page.locator('#vtest-reveal').click();assert(/[\u0e00-\u0e7f]/.test(await page.locator('#vtest-answer').textContent()));
    await page.locator('#vtest-known').click();assert.equal(await page.locator('#vtest-count').textContent(),'Karte 2 / 20');
    await page.locator('#vtest-set').selectOption('classic');assert.equal(await page.locator('#vtest-count').textContent(),'Karte 1 / 20');
    assert.equal(await page.locator('#vtest-answer').textContent(),'');
    await page.locator('#vtest-set').selectOption('recent');
    await page.screenshot({path:path.join(shots,'random-test-desktop.png')});
    await page.setViewportSize({width:390,height:844});
    await page.evaluate(()=>window.showTab('woche15'));
    await page.waitForTimeout(150);
    await page.screenshot({path:path.join(shots,'week15-mobile.png')});
    await page.locator('#woche15 .w14-word-trigger').first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await page.locator('#woche15 .w14-word-trigger').first().click();
    await page.locator('#w15-word-photo').evaluate(img=>img.decode());
    await page.screenshot({path:path.join(shots,'word-card-mobile.png')});
    const box=await page.locator('#w15-word-card').boundingBox();assert(box.x>=0&&box.x+box.width<=391&&box.y>=0&&box.y+box.height<=845);
    await page.locator('#w15-word-next').click();assert.equal(await page.locator('#w15-word-counter').textContent(),'2 / 40');
    await page.locator('#w15-word-close').click();
    const ids=await page.locator('[id]').evaluateAll(els=>els.map(el=>el.id));assert.equal(ids.length,new Set(ids).size);
    assert.deepEqual(errors,[]);
    console.log('PASS: Week 15 navigation, all 40 photos/detail cards, filters, all quizzes, six sentence builders, Thai keyboard, previous-week cards, 20 unique random review words excluding Week 15, hidden answers/skip/reveal, original-set switching, desktop/mobile screenshots and no page errors.');
    console.log('Screenshots: '+shots);
    await context.close();
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
