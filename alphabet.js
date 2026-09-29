(() => {
  'use strict';
  const consonantRows = [
    ['ก','ไก่','Huhn','kɔɔ kài','mid','k','k'],
    ['ข','ไข่','Ei','khɔ̌ɔ khài','high','kʰ','k'],
    ['ฃ','ขวด','Flasche','khɔ̌ɔ khùat','high','kʰ','', 'obsolete'],
    ['ค','ควาย','Wasserbüffel','khɔɔ khwaai','low','kʰ','k'],
    ['ฅ','คน','Mensch','khɔɔ khon','low','kʰ','', 'obsolete'],
    ['ฆ','ระฆัง','Glocke','khɔɔ rá-khang','low','kʰ','k'],
    ['ง','งู','Schlange','ngɔɔ nguu','low','ŋ','ŋ'],
    ['จ','จาน','Teller','jɔɔ jaan','mid','tɕ','t'],
    ['ฉ','ฉิ่ง','Zimbeln','chɔ̌ɔ chìng','high','tɕʰ',''],
    ['ช','ช้าง','Elefant','chɔɔ cháang','low','tɕʰ','t'],
    ['ซ','โซ่','Kette','sɔɔ sôo','low','s','t'],
    ['ฌ','เฌอ','Baum (literarisch)','chɔɔ chəə','low','tɕʰ',''],
    ['ญ','หญิง','Frau','yɔɔ yǐng','low','j','n'],
    ['ฎ','ชฎา','Chada-Kopfschmuck','dɔɔ chá-daa','mid','d','t'],
    ['ฏ','ปฏัก','Viehstock','tɔɔ pà-tàk','mid','t','t'],
    ['ฐ','ฐาน','Sockel','thɔ̌ɔ thǎan','high','tʰ','t'],
    ['ฑ','มณโฑ','Montho (Figur aus dem Ramakien)','thɔɔ mon-thoo','low','tʰ','t'],
    ['ฒ','ผู้เฒ่า','Älterer Mensch','thɔɔ phûu-thâo','low','tʰ','t'],
    ['ณ','เณร','Novize','nɔɔ neen','low','n','n'],
    ['ด','เด็ก','Kind','dɔɔ dèk','mid','d','t'],
    ['ต','เต่า','Schildkröte','tɔɔ tào','mid','t','t'],
    ['ถ','ถุง','Sack, Tüte','thɔ̌ɔ thǔng','high','tʰ','t'],
    ['ท','ทหาร','Soldat','thɔɔ thá-hǎan','low','tʰ','t'],
    ['ธ','ธง','Flagge','thɔɔ thong','low','tʰ','t'],
    ['น','หนู','Maus','nɔɔ nǔu','low','n','n'],
    ['บ','ใบไม้','Blatt','bɔɔ bai-máai','mid','b','p'],
    ['ป','ปลา','Fisch','pɔɔ plaa','mid','p','p'],
    ['ผ','ผึ้ง','Biene','phɔ̌ɔ phʉ̂ng','high','pʰ',''],
    ['ฝ','ฝา','Deckel','fɔ̌ɔ fǎa','high','f',''],
    ['พ','พาน','Opferschale','phɔɔ phaan','low','pʰ','p'],
    ['ฟ','ฟัน','Zähne','fɔɔ fan','low','f','p'],
    ['ภ','สำเภา','Dschunke','phɔɔ sǎm-phao','low','pʰ','p'],
    ['ม','ม้า','Pferd','mɔɔ máa','low','m','m'],
    ['ย','ยักษ์','Yak-Riese','yɔɔ yák','low','j','j'],
    ['ร','เรือ','Boot','rɔɔ rʉa','low','r','n'],
    ['ล','ลิง','Affe','lɔɔ ling','low','l','n'],
    ['ว','แหวน','Ring','wɔɔ wǎaen','low','w','w'],
    ['ศ','ศาลา','Pavillon','sɔ̌ɔ sǎa-laa','high','s','t'],
    ['ษ','ฤๅษี','Einsiedler','sɔ̌ɔ rʉʉ-sǐi','high','s','t'],
    ['ส','เสือ','Tiger','sɔ̌ɔ sʉ̌a','high','s','t'],
    ['ห','หีบ','Truhe','hɔ̌ɔ hìip','high','h',''],
    ['ฬ','จุฬา','Chula-Drachen','lɔɔ jù-laa','low','l','n'],
    ['อ','อ่าง','Becken','ɔɔ àang','mid','ʔ',''],
    ['ฮ','นกฮูก','Eule','hɔɔ nók-hûuk','low','h','']
  ];
  const vowelRows = [
    ['อะ','-ะ','a','short','mono','กะละมัง','kà-lá-mang','Waschbecken','hinter dem Konsonanten','Vor einem Endkonsonanten meist -ั-, z. B. กัด.'],
    ['อา','-า','aː','long','mono','ปลา','plaa','Fisch','hinter dem Konsonanten','Langes /aː/; die Vokallänge bleibt auch in geschlossenen Silben wichtig.'],
    ['อิ','-ิ','i','short','mono','ลิง','ling','Affe','über dem Konsonanten','Kurzes /i/. ลิง endet auf /ŋ/ und ist trotz kurzem Vokal eine lebende Silbe.'],
    ['อี','-ี','iː','long','mono','สี','sǐi','Farbe','über dem Konsonanten','Langes /iː/. -ิ und -ี dürfen nicht verwechselt werden.'],
    ['อึ','-ึ','ɯ','short','mono','ผึ้ง','phʉ̂ng','Biene','über dem Konsonanten','Hoher ungerundeter Vokal: die Lippen bleiben ungerundet.'],
    ['อือ','-ือ','ɯː','long','mono','มือ','mʉʉ','Hand','über und hinter dem Konsonanten','In offenen Silben -ือ, vor einem Endkonsonanten -ื-, z. B. คืน.'],
    ['อุ','-ุ','u','short','mono','ถุง','thǔng','Tüte','unter dem Konsonanten','Kurzes /u/, Lippen gerundet.'],
    ['อู','-ู','uː','long','mono','ปู','puu','Krabbe','unter dem Konsonanten','Langes /uː/, Lippen gerundet.'],
    ['เอะ','เ-ะ','e','short','mono','เละ','léʔ','matschig','vor und hinter dem Konsonanten','Vor einem Endkonsonanten oft เ-็-, z. B. เต็ม.'],
    ['เอ','เ-','eː','long','mono','ทะเล','thá-lee','Meer','vor dem Konsonanten','Das Zeichen เ steht links, wird aber nach dem Anfangskonsonanten gesprochen.'],
    ['แอะ','แ-ะ','ɛ','short','mono','แพะ','phɛ́ʔ','Ziege','vor und hinter dem Konsonanten','Offener als /e/; vor Endkonsonanten oft แ-็-, z. B. แข็ง.'],
    ['แอ','แ-','ɛː','long','mono','แพ','phɛɛ','Floß','vor dem Konsonanten','Langes offenes /ɛː/. Die beiden Striche gehören zu einem Vokalzeichen.'],
    ['โอะ','โ-ะ','o','short','mono','โต๊ะ','tóʔ','Tisch','vor und hinter dem Konsonanten','In geschlossenen Silben oft ohne Vokalzeichen, z. B. คน /khon/.'],
    ['โอ','โ-','oː','long','mono','โค','khoo','Rind','vor dem Konsonanten','Langes /oː/. Nicht mit dem offeneren /ɔː/ verwechseln.'],
    ['เอาะ','เ-าะ','ɔ','short','mono','เกาะ','kɔ̀ʔ','Insel','vor und hinter dem Konsonanten','Kurzes offenes /ɔ/. Weitere Schreibformen treten mit Tonzeichen oder Endkonsonanten auf, z. B. ก็, น็อต.'],
    ['ออ','-อ','ɔː','long','mono','หมอ','mɔ̌ɔ','Arzt','hinter dem Konsonanten','อ ist hier Teil des Vokals, nicht Anfangs- oder Endkonsonant.'],
    ['เออะ','เ-อะ','ɤ','short','mono','เยอะ','yə́ʔ','viele','vor und hinter dem Konsonanten','Kurzer ungerundeter zentraler bis hinterer Vokal. Das Bild zeigt viele Früchte als Merkhilfe für เยอะ.'],
    ['เออ','เ-อ','ɤː','long','mono','เธอ','thəə','du; sie','vor und hinter dem Konsonanten','Vor vielen Endkonsonanten เ-ิ-, z. B. เงิน; vor ย oft เ-ย, z. B. เคย.'],
    ['เอียะ','เ-ียะ','iə','short','diphthong','','','seltener Kurzlaut','vor, über und hinter dem Konsonanten','Kurze Diphthongform; im Alltag selten, z. B. im Lehnwort เกี๊ยะ (Holzpantinen). Das Bild ist ein Lautbild, kein Wortbild.', 'rare'],
    ['เอีย','เ-ีย','iəː','long','diphthong','เทียน','thian','Kerze','vor, über und hinter dem Konsonanten','Ein gleitender Vokal von /i/ zu /ə/; เ und ย werden hier nicht einzeln ausgesprochen.'],
    ['เอือะ','เ-ือะ','ɯə','short','diphthong','','','seltener Kurzlaut','vor, über und hinter dem Konsonanten','Kurze Diphthongform, sehr selten in gewöhnlichen Wörtern. Das Bild dient nur als Lautbild.', 'rare'],
    ['เอือ','เ-ือ','ɯəː','long','diphthong','เรือ','rʉa','Boot','vor, über und hinter dem Konsonanten','Gleitender Vokal mit ungerundetem Anfang; เ und อ gehören gemeinsam zum Muster.'],
    ['อัวะ','-ัวะ','uə','short','diphthong','','','seltener Kurzlaut','über und hinter dem Konsonanten','Kurze Form, besonders in lautnachahmenden Ausdrücken. Das Bild ist ein Lautbild.', 'rare'],
    ['อัว','-ัว','uəː','long','diphthong','วัว','wua','Kuh','über und hinter dem Konsonanten','Vor einem Endkonsonanten entfällt ั: สวน /sǔan/. ว ist in diesem Muster Vokalbestandteil.'],
    ['อำ','-ำ','am','special','special','น้ำ','náam','Wasser','über und hinter dem Konsonanten','Enthält bereits den Endlaut /m/. Die Vokallänge ist wortabhängig: น้ำ wird lang gesprochen.'],
    ['ใอ','ใ-','aj','special','special','ใบไม้','bai-máai','Blatt','vor dem Konsonanten','ใ- und ไ- haben denselben Grundlaut. ใ- steht in einer begrenzten traditionellen Wortgruppe.'],
    ['ไอ','ไ-','aj','special','special','ไก่','kài','Huhn','vor dem Konsonanten','Gleicher Grundlaut wie ใ-. Die Schreibung muss mit dem Wort gelernt werden; ไ- kommt auch in Lehnwörtern vor.'],
    ['เอา','เ-า','aw','special','special','เต่า','tào','Schildkröte','vor und hinter dem Konsonanten','Enthält einen /w/-Ausklang. Die Lautlänge kann je nach Wort abweichen.'],
    ['ฤ','ฤ','rɯ / ri / rɤː','special','special','ฤดู','rʉ́-duu','Jahreszeit','eigenständiges Sonderzeichen','Wortabhängige Aussprache: ฤดู /rɯ/, อังกฤษ /ri/, ฤกษ์ /rɤː/. Keine frei einsetzbare Vokalform.', 'rare'],
    ['ฤๅ','ฤๅ','rɯː','special','special','ฤๅษี','rʉʉ-sǐi','Einsiedler','eigenständiges Sonderzeichen','Seltene traditionelle Form. ๅ ist das Langzeichen dieser Sonderform, nicht das gewöhnliche า.', 'rare'],
    ['ฦ','ฦ','lɯ','special','special','','','historische Form','eigenständiges Sonderzeichen','Historische Form, in der modernen Standardschreibung nicht produktiv. Kein gewöhnliches Alltagsbeispiel.', 'obsolete'],
    ['ฦๅ','ฦๅ','lɯː','special','special','','','historische Form','eigenständiges Sonderzeichen','Historische lange Form, praktisch außer Gebrauch. Kein gewöhnliches Alltagsbeispiel.', 'obsolete']
  ];
  const classes = { mid: 'Mittel', high: 'Hoch', low: 'Tief' };
  const lengths = { short: 'Kurz', long: 'Lang', special: 'Sonderform' };
  const consonants = consonantRows.map((r,i) => ({ id:`c${i+1}`,kind:'consonant',glyph:r[0],word:r[1],meaning:r[2],roman:r[3],cls:r[4],initial:r[5],final:r[6],rarity:r[7] || '',image:`assets/thai-script/consonant-${String(i+1).padStart(2,'0')}.webp` }));
  const vowels = vowelRows.map((r,i) => ({ id:`v${i+1}`,kind:'vowel',glyph:r[1],name:r[0],sound:r[2],length:r[3],group:r[4],word:r[5],roman:r[6],meaning:r[7],position:r[8],note:r[9],rarity:r[10] || '',image:`assets/thai-script/vowel-${String(i+1).padStart(2,'0')}.webp` }));
  const letters = [...consonants,...vowels];
  const words = [
    ['กา','kaa','Krähe','ก /k/ · mittel','-า /aː/ · lang','offen','mittel','Lange offene Silbe: lebend, mittlere Klasse, kein Tonzeichen.'],
    ['กิน','kin','essen','ก /k/ · mittel','-ิ /i/ · kurz','น /n/','mittel','Nasales Ende macht die Silbe lebend, auch mit kurzem Vokal.'],
    ['กุ้ง','kûng','Garnele','ก /k/ · mittel','-ุ /u/ · kurz','ง /ŋ/','fallend','Lebende Silbe; ไม้โท ้ mit mittlerer Klasse ergibt fallenden Ton.'],
    ['เสือ','sʉ̌a','Tiger','ส /s/ · hoch','เ-ือ /ɯəː/ · lang','offen','steigend','เ steht vor ส, ื über ส und อ dahinter; alle drei gehören zum Vokal.'],
    ['ผัก','phàk','Gemüse','ผ /pʰ/ · hoch','-ั- /a/ · kurz','ก /k̚/','tief','-ะ verändert vor dem Endkonsonanten seine Form zu -ั-. Tote Silbe, hohe Klasse.'],
    ['มือ','mʉʉ','Hand','ม /m/ · tief','-ือ /ɯː/ · lang','offen','mittel','อ ist hier Bestandteil des Vokals; es ist kein gesprochenes Silbenende.'],
    ['คน','khon','Mensch','ค /kʰ/ · tief','ungeschriebenes /o/ · kurz','น /n/','mittel','Zwischen Anfang und Ende wird ein kurzes /o/ gelesen.'],
    ['เงิน','ngəən','Geld','ง /ŋ/ · tief','เ-ิ- /ɤː/ · lang','น /n/','mittel','Das ist hier nicht เ + /i/. เ-ิ- ist die geschlossene Form von เ-อ.'],
    ['สวน','sǔan','Garten','ส /s/ · hoch','-ว- /uəː/ · lang','น /n/','steigend','Die geschlossene Form von -ัว verliert ั. ว ist Vokalbestandteil.'],
    ['บ้าน','bâan','Haus','บ /b/ · mittel','-า /aː/ · lang','น /n/','fallend','ไม้โท ้ mit mittlerer Klasse ergibt fallenden Ton.'],
    ['หมา','mǎa','Hund','ห นำ + ม /m/','-า /aː/ · lang','offen','steigend','ห wird nicht als /h/ gesprochen, aktiviert hier aber die hohe Tonklasse.'],
    ['อยู่','yùu','sein; sich befinden','อ นำ + ย /j/','-ู /uː/ · lang','offen','tief','Stummes führendes อ macht die Tonklasse mittel; ไม้เอก ่ ergibt tiefen Ton.']
  ];
  function toneFor(cls,length,ending,mark) {
    if (['tri','chattawa'].includes(mark) && cls !== 'mid') return null;
    if (mark !== 'none') return { mid:{ek:'tief',tho:'fallend',tri:'hoch',chattawa:'steigend'},high:{ek:'tief',tho:'fallend'},low:{ek:'fallend',tho:'hoch'} }[cls][mark];
    const live = ending === 'nasal' || (ending === 'open' && length === 'long');
    if (cls === 'mid') return live ? 'mittel' : 'tief';
    if (cls === 'high') return live ? 'steigend' : 'tief';
    return live ? 'mittel' : length === 'short' ? 'hoch' : 'fallend';
  }
  // The tone lab composes only controlled a-vowel syllables, not arbitrary Thai text.
  function composeSyllable(cls,length,ending,mark) {
    const c = {mid:'ก',high:'ข',low:'ค'}[cls];
    const tone = {none:'',ek:'่',tho:'้',tri:'๊',chattawa:'๋'}[mark];
    const end = {open:'',nasal:'น',stop:'ก'}[ending];
    return length === 'long' ? c + tone + 'า' + end : ending === 'open' ? c + tone + 'ะ' : c + 'ั' + tone + end;
  }
  if (typeof document === 'undefined') {
    if (typeof module !== 'undefined') module.exports = { consonants,vowels,words,toneFor,composeSyllable };
    return;
  }
  const $ = id => document.getElementById(id);
  if (!$('alphabet')) return;
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<i data-lucide="${name}"></i>`;
  const icons = () => window.lucide?.createIcons();
  const validIds = new Set(letters.map(l=>l.id));
  let progress = { learned:[],mistakes:[],lastScore:null };
  try {
    const saved = JSON.parse(localStorage.getItem('thai-script-progress-v1') || '{}');
    progress.learned = Array.isArray(saved.learned) ? [...new Set(saved.learned.filter(id=>validIds.has(id)))] : [];
    progress.mistakes = Array.isArray(saved.mistakes) ? saved.mistakes.filter(q=>q && validIds.has(q.id) && ['picture','class','final','vowel','length'].includes(q.mode)) : [];
    if (Number.isInteger(saved.lastScore) && saved.lastScore>=0 && saved.lastScore<=10) progress.lastScore = saved.lastScore;
  } catch (_) { /* Practice still works when storage is unavailable. */ }
  function save() {
    try { localStorage.setItem('thai-script-progress-v1',JSON.stringify(progress)); }
    catch (_) { $('script-status').textContent='Der Lernstand kann in diesem Browser nicht dauerhaft gespeichert werden.'; }
    $('script-progress').textContent=`${progress.learned.length} / 76 vertraut`;
    $('script-quiz-history').textContent=progress.lastScore === null ? '' : `Letzte Runde: ${progress.lastScore} / 10`;
  }
  const pages = { consonant:0,vowel:0 };
  let selected = consonants[0];
  function switchTab(name) {
    document.querySelectorAll('[data-script-tab]').forEach(btn=>{
      const active=btn.dataset.scriptTab===name;
      btn.setAttribute('aria-selected',String(active));
      btn.tabIndex=active?0:-1;
      $(`script-pane-${btn.dataset.scriptTab}`).hidden=!active;
    });
    if (name==='practice') draw();
  }
  const tabButtons=[...document.querySelectorAll('[data-script-tab]')];
  tabButtons.forEach((btn,index)=>{
    btn.addEventListener('click',()=>switchTab(btn.dataset.scriptTab));
    btn.addEventListener('keydown',event=>{
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?tabButtons.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabButtons.length)%tabButtons.length;
      switchTab(tabButtons[next].dataset.scriptTab);
      tabButtons[next].focus();
    });
  });
  function filtered(kind) {
    const query=$(`script-${kind}-search`).value.toLocaleLowerCase('de').trim();
    const filter=$(`script-${kind}-filter`).value;
    const review=$(`script-${kind}-review`).checked;
    return (kind==='consonant'?consonants:vowels).filter(l=>{
      const match=kind==='consonant'?filter==='all'||l.cls===filter:filter==='all'||l.length===filter||l.group===filter;
      const hay=[l.glyph,l.word,l.name,l.meaning,l.roman,l.initial,l.final,l.sound,l.position,l.note].join(' ').toLocaleLowerCase('de');
      return match&&(!query||hay.includes(query))&&(!review||!progress.learned.includes(l.id));
    });
  }
  function badge(l) { return l.kind==='consonant'?`<span class="script-class ${l.cls}">${classes[l.cls]}</span>`:`<span class="script-class ${l.length==='special'?'special':'v'+l.length}">${lengths[l.length]}</span>`; }
  function renderGrid(kind,print=false) {
    const list=print?(kind==='consonant'?consonants:vowels):filtered(kind),max=Math.max(1,Math.ceil(list.length/16));
    pages[kind]=Math.min(pages[kind],max-1);
    const slice=print?list:list.slice(pages[kind]*16,pages[kind]*16+16);
    $(`script-${kind}-grid`).innerHTML=slice.length?slice.map(l=>`<button class="script-letter ${kind==='vowel'?'vowel':''}" type="button" data-letter="${l.id}" aria-label="${escape(l.glyph+' '+(l.word||l.name)+' · '+l.meaning)}"><img src="${l.image}" alt="${escape(l.meaning)}" width="320" height="320" loading="lazy">${progress.learned.includes(l.id)?`<span class="script-known" aria-label="Vertraut">${icon('check')}</span>`:''}<span class="script-glyph thai">${escape(l.glyph)}</span><span><span class="script-letter-name thai">${escape(l.kind==='consonant'?l.word:l.name)}</span><span class="script-letter-meaning">${escape(l.meaning)}</span></span><span class="script-letter-foot">${badge(l)}<span>${l.rarity==='obsolete'?'historisch':l.rarity==='rare'?'selten':`/${escape(l.initial||l.sound)}/`}</span></span></button>`).join(''):'<p class="script-empty">Keine passenden Zeichen.</p>';
    $(`script-${kind}-page`).textContent=`Seite ${pages[kind]+1} / ${max}`;
    $(`script-${kind}-count`).textContent=`${list.length} Zeichen`;
    $(`script-${kind}-prev`).disabled=pages[kind]===0;
    $(`script-${kind}-next`).disabled=pages[kind]>=max-1;
    icons();
  }
  for (const kind of ['consonant','vowel']) {
    for (const field of ['search','filter','review']) $(`script-${kind}-${field}`).addEventListener(field==='search'?'input':'change',()=>{pages[kind]=0;renderGrid(kind);});
    for (const [direction,delta] of [['prev',-1],['next',1]]) $(`script-${kind}-${direction}`).addEventListener('click',()=>{pages[kind]+=delta;renderGrid(kind);$(`script-${kind}-grid`).scrollIntoView({block:'start',behavior:'smooth'});});
    $(`script-${kind}-grid`).addEventListener('click',event=>{ const button=event.target.closest('[data-letter]');if(button) openLetter(letters.find(l=>l.id===button.dataset.letter)); });
  }
  function initialHint(l) {
    if (l.rarity==='obsolete') return 'Historischer Buchstabe. Moderne Wörter werden mit ข bzw. ค geschrieben; ขวด und คน sind nur die überlieferten Merkwörter.';
    if (l.glyph==='ฑ') return 'Meist /tʰ/, aber in bestimmten Wörtern /d/, z. B. บัณฑิต. Die Aussprache muss dann mit dem Wort gelernt werden.';
    if (l.glyph==='อ') return 'Am Silbenanfang kann อ als Träger für den Vokal stehen und einen Kehlverschluss /ʔ/ anzeigen. In anderen Mustern ist อ ein Vokalbestandteil.';
    if (l.glyph==='ห') return 'Als Anfang /h/. Als stummes führendes ห vor bestimmten tiefen Sonoranten verändert es die Tonklasse.';
    if (l.glyph==='ร') return 'Standard-Anfang /r/, am Silbenende /n/. In Alltagssprache wird der Anfang oft anders realisiert; hier lernen Sie die Standardform.';
    if (l.glyph==='ว') return 'Als Anfang /w/, als Endlaut /w/; in -ัว und -ว- gehört ว jedoch zum Vokal.';
    if (l.glyph==='ย') return 'Als Anfang /j/ wie deutsches j. In เ-ีย gehört ย zum Vokal, nicht zu einem zusätzlich gesprochenen Endlaut.';
    if (l.glyph==='ญ') return 'Am Anfang /j/, am Ende /n/. In Lehnwörtern kann die Schreibung komplexer sein.';
    if (['ฉ','ฌ','ผ','ฝ','ฮ'].includes(l.glyph)) return 'Dieser Buchstabe wird in der Standardschreibung nicht als gewöhnlicher Endkonsonant verwendet.';
    if (['k','t','p'].includes(l.final)) return `Am Silbenende /${l.final}̚/ ohne hörbare Freigabe. Der Endlaut unterscheidet sich gegebenenfalls vom Anfangslaut.`;
    return 'Anfangslaut, Endlaut und Buchstabenklasse sind getrennte Eigenschaften. Die Klasse allein nennt noch keinen gesprochenen Ton.';
  }
  function audioText(l) {
    if (l.rarity==='obsolete') return '';
    if (l.kind==='vowel') return l.word || `สระ${l.name}`;
    const syllable=l.glyph==='อ'?'ออ':`${l.glyph}อ`;
    return `${syllable} ${l.word}`;
  }
  function speak(text,statusId='script-status') {
    const status=$(statusId);
    if (!text) {status.textContent='Für diese historische Form gibt es hier keine Sprachausgabe.';return;}
    if (!('speechSynthesis' in window)) {status.textContent='Thai-Sprachausgabe ist auf diesem Gerät nicht verfügbar.';return;}
    const voice=speechSynthesis.getVoices().find(v=>/^th(?:-|_|$)/i.test(v.lang));
    if (!voice) {status.textContent='Keine Thai-Systemstimme verfügbar. Die Lautschrift bleibt als Aussprachehilfe sichtbar.';return;}
    speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.lang='th-TH';utterance.voice=voice;utterance.rate=.75;
    utterance.onerror=()=>{status.textContent='Die Thai-Sprachausgabe konnte nicht abgespielt werden.';};
    status.textContent='Synthetische Thai-Sprachausgabe';speechSynthesis.speak(utterance);
  }
  function openLetter(l) {
    selected=l;renderDetail();
    if (!$('script-letter-dialog').open) $('script-letter-dialog').showModal();
  }
  function renderDetail() {
    const l=selected;
    const data=l.kind==='consonant'?[['Buchstabenname',l.roman],['Klasse',classes[l.cls]],['Anfangslaut',`/${l.initial}/`],['Endlaut',l.final?`/${l.final}${['k','t','p'].includes(l.final)?'̚':''}/`:'kein gewöhnlicher Endlaut']]:[['Vokalname',l.name],['Grundlaut',`/${l.sound}/`],['Länge / Gruppe',`${lengths[l.length]} · ${l.group==='diphthong'?'Diphthong':l.group==='special'?'traditionelle Sonderform':'einfacher Vokal'}`],['Position',l.position]];
    const example=l.kind==='vowel'&&l.word?`<p><strong>Beispiel:</strong> <span class="thai">${escape(l.word)}</span> · ${escape(l.roman)} · ${escape(l.meaning)}</p>`:'';
    $('script-detail-content').innerHTML=`<div class="script-detail-hero"><img src="${l.image}" alt="${escape(l.meaning)}" width="320" height="320"><div><div class="script-detail-glyph thai">${escape(l.glyph)}</div><h2 id="script-detail-title" class="thai">${escape(l.kind==='consonant'?l.glyph+' '+l.word:l.name)}</h2><p>${escape(l.meaning)}</p>${badge(l)}${l.rarity?` <span class="script-class special">${l.rarity==='obsolete'?'historisch':'selten'}</span>`:''}</div></div><dl class="script-detail-data">${data.map(([term,value])=>`<div><dt>${escape(term)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>${example}<p>${escape(l.kind==='consonant'?initialHint(l):l.note)}</p>${l.kind==='vowel'&&l.length!=='special'?`<p><strong>Partnerform:</strong> <span class="thai">${escape(vowels[(Number(l.id.slice(1))-1)^1]?.glyph||'')}</span></p>`:''}<div class="script-detail-actions"><button class="script-command secondary" type="button" id="script-detail-audio">${icon('volume-2')}Name${l.kind==='vowel'&&l.word?' / Beispiel':''}</button><button class="script-command secondary" type="button" id="script-detail-write">${icon('pen-line')}Schreiben</button><button class="script-command" type="button" id="script-detail-known" aria-pressed="${progress.learned.includes(l.id)}">${icon(progress.learned.includes(l.id)?'check':'bookmark')}${progress.learned.includes(l.id)?'Vertraut':'Als vertraut markieren'}</button></div><p class="script-detail-status" id="script-detail-status" role="status"></p>`;
    $('script-detail-audio').disabled=l.rarity==='obsolete';
    $('script-detail-audio').addEventListener('click',()=>speak(audioText(l),'script-detail-status'));
    $('script-detail-known').addEventListener('click',()=>{progress.learned=progress.learned.includes(l.id)?progress.learned.filter(id=>id!==l.id):[...progress.learned,l.id];save();renderDetail();renderGrid(l.kind);});
    $('script-detail-write').addEventListener('click',()=>{$('script-letter-dialog').close();switchTab('practice');$('script-write-letter').value=l.id;changeWriting();$('script-writing-canvas').scrollIntoView({block:'center',behavior:'smooth'});});
    icons();
  }
  $('script-detail-close').addEventListener('click',()=>$('script-letter-dialog').close());
  for (const [id,delta] of [['script-detail-prev',-1],['script-detail-next',1]]) $(id).addEventListener('click',()=>{const list=filtered(selected.kind);const index=list.findIndex(l=>l.id===selected.id);openLetter(list[(index+delta+list.length)%list.length]||selected);});
  $('script-letter-dialog').addEventListener('click',event=>{if(event.target===$('script-letter-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)event.target.close();}});
  $('script-vowel-pairs').innerHTML=Array.from({length:12},(_,i)=>{const a=vowels[i*2],b=vowels[i*2+1];return `<div class="script-pair"><div><span class="thai">${a.glyph}</span><small>kurz /${a.sound}/</small></div><span>↔</span><div><span class="thai">${b.glyph}</span><small>lang /${b.sound}/</small></div></div>`;}).join('');
  $('script-word-buttons').innerHTML=words.map((w,i)=>`<button type="button" data-word="${i}" aria-pressed="${i===0}">${w[0]}</button>`).join('');
  function renderWord(index) {
    const w=words[index];
    document.querySelectorAll('[data-word]').forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.word)===index)));
    $('script-word-anatomy').innerHTML=`<div class="script-anatomy-head"><span class="script-anatomy-word thai">${w[0]}</span><span>${w[1]} · ${w[2]}</span><button class="script-icon" id="script-word-audio" type="button" aria-label="Wort anhören" title="Wort anhören">${icon('volume-2')}</button></div><div class="script-parts">${['Anfang','Vokal','Ende','Ton'].map((t,i)=>`<div class="script-part"><small>${t}</small><strong>${escape(w[i+3])}</strong></div>`).join('')}</div><p>${escape(w[7])}</p>`;
    $('script-word-audio').addEventListener('click',()=>speak(w[0]));icons();
  }
  $('script-word-buttons').addEventListener('click',event=>{const b=event.target.closest('[data-word]');if(b)renderWord(Number(b.dataset.word));});
  function renderTone() {
    const cls=$('script-tone-initial').value,length=$('script-tone-length').value,ending=$('script-tone-ending').value,mark=$('script-tone-mark').value;
    const tone=toneFor(cls,length,ending,mark),live=ending==='nasal'||(ending==='open'&&length==='long');
    $('script-tone-result').innerHTML=tone?`<span class="script-tone-syllable thai">${composeSyllable(cls,length,ending,mark)}</span><div><span class="script-tone-label">${tone[0].toUpperCase()+tone.slice(1)} · ${{mittel:'สามัญ',tief:'เอก',fallend:'โท',hoch:'ตรี',steigend:'จัตวา'}[tone]}</span><p>Klasse: ${classes[cls]} · ${lengths[length].toLowerCase()} · ${live?'lebende':'tote'} Silbe</p><p>${mark==='none'?'Ohne Tonzeichen bestimmen Klasse, Silbenende und gegebenenfalls Vokallänge den Ton.':'Mit diesem Tonzeichen bestimmt hier die Anfangsklasse den Ton.'}</p></div>`:'<p>Diese Tonzeichen-Klasse-Kombination gehört nicht zu den regulären Standardmustern. Wählen Sie ก (mittlere Klasse) für ไม้ตรี oder ไม้จัตวา.</p>';
  }
  ['initial','length','ending','mark'].forEach(id=>$(`script-tone-${id}`).addEventListener('change',renderTone));
  const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const modern=consonants.filter(l=>!l.rarity);
  const commonVowels=vowels.filter(l=>!l.rarity&&l.word);
  const finalLetters=modern.filter(l=>l.final);
  let quiz={ questions:[],index:0,score:0,answered:false };
  function question(mode,id) {
    let l=letters.find(x=>x.id===id);
    if (mode==='mixed') mode=shuffle(['picture','class','final','vowel','length'])[0];
    const pool=mode==='vowel'?commonVowels:mode==='length'?commonVowels.filter(v=>v.length!=='special'):mode==='final'?finalLetters:modern;
    if (!pool.includes(l)) l=shuffle(pool)[0];
    let prompt,answer,choices,explanation;
    if(mode==='picture') {prompt='Welcher Konsonant gehört zu diesem Merkwort?';answer=l.glyph;choices=shuffle([answer,...shuffle(modern.filter(c=>c.id!==l.id)).slice(0,3).map(c=>c.glyph)]);explanation=`${l.glyph} ${l.word} · ${l.meaning} · Anfang /${l.initial}/ · Klasse: ${classes[l.cls]}.`;}
    else if(mode==='class') {prompt=`Zu welcher Klasse gehört ${l.glyph}?`;answer=classes[l.cls];choices=['Mittel','Hoch','Tief'];explanation=`${l.glyph}: Klasse ${classes[l.cls]}. Das ist eine Buchstabenklasse, kein einzelner gesprochener Ton.`;}
    else if(mode==='final') {prompt=`Welchen Endlaut hat ${l.glyph} als gewöhnlicher Endkonsonant?`;answer=`/${l.final}/`;choices=shuffle([answer,...shuffle(['k','t','p','ŋ','n','m','j','w'].filter(s=>s!==l.final)).slice(0,3).map(s=>`/${s}/`)]);explanation=`${l.glyph}: Anfang /${l.initial}/, Ende /${l.final}${['k','t','p'].includes(l.final)?'̚':''}/. ${['k','t','p'].includes(l.final)?'Am Ende ohne hörbare Freigabe.':''}`;}
    else if(mode==='vowel') {prompt=`Welches Vokalmuster gehört zum Wort ${l.word}?`;answer=l.glyph;choices=shuffle([answer,...shuffle(commonVowels.filter(v=>v.id!==l.id)).slice(0,3).map(v=>v.glyph)]);explanation=`${l.word} · ${l.roman}: Muster ${l.glyph}, Grundlaut /${l.sound}/. ${l.note}`;}
    else {prompt=`Ist ${l.glyph} ein kurzer oder langer Vokal?`;answer=lengths[l.length];choices=['Kurz','Lang'];explanation=`${l.glyph}: ${lengths[l.length].toLowerCase()}, /${l.sound}/. Partner: ${vowels[(Number(l.id.slice(1))-1)^1].glyph}.`;}
    return {mode,id:l.id,l,prompt,answer,choices,explanation};
  }
  function startQuiz() {
    const mode=$('script-quiz-mode').value,review=$('script-quiz-review').checked;
    const mistakes=progress.mistakes.filter(q=>mode==='mixed'||q.mode===mode);
    if(review&&!mistakes.length){$('script-quiz').innerHTML='<p>Für diese Übung sind noch keine Fehler gespeichert. Starten Sie eine neue Runde ohne den Fehlerfilter.</p>';return;}
    const pool=mode==='vowel'?commonVowels:mode==='length'?commonVowels.filter(v=>v.length!=='special'):mode==='final'?finalLetters:modern;
    const mixedCandidates=mode==='mixed'&&!review?shuffle(['picture','class','final','vowel','length'].flatMap(type=>{
      const source=type==='vowel'?commonVowels:type==='length'?commonVowels.filter(v=>v.length!=='special'):type==='final'?finalLetters:modern;
      return shuffle(source).slice(0,2).map(l=>({mode:type,id:l.id}));
    })):null;
    const candidates=review?shuffle(mistakes):mixedCandidates||shuffle(pool.map(l=>({mode,id:l.id})));
    quiz={questions:Array.from({length:10},(_,i)=>{const item=candidates[i%candidates.length];return question(item.mode,item.id);}),index:0,score:0,answered:false};
    renderQuestion();
  }
  function renderQuestion() {
    const q=quiz.questions[quiz.index];quiz.answered=false;
    $('script-quiz').innerHTML=`<div class="script-quiz-counter"><span>Frage ${quiz.index+1} / 10</span><span>${quiz.score} richtig</span></div><div class="script-quiz-question">${q.mode==='picture'?`<img src="${q.l.image}" alt="Bild des gesuchten Merkworts" width="320" height="320">`:`<div class="script-prompt-glyph thai">${escape(q.mode==='vowel'?q.l.word:q.l.glyph)}</div>`}<div><h3>${escape(q.prompt)}</h3>${q.mode==='picture'?'<p>Das traditionelle Bild-Merkwort gehört zum Buchstabennamen.</p>':''}</div></div><div class="script-answers">${q.choices.map((choice,i)=>`<button type="button" data-quiz-choice="${i}">${escape(choice)}</button>`).join('')}</div><div class="script-quiz-feedback" id="script-quiz-feedback" role="status"></div><button class="script-command" id="script-quiz-next" type="button" disabled>${icon('arrow-right')}${quiz.index===9?'Ergebnis':'Nächste Frage'}</button>`;
    $('script-quiz-next').addEventListener('click',()=>{if(!quiz.answered)return;quiz.index++;if(quiz.index===10)finishQuiz();else renderQuestion();});icons();
  }
  $('script-quiz').addEventListener('click',event=>{
    const btn=event.target.closest('[data-quiz-choice]');if(!btn||quiz.answered)return;
    quiz.answered=true;const q=quiz.questions[quiz.index],correct=q.choices[Number(btn.dataset.quizChoice)]===q.answer;
    if(correct)quiz.score++;
    const key=`${q.mode}:${q.id}`;
    progress.mistakes=progress.mistakes.filter(m=>`${m.mode}:${m.id}`!==key);
    if(!correct)progress.mistakes.push({mode:q.mode,id:q.id});
    save();
    $('script-quiz').querySelectorAll('[data-quiz-choice]').forEach(b=>{b.disabled=true;if(q.choices[Number(b.dataset.quizChoice)]===q.answer)b.classList.add('correct');});
    if(!correct)btn.classList.add('wrong');
    $('script-quiz-feedback').textContent=`${correct?'Richtig.':'Noch nicht. Richtige Antwort: '+q.answer+'.'} ${q.explanation}`;
    $('script-quiz-next').disabled=false;
  });
  function finishQuiz() {
    progress.lastScore=quiz.score;save();
    $('script-quiz').innerHTML=`<h3>Runde abgeschlossen</h3><div class="script-quiz-finish">${quiz.score} / 10 richtig</div><p>${quiz.score===10?'Alle Antworten richtig. Wiederholen Sie die Formen später noch einmal.':'Die falsch beantworteten Aufgaben sind für die Fehlerwiederholung gespeichert.'}</p><button class="script-command" id="script-quiz-again" type="button">${icon('rotate-ccw')}Neue Runde</button>`;
    $('script-quiz-again').addEventListener('click',startQuiz);icons();
  }
  $('script-quiz-start').addEventListener('click',startQuiz);

  const canvas=$('script-writing-canvas'),ctx=canvas.getContext('2d');
  let strokes=[],activeStroke=null;
  const writingLetter=()=>letters.find(l=>l.id===$('script-write-letter').value)||consonants[0];
  const writingModel=l=>l.kind==='consonant'?l.glyph:l.length==='special'?l.name:l.glyph.replace('-', 'ก');
  $('script-write-letter').innerHTML=`<optgroup label="Konsonanten">${consonants.map(l=>`<option value="${l.id}">${l.glyph} ${l.word}</option>`).join('')}</optgroup><optgroup label="Vokale">${vowels.map(l=>`<option value="${l.id}">${l.glyph} · ${l.name}</option>`).join('')}</optgroup>`;
  function draw() {
    if(!ctx)return;
    ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth=1;ctx.strokeStyle='#e1ece6';
    for(let x=0;x<canvas.width;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
    for(let y=0;y<canvas.height;y+=60){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
    if($('script-write-guide').checked){ctx.font='240px Sarabun, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#d5e1da';ctx.fillText(writingModel(writingLetter()),canvas.width/2,canvas.height/2);}
    for(const stroke of strokes){ctx.lineWidth=stroke.width;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#0f766e';ctx.fillStyle='#0f766e';ctx.beginPath();stroke.points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));if(stroke.points.length===1){const p=stroke.points[0];ctx.arc(p.x,p.y,stroke.width/2,0,Math.PI*2);ctx.fill();}else ctx.stroke();}
    $('script-write-undo').disabled=strokes.length===0;$('script-write-clear').disabled=strokes.length===0;
  }
  function position(event) {const r=canvas.getBoundingClientRect();return{x:(event.clientX-r.left)*canvas.width/r.width,y:(event.clientY-r.top)*canvas.height/r.height};}
  canvas.addEventListener('pointerdown',event=>{if(event.button!==0)return;event.preventDefault();canvas.setPointerCapture(event.pointerId);activeStroke={width:Number($('script-write-size').value)*2,points:[position(event)]};strokes.push(activeStroke);draw();});
  canvas.addEventListener('pointermove',event=>{if(!activeStroke)return;activeStroke.points.push(position(event));draw();});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,()=>{activeStroke=null;});
  function changeWriting(){strokes=[];activeStroke=null;$('script-copy-input').value='';$('script-copy-feedback').textContent='';const model=writingModel(writingLetter());$('script-copy-input').placeholder=model;$('script-copy-keys').innerHTML=[...new Set([...model])].map(c=>`<button type="button" data-copy-char="${escape(c)}">${escape(c)}</button>`).join('')+`<button type="button" data-copy-delete aria-label="Letztes Zeichen entfernen" title="Letztes Zeichen entfernen">${icon('delete')}</button>`;draw();icons();}
  $('script-write-letter').addEventListener('change',changeWriting);
  $('script-write-guide').addEventListener('change',draw);
  $('script-write-undo').addEventListener('click',()=>{activeStroke=null;strokes.pop();draw();});
  $('script-write-clear').addEventListener('click',()=>{activeStroke=null;strokes=[];draw();});
  $('script-write-download').addEventListener('click',()=>{const link=document.createElement('a');link.download=`thai-writing-${writingLetter().id}.png`;link.href=canvas.toDataURL('image/png');link.click();});
  $('script-copy-keys').addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;const input=$('script-copy-input');if(button.hasAttribute('data-copy-delete'))input.value=[...input.value].slice(0,-1).join('');else{const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;input.value=input.value.slice(0,start)+button.dataset.copyChar+input.value.slice(end);input.selectionStart=input.selectionEnd=start+button.dataset.copyChar.length;}input.focus();$('script-copy-feedback').textContent='';});
  $('script-copy-check').addEventListener('click',()=>{const target=writingModel(writingLetter()).normalize('NFC'),answer=$('script-copy-input').value.trim().normalize('NFC');$('script-copy-feedback').textContent=answer===target?'Richtig geschrieben.':`Noch nicht. Vorlage: ${target}`;});
  if(document.fonts)document.fonts.ready.then(draw);
  window.addEventListener('beforeprint',()=>{renderGrid('consonant',true);renderGrid('vowel',true);});
  window.addEventListener('afterprint',()=>{renderGrid('consonant');renderGrid('vowel');});
  renderGrid('consonant');renderGrid('vowel');renderWord(0);renderTone();changeWriting();save();icons();
})();
