const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { examples } = require('../week14-vocab.js');
const root = path.join(__dirname, '..');

test('all 40 vocabulary entries have distinct photos and bilingual examples', () => {
  assert.equal(examples.length, 40);
  assert.equal(new Set(examples.map(item => item.word)).size, 40);
  const hashes = [];
  for (const [index, item] of examples.entries()) {
    assert.equal(item.image, `assets/week14-vocab/word-${String(index + 1).padStart(2, '0')}-v2.webp`);
    assert(item.thai.includes(item.target), item.word);
    assert(item.german.length > 10);
    const data = fs.readFileSync(path.join(root, item.image));
    assert.equal(data.toString('ascii', 0, 4), 'RIFF');
    assert.equal(data.toString('ascii', 8, 12), 'WEBP');
    hashes.push(crypto.createHash('sha256').update(data).digest('hex'));
  }
  assert.equal(new Set(hashes).size, 40);
});

test('the paired connector is highlighted at both occurrences', () => {
  const item = examples.find(item => item.word === 'ยิ่ง … ยิ่ง …');
  assert.equal(item.target, 'ยิ่ง');
  assert.equal(item.thai.split(item.target).length - 1, 2);
});

test('both portal copies load the detail card and preserve complete images', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.equal(html, fs.readFileSync(path.join(root, 'Thai_mit_Mac_Lernportal.html'), 'utf8'));
  assert(html.includes('week14-vocab.js?v=20261007-2'));
  assert(html.includes('week14-vocab.css?v=20261007-2'));
  const css = fs.readFileSync(path.join(root, 'week14-vocab.css'), 'utf8');
  assert(css.includes('object-fit: contain'));
  assert(css.includes('aspect-ratio: 8 / 5'));
  assert(css.includes('height: auto'));
  assert(css.includes('@media (max-width: 600px)'));
});
