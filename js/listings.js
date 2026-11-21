/*
 * ELENCO IMMOBILI
 * ------------------------------------------------------------------
 * Inserire qui gli immobili reali dell'agenzia, uno per riga, tra le parentesi quadre.
 * Finché l'elenco è vuoto, la sezione "Ricerca immobili" mostra un invito a contattare l'agenzia.
 *
 * Esempio di un immobile (copiarlo dentro le parentesi quadre e modificarlo):
 *
 *   { id: 1, titolo: "Trilocale luminoso con balcone", zona: "Rogoredo", tipo: "Trilocale",
 *     contratto: "vendita", prezzo: 329000, mq: 85, locali: 3, bagni: 1, piano: "3°",
 *     box: false, balcone: true, ascensore: true, metro: true, data: 1,
 *     foto: "assets/img/immobili/trilocale-rogoredo.jpg",
 *     link: "https://www.immobiliare.it/annunci/..." },
 *
 * Campi:
 *   zona:      Rogoredo | Santa Giulia | Corvetto | Porta Romana | Ponte Lambro
 *   tipo:      Monolocale | Bilocale | Trilocale | Quadrilocale | Attico
 *   contratto: "vendita" | "affitto"
 *   prezzo:    numero in € (per l'affitto: canone mensile)
 *   data:      numero per l'ordine "Più recenti" (più alto = più recente)
 *   foto:      facoltativa; se assente viene mostrata una copertina grafica
 *   link:      facoltativo; link all'annuncio completo (altrimenti apre WhatsApp)
 */
window.MILANOCASE_IMMOBILI = [
];
