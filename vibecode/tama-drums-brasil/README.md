# TAMA Drums Brasil — protótipo estático NÃO OFICIAL

Site em HTML, CSS e JavaScript puros, sem build e sem bibliotecas. Abra `index.html` no navegador ou use o Live Server do VS Code.

## Estrutura

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Hero, manifesto, linhas (rolagem horizontal), engenharia, drum pad, artistas, legado |
| `produtos.html` | Catálogo com filtro, busca, ordenação e modal de detalhes |
| `artistas.html` | Perfil dos cinco artistas |
| `historia.html` | Linha do tempo de 1908 a 2024 |
| `suporte.html` | Atalhos, FAQ e formulário de contato (simulado) |
| `css/styles.css` | Todos os estilos, com índice no topo |
| `js/data.js` | **Dados editáveis**: produtos, artistas, linhas e categorias |
| `js/main.js` | Cabeçalho/rodapé, animações e a lógica de cada página, com índice no topo |
| `js/kit.js` | Bateria tocável da home: desenho em SVG, samples e groove de demonstração |
| `js/samples.js` | Cópia dos samples embutida em base64 (arquivo gerado, ver abaixo) |
| `../samples/` | Samples da TAMA Starclassic, um `.mp3` por peça. Fica em `vibecode/samples/`, ao lado da pasta do site |

Cabeçalho e rodapé são montados por `js/main.js`, então só existem em um lugar.

## Como as animações funcionam

Tudo é controlado por atributos no HTML:

- `data-reveal` (`up` padrão, `clip`, `line`): entra quando aparece na tela.
- `data-split` (`words` padrão ou `chars`): divide o texto e revela palavra por palavra ou letra por letra.
- `data-stagger`: aplica `data-reveal` em cascata nos filhos.
- `data-scrub`: o texto "acende" conforme a rolagem.
- `data-parallax="0.12"`: desloca o elemento em relação ao pai durante a rolagem.
- `data-progress` (`view`, `exit`, `pin`, `enter`, `through`): o JS grava a variável CSS `--p` (0 a 1) e o CSS decide o que fazer com ela. É o que move a rolagem horizontal, o hero e a linha do tempo.
- `data-count="50"`: contador animado.
- `data-tilt` e `data-cursor="Texto"`: inclinação 3D e rótulo no cursor (só em desktop).

Com `prefers-reduced-motion` ativo, as animações são desligadas e o conteúdo aparece direto. Em telas pequenas a rolagem horizontal vira um carrossel nativo.

## Identidade TAMA

Os elementos abaixo vêm das peles de bumbo da marca (duas listras, uma grossa e uma fina, com o emblema sobre elas) e ficam na seção 23 de `css/styles.css`:

- **Títulos**: `h1`, `h2` e o menu móvel usam Alfa Slab One em itálico (`--slab`), próxima do desenho da logomarca. O restante continua em Archivo.
- **Emblema**: `<span class="mark-box"><i class="mark"></i></span>`. Os arquivos são `tama-icon.png` (branco) e `tama-icon-red.png`. É usado como imagem de fundo, não como máscara CSS, porque máscaras não carregam ao abrir o site direto do disco.
- **Emblema do hero**: `.hero__mark`, numa coluna reservada à direita (`--col`). Usa a versão cheia do emblema (`tama-icon-solid.png` e `tama-icon-solid-red.png`) em sete camadas empilhadas, que formam a espessura. Inclina em 3D com o mouse e dá meia-volta ao rolar.
- **Trilho lateral**: `.rail`, em telas a partir de 1100px. Substitui a barra de progresso do topo: as listras enchem de vermelho e o emblema desce junto com a página. Ocupa uma margem própria à esquerda (`--rail`), então o conteúdo nunca passa por baixo dele.
- O emblema também aparece no pré-carregamento, nos separadores do marquee, no bumbo da bateria tocável e no favicon.

## Bateria tocável ("Toque agora")

O kit é desenhado em SVG por `js/kit.js` e toca os samples de `../samples/` (pasta `vibecode/samples/`) pela Web Audio API. O código normaliza o volume de cada arquivo, pula o silêncio inicial e ajusta a mixagem em `MIX`.

Ao abrir o site direto do disco (`file://`), o navegador bloqueia a leitura dos `.mp3`, então o código usa `js/samples.js`, que traz os mesmos arquivos embutidos. **Se trocar um sample, mantenha o nome do arquivo e gere `js/samples.js` de novo** na pasta do site:

```
python tools/build-samples.py
```

## Imagens (`assets/images/`)

- **Originais do projeto**: logos, `product-*` e `artist-*`. `product-hero-01` e `product-pedais-03` foram convertidos de PNG para JPG para reduzir o peso. `tama-logo-white.png` é a logo preta recortada e convertida para branco.
- **Unsplash (licença livre)**: `stage-*`, `play-*` e `hardware-*`. São fotos de ambiente, não fotos de produtos TAMA. Fotógrafos: Vitalii Khodzinskyi, Junseong Lee, Magnus Lunay, Aliane Schwartzhaupt, Matt Roskovec, Michael Dobrinski, Josh Sorenson e Shawn Sim.
- Produtos que usam foto de banco têm `ilustr: true` em `js/data.js` e mostram o selo "Imagem ilustrativa".
- A ligação foto ↔ artista segue o nome dos arquivos originais; confira antes de publicar.

## O que é ilustrativo

- **Preços**: todos inventados. Edite `preco` em `js/data.js`.
- **Contato**: e-mail, telefone e horário são fictícios. O formulário só valida os campos, não envia nada.
- **Catálogo**: nomes de linhas e modelos são reais, mas especificações e disponibilidade no Brasil não foram conferidas no catálogo oficial.

## Fontes consultadas (outubro de 2026)

- História: Wikipédia (Tama Drums, Tama Iron Cobra), Drummerszone, blog da Gear4music. As datas do início das baterias Star e do lançamento do Iron Cobra variam entre as fontes, por isso o texto usa "poucos anos depois" e "início dos anos 90".
- Anika Nilles: Thomann e Blabbermouth (caixa signature AN1465 e turnê com o Rush).
- Eloy Casagrande: Drumming News Network e BeatIt (festival de 50 anos da TAMA).
- Stewart Copeland: Thomann (caixa signature SC145).
- Clay Aeschliman: Modern Drummer.
- Matheus Falcão: página Tama Brasil da Musical Express.

## Pendências

Sem carrinho, estoque ou contas. As fotos dos artistas têm baixa resolução (a página as exibe em preto e branco para disfarçar); vale trocá-las por versões maiores.
