# TAMA Drums Brasil

**Aluno:** Állex Augusto de Souza Brandão — **RM571383**

Atividade de **vibecode**: um site multipágina para a TAMA Drums no Brasil, feito em HTML, CSS e JavaScript puros, com a IA como parceira de desenvolvimento.

> **Site publicado:** **[tama-drums-brasil.vercel.app](https://tama-drums-brasil.vercel.app)**

Este README registra o processo, e não só o resultado: o prompt base, o que mudou em relação a ele, quais decisões foram minhas, como e por quê, além das referências, da paleta e das fontes que levaram à versão final.

---

## 1. Como rodar

Abra `index.html` no navegador ou use o **Live Server** do VS Code. Não há build nem dependências.

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Hero, manifesto, linhas (rolagem horizontal), engenharia, bateria tocável, artistas, legado |
| `produtos.html` | Catálogo oficial (475 produtos, 12 categorias) com filtro, busca e carregamento por partes |
| `artistas.html` | Cinco artistas em destaque + lista completa (835 artistas de 60 países) |
| `historia.html` | Linha do tempo de 1908 a 2024 |
| `suporte.html` | Atalhos, FAQ e formulário de contato (simulado) |
| `css/styles.css` | Todos os estilos, com índice no topo |
| `js/main.js` | Cabeçalho/rodapé, animações e a lógica de cada página |
| `js/data.js` | Destaques da home (linhas e artistas) e categorias |
| `js/products-data.js`, `js/artists-data.js` | Catálogo e artistas coletados de tama.com |
| `js/kit.js`, `js/samples.js` | Bateria tocável (SVG + Web Audio) e cópia embutida dos samples |
| `../samples/` | Samples `.mp3` de uma TAMA Starclassic, um por peça |

---

## 2. Prompt base

Este foi o primeiro prompt, que serviu de briefing para todo o projeto. Escrevi em inglês para ter mais precisão técnica, e pedi o conteúdo do site em pt-BR.


```markdown
# Master Prompt — TAMA Drums Brasil Website

## Role and working mode
Act as a senior digital product designer, UX/UI designer, front-end developer, motion designer,
and technical content researcher. Build a polished, complete, responsive, multi-page website
concept for TAMA Drums Brasil, a leading drum and percussion brand. [...] Do not stop at a
landing-page mockup: deliver a cohesive website with functional navigation and multiple pages.

## Primary objective
[...] bold, precise, premium, and performance-driven — not like a generic music-store template.
Vanilla HTML, CSS, and JavaScript only. No frameworks, no build tools, no package manager.

## Source assets provided by the user
- Images 1 and 2: alternate versions of the TAMA logo. Do not redraw, distort or recolor.
- Images 3, 4 and 11: product photographs/wallpapers.
- Images 6–10: TAMA artist endorsers; filenames include nationality — show it under the name.
- Image 5: no purpose specified.

## Research and factual accuracy
Official TAMA site > official artist pages > Brazilian distributor/retailers.
Do not invent dates, specs, endorsements, biographies. Website in pt-BR.

### Pricing policy
Prices in BRL (R$ 1.234,56). Never convert a foreign price or invent an official-looking price.
Fallback: "Preço sob consulta" or a clearly labeled illustrative price documented in README.

## Art direction and design system
Dark, high-impact, editorial, cinematic. Avoid generic e-commerce, excessive gradients,
glassmorphism, random neon.
Palette: #0A0A0B, #171719, #242428, #B9B9BE, #F5F5F4, #D71920 (red), #65151D (burgundy), #38383D.
Typography: condensed/industrial display + legible sans-serif, with offline fallbacks.

## Required website architecture
index.html, produtos.html (Caixas, Pedais, Ferragens, Baquetas, Baterias/Shell Packs — filters,
search, sorting, details modal, Intl.NumberFormat BRL), artistas.html (nationality directly below
name), historia.html (verified timeline), suporte.html (no invented addresses/phones).

## Interaction and motion design
Cinematic hero reveal, IntersectionObserver reveals, subtle parallax, rhythmic red accents,
sticky header, drumstick/rim/lug-inspired motif. Honor prefers-reduced-motion, no scroll-jacking,
keyboard accessible, modals close with Escape.

## Technical requirements / README / QA checklist / Final delivery
Semantic HTML5, CSS variables, responsive, alt text, lazy-load, Open Graph, README with asset
mapping, price sources, history sources and pending items. Do not claim anything is complete
unless it was actually implemented or verified.
```

O prompt original também tinha um JSON de briefing estruturado (projeto, direção de arte, páginas, categorias obrigatórias, política de preços e interações), que reforçava as mesmas restrições.


**Por que escrevi o prompt assim:** eu queria evitar o resultado genérico que a IA costuma entregar ("site de loja de música"). Por isso o prompt define um papel (designer sênior + dev + pesquisador), um stack fechado, o uso de cada imagem que forneci e, principalmente, regras contra inventar fatos e preços. A IA tende a "preencher" lacunas com dados plausíveis e falsos.

---

## 3. O que mudou em relação ao prompt base, e por quê

As mudanças vieram de revisar o que a IA entregava. Cada linha abaixo é um ponto em que o resultado não me satisfez ou em que eu enxerguei uma oportunidade melhor.

### 3.1 Decisões minhas (direção do projeto)

| O que mudou | Como | Por quê |
| --- | --- | --- |
| **Preços removidos** | O prompt pedia preços em R$. A primeira versão do catálogo trazia valores que não tinham fonte confiável, e eu mandei tirar todos. | Preço sem fonte parece oficial e engana quem visita. O próprio prompt proibia inventar, e a IA acabou fazendo isso. Preferi não ter preço a ter preço falso. |
| **Catálogo real no lugar de poucos produtos de exemplo** | Os poucos produtos escritos à mão deram lugar a 475 produtos e 12 categorias coletados de tama.com, cada um com imagem e link para a página oficial. | Um catálogo inventado ou incompleto não informa nada. Com dados oficiais, o site fica útil e verificável. |
| **Artistas: de 5 perfis para uma lista completa** | Mantive os 5 artistas das minhas fotos como destaque e acrescentei os 835 artistas oficiais, com busca, filtro por país e bandeira. Os brasileiros aparecem primeiro. | O prompt pedia a nacionalidade bem visível. A bandeira e o filtro por país resolvem isso de forma direta, e destacar os brasileiros faz sentido para um site "Brasil". |
| **Bateria tocável na home ("Toque agora")** | Forneci samples reais de uma TAMA Starclassic (`vibecode/samples/`). O kit é desenhado em SVG e toca pela Web Audio API, com mouse ou teclado. | Isso não estava no prompt. Para uma marca de bateria, *ouvir* o instrumento comunica mais do que qualquer texto. É o elemento mais memorável do site. |
| **Identidade puxada da pele de bumbo TAMA** | Pedi que a identidade viesse do produto real: as duas listras (uma grossa e uma fina) com o emblema sobre elas. Isso virou o trilho lateral de progresso, os separadores e o emblema 3D do hero. | O prompt sugeria um motivo de baquetas ou aros. As listras da pele de bumbo são mais reconhecíveis como TAMA e dão um sistema visual próprio, em vez de enfeite genérico. |
| **Correções do FAQ, do hero e do manifesto** | Revisei texto e layout dessas seções em um segundo ciclo (commit `b25af54`). | Alguns textos estavam genéricos ou errados, e o hero tinha problemas de composição. |
| **Deploy na Vercel com nome próprio** | Publiquei com a Vercel CLI e criei o alias `tama-drums-brasil.vercel.app`. | Um link com o nome do projeto é mais profissional para apresentar. |

### 3.2 Ajustes de design em relação ao briefing

| Item | No prompt | No final | Por quê |
| --- | --- | --- | --- |
| **Fundo** | `#0A0A0B` | `#070707` | Um preto mais profundo dá mais contraste às fotos de palco e ao vermelho. |
| **Texto** | `#F5F5F4` (frio) | `#F4F0E9` (off-white quente) | Um branco levemente quente lembra papel e catálogo impresso e cansa menos a vista no escuro. |
| **Vermelho** | `#D71920` | `#E3231B` (+ `#FF4A36` em hover) | Ajustado a partir da logo fornecida, como o próprio prompt sugeria ("sample the supplied logos"). |
| **Vinho** | `#65151D` | `#5E0C0F` | Mais escuro, para não competir com o vermelho principal. |
| **Latão** | — | `#C9A45C` | Acrescentado como acento secundário, inspirado nas ferragens e nos pratos. É usado com muita parcimônia. |
| **Tipografia** | Display condensada + sans | **Alfa Slab One itálico** nos títulos, **Archivo** (eixo de largura variável) no corpo, **JetBrains Mono** em rótulos técnicos | A slab itálica fica próxima do desenho da logomarca TAMA. A Archivo variável permite ir de condensado a expandido com uma família só. Cada fonte tem fallback de sistema para funcionar offline. |
| **Página de produtos** | Modal de detalhes e ordenação | Cartões levam direto à página oficial, com filtro por categoria e linha | Com 475 produtos reais, o detalhe confiável está no site oficial. Duplicar especificações aumentaria o risco de erro. |
| **Fotos de ambiente** | Só fotos fornecidas | Somadas a fotos do Unsplash (licença livre) para palco e clima | As fotos fornecidas não cobriam todas as seções. As do Unsplash são só de ambiente, nunca apresentadas como produto TAMA. |

### 3.3 Paleta final

| Token | Cor | Uso |
| --- | --- | --- |
| `--bg` / `--bg-2` / `--bg-3` | `#070707` / `#0E0E0F` / `#161617` | Fundos e superfícies |
| `--ink` | `#F4F0E9` | Texto principal |
| `--mute` | `#9A958D` | Texto secundário |
| `--red` / `--red-2` | `#E3231B` / `#FF4A36` | CTA, estados ativos, trilho de progresso |
| `--red-deep` | `#5E0C0F` | Fundos de destaque |
| `--brass` | `#C9A45C` | Acento pontual |

---

## 4. Como corrigi o caminho com a IA

- **Revisão crítica dos fatos:** a IA escrevia datas e afirmações com segurança mesmo quando as fontes divergiam. Na história, as datas do início das baterias Star e do lançamento do Iron Cobra variam entre as fontes, então o texto usa "poucos anos depois" e "início dos anos 90" em vez de um ano preciso que poderia estar errado.
- **Preços:** cobrei a regra que eu mesmo tinha escrito no prompt e removi tudo que não tinha fonte.
- **Funcionamento local:** o site precisava abrir direto do disco (`file://`). Duas coisas quebravam: as máscaras CSS do emblema e a leitura dos `.mp3`. A solução foi usar o emblema como imagem de fundo e embutir os samples em `js/samples.js`, gerado por `python tools/build-samples.py`.
- **Deploy:** o site carrega os samples de `../samples`, fora da pasta do site. Por isso publiquei a pasta `vibecode` inteira, com um `vercel.json` que redireciona `/` para `/tama-drums-brasil/`.

---

## 5. Referências e fontes (outubro de 2026)

- **Produtos e artistas:** tama.com (lista de artistas de bateria e tama.com/asia/products). Os nomes de produtos foram mantidos como no site oficial.
- **História:** Wikipédia (Tama Drums, Tama Iron Cobra), Drummerszone, blog da Gear4music.
- **Artistas em destaque:** Anika Nilles (Thomann, Blabbermouth), Eloy Casagrande (Drumming News Network, BeatIt), Stewart Copeland (Thomann), Clay Aeschliman (Modern Drummer), Matheus Falcão (página Tama Brasil da Musical Express).
- **Referência visual:** pele de bumbo e logomarca TAMA, catálogos impressos de instrumentos e sites editoriais de marcas premium.
- **Fotos de ambiente (Unsplash):** Vitalii Khodzinskyi, Junseong Lee, Magnus Lunay, Aliane Schwartzhaupt, Matt Roskovec, Michael Dobrinski, Josh Sorenson e Shawn Sim.

## 6. Limitações

- Site estático: sem carrinho, estoque, contas ou envio de formulário.
- O contato (e-mail, telefone e horário) é fictício.
