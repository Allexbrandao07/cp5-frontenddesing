# TAMA Drums Brasil — protótipo estático NÃO OFICIAL

Site em HTML, CSS e JavaScript puros, sem build e sem bibliotecas. Abra `index.html` no navegador ou use o Live Server do VS Code.

## Estrutura

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Hero, manifesto, linhas (rolagem horizontal), engenharia, drum pad, artistas, legado |
| `produtos.html` | Catálogo oficial com filtro por categoria e linha, busca e carregamento por partes |
| `artistas.html` | Lista completa de artistas, com busca e filtro por país |
| `historia.html` | Linha do tempo de 1908 a 2024 |
| `suporte.html` | Atalhos, FAQ e formulário de contato (simulado) |
| `css/styles.css` | Todos os estilos, com índice no topo |
| `js/data.js` | **Dados editáveis**: destaques da home (linhas e artistas) e categorias |
| `js/products-data.js` | Catálogo completo (475 produtos, 12 categorias), coletado de tama.com |
| `assets/products/` | Imagem de cada produto (`<id>.webp`, recorte com fundo transparente) |
| `js/main.js` | Cabeçalho/rodapé, animações e a lógica de cada página, com índice no topo |
| `js/artists-data.js` | Lista completa de artistas (835, de 60 países), coletada de tama.com |
| `assets/artists/`, `assets/flags/` | Foto de cada artista (`<id>.webp`, 340px) e bandeiras dos países |
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

## Artistas

- **Destaques** (seção "Quem toca TAMA" da home): os cinco de `ARTISTAS` em `js/data.js`, com as fotos oficiais em alta (`artist-*-hd.jpg`).
- **Lista completa** (página Artistas, seção "Todos os artistas"): vem de `js/artists-data.js`, uma linha por artista no formato `[id oficial, nome, código do país, bandas]`. Tem busca por nome ou banda, filtro por país (os nomes dos países são traduzidos pelo próprio navegador) e carrega 40 por vez. Brasileiros aparecem primeiro. `artistas.html?pais=BR#todos` abre já filtrado por país e `artistas.html?q=nome#todos` já com a busca preenchida (é o que os nomes da home usam).
- Nomes, países, bandas, fotos e bandeiras foram coletados da lista de artistas de bateria de tama.com em outubro de 2026. Cada cartão leva ao perfil oficial do artista.

## Produtos

- **Catálogo** (página Produtos): vem de `js/products-data.js`, uma linha por produto no formato `[id, nome, categoria, linha, caminho da página oficial]`. Tem filtro por categoria, filtro por linha (as opções mudam conforme a categoria), busca por nome ou modelo e carrega 40 por vez. Cada cartão leva à página oficial do produto.
- `produtos.html?cat=snare_drums#catalogo` abre já filtrado por categoria; `&linha=Pedais` filtra também a linha e `?q=texto` preenche a busca. É o que os painéis de linhas da home e o rodapé usam.
- Nomes, categorias, linhas e imagens foram coletados de tama.com/asia/products em outubro de 2026. Os nomes das categorias e de parte das linhas foram traduzidos; nomes de produtos ficaram como no site oficial.
- O catálogo não tem preços: o site oficial não publica, e os valores inventados da primeira versão foram removidos.

## Imagens (`assets/images/`)

- **Originais do projeto**: logos, `product-*` e `artist-*`. `product-hero-01` e `product-pedais-03` foram convertidos de PNG para JPG para reduzir o peso. `tama-logo-white.png` é a logo preta recortada e convertida para branco.
- **Unsplash (licença livre)**: `stage-*`, `play-*` e `hardware-*`. São fotos de ambiente, não fotos de produtos TAMA. Fotógrafos: Vitalii Khodzinskyi, Junseong Lee, Magnus Lunay, Aliane Schwartzhaupt, Matt Roskovec, Michael Dobrinski, Josh Sorenson e Shawn Sim.
- A ligação foto ↔ artista segue o nome dos arquivos originais; confira antes de publicar.

## O que é ilustrativo

- **Contato**: e-mail, telefone e horário são fictícios. O formulário só valida os campos, não envia nada.

## Fontes consultadas (outubro de 2026)

- História: Wikipédia (Tama Drums, Tama Iron Cobra), Drummerszone, blog da Gear4music. As datas do início das baterias Star e do lançamento do Iron Cobra variam entre as fontes, por isso o texto usa "poucos anos depois" e "início dos anos 90".
- Anika Nilles: Thomann e Blabbermouth (caixa signature AN1465 e turnê com o Rush).
- Eloy Casagrande: Drumming News Network e BeatIt (festival de 50 anos da TAMA).
- Stewart Copeland: Thomann (caixa signature SC145).
- Clay Aeschliman: Modern Drummer.
- Matheus Falcão: página Tama Brasil da Musical Express.

## Pendências

Sem carrinho, estoque ou contas. As fotos dos artistas têm baixa resolução (a página as exibe em preto e branco para disfarçar); vale trocá-las por versões maiores.
