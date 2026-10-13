/* TAMA Drums Brasil — dados editáveis do site (protótipo não oficial).
   O catálogo completo fica em js/products-data.js e a lista de artistas em js/artists-data.js. */
(() => {
  'use strict';

  const IMG = 'assets/images/';

  /* Categorias do catálogo oficial: [chave usada em products-data.js, rótulo] */
  const CATEGORIAS = [
    ['drum_kits', 'Baterias'],
    ['snare_drums', 'Caixas'],
    ['hardware', 'Ferragens'],
    ['sticks', 'Baquetas'],
    ['accessories', 'Acessórios'],
    ['practice_tools', 'Estudo'],
    ['bags', 'Bags e cases'],
    ['original_percussion', 'Percussão original'],
    ['concert', 'Concerto'],
    ['marching', 'Marcial'],
    ['microphone_stand', 'Pedestais de microfone'],
    ['lifestyle', 'Lifestyle']
  ];
  const TOTAL_PRODUTOS = 475;

  /* Linhas em destaque na rolagem horizontal da home */
  const LINHAS = [
    { nome: 'Starclassic', cat: 'Baterias', link: 'produtos.html?cat=drum_kits#catalogo', img: 'line-starclassic.jpg', pos: '42% 50%',
      tag: 'Baterias profissionais',
      txt: 'A linha que leva o som TAMA aos maiores palcos do mundo: cascos finos, ferragens fundidas e acabamentos que parecem joia.' },
    { nome: 'S.L.P.', cat: 'Caixas', link: 'produtos.html?cat=snare_drums#catalogo', img: 'line-slp.jpg', pos: '55% 50%',
      tag: 'Sound Lab Project',
      txt: 'Cada caixa S.L.P. nasce de uma combinação estudada de casco, aro e esteira para entregar um timbre específico, sem ajustes.' },
    { nome: 'Iron Cobra', cat: 'Pedais', link: 'produtos.html?cat=hardware&linha=Pedais#catalogo', img: 'product-pedais-03.jpg', pos: '60% 40%',
      tag: 'Pedais de bumbo',
      txt: 'Potência, velocidade e durabilidade. Há três décadas, o pedal que virou referência para quem toca pesado.' },
    { nome: 'Roadpro', cat: 'Ferragens', link: 'produtos.html?cat=hardware#catalogo', img: 'line-roadpro.jpg', pos: '45% 50%',
      tag: 'Ferragens de estrada',
      txt: 'Estantes de parede dupla e ajustes sem degrau, pensadas para aguentar turnê atrás de turnê.' },
    { nome: 'Traditional', cat: 'Baquetas', link: 'produtos.html?cat=sticks#catalogo', img: 'line-traditional.jpg', pos: '14% 50%',
      tag: 'Baquetas japonesas',
      txt: 'Carvalho japonês selecionado, peso e afinação pareados. O contato mais direto entre você e o instrumento.' }
  ];

  const ARTISTAS = [
    { n: 'Eloy Casagrande', pais: 'Brasil', banda: 'Slipknot · ex-Sepultura', img: 'artist-eloy-casagrande-hd.jpg', pos: '38% 40%',
      bio: 'De Santo André para o mundo. Um dos bateristas mais explosivos do metal atual, Eloy assumiu as baquetas do Slipknot em 2024 depois de mais de uma década no Sepultura.',
      gear: ['Starclassic', 'Dois bumbos', 'Iron Cobra / Speed Cobra'] },
    { n: 'Anika Nilles', pais: 'Alemanha', banda: 'Nevell · Rush (turnê 2026)', img: 'artist-anika-nilles-hd.jpg', pos: '45% 30%',
      bio: 'Baterista, compositora e educadora. Ficou conhecida pelos grooves em quintinas, lançou “Pikalar” em 2017 e assina a caixa signature AN1465 de alumínio.',
      gear: ['Caixa signature AN1465', 'Starclassic', 'Alumínio 14×6,5'] },
    { n: 'Stewart Copeland', pais: 'EUA', banda: 'The Police', img: 'artist-stewart-copeland-hd.jpg', pos: '52% 30%',
      bio: 'O som de caixa mais reconhecível do rock. Copeland ajudou a popularizar os Octobans no fim dos anos 70 e tem sua própria caixa signature de latão.',
      gear: ['Caixa signature SC145', 'Octobans', 'Latão 14×5'] },
    { n: 'Matheus Falcão', pais: 'Brasil', banda: 'Anitta · Filipe Ret', img: 'artist-matheus-falcao-hd.jpg', pos: '36% 30%',
      bio: 'De Guapimirim (RJ) para o Coachella. Matheus leva o groove brasileiro aos maiores palcos do pop e faz parte do time de artistas da Tama Brasil.',
      gear: ['Starclassic', 'Pop / R&B / Funk'] },
    { n: 'Clay Aeschliman', pais: 'EUA', banda: 'Polyphia', img: 'artist-clay-aeschliman-hd.jpg', pos: '78% 40%',
      bio: 'A bateria por trás do Polyphia mistura trap, gospel chops e metal progressivo. Com a TAMA, criou a caixa S.L.P. Mod Bubinga 12×7.',
      gear: ['S.L.P. Mod Bubinga 12×7', 'Starclassic', 'Iron Cobra'] }
  ];

  window.TAMA = { IMG, CATEGORIAS, TOTAL_PRODUTOS, LINHAS, ARTISTAS };
})();
