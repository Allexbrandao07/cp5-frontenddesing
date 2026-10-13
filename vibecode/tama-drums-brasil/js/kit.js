/* TAMA Drums Brasil — bateria tocável da seção "Toque agora".
   1. Desenho do kit em SVG (visão do baterista)   2. Áudio com os samples de ../samples
   3. Toque por clique, toque na tela e teclado     4. Groove de demonstração */
(() => {
  'use strict';

  const kit = document.querySelector('.kit');
  if (!kit) return;

  /* ---------- 1. Desenho: peças soltas vistas de cima, na paleta do site ---------- */
  const PIECES = {
    crash: { nome: 'Crash', tecla: 'C', x: 210, y: 130, r: 110, tipo: 'cymbal' },
    ride: { nome: 'Ride', tecla: 'R', x: 810, y: 150, r: 125, tipo: 'cymbal' },
    hihat: { nome: 'Chimbal', tecla: 'H', x: 108, y: 340, r: 80, tipo: 'cymbal' },
    tom1: { nome: 'Tom 1', tecla: 'T', x: 400, y: 152, r: 70, tipo: 'drum' },
    tom2: { nome: 'Tom 2', tecla: 'Y', x: 580, y: 140, r: 80, tipo: 'drum' },
    kick: { nome: 'Bumbo', tecla: 'B', x: 500, y: 374, r: 135, tipo: 'kick' },
    snare: { nome: 'Caixa', tecla: 'S', x: 268, y: 408, r: 90, tipo: 'drum' },
    floor: { nome: 'Surdo', tecla: 'F', x: 754, y: 408, r: 105, tipo: 'drum' }
  };

  const piece = ([id, { nome, tecla, x, y, r, tipo }]) => {
    const ticks = n => [...Array(n)].map((_, i) => {
      const a = (i / n) * Math.PI * 2 + Math.PI / n, c = Math.cos(a), s = Math.sin(a);
      return `<line class="tick" x1="${(x + c * (r + 3)).toFixed(1)}" y1="${(y + s * (r + 3)).toFixed(1)}" x2="${(x + c * (r + 11)).toFixed(1)}" y2="${(y + s * (r + 11)).toFixed(1)}"/>`;
    }).join('');
    const rings = [0.86, 0.72, 0.58, 0.44, 0.3].map(k => `<circle class="groove" cx="${x}" cy="${y}" r="${(r * k).toFixed(1)}"/>`).join('');
    const body = {
      drum: `<circle class="hoop" cx="${x}" cy="${y}" r="${r + 7}"/>${ticks(r > 85 ? 10 : 8)}<circle class="face" cx="${x}" cy="${y}" r="${r}"/><circle class="groove" cx="${x}" cy="${y}" r="${r * 0.82}"/>`,
      /* Pele de resposta TAMA: duas listras verticais, emblema sobre elas e a logo ao lado */
      kick: `<circle class="hoop" cx="${x}" cy="${y}" r="${r + 7}"/>${ticks(10)}<circle class="face" cx="${x}" cy="${y}" r="${r}"/>
             <g clip-path="url(#k-kick)"><rect class="stripe" x="${x - 76}" y="${y - r}" width="9" height="${r * 2}"/><rect class="stripe" x="${x - 62}" y="${y - r}" width="3" height="${r * 2}"/></g>
             <polygon class="mark-bg" points="${x - 81},${y - 12} ${x - 43},${y - 12} ${x - 58},${y + 48} ${x - 96},${y + 48}"/>
             <image href="assets/images/tama-icon.png" x="${x - 96}" y="${y - 12}" width="53" height="60"/>
             <image href="assets/images/tama-logo-white.png" x="${x - 36}" y="${y - 62}" width="128" height="27.3"/>`,
      cymbal: `<circle class="face" cx="${x}" cy="${y}" r="${r}"/>${rings}<circle class="bell" cx="${x}" cy="${y}" r="${(r * 0.17).toFixed(1)}"/><circle class="dot" cx="${x}" cy="${y}" r="4"/>`
    }[tipo];
    const ly = tipo === 'cymbal' ? y + r * 0.5 : tipo === 'kick' ? y + 14 : y - 6;
    const lx = tipo === 'kick' ? x + 28 : x;
    return `<g class="piece is-${tipo}" data-pad="${id}" role="button" tabindex="0" aria-label="${nome} — tecla ${tecla}">
      ${body}
      <circle class="flash" cx="${x}" cy="${y}" r="${r}"/>
      <circle class="ripple" cx="${x}" cy="${y}" r="${r}"/>
      <text class="name" x="${lx}" y="${ly}">${nome}</text>
      <g class="kit__key" aria-hidden="true"><rect x="${lx - 13}" y="${ly + 9}" width="26" height="22" rx="5"/><text x="${lx}" y="${ly + 25}">${tecla}</text></g>
    </g>`;
  };

  kit.innerHTML = `
  <svg viewBox="0 0 1000 562" role="group" aria-label="Bateria virtual">
    <defs><clipPath id="k-kick"><circle cx="${PIECES.kick.x}" cy="${PIECES.kick.y}" r="${PIECES.kick.r - 1}"/></clipPath></defs>
    ${Object.entries(PIECES).map(piece).join('')}
  </svg>`;

  /* ---------- 2. Áudio ---------- */
  /* Ganho de cada peça depois de normalizar o pico do sample (os arquivos têm volumes bem diferentes) */
  const MIX = { kick: 1, snare: 0.9, hihat: 0.5, tom1: 0.85, tom2: 0.85, floor: 0.9, crash: 0.7, ride: 0.55 };
  const NAMES = Object.keys(MIX);
  /* Os arquivos ficam em vibecode/samples, ao lado da pasta do site, com os nomes originais */
  const DIR = '../samples/';
  const FILES = { kick: 'kick', snare: 'snare', hihat: 'hi hat', tom1: 'tom 1', tom2: 'tom 2', floor: 'floor tom', crash: 'crash', ride: 'ride' };
  const bank = {}; /* nome → { buf, start, gain } */
  let ctx, master, loading, lastHat, inView = false, timer = null, step = 0;

  const prepare = (name, buf) => {
    const chans = [...Array(buf.numberOfChannels)].map((_, i) => buf.getChannelData(i));
    let peak = 0, first = 0;
    for (const c of chans) for (let i = 0; i < c.length; i += 2) { const v = Math.abs(c[i]); if (v > peak) peak = v; }
    /* Pula o silêncio do começo do arquivo para a nota sair no instante do toque */
    const thr = peak * 0.02;
    scan: for (let i = 0; i < buf.length; i++) for (const c of chans) if (Math.abs(c[i]) > thr) { first = i; break scan; }
    bank[name] = { buf, start: Math.max(0, first / buf.sampleRate - 0.002), gain: MIX[name] / (peak || 1) };
  };

  const b64 = s => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };
  const script = src => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.append(s); });

  /* Carrega os .mp3 de ../samples. Ao abrir o site direto do disco (file://) o navegador
     bloqueia fetch, então cai para js/samples.js, que traz os mesmos arquivos embutidos. */
  const load = () => loading ||= (async () => {
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!OAC) return;
    const dec = new OAC(2, 1, 44100);
    const decode = ab => new Promise((ok, no) => dec.decodeAudioData(ab, ok, no));
    try {
      if (location.protocol === 'file:') throw 0;
      await Promise.all(NAMES.map(async n => prepare(n, await decode(await (await fetch(`${DIR}${encodeURIComponent(FILES[n])}.mp3`)).arrayBuffer()))));
    } catch {
      await script('js/samples.js');
      await Promise.all(NAMES.map(async n => prepare(n, await decode(b64(window.TAMA_SAMPLES[n])))));
    }
    kit.classList.add('is-loaded');
  })().catch(() => { loading = null; });

  const audio = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC({ latencyHint: 'interactive' });
      master = ctx.createDynamicsCompressor();
      master.threshold.value = -10; master.ratio.value = 4;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    load();
    return ctx;
  };

  const play = (name, vel = 1) => {
    const s = bank[name];
    if (!audio() || !s) return;
    const t = ctx.currentTime, src = ctx.createBufferSource(), g = ctx.createGain();
    src.buffer = s.buf;
    src.playbackRate.value = 1 + (Math.random() - 0.5) * 0.016; /* leve variação, como em toques reais */
    g.gain.value = s.gain * vel;
    src.connect(g).connect(master);
    src.start(t, s.start);
    if (name === 'hihat') { /* um novo toque abafa o anterior */
      if (lastHat) { lastHat.g.gain.setTargetAtTime(0, t, 0.015); lastHat.src.stop(t + 0.12); }
      lastHat = { src, g };
    }
  };

  /* ---------- 3. Toque ---------- */
  const flash = name => {
    const el = kit.querySelector(`[data-pad="${name}"]`);
    if (!el) return;
    el.classList.remove('is-hit'); el.getBoundingClientRect(); el.classList.add('is-hit');
  };
  const hit = (name, vel) => { play(name, vel); flash(name); };

  kit.addEventListener('pointerdown', e => {
    const el = e.target.closest('[data-pad]');
    if (el) { e.preventDefault(); hit(el.dataset.pad); }
  });
  kit.addEventListener('keydown', e => {
    const el = e.target.closest('[data-pad]');
    if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); hit(el.dataset.pad); }
  });

  const KEYS = { ' ': 'kick' };
  NAMES.forEach(n => { KEYS[PIECES[n].tecla.toLowerCase()] = n; });
  addEventListener('keydown', e => {
    if (!inView || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest('input, textarea, select, [data-pad], a, button')) return;
    const name = KEYS[e.key.toLowerCase()];
    if (name) { e.preventDefault(); hit(name); }
  });

  /* Baixa os samples um pouco antes de a seção aparecer */
  new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: '800px' }).observe(kit);
  new IntersectionObserver(es => { inView = es[0].isIntersecting; if (!inView) stop(); }, { threshold: 0.25 }).observe(kit);

  /* ---------- 4. Groove de demonstração: 2 compassos em semicolcheias ---------- */
  const G = {
    hihat: 'x.x.x.x.x.x.x.x.x.x.x.x.x.......',
    kick:  'x.....x.x.......x.....x.x.x.....',
    snare: '....x.......x.......x.......x...',
    tom1:  '..........................x.....',
    tom2:  '...........................x....',
    floor: '..............................xx',
    crash: 'x...............................'
  };
  const btn = document.querySelector('[data-groove]');
  const label = t => { btn.querySelector('span').textContent = t; };
  function stop() {
    clearInterval(timer); timer = null;
    if (btn) { btn.setAttribute('aria-pressed', 'false'); label('Ouvir um groove'); }
  }
  btn?.addEventListener('click', async () => {
    if (timer) return stop();
    if (!audio()) return;
    label('Carregando…');
    await load();
    step = 0;
    btn.setAttribute('aria-pressed', 'true'); label('Parar');
    timer = setInterval(() => {
      const i = step++ % 32;
      for (const k in G) if (G[k][i] === 'x') hit(k, k === 'hihat' ? (i % 4 ? 0.6 : 0.9) : 1);
    }, 60000 / 96 / 4);
  });
})();
