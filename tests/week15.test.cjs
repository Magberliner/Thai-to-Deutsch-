const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {vocabulary,sessions,readers,grammarQuestions,roleQuestions,builds}=require('../week15.js');
const {cards:original,reviewPool,sampleRound,skip,reveal,rate}=require('../vocab-test.js');
const {cards:review}=require('../review-vocab.js');
const {examples:previous}=require('../week14-vocab.js');
const root=path.join(__dirname,'..');

test('Week 15 has 40 illustrated bilingual entries with real example targets',()=>{
  assert.equal(vocabulary.length,40);
  assert.equal(new Set(vocabulary.map(v=>v.word)).size,40);
  for(const v of vocabulary){
    assert(v.thai.includes(v.target),v.word);assert(v.roman&&v.meaning&&v.type&&v.label&&v.german);
    const image=fs.readFileSync(path.join(root,v.image));
    assert.equal(image.toString('ascii',0,4),'RIFF');assert.equal(image.toString('ascii',8,12),'WEBP');
  }
});
test('video sections are continuous, under 15 minutes and cover the main transcript',()=>{
  assert.equal(sessions.length,2);assert.equal(sessions[0].start,0);
  assert.equal(sessions[0].end,sessions[1].start);assert.equal(sessions[1].end,1680);
  for(const s of sessions){assert(s.end-s.start<=900);for(const [t]of s.chapters)assert(t>=s.start&&t<s.end);}
});
test('questions, highlighted targets and sentence builders have valid answers',()=>{
  for(const q of [...sessions.flatMap(s=>s.questions),...grammarQuestions]){
    assert.equal(q[1].length,4);assert(q[2]>=0&&q[2]<4);assert(new Set(q[1]).size===4);
  }
  for(const q of roleQuestions){assert(q[1].includes(q[0]));assert.equal(q[2].length,4);assert(q[3]>=0&&q[3]<4);}
  assert.equal(builds.length,6);assert.equal(readers.length,2);
  for(const reader of readers){
    const tokens=reader.thai.flat();assert(tokens.length>40);
    for(const role of ['subject','verb','object','context','connector'])assert(tokens.some(t=>t[2]===role));
    for(const type of ['noun','name','verb','phrase','particle','connector'])assert(tokens.some(t=>t[1]===type));
  }
});
test('new review photos and words differ from the original test',()=>{
  assert.equal(review.length,16);assert.equal(new Set(review.map(c=>c.thai)).size,16);
  for(const card of review){
    assert([12,13].includes(card.week));assert(!original.some(c=>c.thai===card.thai));
    assert(fs.existsSync(path.join(root,card.image)));assert(!/[\u0e00-\u0e7f]/.test(card.prompt));
  }
});
test('random review samples 20 unique words from 12–14 and excludes the current week',()=>{
  const candidates=[...review,...previous.map((v,i)=>({id:`14-${i}`,week:14,thai:v.word,image:v.image})),...vocabulary.map((v,i)=>({id:`15-${i}`,week:15,thai:v.word,image:v.image}))];
  const pool=reviewPool(candidates);
  assert.equal(pool.length,56);assert.deepEqual([...new Set(pool.map(c=>c.week))].sort(),[12,13,14]);
  assert(pool.every(c=>!original.some(old=>old.thai===c.thai)));
  const a=sampleRound(candidates,20,()=>.1),b=sampleRound(candidates,20,()=>.9);
  assert.equal(a.deck.length,20);assert.equal(new Set(a.deck.map(c=>c.thai)).size,20);
  assert.notDeepEqual(a.deck.map(c=>c.id),b.deck.map(c=>c.id));
  assert(a.deck.every(c=>c.week>=12&&c.week<=14));
  assert.equal(skip(a),true);reveal(a);assert.equal(rate(a,true),true);
  assert.equal(a.index,2);assert.equal(a.revealed,false);
});
