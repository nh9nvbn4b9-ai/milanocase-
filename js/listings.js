/*
 * ELENCO IMMOBILI
 * ------------------------------------------------------------------
 * Questi sono ANNUNCI DI ESEMPIO per mostrare il funzionamento dei filtri.
 * Sostituirli con gli immobili reali dell'agenzia.
 *
 * Campi:
 *   contratto: "vendita" | "affitto"
 *   prezzo:    numero in € (per l'affitto: canone mensile)
 *   foto:      percorso immagine opzionale (es. "assets/img/immobili/via-xyz.jpg").
 *              Se assente viene mostrata una copertina grafica.
 *   link:      link opzionale all'annuncio completo (es. su Immobiliare.it)
 */
window.MILANOCASE_IMMOBILI = [
  { id: 1, titolo: "Trilocale luminoso con balcone", zona: "Rogoredo", tipo: "Trilocale", contratto: "vendita", prezzo: 329000, mq: 85, locali: 3, bagni: 1, piano: "3°", box: false, balcone: true, ascensore: true, metro: true, data: 20 },
  { id: 2, titolo: "Bilocale arredato in nuova costruzione", zona: "Santa Giulia", tipo: "Bilocale", contratto: "affitto", prezzo: 1250, mq: 58, locali: 2, bagni: 1, piano: "5°", box: true, balcone: true, ascensore: true, metro: false, data: 19 },
  { id: 3, titolo: "Quadrilocale con doppi servizi e box", zona: "Santa Giulia", tipo: "Quadrilocale", contratto: "vendita", prezzo: 545000, mq: 118, locali: 4, bagni: 2, piano: "2°", box: true, balcone: true, ascensore: true, metro: false, data: 18 },
  { id: 4, titolo: "Monolocale ristrutturato vicino M3", zona: "Rogoredo", tipo: "Monolocale", contratto: "affitto", prezzo: 780, mq: 35, locali: 1, bagni: 1, piano: "1°", box: false, balcone: false, ascensore: true, metro: true, data: 17 },
  { id: 5, titolo: "Bilocale con terrazzino", zona: "Corvetto", tipo: "Bilocale", contratto: "vendita", prezzo: 215000, mq: 55, locali: 2, bagni: 1, piano: "4°", box: false, balcone: true, ascensore: true, metro: true, data: 16 },
  { id: 6, titolo: "Attico panoramico con terrazzo", zona: "Porta Romana", tipo: "Attico", contratto: "vendita", prezzo: 890000, mq: 140, locali: 4, bagni: 2, piano: "8°", box: true, balcone: true, ascensore: true, metro: true, data: 15 },
  { id: 7, titolo: "Trilocale in contesto verde", zona: "Ponte Lambro", tipo: "Trilocale", contratto: "affitto", prezzo: 1100, mq: 78, locali: 3, bagni: 1, piano: "Rialzato", box: true, balcone: false, ascensore: false, metro: false, data: 14 },
  { id: 8, titolo: "Trilocale da riattare, ottimo investimento", zona: "Rogoredo", tipo: "Trilocale", contratto: "vendita", prezzo: 249000, mq: 80, locali: 3, bagni: 1, piano: "2°", box: false, balcone: true, ascensore: false, metro: true, data: 13 },
  { id: 9, titolo: "Bilocale signorile con cantina", zona: "Porta Romana", tipo: "Bilocale", contratto: "affitto", prezzo: 1550, mq: 62, locali: 2, bagni: 1, piano: "3°", box: false, balcone: true, ascensore: true, metro: true, data: 12 }
];
