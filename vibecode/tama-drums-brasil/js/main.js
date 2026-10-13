/* TAMA Drums Brasil — interações e animações em JS puro (sem bibliotecas).
   Índice: 1. utilitários · 2. cabeçalho/rodapé · 3. cortina e transições · 4. texto dividido
           5. revelação ao rolar · 6. motor de scroll · 7. cursor e hover · 8. home
           9. drum pad · 10. produtos · 11. artistas · 12. história · 13. suporte */
(() => {
  'use strict';

  /* ---------- 1. Utilitários ---------- */
  const { IMG, CATEGORIAS, TOTAL_PRODUTOS, LINHAS, ARTISTAS } = window.TAMA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const brl = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);
  const pad2 = n => String(n).padStart(2, '0');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const page = location.pathname.split('/').pop() || 'index.html';
  const ARROW = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- 2. Cabeçalho e rodapé ---------- */
  const LINKS = [['index.html', 'Início'], ['produtos.html', 'Produtos'], ['artistas.html', 'Artistas'], ['historia.html', 'História'], ['suporte.html', 'Suporte']];
  const cur = h => (h === page ? ' aria-current="page"' : '');

  $('#hdr').outerHTML = `
  <div class="progress" aria-hidden="true"></div>
  <div class="rail" aria-hidden="true"><i></i><span class="mark-box"><i class="mark"></i></span></div>
  <header class="hdr">
    <a class="hdr__logo" href="index.html" aria-label="TAMA Drums Brasil — página inicial">
      <img src="${IMG}tama-logo-white.png" alt="TAMA" width="900" height="192"><span>Brasil</span>
    </a>
    <nav class="hdr__nav" aria-label="Principal">
      ${LINKS.map(([h, t]) => `<a href="${h}" data-t="${t}"${cur(h)}><span>${t}</span></a>`).join('')}
    </nav>
    <a class="btn btn--sm hdr__cta" href="suporte.html#contato"><span>Fale conosco</span>${ARROW}</a>
    <button class="hdr__burger" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu"><i></i><i></i></button>
  </header>
  <div class="menu" id="menu" inert>
    <nav aria-label="Menu móvel">
      ${LINKS.map(([h, t], i) => `<a href="${h}" style="--i:${i}"${cur(h)}><small>${pad2(i + 1)}</small>${t}</a>`).join('')}
    </nav>
    <p class="menu__foot">タマ · O nome mais forte da bateria</p>
  </div>`;

  $('#ftr').outerHTML = `
  <footer class="ftr">
    <div class="wrap ftr__top">
      <div class="ftr__brand">
        <p class="eyebrow">Desde 1974</p>
        <p class="ftr__claim">O nome mais forte<br>da bateria.</p>
      </div>
      <nav aria-label="Rodapé"><h2>Navegar</h2>${LINKS.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
      <nav aria-label="Linhas"><h2>Linhas</h2>${CATEGORIAS.slice(0, 5).map(([k, t]) => `<a href="produtos.html?cat=${k}#catalogo">${t}</a>`).join('')}</nav>
      <div><h2>Oficial</h2>
        <a href="https://www.tama.com" target="_blank" rel="noopener">tama.com ↗</a>
        <a href="https://www.musical-express.com.br/marca/tama/" target="_blank" rel="noopener">Tama Brasil ↗</a>
      </div>
    </div>
    <div class="ftr__mark" aria-hidden="true"><img src="${IMG}tama-logo-white.png" alt="" loading="lazy"></div>
    <div class="wrap ftr__bottom">
      <p>Protótipo acadêmico não oficial. TAMA® é marca registrada da Hoshino Gakki Co., Ltd. Preços e contatos são ilustrativos.</p>
      <p>Fotos de ambiente: Unsplash.</p>
      <a href="#top" class="ftr__up">Voltar ao topo ↑</a>
    </div>
  </footer>`;

  const hdr = $('.hdr'), burger = $('.hdr__burger'), menu = $('#menu');
  const setMenu = open => {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.inert = !open;
  };
  burger.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));

  /* ---------- 3. Cortina: pré-carregamento e transição entre páginas ---------- */
  const curtain = document.createElement('div');
  curtain.className = 'curtain';
  curtain.setAttribute('aria-hidden', 'true');
  curtain.innerHTML = `<div class="curtain__in"><i class="mark"></i><img src="${IMG}tama-logo-white.png" alt=""><div class="curtain__meter"><i></i></div><b>000</b></div>`;
  document.body.append(curtain);

  const ready = () => {
    root.classList.add('is-ready');
    curtain.classList.add('is-out');
    startReveals();
  };

  const firstVisit = (() => { try { return !sessionStorage.getItem('tama-seen'); } catch { return false; } })();
  if (reduce) {
    ready();
  } else if (firstVisit) {
    /* Contador 000 → 100 na primeira visita da sessão */
    try { sessionStorage.setItem('tama-seen', '1'); } catch { /* armazenamento indisponível */ }
    curtain.classList.add('is-loading');
    const num = $('b', curtain), bar = $('.curtain__meter i', curtain), t0 = performance.now(), dur = 1500;
    const tick = now => {
      const t = clamp((now - t0) / dur), e = 1 - Math.pow(1 - t, 3);
      num.textContent = String(Math.round(e * 100)).padStart(3, '0');
      bar.style.transform = `scaleX(${e})`;
      t < 1 ? requestAnimationFrame(tick) : setTimeout(ready, 180);
    };
    requestAnimationFrame(tick);
  } else {
    requestAnimationFrame(() => requestAnimationFrame(ready));
  }

  /* Sai da página com a cortina fechando */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) { setMenu(false); return; } /* âncora na mesma página */
    e.preventDefault();
    setMenu(false);
    curtain.classList.remove('is-out', 'is-loading');
    curtain.classList.add('is-in');
    setTimeout(() => { location.href = a.href; }, 620);
  });
  addEventListener('pageshow', e => { if (e.persisted) { curtain.classList.remove('is-in'); curtain.classList.add('is-out'); } });

  /* ---------- 4. Texto dividido em palavras/letras ---------- */
  const split = (el, mode) => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(ch => {
        if (ch.nodeType === 1) return ch.tagName === 'BR' ? null : walk(ch);
        if (ch.nodeType !== 3) return;
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(tok => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) return frag.append(' ');
          const w = document.createElement('span');
          w.className = 'w';
          if (mode === 'chars') {
            [...tok].forEach(c => { const s = document.createElement('span'); s.className = 'wi'; s.style.setProperty('--i', i++); s.textContent = c; w.append(s); });
          } else {
            const s = document.createElement('span'); s.className = 'wi'; s.style.setProperty('--i', i++); s.textContent = tok; w.append(s);
          }
          frag.append(w);
        });
        ch.replaceWith(frag);
      });
    };
    if (mode === 'chars') el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    el.style.setProperty('--n', i);
  };
  const splitAll = (scope = document) => {
    $$('[data-split]:not(.is-split)', scope).forEach(el => { split(el, el.dataset.split); el.classList.add('is-split'); });
    $$('[data-scrub]:not(.is-split)', scope).forEach(el => { split(el, 'words'); el.classList.add('is-split'); });
    $$('[data-stagger]', scope).forEach(g => [...g.children].forEach((c, i) => {
      if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', g.dataset.stagger || 'up');
      c.style.setProperty('--i', i);
    }));
  };

  /* ---------- 5. Revelação ao entrar na tela ---------- */
  const show = el => { el.classList.add('is-in'); if (el.matches('[data-count]')) countUp(el); };
  const revealIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    show(e.target);
    revealIO.unobserve(e.target);
  }), { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  let revealsOn = false;
  const observe = (scope = document) => {
    splitAll(scope);
    if (!revealsOn) return;
    $$('[data-reveal]:not(.is-in), [data-split]:not(.is-in), [data-count]:not(.is-in)', scope).forEach(el => {
      /* O que já está na primeira dobra entra direto (a margem do observer ignoraria o rodapé do hero) */
      const r = el.getBoundingClientRect();
      r.top < innerHeight && r.bottom > 0 ? show(el) : revealIO.observe(el);
    });
  };
  function startReveals() { revealsOn = true; observe(); }

  function countUp(el) {
    const to = +el.dataset.count, dur = 1600, t0 = performance.now();
    if (reduce) { el.textContent = to; return; }
    const tick = now => {
      const t = clamp((now - t0) / dur);
      el.textContent = Math.round((1 - Math.pow(1 - t, 4)) * to);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- 6. Motor de scroll: --p (progresso), parallax, velocidade ---------- */
  /* Cada [data-progress] recebe a variável CSS --p (0 → 1); o CSS decide o que fazer com ela.
     Modos: view  = atravessando a tela          exit    = saindo pelo topo (hero)
            pin   = dentro de um bloco fixado    enter   = entrando até o meio da tela
            through = topo do bloco até o fim, medido no meio da tela (linha do tempo) */
  let progEls = [], parEls = [], vh = innerHeight, lastY = scrollY, vel = 0, dirDown = false;
  const bar = $('.progress');

  const collect = () => {
    progEls = $$('[data-progress]');
    parEls = $$('[data-parallax]').map(el => ({ el, box: el.parentElement, k: +el.dataset.parallax || 0.15, cur: null }));
    $$('.hscroll').forEach(h => {
      const track = $('.hscroll__track', h);
      h.style.setProperty('--travel', Math.max(0, track.scrollWidth - h.clientWidth) + 'px');
    });
  };

  const progressOf = (r, mode) => {
    switch (mode) {
      case 'exit': return clamp(-r.top / r.height);
      case 'pin': return clamp(-r.top / Math.max(1, r.height - vh));
      case 'enter': return clamp((vh * 0.92 - r.top) / (vh * 0.62));
      case 'through': return clamp((vh * 0.55 - r.top) / r.height);
      default: return clamp((vh - r.top) / (vh + r.height));
    }
  };

  const frame = () => {
    const y = scrollY, dy = y - lastY;
    vel = lerp(vel, dy, 0.12);
    if (Math.abs(dy) > 2) dirDown = dy > 0;
    lastY = y;

    const max = root.scrollHeight - vh;
    const sp = max > 0 ? y / max : 0;
    bar.style.transform = `scaleX(${sp})`;
    root.style.setProperty('--sp', sp.toFixed(4));
    root.style.setProperty('--v', clamp(vel, -40, 40).toFixed(2));
    hdr.classList.toggle('is-scrolled', y > 40);
    hdr.classList.toggle('is-hidden', y > vh * 0.6 && dirDown && !root.classList.contains('menu-open'));

    for (const el of progEls) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh * 0.3 || r.top > vh * 1.3) continue;
      el.style.setProperty('--p', progressOf(r, el.dataset.progress).toFixed(4));
    }
    for (const it of parEls) {
      const r = it.box.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const target = (r.top + r.height / 2 - vh / 2) * -it.k;
      it.cur = it.cur === null ? target : lerp(it.cur, target, 0.14);
      it.el.style.transform = `translate3d(0,${it.cur.toFixed(2)}px,0)`;
    }
    requestAnimationFrame(frame);
  };

  /* ---------- 7. Cursor, botões magnéticos e tilt ---------- */
  const initPointer = () => {
    if (!fine || reduce) return;
    const dot = document.createElement('div');
    dot.className = 'cursor';
    dot.setAttribute('aria-hidden', 'true');
    dot.innerHTML = '<span></span>';
    document.body.append(dot);
    const label = $('span', dot);
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.classList.add('is-on'); }, { passive: true });
    document.addEventListener('mouseleave', () => dot.classList.remove('is-on'));
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor]'), l = e.target.closest('a, button, summary, input, select, textarea, label');
      label.textContent = t ? t.dataset.cursor : '';
      dot.classList.toggle('is-label', !!t);
      dot.classList.toggle('is-link', !t && !!l);
    });
    const loop = () => {
      cx = lerp(cx, mx, 0.2); cy = lerp(cy, my, 0.2);
      dot.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
      requestAnimationFrame(loop);
    };
    loop();

    /* Magnético */
    document.addEventListener('mousemove', e => {
      const b = e.target.closest('.btn, .hdr__burger');
      $$('.is-mag').forEach(x => { if (x !== b) { x.style.translate = ''; x.classList.remove('is-mag'); } });
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.classList.add('is-mag');
      b.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 14}px ${((e.clientY - r.top) / r.height - 0.5) * 10}px`;
    }, { passive: true });

    /* Tilt 3D nos cartões */
    document.addEventListener('mousemove', e => {
      const c = e.target.closest('[data-tilt]');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--rx', (((e.clientY - r.top) / r.height - 0.5) * -7).toFixed(2) + 'deg');
      c.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 9).toFixed(2) + 'deg');
      c.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      c.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }, { passive: true });
    document.addEventListener('mouseout', e => {
      const c = e.target.closest('[data-tilt]');
      if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); }
    });
  };

  /* ---------- 8. Home ---------- */
  const initHome = () => {
    /* Hero: o kit acompanha o mouse */
    const hero = $('.hero');
    if (hero && fine && !reduce) {
      hero.addEventListener('mousemove', e => {
        hero.style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(3));
        hero.style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(3));
      }, { passive: true });
    }

    /* Rolagem horizontal das linhas */
    const track = $('.hscroll__track');
    if (track) {
      track.insertAdjacentHTML('beforeend', LINHAS.map((l, i) => `
        <article class="panel" style="--i:${i}">
          <a class="panel__media" href="${l.link}" data-cursor="Ver linha" aria-label="Ver ${esc(l.cat)}">
            <img src="${IMG}${l.img}" alt="" loading="lazy" style="object-position:${l.pos}">
          </a>
          <div class="panel__body">
            <span class="panel__num">${pad2(i + 1)}<i>/${pad2(LINHAS.length)}</i></span>
            <p class="eyebrow">${esc(l.tag)}</p>
            <h3>${esc(l.nome)}</h3>
            <p>${esc(l.txt)}</p>
            <a class="link" href="${l.link}">Ver ${esc(l.cat.toLowerCase())} ${ARROW}</a>
          </div>
        </article>`).join('') + `
        <article class="panel panel--end">
          <p class="eyebrow">Catálogo completo</p>
          <h3>${TOTAL_PRODUTOS} produtos.<br>Um som.</h3>
          <a class="btn" href="produtos.html"><span>Ver todos</span>${ARROW}</a>
        </article>`);
    }

    /* Lista de artistas com foto que segue o cursor */
    const list = $('.roster');
    if (list) {
      list.innerHTML = ARTISTAS.map((a, i) => `
        <a class="roster__row" href="artistas.html?q=${encodeURIComponent(a.n)}#todos" data-i="${i}" data-reveal style="--i:${i}">
          <span class="roster__n">${pad2(i + 1)}</span>
          <span class="roster__name">${esc(a.n)}</span>
          <span class="roster__band">${esc(a.banda)}</span>
          <span class="roster__c">${esc(a.pais)}</span>
          <img class="roster__thumb" src="${IMG}${a.img}" alt="" loading="lazy" style="object-position:${a.pos}">
        </a>`).join('');
      /* Palco fixo ao lado da lista: o retrato troca com um corte de baixo para cima */
      const stage = $('.roster-stage');
      if (stage) {
        stage.innerHTML = ARTISTAS.map(a => `<img src="${IMG}${a.img}" alt="" loading="lazy" style="object-position:${a.pos}">`).join('') +
          '<div class="roster-stage__cap"><b></b><span></span></div><i class="mark"></i>';
        const imgs = $$('img', stage), rows = $$('.roster__row', list), num = $('b', stage), cap = $('span', stage);
        let cur = -1;
        const show = i => {
          if (i === cur) return;
          imgs.forEach((im, k) => { im.className = k === i ? 'is-on' : k === cur ? 'is-prev' : ''; });
          rows.forEach((r, k) => r.classList.toggle('is-active', k === i));
          num.textContent = pad2(i + 1);
          cap.textContent = `${ARTISTAS[i].pais} · ${ARTISTAS[i].banda}`;
          cur = i;
        };
        rows.forEach((r, i) => { r.addEventListener('mouseenter', () => show(i)); r.addEventListener('focus', () => show(i)); });
        show(0);
      }
    }
  };

  /* ---------- 9. Drum pad: ver js/kit.js ---------- */

  /* ---------- 10. Produtos ---------- */
  /* Catálogo oficial (js/products-data.js): categoria, linha, busca e carregamento por partes */
  const initCatalog = () => {
    const grid = $('#p-grid'), ALL = window.TAMA_PRODUCTS;
    if (!grid || !ALL) return;
    const chips = $('#p-chips'), sel = $('#p-linha'), q = $('#p-q'), total = $('#p-total'), empty = $('#p-vazio'), more = $('#p-mais');
    const STEP = 40, LABEL = Object.fromEntries(CATEGORIAS);
    const norm = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const data = ALL.map(p => ({ id: p[0], nome: p[1], cat: p[2], linha: p[3], url: 'https://www.tama.com/asia/products/' + p[4], busca: norm(`${p[1]} ${p[3]} ${LABEL[p[2]]}`) }));
    const count = {};
    data.forEach(p => { count[p.cat] = (count[p.cat] || 0) + 1; });

    const params = new URLSearchParams(location.search);
    let cat = count[params.get('cat')] ? params.get('cat') : '', linha = params.get('linha') || '', list = [], shown = 0;
    q.value = params.get('q') || '';

    const drawFilters = () => {
      chips.innerHTML = `<button class="chip" type="button" data-cat="" aria-pressed="${cat === ''}">Todos<sup>${data.length}</sup></button>` +
        CATEGORIAS.map(([k, t]) => `<button class="chip" type="button" data-cat="${k}" aria-pressed="${cat === k}">${t}<sup>${pad2(count[k] || 0)}</sup></button>`).join('');
      /* As linhas disponíveis dependem da categoria escolhida */
      const n = {};
      data.forEach(p => { if ((!cat || p.cat === cat) && p.linha) n[p.linha] = (n[p.linha] || 0) + 1; });
      const linhas = Object.keys(n).sort((a, b) => a.localeCompare(b, 'pt-BR'));
      if (!n[linha]) linha = '';
      sel.innerHTML = '<option value="">Todas as linhas</option>' + linhas.map(l => `<option value="${esc(l)}"${l === linha ? ' selected' : ''}>${esc(l)} (${n[l]})</option>`).join('');
    };

    const card = (p, i) => `
      <a class="acard acard--prod" href="${p.url}" target="_blank" rel="noopener" style="--i:${i % STEP}" data-cursor="Ver">
        <span class="acard__media"><img src="assets/products/${p.id}.webp" alt="${esc(p.nome)}" loading="lazy"></span>
        <span class="acard__body">
          <span class="acard__pais">${esc(LABEL[p.cat])}${p.linha ? ' · ' + esc(p.linha) : ''}</span>
          <strong>${esc(p.nome)}</strong>
        </span>
      </a>`;

    const add = () => {
      grid.insertAdjacentHTML('beforeend', list.slice(shown, shown + STEP).map(card).join(''));
      shown = Math.min(shown + STEP, list.length);
      more.hidden = shown >= list.length;
      total.textContent = `${shown} de ${list.length} ${list.length === 1 ? 'produto' : 'produtos'}`;
    };
    const draw = () => {
      const t = norm(q.value.trim());
      list = data.filter(p => (!cat || p.cat === cat) && (!linha || p.linha === linha) && p.busca.includes(t));
      grid.innerHTML = ''; shown = 0;
      empty.hidden = list.length > 0;
      add();
    };
    const sync = () => {
      const u = new URLSearchParams();
      if (cat) u.set('cat', cat);
      if (linha) u.set('linha', linha);
      history.replaceState(null, '', [...u].length ? `?${u}#catalogo` : location.pathname);
      drawFilters(); draw();
    };

    chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { cat = b.dataset.cat; linha = ''; sync(); } });
    sel.addEventListener('change', () => { linha = sel.value; sync(); });
    q.addEventListener('input', draw);
    more.addEventListener('click', add);
    drawFilters(); draw();
  };

  /* ---------- 11. Artistas ---------- */
  /* Lista completa de artistas (js/artists-data.js): filtro por país, busca e carregamento por partes */
  const initAllArtists = () => {
    const grid = $('#a-grid'), ALL = window.TAMA_ARTISTS;
    if (!grid || !ALL) return;
    const chips = $('#a-chips'), sel = $('#a-pais'), q = $('#a-q'), total = $('#a-total'), empty = $('#a-vazio'), more = $('#a-mais');
    const STEP = 40;
    const norm = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    let names;
    try { names = new Intl.DisplayNames(['pt-BR'], { type: 'region' }); } catch { names = null; }
    const pais = cc => { try { return (names && names.of(cc)) || cc; } catch { return cc; } };

    const count = {};
    ALL.forEach(a => { count[a[2]] = (count[a[2]] || 0) + 1; });
    const codes = Object.keys(count).sort((a, b) => pais(a).localeCompare(pais(b), 'pt-BR'));
    /* Brasil primeiro, depois ordem alfabética */
    const data = ALL.map(a => ({ id: a[0], nome: a[1], cc: a[2], bandas: a[3], busca: norm(a[1] + ' ' + a[3]) }))
      .sort((a, b) => (b.cc === 'BR') - (a.cc === 'BR') || a.nome.localeCompare(b.nome, 'pt-BR'));

    const params = new URLSearchParams(location.search);
    const fromUrl = (params.get('pais') || '').toUpperCase();
    q.value = params.get('q') || '';
    let cc = count[fromUrl] ? fromUrl : '', list = [], shown = 0;

    const TOP = ['BR', ...codes.filter(c => c !== 'BR').sort((a, b) => count[b] - count[a]).slice(0, 5)];
    const flag = c => `<img class="flag" src="assets/flags/${c.toLowerCase()}.png" alt="" width="21" height="14" loading="lazy">`;
    const drawFilters = () => {
      chips.innerHTML = `<button class="chip" type="button" data-cc="" aria-pressed="${cc === ''}">Todos<sup>${ALL.length}</sup></button>` +
        TOP.map(c => `<button class="chip" type="button" data-cc="${c}" aria-pressed="${cc === c}">${flag(c)}${esc(pais(c))}<sup>${pad2(count[c])}</sup></button>`).join('');
      sel.innerHTML = '<option value="">Todos os países</option>' + codes.map(c => `<option value="${c}"${c === cc ? ' selected' : ''}>${esc(pais(c))} (${count[c]})</option>`).join('');
    };

    const card = (a, i) => `
      <a class="acard" href="https://www.tama.com/asia/artists/detail/${a.id}.html" target="_blank" rel="noopener" style="--i:${i % STEP}" data-cursor="Perfil">
        <span class="acard__media"><img src="assets/artists/${a.id}.webp" alt="${esc(a.nome)}" loading="lazy" width="340" height="340"></span>
        <span class="acard__body">
          <span class="acard__pais">${flag(a.cc)}${esc(pais(a.cc))}</span>
          <strong>${esc(a.nome)}</strong>
          ${a.bandas ? `<small>${esc(a.bandas)}</small>` : ''}
        </span>
      </a>`;

    const add = () => {
      grid.insertAdjacentHTML('beforeend', list.slice(shown, shown + STEP).map(card).join(''));
      shown = Math.min(shown + STEP, list.length);
      more.hidden = shown >= list.length;
      total.textContent = `${shown} de ${list.length} ${list.length === 1 ? 'artista' : 'artistas'}`;
    };
    const draw = () => {
      const t = norm(q.value.trim());
      list = data.filter(a => (!cc || a.cc === cc) && a.busca.includes(t));
      grid.innerHTML = ''; shown = 0;
      empty.hidden = list.length > 0;
      add();
    };
    const setCc = v => {
      cc = v;
      history.replaceState(null, '', v ? `?pais=${v}#todos` : location.pathname + location.hash);
      drawFilters(); draw();
    };

    chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) setCc(b.dataset.cc); });
    sel.addEventListener('change', () => setCc(sel.value));
    q.addEventListener('input', draw);
    more.addEventListener('click', add);
    drawFilters(); draw();
  };

  /* ---------- 12. História: ano fixo que muda conforme a rolagem ---------- */
  const initHistory = () => {
    const year = $('.tl__year b');
    const items = $$('.tl__item');
    if (!year || !items.length) return;
    const set = el => {
      if (year.textContent === el.dataset.year) return;
      year.classList.remove('is-swap'); void year.offsetWidth;
      year.textContent = el.dataset.year;
      year.classList.add('is-swap');
      items.forEach(i => i.classList.toggle('is-active', i === el));
    };
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && set(e.target)), { rootMargin: '-45% 0px -45% 0px' });
    items.forEach(i => io.observe(i));
    items[0].classList.add('is-active');
  };

  /* ---------- 13. Suporte: FAQ e formulário simulado ---------- */
  const initSupport = () => {
    $$('.faq__q').forEach(b => b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      $$('.faq__q').forEach(x => x.setAttribute('aria-expanded', 'false'));
      b.setAttribute('aria-expanded', String(!open));
    }));

    const form = $('#form-contato');
    if (!form) return;
    const ok = $('#form-ok');
    form.addEventListener('submit', e => {
      e.preventDefault();
      let first = null;
      $$('[required]', form).forEach(f => {
        const bad = !f.checkValidity();
        f.closest('.field').classList.toggle('is-bad', bad);
        f.setAttribute('aria-invalid', bad);
        if (bad && !first) first = f;
      });
      if (first) return first.focus();
      form.hidden = true; ok.hidden = false; ok.focus();
    });
    form.addEventListener('input', e => {
      const f = e.target.closest('[required]');
      if (f && f.checkValidity()) { f.closest('.field').classList.remove('is-bad'); f.removeAttribute('aria-invalid'); }
    });
    $('#form-novo')?.addEventListener('click', () => { form.reset(); form.hidden = false; ok.hidden = true; });
  };

  /* ---------- Inicialização ---------- */
  initHome(); initCatalog(); initAllArtists(); initHistory(); initSupport(); initPointer();
  observe();
  collect();
  addEventListener('resize', () => { vh = innerHeight; collect(); });
  addEventListener('load', collect);
  if (reduce) {
    bar.hidden = true;
    addEventListener('scroll', () => hdr.classList.toggle('is-scrolled', scrollY > 40), { passive: true });
  } else {
    requestAnimationFrame(frame);
  }
})();
