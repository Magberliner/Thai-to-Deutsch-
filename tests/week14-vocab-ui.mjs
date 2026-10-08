// Requires happy-dom; HAPPY_DOM_MODULE may point to its installed entry file.
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const { Window } = await import(process.env.HAPPY_DOM_MODULE || 'happy-dom');
const root = fileURLToPath(new URL('..', import.meta.url));
const { examples } = createRequire(import.meta.url)(root + '/week14-vocab.js');
const window = new Window({ url: 'file:///portal/index.html', settings: {
  disableJavaScriptFileLoading: true, disableJavaScriptEvaluation: true,
  disableCSSFileLoading: true, enableImageFileLoading: false, disableIframePageLoading: true
} });
const document = window.document;
const html = fs.readFileSync(root + '/index.html', 'utf8');
document.write(html);
window.HTMLDialogElement.prototype.show = function () { this.open = true; };
window.HTMLDialogElement.prototype.close = function () { this.open = false; };
window.eval([...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]).join('\n'));
window.eval(fs.readFileSync(root + '/week14-vocab.js', 'utf8'));
const $ = id => document.getElementById(id);
const section = $('woche14'), card = $('w14-word-card');
window.showTab('woche14');
const buttons = [...section.querySelectorAll('.w14-word-trigger')];
assert.equal(buttons.length, 40);
assert.equal(card.open, false);
for (const [index, button] of buttons.entries()) {
  assert.equal(button.textContent, examples[index].word);
  const cells = button.closest('tr').cells;
  button.click();
  assert.equal(card.open, true);
  assert.equal($('w14-word-title').textContent, examples[index].word);
  assert.equal($('w14-word-roman').textContent, cells[1].textContent);
  assert.equal($('w14-word-meaning').textContent, cells[2].textContent);
  assert.equal($('w14-word-type').textContent, cells[3].textContent);
  assert.equal($('w14-word-sentence').textContent, examples[index].thai);
  assert.equal($('w14-word-sentence').querySelector('mark').textContent, examples[index].target);
  assert.equal($('w14-word-translation').textContent, examples[index].german);
  assert.equal($('w14-word-photo').getAttribute('src'), examples[index].image);
  assert.equal($('w14-word-counter').textContent, `${index + 1} / 40`);
  assert.equal(section.querySelectorAll('.w14-word-selected').length, 1);
  assert.equal(section.querySelectorAll('[aria-expanded="true"]').length, 1);
  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal($('w14-word-previous').disabled, index === 0);
  assert.equal($('w14-word-next').disabled, index === 39);
}
assert.equal($('w14-word-sentence').querySelectorAll('mark').length, 2);
buttons[0].click();
for (let index = 1; index < 40; index++) {
  $('w14-word-next').click();
  assert.equal($('w14-word-title').textContent, examples[index].word);
}
$('w14-word-next').click(); assert.equal($('w14-word-counter').textContent, '40 / 40');
for (let index = 38; index >= 0; index--) {
  $('w14-word-previous').click();
  assert.equal($('w14-word-title').textContent, examples[index].word);
}
$('w14-word-previous').click(); assert.equal($('w14-word-counter').textContent, '1 / 40');
assert.equal($('w14-word-speak'), null);
assert.equal($('w14-sentence-speak'), null);
assert.equal(card.querySelectorAll('button').length, 3);
assert.equal($('w14-word-photo').getAttribute('width'), '640');
assert.equal($('w14-word-photo').getAttribute('height'), '400');
$('w14-word-next').focus();
document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
assert.equal($('w14-word-counter').textContent, '2 / 40');
document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
assert.equal($('w14-word-counter').textContent, '1 / 40');
document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert.equal(card.open, false); assert.equal(document.activeElement, buttons[0]);
assert.equal(section.querySelectorAll('.w14-word-selected').length, 0);
buttons[12].click(); $('w14-word-close').click();
assert.equal(card.open, false); assert.equal(document.activeElement, buttons[12]);
buttons[4].click();
card.dispatchEvent(new window.Event('cancel', { cancelable: true })); assert.equal(card.open, false);
buttons[8].click();
document.body.dispatchEvent(new window.PointerEvent('pointerdown', { bubbles: true })); assert.equal(card.open, false);
buttons[0].click(); window.dispatchEvent(new window.Event('scroll')); assert.equal(card.open, false);
buttons[0].click(); window.showTab('home');
await new Promise(resolve => setTimeout(resolve, 0)); assert.equal(card.open, false);
window.showTab('woche14'); buttons[0].click();
$('w14-word-photo').dispatchEvent(new window.Event('error')); assert.equal($('w14-word-photo').hidden, true);
$('w14-word-next').click(); assert.equal($('w14-word-photo').hidden, false);
window.innerWidth = 390; window.dispatchEvent(new window.Event('resize'));
assert.equal(card.style.top, ''); assert.equal(card.style.left, '');
window.innerWidth = 859; window.dispatchEvent(new window.Event('resize'));
assert(parseFloat(card.style.left) >= 16); assert(parseFloat(card.style.top) >= 16);
for (const button of card.querySelectorAll('button')) {
  assert(button.getAttribute('aria-label')); assert(button.title); assert(button.querySelector('svg path'));
}
const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
assert.equal(ids.length, new Set(ids).size);
assert.equal(document.querySelectorAll('#woche13 .w14-word-trigger').length, 0);
console.log('PASS: 40 detail cards, table order, bilingual examples and word highlights, landscape photo mappings, previous/next bounds, keyboard controls, focus restoration, outside/Escape/scroll/navigation closing, no audio controls, error recovery, mobile positioning and unique IDs.');
await window.happyDOM.cancelAsync();
