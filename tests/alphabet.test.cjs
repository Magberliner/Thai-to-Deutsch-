const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {consonants,vowels,words,toneFor,composeSyllable} = require('../alphabet.js');

test('complete alphabet data and local images',()=>{
  assert.equal(consonants.length,44);assert.equal(vowels.length,32);
  assert.equal(new Set(consonants.map(c=>c.glyph)).size,44);
  assert.equal(consonants.filter(c=>c.cls==='mid').length,9);
  assert.equal(consonants.filter(c=>c.cls==='high').length,11);
  assert.equal(consonants.filter(c=>c.cls==='low').length,24);
  assert.equal(vowels.filter(v=>v.group==='mono').length,18);
  assert.equal(vowels.filter(v=>v.group==='diphthong').length,6);
  assert.equal(vowels.filter(v=>v.group==='special').length,8);
  for(const l of [...consonants,...vowels]) assert(fs.existsSync(path.join(__dirname,'..',l.image)),l.image);
  assert.equal(words.length,12);
});
test('common end sounds differ from initial sounds',()=>{
  for(const [glyph,initial,final] of [['ด','d','t'],['บ','b','p'],['ฟ','f','p'],['ร','r','n'],['ล','l','n'],['ญ','j','n']]){
    const c=consonants.find(c=>c.glyph===glyph);assert.equal(c.initial,initial);assert.equal(c.final,final);
  }
});
test('tone rules without marks cover live/dead and short/long syllables',()=>{
  const expected={mid:{open:{short:'tief',long:'mittel'},nasal:{short:'mittel',long:'mittel'},stop:{short:'tief',long:'tief'}},high:{open:{short:'tief',long:'steigend'},nasal:{short:'steigend',long:'steigend'},stop:{short:'tief',long:'tief'}},low:{open:{short:'hoch',long:'mittel'},nasal:{short:'mittel',long:'mittel'},stop:{short:'hoch',long:'fallend'}}};
  for(const [cls,endings] of Object.entries(expected))for(const [ending,lengths] of Object.entries(endings))for(const [length,tone] of Object.entries(lengths)) assert.equal(toneFor(cls,length,ending,'none'),tone);
});
test('marked tones and invalid class/mark combinations',()=>{
  for(const length of ['short','long'])for(const end of ['open','nasal','stop']){
    assert.equal(toneFor('mid',length,end,'ek'),'tief');assert.equal(toneFor('mid',length,end,'tho'),'fallend');
    assert.equal(toneFor('mid',length,end,'tri'),'hoch');assert.equal(toneFor('mid',length,end,'chattawa'),'steigend');
    assert.equal(toneFor('high',length,end,'ek'),'tief');assert.equal(toneFor('high',length,end,'tho'),'fallend');
    assert.equal(toneFor('low',length,end,'ek'),'fallend');assert.equal(toneFor('low',length,end,'tho'),'hoch');
    for(const cls of ['high','low'])for(const mark of ['tri','chattawa'])assert.equal(toneFor(cls,length,end,mark),null);
  }
});
test('controlled syllable spelling places the vowel and tone mark correctly',()=>{
  assert.equal(composeSyllable('mid','long','open','none'),'กา');
  assert.equal(composeSyllable('high','long','open','tho'),'ข้า');
  assert.equal(composeSyllable('low','short','open','ek'),'ค่ะ');
  assert.equal(composeSyllable('mid','short','stop','tho'),'กั้ก');
  assert.equal(composeSyllable('mid','short','nasal','none'),'กัน');
});
