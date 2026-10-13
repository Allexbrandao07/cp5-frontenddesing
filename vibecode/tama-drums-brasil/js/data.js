/* TAMA Drums Brasil — dados editáveis do site (protótipo não oficial).
   Todos os preços são ILUSTRATIVOS. Itens com `ilustr: true` usam foto de banco de imagens,
   não a foto real do produto. */
(() => {
  'use strict';

  const IMG = 'assets/images/';

  const CATEGORIAS = ['Baterias', 'Caixas', 'Pedais', 'Ferragens', 'Baquetas'];

  /* Linhas em destaque na rolagem horizontal da home */
  const LINHAS = [
    { nome: 'Starclassic', cat: 'Baterias', img: 'product-hero-01.jpg', pos: '50% 30%',
      tag: 'Baterias profissionais',
      txt: 'A linha que leva o som TAMA aos maiores palcos do mundo: cascos finos, ferragens fundidas e acabamentos que parecem joia.' },
    { nome: 'S.L.P.', cat: 'Caixas', img: 'product-editorial-02.png', pos: '30% 50%',
      tag: 'Sound Lab Project',
      txt: 'Cada caixa S.L.P. nasce de uma combinação estudada de casco, aro e esteira para entregar um timbre específico, sem ajustes.' },
    { nome: 'Iron Cobra', cat: 'Pedais', img: 'product-pedais-03.jpg', pos: '60% 40%',
      tag: 'Pedais de bumbo',
      txt: 'Potência, velocidade e durabilidade. Há três décadas, o pedal que virou referência para quem toca pesado.' },
    { nome: 'Roadpro', cat: 'Ferragens', img: 'hardware-cymbals.jpg', pos: '50% 50%',
      tag: 'Ferragens de estrada',
      txt: 'Estantes de parede dupla e ajustes sem degrau, pensadas para aguentar turnê atrás de turnê.' },
    { nome: 'Traditional', cat: 'Baquetas', img: 'product-baquetas-04.png', pos: '50% 50%',
      tag: 'Baquetas japonesas',
      txt: 'Carvalho japonês selecionado, peso e afinação pareados. O contato mais direto entre você e o instrumento.' }
  ];

  const p = (id, cat, nome, linha, img, preco, desc, specs, extra = {}) =>
    ({ id, cat, nome, linha, img, preco, desc, specs, ...extra });

  const PRODUTOS = [
    /* Baterias */
    p('star-walnut', 'Baterias', 'STAR Walnut', 'STAR', 'stage-spot.jpg', 46900,
      'O topo da TAMA. Cascos de nogueira com aros de reforço e sistema de suspensão exclusivo, feitos à mão no Japão.',
      [['Casco', 'Nogueira'], ['Origem', 'Japão'], ['Nível', 'Flagship']], { ilustr: true, pos: '50% 78%', novo: true }),
    p('starclassic-maple', 'Baterias', 'Starclassic Maple', 'Starclassic', 'product-hero-01.jpg', 28900,
      'O clássico de estúdio e palco: maple com aros fundidos e ataque definido, aqui em acabamento preto fosco.',
      [['Casco', 'Maple'], ['Aros', 'Die-cast'], ['Nível', 'Profissional']], { pos: '50% 28%' }),
    p('starclassic-wb', 'Baterias', 'Starclassic Walnut/Birch', 'Starclassic', 'product-hero-01.jpg', 18900,
      'Bétula por fora, nogueira por dentro. Projeção e grave encorpado em uma bateria pronta para gravar.',
      [['Casco', 'Nogueira + bétula'], ['Nível', 'Profissional']], { pos: '80% 22%' }),
    p('superstar-classic', 'Baterias', 'Superstar Classic', 'Superstar', 'hardware-snare.jpg', 9900,
      'Cascos 100% maple a um preço de entrada no mundo profissional. Leve, quente e versátil.',
      [['Casco', 'Maple'], ['Nível', 'Intermediário']], { ilustr: true, pos: '60% 60%' }),
    p('imperialstar', 'Baterias', 'Imperialstar 5 peças', 'Imperialstar', 'play-cymbal.jpg', 7490,
      'Kit completo com ferragens e pratos para começar tocando de verdade. Cascos de choupo com bordas de precisão.',
      [['Casco', 'Choupo'], ['Configuração', '5 peças + ferragens'], ['Nível', 'Iniciante']], { ilustr: true, pos: '20% 40%' }),

    /* Caixas */
    p('slp-bbs', 'Caixas', 'S.L.P. Big Black Steel 14×8', 'S.L.P.', 'product-editorial-02.png', 3890,
      'Aço preto niquelado e oito polegadas de profundidade: grave gordo, estalo seco e volume de sobra.',
      [['Casco', 'Aço'], ['Medida', '14" × 8"'], ['Timbre', 'Gordo e potente']], { pos: '18% 50%' }),
    p('slp-black-brass', 'Caixas', 'S.L.P. Black Brass 14×6,5', 'S.L.P.', 'product-editorial-02.png', 4290,
      'Latão com acabamento black nickel. Calor de latão, sensibilidade nas notas fantasma e rimshot que corta a mix.',
      [['Casco', 'Latão'], ['Medida', '14" × 6,5"'], ['Timbre', 'Quente e aberto']], { pos: '62% 45%' }),
    p('slp-dry-alu', 'Caixas', 'S.L.P. Classic Dry Aluminum 14×5,5', 'S.L.P.', 'product-editorial-02.png', 3190,
      'Alumínio sem costura para um som seco, focado e rápido. A caixa curinga para qualquer estilo.',
      [['Casco', 'Alumínio'], ['Medida', '14" × 5,5"'], ['Timbre', 'Seco e focado']], { pos: '96% 40%' }),
    p('an1465', 'Caixas', 'Anika Nilles Signature 14×6,5', 'Signature', 'artist-anika-nilles.jpeg', 4690,
      'Modelo signature de Anika Nilles: casco de alumínio sem costura de 1,2 mm e esteira Starclassic Hi-Carbon de 20 fios.',
      [['Casco', 'Alumínio 1,2 mm'], ['Medida', '14" × 6,5"'], ['Artista', 'Anika Nilles']], { pos: '25% 80%', novo: true }),
    p('sc145', 'Caixas', 'Stewart Copeland Signature 14×5', 'Signature', 'product-editorial-02.png', 3990,
      'A caixa de latão de 1,5 mm inspirada na que Stewart Copeland usou nos discos do The Police. Estalo inconfundível.',
      [['Casco', 'Latão 1,5 mm'], ['Medida', '14" × 5"'], ['Artista', 'Stewart Copeland']], { pos: '78% 42%' }),
    p('clay-bubinga', 'Caixas', 'S.L.P. Mod Bubinga 12×7 — Clay Aeschliman', 'S.L.P. Artist', 'artist-clay-aeschliman.jpeg', 3490,
      'Colaboração com Clay Aeschliman (Polyphia): bubinga em 12×7 para um som curto, grave e moderno.',
      [['Casco', 'Bubinga'], ['Medida', '12" × 7"'], ['Artista', 'Clay Aeschliman']], { pos: '40% 60%' }),

    /* Pedais */
    p('ic900-twin', 'Pedais', 'Iron Cobra 900 Power Glide — duplo', 'Iron Cobra', 'product-pedais-03.jpg', 5290,
      'O pedal duplo de referência. Came Power Glide para golpe progressivo, mola Cobra Coil e estojo rígido.',
      [['Tração', 'Corrente dupla'], ['Came', 'Power Glide'], ['Inclui', 'Estojo rígido']], { pos: '55% 35%' }),
    p('ic900-single', 'Pedais', 'Iron Cobra 900 Power Glide — simples', 'Iron Cobra', 'product-pedais-03.jpg', 2690,
      'Toda a engenharia do Iron Cobra 900 em versão simples: resposta sólida e ajustes para qualquer pé.',
      [['Tração', 'Corrente dupla'], ['Came', 'Power Glide'], ['Inclui', 'Estojo rígido']], { pos: '40% 45%' }),
    p('ic600', 'Pedais', 'Iron Cobra 600 Duo Glide', 'Iron Cobra', 'product-pedais-03.jpg', 1790,
      'Came reversível: escolha entre o toque Power Glide ou Rolling Glide no mesmo pedal.',
      [['Tração', 'Corrente dupla'], ['Came', 'Duo Glide reversível']], { pos: '78% 30%' }),
    p('ic200', 'Pedais', 'Iron Cobra 200', 'Iron Cobra', 'product-pedais-03.jpg', 1190,
      'O DNA Iron Cobra em um pedal leve, rápido e acessível. Compatível com Cobra Coil.',
      [['Tração', 'Corrente simples'], ['Came', 'Power Glide']], { pos: '96% 30%' }),
    p('speed-cobra', 'Pedais', 'Speed Cobra 910', 'Speed Cobra', 'product-pedais-03.jpg', 2990,
      'Sapata longa e came Recessed Setting para quem busca velocidade extrema com menos esforço.',
      [['Sapata', 'Longboard'], ['Tração', 'Corrente dupla'], ['Foco', 'Velocidade']], { pos: '22% 72%' }),
    p('dyna-sync', 'Pedais', 'Dyna-Sync', 'Dyna-Sync', 'product-pedais-03.jpg', 4490,
      'Tração direta com sistema Dynamic Synchronization: a precisão do direct drive com sensação natural.',
      [['Tração', 'Direct drive'], ['Foco', 'Precisão']], { pos: '15% 95%' }),

    /* Ferragens */
    p('roadpro-boom', 'Ferragens', 'Estante de prato Roadpro Boom', 'Roadpro', 'hardware-cymbals.jpg', 890,
      'Tubos de parede dupla, inclinador Quick-Set sem degrau e haste boom retrátil.',
      [['Tipo', 'Girafa (boom)'], ['Pernas', 'Parede dupla']], { ilustr: true, pos: '70% 40%' }),
    p('roadpro-snare', 'Ferragens', 'Estante de caixa Roadpro', 'Roadpro', 'hardware-snare.jpg', 780,
      'Cesto com ajuste omnidirecional e trava que mantém a caixa exatamente onde você deixou.',
      [['Tipo', 'Estante de caixa'], ['Ajuste', 'Omni-ball']], { ilustr: true, pos: '55% 70%' }),
    p('ic-hihat', 'Ferragens', 'Máquina de chimbal Iron Cobra Lever Glide', 'Iron Cobra', 'play-sticks.jpg', 1990,
      'Sistema de alavanca para um pedal leve e resposta imediata do chimbal.',
      [['Tipo', 'Máquina de chimbal'], ['Sistema', 'Lever Glide']], { ilustr: true, pos: '30% 30%' }),
    p('first-chair', 'Ferragens', 'Banco 1st Chair Ergo-Rider', '1st Chair', 'stage-smoke.jpg', 1490,
      'Assento híbrido entre redondo e selim: liberdade para as pernas e apoio para horas de ensaio.',
      [['Tipo', 'Banco'], ['Assento', 'Ergo-Rider']], { ilustr: true, pos: '50% 70%' }),

    /* Baquetas */
    p('stick-7a', 'Baquetas', '50th Anniversary 7A — Oak', 'Traditional', 'product-baquetas-04.png', 99,
      'Baqueta comemorativa dos 50 anos da TAMA. Carvalho japonês, 13 mm de diâmetro, feita no Japão.',
      [['Madeira', 'Carvalho japonês'], ['Modelo', '7A'], ['Origem', 'Japão']], { pos: '30% 60%' }),
    p('stick-5b', 'Baquetas', '50th Anniversary 5B — Oak', 'Traditional', 'product-baquetas-04.png', 99,
      'O modelo 5B da edição de 50 anos: mais massa para tocar forte, com o mesmo acabamento natural.',
      [['Madeira', 'Carvalho japonês'], ['Modelo', '5B'], ['Origem', 'Japão']], { pos: '80% 30%' }),
    p('stick-5a', 'Baquetas', 'Traditional 5A — Oak', 'Traditional', 'play-dark.jpg', 79,
      'O padrão que serve em qualquer mão. Ponta de madeira em formato de gota para um ataque equilibrado.',
      [['Madeira', 'Carvalho japonês'], ['Modelo', '5A']], { ilustr: true, pos: '60% 50%' })
  ];

  const ARTISTAS = [
    { n: 'Eloy Casagrande', pais: 'Brasil', banda: 'Slipknot · ex-Sepultura', img: 'artist-eloy-casagrande.jpeg', pos: '50% 30%',
      bio: 'De Santo André para o mundo. Um dos bateristas mais explosivos do metal atual, Eloy assumiu as baquetas do Slipknot em 2024 depois de mais de uma década no Sepultura.',
      gear: ['Starclassic', 'Dois bumbos', 'Iron Cobra / Speed Cobra'] },
    { n: 'Anika Nilles', pais: 'Alemanha', banda: 'Nevell · Rush (turnê 2026)', img: 'artist-anika-nilles.jpeg', pos: '55% 20%',
      bio: 'Baterista, compositora e educadora. Ficou conhecida pelos grooves em quintinas, lançou “Pikalar” em 2017 e assina a caixa signature AN1465 de alumínio.',
      gear: ['Caixa signature AN1465', 'Starclassic', 'Alumínio 14×6,5'] },
    { n: 'Stewart Copeland', pais: 'EUA', banda: 'The Police', img: 'artist-stewart-copeland.jpg', pos: '55% 25%',
      bio: 'O som de caixa mais reconhecível do rock. Copeland ajudou a popularizar os Octobans no fim dos anos 70 e tem sua própria caixa signature de latão.',
      gear: ['Caixa signature SC145', 'Octobans', 'Latão 14×5'] },
    { n: 'Matheus Falcão', pais: 'Brasil', banda: 'Anitta · Filipe Ret', img: 'artist-matheus-falcao.jpeg', pos: '40% 25%',
      bio: 'De Guapimirim (RJ) para o Coachella. Matheus leva o groove brasileiro aos maiores palcos do pop e faz parte do time de artistas da Tama Brasil.',
      gear: ['Starclassic', 'Pop / R&B / Funk'] },
    { n: 'Clay Aeschliman', pais: 'EUA', banda: 'Polyphia', img: 'artist-clay-aeschliman.jpeg', pos: '50% 20%',
      bio: 'A bateria por trás do Polyphia mistura trap, gospel chops e metal progressivo. Com a TAMA, criou a caixa S.L.P. Mod Bubinga 12×7.',
      gear: ['S.L.P. Mod Bubinga 12×7', 'Starclassic', 'Iron Cobra'] }
  ];

  window.TAMA = { IMG, CATEGORIAS, LINHAS, PRODUTOS, ARTISTAS };
})();
