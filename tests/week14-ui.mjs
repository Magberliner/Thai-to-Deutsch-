// Requires happy-dom; HAPPY_DOM_MODULE may point to its installed entry file.
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const {Window}=await import(process.env.HAPPY_DOM_MODULE || 'happy-dom');
import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('..',import.meta.url));
const html=fs.readFileSync(root+'/index.html','utf8');
const window=new Window({url:'https://example.test/',settings:{disableJavaScriptFileLoading:true,disableJavaScriptEvaluation:true,disableCSSFileLoading:true,enableImageFileLoading:false,disableIframePageLoading:true}});
const document=window.document;document.write(html);
window.HTMLElement.prototype.scrollIntoView=function(){};
window.HTMLElement.prototype.setPointerCapture=function(){};
window.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
window.HTMLDialogElement.prototype.close=function(){this.open=false;};
window.HTMLCanvasElement.prototype.getContext=function(){return new Proxy({}, {get:(t,k)=>t[k]||(()=>{}),set:(t,k,v)=>{t[k]=v;return true;}});};
window.eval([...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n'));
window.eval(fs.readFileSync(root+'/alphabet.js','utf8'));window.eval(fs.readFileSync(root+'/vocab-test.js','utf8'));
window.eval(fs.readFileSync(root+'/week14-vocab.js','utf8'));
window.happyDOM.settings.disableJavaScriptEvaluation=false;
window.happyDOM.settings.enableJavaScriptEvaluation=true;
const $=id=>document.getElementById(id);
window.showTab('woche14');assert($('woche14').classList.contains('active'));
assert(document.querySelector('[data-tab="a22"]').classList.contains('active'));
assert.equal(document.querySelectorAll('#a22 .week-card').length,9);
assert.equal(document.querySelectorAll('#woche14 table.vocab tbody tr').length,40);
assert.equal(document.querySelectorAll('#woche14 .w6-mc').length,26);
assert.equal(document.querySelectorAll('#woche14 .w6-build').length,6);
assert.equal(document.querySelectorAll('#woche14 .grammar').length,4);
assert.equal(document.querySelectorAll('#woche14 .role-reader').length,2);
assert.equal(document.querySelectorAll('#woche14 .video-frame').length,2);
for(const [n,start,end] of [[1,0,385],[2,385,750]]){
 const player=document.querySelectorAll('#woche14 .video-player')[n-1];
 const url=new URL(player.querySelector('iframe').getAttribute('src'));
 assert.equal(url.hostname,'www.youtube-nocookie.com');assert(url.pathname.endsWith('1G5dEP_wNH4'));
 assert.equal(url.searchParams.get('start'),String(start));assert.equal(url.searchParams.get('end'),String(end));
}
for(const n of [1,2]){
 const tools=$(`w14-s${n}-role-tools`),reader=$(`w14-s${n}-role-reader`);
 assert.equal(tools.querySelectorAll('input[data-filter]').length,16);
 for(const filter of ['type-noun','type-verb','type-phrase','type-connector','type-particle','type-adverb','subject','object','verb']){
  const input=tools.querySelector(`[data-filter="${filter}"]`);assert(input);input.checked=true;input.dispatchEvent(new window.Event('change'));
  assert(reader.classList.contains('show-'+filter));
 }
 assert(reader.querySelectorAll('[data-word-type]').length>30);
 window.clearWordRoles(reader.id,tools.id);assert.equal(tools.querySelectorAll('input:checked').length,0);
 assert(![...reader.classList].some(c=>c.startsWith('show-')));
}
assert(document.querySelector('#w14-s1-role-reader .type-adverb').textContent.includes('ค่อย'));
for(const [quizId,resultId]of [['w14-s1-quiz','w14-s1-result'],['w14-s2-quiz','w14-s2-result'],['w14-grammar-quiz','w14-grammar-result'],['w14-role-quiz','w14-role-result']]){
 const qs=[...$(quizId).querySelectorAll('.w6-mc')];
 for(const q of qs){const options=q.querySelectorAll('.w6-option');assert.equal(options.length,4);const correct=q.querySelector(`[data-choice="${q.dataset.answer}"]`);assert(correct);correct.click();}
 if(quizId==='w14-role-quiz')window.w14CheckRoleQuiz();else window.w11CheckSession(quizId,resultId);
 assert.equal($(resultId).textContent,`Ergebnis: ${qs.length} / ${qs.length} richtig`);
 if(quizId==='w14-role-quiz')for(const q of qs)assert(q.querySelector('p > span.thai'));
 qs[0].querySelector(`.w6-option:not([data-choice="${qs[0].dataset.answer}"])`).click();
 if(quizId==='w14-role-quiz')window.w14CheckRoleQuiz();else window.w11CheckSession(quizId,resultId);
 assert.equal($(resultId).textContent,`Ergebnis: ${qs.length-1} / ${qs.length} richtig`);
}
for(const build of document.querySelectorAll('#w14-build-environment .w6-build')){
 const tokens=[...build.querySelectorAll('.w6-tile')];
 const target=build.dataset.answer;
 const order=[];
 function find(prefix,left){if(!left.length)return prefix===target;for(let i=0;i<left.length;i++){const text=left[i].textContent,next=prefix?prefix+' '+text:text;if(!target.startsWith(next))continue;order.push(left[i]);if(find(next,left.filter((_,j)=>j!==i)))return true;order.pop();}return false;}
 assert(find('',tokens),target);for(const tile of order)tile.click();
}
window.w6CheckBuildSet('w14-build-environment');assert.equal($('w14-build-environment').querySelector('.w6-result').textContent,'Ergebnis: 6 / 6 richtig');
const writing=document.querySelector('#woche14 textarea');writing.dispatchEvent(new window.FocusEvent('focus'));
assert(!$('w14Keyboard').classList.contains('hidden'));assert($('w14Keys').querySelectorAll('button').length>40);
const key=[...$('w14Keys').querySelectorAll('button')].find(b=>b.textContent==='ก');key.click();assert(writing.value.includes('ก'));
window.showTab('home');assert($('w14Keyboard').classList.contains('hidden'));
window.showTab('woche14');assert($('woche14').classList.contains('active'));
const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);assert.equal(ids.length,new Set(ids).size);
vm.runInNewContext('('+window.prepareVideoPlayers.toString()+')()', {location:{protocol:'file:'},document});
for(const player of document.querySelectorAll('#woche14 .video-player')){
 assert(player.classList.contains('file-mode'));
 assert(player.querySelector('.video-file-fallback a').href.includes('1G5dEP_wNH4'));
}
console.log('PASS: Week 14 navigation, 40 vocabulary entries, both video ranges, 16 simultaneous filters per reader, all 26 correct/incorrect quiz paths, six sentence builders, Thai keyboard insertion and hiding, and unique IDs.');
await window.happyDOM.cancelAsync();
