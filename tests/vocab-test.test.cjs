const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {cards,shuffle,createRound,reveal,rate,skip}=require('../vocab-test.js');
test('20 unique illustrated cards cover weeks 10 through 13 equally',()=>{
  assert.equal(cards.length,20);
  assert.equal(new Set(cards.map(c=>c.thai)).size,20);
  assert.equal(new Set(cards.map(c=>c.id)).size,20);
  for(const week of [10,11,12,13])assert.equal(cards.filter(c=>c.week===week).length,5);
  for(const card of cards){
    assert(!/[\u0e00-\u0e7f]/.test(card.prompt));
    assert(/[\u0e00-\u0e7f]/.test(card.thai));
    assert(fs.existsSync(path.join(__dirname,'..',card.image)),card.image);
    assert(card.roman&&card.type);
  }
});
test('shuffle keeps every card without modifying the original deck',()=>{
  const original=cards.map(c=>c.id);
  const shuffled=shuffle(cards,()=>0);
  assert.deepEqual(cards.map(c=>c.id),original);
  assert.deepEqual(shuffled.map(c=>c.id).sort((a,b)=>a-b),original);
  assert.notDeepEqual(shuffled.map(c=>c.id),original);
});
test('the answer must be revealed before a rating can advance the round',()=>{
  const round=createRound(cards,()=>.5);
  assert.equal(round.revealed,false);assert.equal(rate(round,true),false);assert.equal(round.index,0);
  const first=round.deck[0].id;reveal(round);assert.equal(round.revealed,true);
  assert.equal(rate(round,true),true);assert.equal(round.index,1);assert.equal(round.revealed,false);
  assert.deepEqual(round.answers,[{id:first,known:true}]);
  assert.equal(rate(round,false),false);
});
test('a full round records all twenty cards once and cannot advance beyond completion',()=>{
  const round=createRound(cards,()=>.5);
  for(let i=0;i<20;i++){reveal(round);assert.equal(rate(round,i%2===0),true);}
  assert.equal(round.index,20);assert.equal(new Set(round.answers.map(a=>a.id)).size,20);
  assert.equal(round.answers.filter(a=>a.known).length,10);
  reveal(round);assert.equal(round.revealed,false);assert.equal(rate(round,true),false);
});
test('review rounds contain only the selected missed cards',()=>{
  const review=createRound(cards.slice(0,3),()=>.5);
  assert.equal(review.deck.length,3);
  for(let i=0;i<3;i++){reveal(review);rate(review,true);}
  assert.equal(review.index,3);assert.equal(review.answers.length,3);
});
test('next skips an unrevealed card without marking it right or wrong',()=>{
  const round=createRound(cards,()=>.5),first=round.deck[0].id;
  assert.equal(skip(round),true);assert.equal(round.index,1);assert.equal(round.revealed,false);
  assert.deepEqual(round.answers,[{id:first,known:null}]);
  reveal(round);assert.equal(skip(round),false);assert.equal(round.index,1);
  assert.equal(rate(round,true),true);assert.equal(round.index,2);
});
test('all cards may be skipped and remain available for review',()=>{
  const round=createRound(cards,()=>.5);
  for(let i=0;i<20;i++)assert.equal(skip(round),true);
  assert.equal(round.index,20);assert.equal(round.revealed,false);assert.equal(skip(round),false);
  assert.equal(round.answers.filter(a=>a.known===null).length,20);
  assert.equal(round.answers.filter(a=>a.known===false).length,0);
  assert.equal(new Set(round.answers.map(a=>a.id)).size,20);
});
