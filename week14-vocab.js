(() => {
  'use strict';
  const examples = [
    ['น้ำท่วม', 'ฝนตกหนักจึงเกิดน้ำท่วม', 'Es regnet stark, deshalb gibt es eine Überschwemmung.'],
    ['จมน้ำ', 'ถนนเส้นนี้จมน้ำหลังฝนตกหนัก', 'Diese Straße steht nach starkem Regen unter Wasser.'],
    ['ระดับน้ำทะเล', 'นักวิจัยวัดระดับน้ำทะเล', 'Forschende messen den Meeresspiegel.'],
    ['ชายทะเล', 'บ้านของเขาอยู่ใกล้ชายทะเล', 'Sein Haus liegt nahe an der Küste.'],
    ['แม่น้ำ', 'แม่น้ำไหลผ่านเมือง', 'Der Fluss fließt durch die Stadt.'],
    ['พื้นดิน', 'พื้นดินเปียกหลังฝนตก', 'Der Boden ist nach dem Regen nass.'],
    ['พื้นที่', 'พื้นที่นี้อยู่ใกล้แม่น้ำ', 'Dieses Gebiet liegt nahe am Fluss.'],
    ['ฝนตก', 'วันนี้ฝนตกหนัก', 'Heute regnet es stark.'],
    ['พายุ', 'พายุทำให้คลื่นสูง', 'Der Sturm verursacht hohe Wellen.'],
    ['น้ำบาดาล', 'บางบ้านใช้น้ำบาดาล', 'Manche Häuser nutzen Grundwasser.'],
    ['สาเหตุ', 'ขยะเป็นสาเหตุหนึ่งที่ทำให้ท่ออุดตัน', 'Müll ist eine Ursache dafür, dass Rohre verstopfen.'],
    ['การทรุดตัว', 'การทรุดตัวทำให้พื้นดินต่ำลง', 'Durch Bodensenkung liegt der Boden tiefer.'],
    ['กัดเซาะ', 'คลื่นกัดเซาะชายฝั่ง', 'Die Wellen tragen die Küste ab.'],
    ['โลกร้อน', 'เราคุยกันเรื่องโลกร้อน', 'Wir sprechen über die globale Erwärmung.'],
    ['น้ำแข็ง', 'ในแก้วมีน้ำแข็ง', 'Im Glas ist Eis.'],
    ['ละลาย', 'น้ำแข็งละลายเมื่ออากาศร้อน', 'Eis schmilzt, wenn es warm ist.'],
    ['ระบบระบายน้ำ', 'เมืองนี้มีระบบระบายน้ำใหม่', 'Diese Stadt hat ein neues Entwässerungssystem.'],
    ['ขยะ', 'อย่าทิ้งขยะลงในแม่น้ำ', 'Wirf keinen Müll in den Fluss.'],
    ['ท่อ', 'ช่างกำลังซ่อมท่อ', 'Ein Handwerker repariert gerade das Rohr.'],
    ['อุด', 'ขยะอุดท่อระบายน้ำ', 'Müll verstopft das Abflussrohr.'],
    ['รับมือ', 'ชุมชนเตรียมรับมือน้ำท่วม', 'Die Gemeinde bereitet sich darauf vor, eine Überschwemmung zu bewältigen.'],
    ['แก้ปัญหา', 'เราช่วยกันแก้ปัญหา', 'Wir lösen das Problem gemeinsam.'],
    ['ปรับตัว', 'คนในชุมชนต้องปรับตัว', 'Die Menschen in der Gemeinde müssen sich anpassen.'],
    ['เพิ่ม', 'เราอยากเพิ่มต้นไม้ในสวน', 'Wir möchten mehr Bäume im Garten pflanzen.'],
    ['พื้นที่สีเขียว', 'เมืองนี้มีพื้นที่สีเขียวมากขึ้น', 'Diese Stadt hat mehr Grünflächen.'],
    ['กักเก็บน้ำ', 'ถังนี้ใช้กักเก็บน้ำฝน', 'Dieser Behälter wird zum Speichern von Regenwasser verwendet.'],
    ['ย้ายบ้าน', 'เดือนหน้าเราจะย้ายบ้าน', 'Nächsten Monat ziehen wir um.'],
    ['บ้านใต้ถุนสูง', 'ยายอยู่ในบ้านใต้ถุนสูง', 'Oma wohnt in einem Stelzenhaus.'],
    ['บ้านลอยน้ำ', 'เราเห็นบ้านลอยน้ำในแม่น้ำ', 'Wir sehen ein schwimmendes Haus auf dem Fluss.'],
    ['ประตูระบายน้ำ', 'เจ้าหน้าที่กำลังเปิดประตูระบายน้ำ', 'Die Mitarbeitenden öffnen gerade das Schleusentor.'],
    ['ความเสี่ยง', 'เราต้องประเมินความเสี่ยง', 'Wir müssen das Risiko einschätzen.'],
    ['ผลกระทบ', 'น้ำท่วมมีผลกระทบต่อชุมชน', 'Eine Überschwemmung hat Auswirkungen auf die Gemeinde.'],
    ['คาดการณ์', 'นักวิจัยคาดการณ์ว่าฝนอาจตกหนัก', 'Forschende prognostizieren, dass es stark regnen könnte.'],
    ['ประเมิน', 'วิศวกรประเมินสถานการณ์', 'Ein Ingenieur schätzt die Situation ein.'],
    ['อาจ', 'พรุ่งนี้ฝนอาจตก', 'Morgen könnte es regnen.'],
    ['ค่อย ๆ', 'ต้นไม้ค่อย ๆ โตขึ้น', 'Der Baum wächst nach und nach.'],
    ['ระยะสั้น', 'เราวางแผนแก้ปัญหาในระยะสั้น', 'Wir planen eine kurzfristige Lösung für das Problem.'],
    ['ระยะยาว', 'เราต้องมีแผนระยะยาว', 'Wir brauchen einen langfristigen Plan.'],
    ['เพื่อ', 'เราปลูกต้นไม้เพื่อให้มีร่มเงา', 'Wir pflanzen Bäume, damit es Schatten gibt.'],
    ['ยิ่ง … ยิ่ง …', 'ยิ่งมีขยะมาก น้ำยิ่งระบายได้ยาก', 'Je mehr Müll es gibt, desto schwerer kann das Wasser abfließen.']
  ].map(([word, thai, german], index) => ({
    word, thai, german,
    image: `assets/week14-vocab/word-${String(index + 1).padStart(2, '0')}-v2.webp`,
    target: word === 'ยิ่ง … ยิ่ง …' ? 'ยิ่ง' : word
  }));
  if (typeof document === 'undefined') {
    if (typeof module !== 'undefined') module.exports = { examples };
    return;
  }
  const section = document.getElementById('woche14');
  if (!section) return;
  // Lucide paths, matching the portal's other tools. License: assets/vendor/lucide-LICENSE.txt.
  const paths = {
    previous: ['m15 18-6-6 6-6'], next: ['m9 18 6-6-6-6'],
    close: ['M18 6 6 18', 'm6 6 12 12']
  };
  const icon = name => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name].map(d => `<path d="${d}"></path>`).join('')}</svg>`;
  const rows = [...section.querySelectorAll('table.vocab tbody tr')];
  const entries = [];
  rows.forEach(row => {
    const cell = row.querySelector('td.thai');
    const example = examples.find(item => item.word === cell?.textContent.trim());
    if (!example) return;
    const type = row.querySelector('.word-type');
    const entry = {
      ...example, row, roman: row.cells[1].textContent.trim(),
      meaning: row.cells[2].textContent.trim(), type: type.textContent.trim(), typeClass: type.className
    };
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'w14-word-trigger';
    button.textContent = entry.word;
    button.title = `Wortdetails öffnen: ${entry.meaning}`;
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'w14-word-card');
    button.setAttribute('aria-expanded', 'false');
    cell.replaceChildren(button); entry.button = button;
    const index = entries.push(entry) - 1;
    button.addEventListener('click', () => open(index));
  });
  const card = document.createElement('dialog');
  card.id = 'w14-word-card'; card.className = 'w14-word-card';
  card.setAttribute('aria-labelledby', 'w14-word-title');
  card.innerHTML = `
    <div class="w14-word-head"><span>Wortdetails · Woche 14</span><button type="button" class="w14-icon" id="w14-word-close" title="Schließen" aria-label="Wortdetails schließen">${icon('close')}</button></div>
    <div class="w14-word-content">
      <figure class="w14-word-figure"><img id="w14-word-photo" width="640" height="400" alt=""><figcaption>KI-generiertes Lernbild</figcaption></figure>
      <div class="w14-word-identity"><h2 class="thai" lang="th" id="w14-word-title"></h2><span id="w14-word-type"></span></div>
      <p class="w14-word-roman" id="w14-word-roman"></p><p class="w14-word-meaning" id="w14-word-meaning"></p>
      <div class="w14-word-example"><h3>Beispielsatz</h3><p class="thai" lang="th" id="w14-word-sentence"></p><p lang="de" id="w14-word-translation"></p></div>
    </div>
    <div class="w14-word-nav"><button type="button" class="w14-icon" id="w14-word-previous" title="Vorheriges Wort" aria-label="Vorheriges Wort">${icon('previous')}</button><span id="w14-word-counter" role="status" aria-live="polite"></span><button type="button" class="w14-icon" id="w14-word-next" title="Nächstes Wort" aria-label="Nächstes Wort">${icon('next')}</button></div>`;
  document.body.append(card);
  const $ = id => document.getElementById(id);
  let current = 0, opener = null, anchor = null;
  function resetRows() {
    entries.forEach(entry => { entry.row.classList.remove('w14-word-selected'); entry.button.setAttribute('aria-expanded', 'false'); });
  }
  function render() {
    resetRows();
    const entry = entries[current];
    entry.row.classList.add('w14-word-selected'); entry.button.setAttribute('aria-expanded', 'true');
    $('w14-word-title').textContent = entry.word;
    $('w14-word-roman').textContent = entry.roman;
    $('w14-word-meaning').textContent = entry.meaning;
    $('w14-word-type').textContent = entry.type; $('w14-word-type').className = entry.typeClass;
    $('w14-word-photo').hidden = false;
    $('w14-word-photo').src = entry.image; $('w14-word-photo').alt = `Lernbild: ${entry.meaning}`;
    const sentence = $('w14-word-sentence'); sentence.replaceChildren();
    entry.thai.split(entry.target).forEach((part, index) => {
      if (index) { const mark = document.createElement('mark'); mark.textContent = entry.target; sentence.append(mark); }
      sentence.append(document.createTextNode(part));
    });
    $('w14-word-translation').textContent = entry.german;
    $('w14-word-counter').textContent = `${current + 1} / ${entries.length}`;
    $('w14-word-previous').disabled = current === 0;
    $('w14-word-next').disabled = current === entries.length - 1;
  }
  function position() {
    if (!card.open) return;
    if (window.innerWidth <= 600) { card.style.left = ''; card.style.top = ''; return; }
    const rect = anchor.getBoundingClientRect(), width = card.getBoundingClientRect().width || 400;
    const height = card.getBoundingClientRect().height || Math.min(650, window.innerHeight - 32);
    card.style.left = `${Math.max(16, Math.min(rect.right + 14, window.innerWidth - width - 16))}px`;
    card.style.top = `${Math.max(16, Math.min(rect.top, window.innerHeight - height - 16))}px`;
  }
  function open(index) {
    current = index; opener = entries[index].button; anchor = opener;
    render(); if (!card.open) card.show(); position(); $('w14-word-close').focus();
  }
  function close(restoreFocus = true) {
    if (!card.open) return;
    card.close(); resetRows();
    if (restoreFocus && opener?.isConnected) opener.focus({ preventScroll: true });
  }
  function move(delta) {
    const index = current + delta;
    if (index < 0 || index >= entries.length) return;
    current = index; render();
    const active = document.activeElement;
    if (active === $('w14-word-previous') && active.disabled) $('w14-word-next').focus();
    if (active === $('w14-word-next') && active.disabled) $('w14-word-previous').focus();
  }
  $('w14-word-close').addEventListener('click', () => close());
  $('w14-word-previous').addEventListener('click', () => move(-1));
  $('w14-word-next').addEventListener('click', () => move(1));
  $('w14-word-photo').addEventListener('error', () => { $('w14-word-photo').hidden = true; });
  card.addEventListener('cancel', event => { event.preventDefault(); close(); });
  document.addEventListener('keydown', event => {
    if (!card.open) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (card.contains(document.activeElement) && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  document.addEventListener('pointerdown', event => {
    if (card.open && !card.contains(event.target) && !event.target.closest('.w14-word-trigger')) close(false);
  });
  window.addEventListener('resize', position);
  window.addEventListener('scroll', () => close(false), { passive: true });
  window.addEventListener('beforeprint', () => close(false));
  new MutationObserver(() => {
    if (!section.classList.contains('active')) close(false);
  }).observe(section, { attributes: true, attributeFilter: ['class'] });
})();
