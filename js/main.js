(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Header + menu a tendina ---------- */
  const header = $('#header');
  const menuBtn = $('#menuBtn');
  const menu = $('#menu');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  };
  menuBtn.addEventListener('click', (e) => { e.stopPropagation(); setMenu(!menu.classList.contains('is-open')); });
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (e) => { if (!menu.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // voce attiva nel menu
  const links = $$('.menu a[href^="#"]');
  const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- Animazioni di comparsa ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- Ricerca immobili ---------- */
  const data = window.MILANOCASE_IMMOBILI || [];
  const form = $('#filters');
  const results = $('#results');
  const empty = $('#empty');
  const count = $('#resultsCount');
  const sort = $('#sort');

  const eur = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €';
  const palette = { Rogoredo: ['#1d4fe0', '#0f1650'], 'Santa Giulia': ['#2b6bff', '#1a237e'], Corvetto: ['#3949ab', '#0f1650'], 'Porta Romana': ['#1565c0', '#0d1240'], 'Ponte Lambro': ['#2f5bd3', '#121a5c'] };

  const cover = (p) => {
    if (p.foto) return `<img src="${p.foto}" alt="${p.titolo}" loading="lazy">`;
    const [a, b] = palette[p.zona] || ['#1d4fe0', '#0f1650'];
    return `<div class="card__art" style="--a:${a};--b:${b}">
      <svg viewBox="0 0 200 112" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5">
          <path d="M20 110V60h30v50M50 110V35h40v75M90 110V50h28v60M118 110V25h36v85M154 110V65h26v45"/>
          <path d="M58 45h8M58 55h8M74 45h8M74 55h8M58 65h8M74 65h8M126 35h8M140 35h8M126 47h8M140 47h8M126 59h8M140 59h8"/>
        </g>
        <path d="M0 110h200" stroke="rgba(255,255,255,.8)" stroke-width="2"/>
      </svg>
      <span>${p.zona}</span>
    </div>`;
  };

  const card = (p) => {
    const price = p.contratto === 'affitto' ? `${eur(p.prezzo)}<small>/mese</small>` : eur(p.prezzo);
    const feats = [p.box && 'Box', p.balcone && 'Balcone', p.ascensore && 'Ascensore', p.metro && 'Metro'].filter(Boolean);
    const msg = encodeURIComponent(`Ciao Milanocase, vorrei informazioni sull'immobile "${p.titolo}" (${p.zona}, rif. ${p.id}).`);
    return `<article class="card">
      <div class="card__media">
        ${cover(p)}
        <span class="card__tag card__tag--${p.contratto}">${p.contratto === 'vendita' ? 'Vendita' : 'Affitto'}</span>
      </div>
      <div class="card__body">
        <p class="card__zone">${p.zona} · ${p.tipo}</p>
        <h3>${p.titolo}</h3>
        <ul class="card__meta">
          <li><b>${p.mq}</b> m²</li>
          <li><b>${p.locali}</b> ${p.locali === 1 ? 'locale' : 'locali'}</li>
          <li><b>${p.bagni}</b> ${p.bagni === 1 ? 'bagno' : 'bagni'}</li>
          <li>Piano <b>${p.piano}</b></li>
        </ul>
        ${feats.length ? `<p class="card__feats">${feats.map(f => `<span>${f}</span>`).join('')}</p>` : ''}
        <div class="card__foot">
          <p class="card__price">${price}</p>
          <a class="card__cta" href="${p.link || `https://wa.me/393667607114?text=${msg}`}" target="_blank" rel="noopener">Richiedi info →</a>
        </div>
      </div>
    </article>`;
  };

  const render = () => {
    const f = new FormData(form);
    const contratto = f.get('contratto');
    const zona = f.get('zona');
    const tipo = f.get('tipo');
    const prezzo = f.get('prezzo');
    const mq = +f.get('mq');
    const locali = +f.get('locali');
    const extras = ['box', 'balcone', 'ascensore', 'metro'].filter(k => f.get(k));

    let list = data.filter(p => {
      if (contratto !== 'tutti' && p.contratto !== contratto) return false;
      if (zona && p.zona !== zona) return false;
      if (tipo && p.tipo !== tipo) return false;
      if (prezzo) {
        const [k, max] = prezzo.split('-');
        const want = k === 'a' ? 'affitto' : 'vendita';
        if (p.contratto !== want || p.prezzo > +max) return false;
      }
      if (p.mq < mq || p.locali < locali) return false;
      return extras.every(k => p[k]);
    });

    const s = sort.value;
    list.sort((a, b) => s === 'prezzo-asc' ? a.prezzo - b.prezzo
      : s === 'prezzo-desc' ? b.prezzo - a.prezzo
      : s === 'mq-desc' ? b.mq - a.mq
      : b.data - a.data);

    results.innerHTML = list.map(card).join('');
    empty.hidden = list.length > 0;
    count.innerHTML = `<b>${list.length}</b> ${list.length === 1 ? 'immobile trovato' : 'immobili trovati'}`;
  };

  // se si sceglie un prezzo, allinea automaticamente il tipo di contratto
  form.prezzo.addEventListener('change', () => {
    const v = form.prezzo.value;
    if (v) form.querySelector(`input[name="contratto"][value="${v[0] === 'a' ? 'affitto' : 'vendita'}"]`).checked = true;
  });
  form.addEventListener('change', render);
  form.addEventListener('reset', () => setTimeout(render));
  sort.addEventListener('change', render);
  render();

  /* ---------- Orari: aperto adesso? ---------- */
  const openNow = $('#openNow');
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
  const day = now.getDay();
  const m = now.getHours() * 60 + now.getMinutes();
  const slots = day === 0 ? [] : day === 6 ? [[570, 750]] : [[570, 750], [900, 1200]];
  const isOpen = slots.some(([a, b]) => m >= a && m < b);
  $(`#hoursList li[data-days="${day}"]`)?.classList.add('today');
  openNow.classList.add(isOpen ? 'is-open' : 'is-closed');
  openNow.textContent = isOpen ? 'Siamo aperti adesso' : 'In questo momento siamo chiusi';

  /* ---------- Contatore "20+ anni" ---------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $$('[data-count-to]').forEach(el => {
    const target = +el.dataset.countTo;
    if (reduce) return;
    el.textContent = '0';
    const co = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      co.disconnect();
      const dur = 1100, t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    co.observe(el);
  });

  /* ---------- Varie ---------- */
  $('#year').textContent = new Date().getFullYear();

  const video = $('.hero__video');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();
})();
