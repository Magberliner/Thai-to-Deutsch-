(() => {
  'use strict';
  const rows = [
    [10,'พระสงฆ์','phrá-sǒng','buddhistischer Mönch','Nomen'],
    [10,'นั่งสมาธิ','nâng-sà-maa-thí','meditieren','Verbgruppe'],
    [10,'วัด','wát','Tempel','Nomen'],
    [10,'ดอกบัว','dòk-bua','Lotusblume','Nomen'],
    [10,'ครอบครัว','khrôp-khrua','Familie','Nomen'],
    [11,'น้ำซุป','náam-súp','Brühe','Nomen'],
    [11,'ปรุง','prung','abschmecken, würzen','Verb'],
    [11,'ข้าวซอย','khâao-soi','nordthailändische Curry-Nudeln','Nomen'],
    [11,'บะหมี่','bà-mìi','Eiernudeln','Nomen'],
    [11,'เมนู','mee-nuu','Speisekarte, Gericht','Nomen','Speisekarte'],
    [12,'สะพานแขวน','sà-phaan-khwǎen','Hängebrücke','Nomen'],
    [12,'สวนป่า','sǔan-pàa','Waldpark, Forstgarten','Nomen'],
    [12,'สนามบิน','sà-nǎam-bin','Flughafen','Nomen'],
    [12,'หน้าผา','nâa-phǎa','Klippe, Felswand','Nomen'],
    [12,'น้ำตก','náam-tòk','Wasserfall','Nomen'],
    [13,'ถุง','thǔng','Tüte; Zähleinheit für Tüten','Nomen/Zählwort','Tüte'],
    [13,'ชาไทย','chaa-thai','Thai-Tee','Nomen'],
    [13,'โจ๊ก','jóok','Reisbrei','Nomen'],
    [13,'หมูปิ้ง','mǔu-pîng','gegrillte Schweinespieße','Nomen'],
    [13,'ข้าวเหนียว','khâao-nǐao','Klebreis','Nomen']
  ];
  const cards=rows.map((r,i)=>({id:i+1,week:r[0],thai:r[1],roman:r[2],german:r[3],type:r[4],prompt:r[5]||r[3],image:`assets/vocab-test/word-${String(i+1).padStart(2,'0')}.webp`}));
  function shuffle(items,random=Math.random) {
    const copy=[...items];
    for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
    return copy;
  }
  function createRound(items,random=Math.random) {return {deck:shuffle(items,random),index:0,revealed:false,answers:[]};}
  function reveal(round) {if(round.index<round.deck.length)round.revealed=true;}
  function rate(round,known) {
    if(!round.revealed||round.index>=round.deck.length)return false;
    round.answers.push({id:round.deck[round.index].id,known:Boolean(known)});
    round.index++;round.revealed=false;return true;
  }
  function skip(round) {
    if(round.index>=round.deck.length||round.revealed)return false;
    round.answers.push({id:round.deck[round.index].id,known:null});
    round.index++;return true;
  }
  if(typeof document==='undefined'){
    if(typeof module!=='undefined')module.exports={cards,shuffle,createRound,reveal,rate,skip};
    return;
  }
  const $=id=>document.getElementById(id);
  if(!$('vokabeltest'))return;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Lucide icon paths; license: assets/vendor/lucide-LICENSE.txt.
  const paths={flip:['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8','M3 3v5h5'],check:['M20 6 9 17l-5-5'],repeat:['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8','M3 3v5h5'],next:['M5 12h14','m12 5 7 7-7 7']};
  const icon=name=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name].map(d=>`<path d="${d}"></path>`).join('')}</svg>`;
  let round=createRound(cards),previousMistakes=[];
  function render() {
    const complete=round.index>=round.deck.length;
    $('vtest-run').hidden=complete;$('vtest-summary').hidden=!complete;
    $('vtest-progress').max=round.deck.length;$('vtest-progress').value=round.index;
    $('vtest-count').textContent=complete?`${round.deck.length} / ${round.deck.length}`:`Karte ${round.index+1} / ${round.deck.length}`;
    $('vtest-tally').textContent=`${round.answers.filter(a=>a.known===true).length} gewusst · ${round.answers.filter(a=>a.known===false).length} noch üben · ${round.answers.filter(a=>a.known===null).length} übersprungen`;
    if(complete){renderSummary();return;}
    const c=round.deck[round.index];
    $('vtest-week').textContent=`Woche ${c.week}`;
    $('vtest-photo').src=c.image;$('vtest-photo').alt=c.prompt;
    $('vtest-german').textContent=c.prompt;
    $('vtest-front').hidden=round.revealed;$('vtest-back').hidden=!round.revealed;
    $('vtest-scene').classList.toggle('is-revealed',round.revealed);
    // The front never contains Thai or pronunciation text, even for assistive technology.
    $('vtest-answer').textContent=round.revealed?c.thai:'';
    $('vtest-roman').textContent=round.revealed?c.roman:'';
    $('vtest-back-german').textContent=round.revealed?c.german:'';
    $('vtest-type').textContent=round.revealed?c.type:'';
    $('vtest-lesson').href=`#woche${c.week}`;
    $('vtest-reveal').hidden=round.revealed;$('vtest-next').hidden=round.revealed;$('vtest-ratings').hidden=!round.revealed;
    $('vtest-announcement').textContent=round.revealed?`Antwort: ${c.thai}. ${c.roman}.`:`Karte ${round.index+1} von ${round.deck.length}: ${c.prompt}.`;
  }
  function renderSummary() {
    const known=round.answers.filter(a=>a.known).length;
    const skipped=round.answers.filter(a=>a.known===null).length;
    const practice=round.answers.filter(a=>a.known===false).length;
    previousMistakes=round.deck.filter(c=>round.answers.some(a=>a.id===c.id&&a.known!==true));
    $('vtest-score').textContent=`${known} / ${round.deck.length}`;
    $('vtest-summary-label').textContent=previousMistakes.length?`${practice} noch üben · ${skipped} übersprungen`:'Alle Wörter gewusst';
    $('vtest-review').disabled=previousMistakes.length===0;
    $('vtest-results').innerHTML=round.deck.map(c=>{
      const answer=round.answers.find(a=>a.id===c.id);
      const state=answer.known===null?'skipped':answer.known?'known':'practice';
      const answerMarkup=state==='skipped'?`<small>Woche ${c.week}</small>`:`<span lang="th" class="thai">${escape(c.thai)}</span><small>${escape(c.roman)} · Woche ${c.week}</small>`;
      return `<li><img src="${c.image}" alt="${escape(c.prompt)}" loading="lazy" width="60" height="60"><div><strong>${escape(c.prompt)}</strong>${answerMarkup}</div><span class="vtest-result-state ${state}">${state==='skipped'?'Übersprungen':answer.known?'Gewusst':'Noch üben'}</span></li>`;
    }).join('');
    $('vtest-announcement').textContent=`Runde beendet. ${known} von ${round.deck.length} gewusst.`;
    try{localStorage.setItem('thai-vocab-test-last-score',JSON.stringify({known,total:round.deck.length,date:new Date().toISOString()}));}catch(_){/* The test also works without storage. */}
  }
  function start(items){round=createRound(items);render();$('vtest-reveal').focus();}
  $('vtest-reveal').innerHTML=`${icon('flip')}Antwort zeigen`;
  $('vtest-known').innerHTML=`${icon('check')}Gewusst`;
  $('vtest-next').innerHTML=`Weiter${icon('next')}`;
  $('vtest-again').innerHTML=`${icon('repeat')}Neue Runde`;
  $('vtest-reveal').addEventListener('click',()=>{reveal(round);render();$('vtest-known').focus();});
  $('vtest-next').addEventListener('click',()=>{
    if(!skip(round))return;render();(round.index>=round.deck.length?$('vtest-again'):$('vtest-next')).focus();
  });
  for(const [id,known]of [['vtest-known',true],['vtest-practice',false]])$(id).addEventListener('click',()=>{
    if(!rate(round,known))return;render();(round.index>=round.deck.length?$('vtest-again'):$('vtest-reveal')).focus();
  });
  $('vtest-again').addEventListener('click',()=>start(cards));
  $('vtest-review').addEventListener('click',()=>{if(previousMistakes.length)start(previousMistakes);});
  $('vtest-lesson').addEventListener('click',event=>{event.preventDefault();window.showTab(`woche${round.deck[round.index].week}`);});
  render();
})();
