(() => {
  'use strict';
  const rows = [
    [12,'ตรงไป','trong-pai','geradeaus gehen / fahren','Verbgruppe'],
    [12,'เลี้ยวซ้าย','líao-sáai','links abbiegen','Verbgruppe'],
    [12,'เลี้ยวขวา','líao-khwǎa','rechts abbiegen','Verbgruppe'],
    [12,'ข้าม','khâam','überqueren','Verb'],
    [12,'เข้าไป','khâo-pai','hineingehen','Verbgruppe'],
    [12,'ออกจาก','ɔ̀ɔk-jàak','verlassen, herausgehen aus','Verbgruppe'],
    [12,'ช่องเขา','chɔ̂ng-khǎo','Schlucht, Gebirgspass','Nomen'],
    [12,'ที่ทำการอุทยาน','thîi-tham-gaan-ùt-thá-yaan','Parkverwaltung','Nomengruppe'],
    [13,'ตลาดเช้า','tà-làat-cháao','Morgenmarkt','Nomen'],
    [13,'ไก่ปิ้ง','gài-pîng','gegrillte Hähnchenspieße','Nomen'],
    [13,'ทอดมันปลา','thɔ̂ɔt-man-plaa','würzige Fischküchlein','Nomen'],
    [13,'ซาลาเปา','saa-laa-pao','gedämpftes, gefülltes Brötchen','Nomen'],
    [13,'ขนมต้ม','khà-nǒm-tôm','Kokoskugeln aus Klebreisteig','Nomen'],
    [13,'ขนมครก','khà-nǒm-khrók','kleine Kokospfannküchlein','Nomen'],
    [13,'กาแฟ','gaa-fae','Kaffee','Nomen'],
    [13,'ชิม','chim','kosten, probieren','Verb']
  ];
  const cards = rows.map(([week,thai,roman,german,type],i)=>({id:`review-${i+1}`,week,thai,roman,german,type,prompt:german,image:`assets/vocab-review/word-${String(i+1).padStart(2,'0')}.webp`}));
  if (typeof module !== 'undefined') module.exports = {cards};
  if (typeof window !== 'undefined') window.reviewVocabulary = cards;
})();
