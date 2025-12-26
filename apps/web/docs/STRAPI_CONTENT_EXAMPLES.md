# Exemplos de Conteúdo para Strapi

Este documento contém exemplos de dados para popular o Strapi. Use-os como referência para criar o conteúdo inicial.

---

## Autores

Crie os seguintes autores no Collection Type `Author`:

### Autor 1

- **name**: Clara Monteiro
- **bio**: Crítica de cinema e cultura pop. Mestre em Cinema pela USP, escreve sobre filmes há mais de 10 anos.
- **avatar**: [Baixar imagem](https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop)

### Autor 2

- **name**: Rafael Santos
- **bio**: Jornalista musical e DJ. Cobre a cena musical brasileira e internacional desde 2015.
- **avatar**: [Baixar imagem](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop)

### Autor 3

- **name**: Marina Costa
- **bio**: Escritora e crítica literária. Autora de dois livros de contos e colaboradora de revistas culturais.
- **avatar**: [Baixar imagem](https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop)

### Autor 4

- **name**: Lucas Oliveira
- **bio**: Crítico gastronômico e sommelier. Já visitou mais de 500 restaurantes pelo Brasil.
- **avatar**: [Baixar imagem](https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop)

---

## Categorias

Crie as seguintes categorias no Collection Type `Category`:

| name        | slug        | color   | description                                            |
| ----------- | ----------- | ------- | ------------------------------------------------------ |
| Cinema      | cinema      | #722F37 | Críticas, análises e notícias do mundo cinematográfico |
| Música      | musica      | #1E3A5F | Shows, álbuns e artistas que movem a cena musical      |
| Literatura  | literatura  | #2D5016 | Livros, autores e tendências literárias                |
| Gastronomia | gastronomia | #8B4513 | Restaurantes, chefs e cultura gastronômica             |

**Imagens de capa sugeridas:**

- Cinema: https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop
- Música: https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop
- Literatura: https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop
- Gastronomia: https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop

---

## Tags

Crie as seguintes tags no Collection Type `Tag`:

| name           | slug           |
| -------------- | -------------- |
| Cinema de Arte | cinema-de-arte |
| Diretores      | diretores      |
| Oscar          | oscar          |
| Premiações     | premiacoes     |
| Streaming      | streaming      |
| Festivais      | festivais      |
| Shows          | shows          |
| MPB            | mpb            |
| Vinil          | vinil          |
| Livros         | livros         |
| Autoras        | autoras        |
| Restaurantes   | restaurantes   |
| Vinhos         | vinhos         |
| Chefs          | chefs          |

---

## Artigos

### Cinema

#### Artigo 1 (DESTAQUE)

- **title**: O Renascimento do Cinema de Arte
- **subtitle**: Uma nova geração redefine a narrativa visual
- **slug**: cinema-renascimento
- **description**: Uma nova geração de cineastas está redefinindo os limites da narrativa visual, trazendo de volta a essência experimental que marcou as grandes obras do século passado.
- **readTime**: 8 min de leitura
- **author**: Clara Monteiro
- **category**: Cinema
- **tags**: Cinema de Arte, Diretores
- **cover**: https://images.unsplash.com/photo-1666698907755-672d406ea71d?w=1200&h=630&fit=crop

**contentBlocks (Dynamic Zone):**

1. **blocks.rich-text**

```html
<h2>A Revolução Silenciosa</h2>
<p>
  Nos últimos anos, um movimento discreto mas poderoso tem transformado o panorama cinematográfico
  mundial. Jovens cineastas, armados com orçamentos modestos mas visões grandiosas, estão criando
  obras que desafiam convenções e expandem os limites da linguagem cinematográfica.
</p>
<p>
  Este renascimento não acontece em Hollywood, mas nas periferias criativas: estúdios independentes
  da Coreia do Sul, coletivos de cinema da Argentina, e produtoras experimentais da Europa Oriental.
</p>
```

2. **blocks.quote**

- quote: O cinema de arte não morreu. Ele apenas encontrou novos caminhos, novas vozes, novas formas de alcançar o público.
- author: Wong Kar-wai
- role: Diretor

3. **blocks.rich-text**

```html
<h2>Os Novos Mestres</h2>
<p>Entre os nomes mais promissores desta nova onda, destacam-se diretores como:</p>
<ul>
  <li><strong>Céline Sciamma</strong> - Explorando identidade e memória</li>
  <li><strong>Ryusuke Hamaguchi</strong> - Reinventando o drama conversacional</li>
  <li><strong>Kleber Mendonça Filho</strong> - Misturando gêneros e política</li>
</ul>
```

4. **blocks.cta**

- title: Descubra Mais Filmes
- description: Confira nossa lista curada dos melhores filmes de arte de 2024
- buttonText: Ver Lista Completa
- buttonUrl: /listas/cinema-arte-2024
- variant: primary

---

#### Artigo 2

- **title**: As Apostas Para o Oscar 2025
- **subtitle**: Análise dos favoritos da temporada
- **slug**: apostas-oscar-2025
- **description**: Com a temporada de premiações a todo vapor, analisamos os filmes e performances que devem dominar a cerimônia do Oscar.
- **readTime**: 6 min de leitura
- **author**: Clara Monteiro
- **category**: Cinema
- **tags**: Oscar, Premiações
- **cover**: https://images.unsplash.com/photo-1585951237313-1979e4df7385?w=1200&h=630&fit=crop

**contentBlocks:**

1. **blocks.rich-text**

```html
<h2>A Corrida pelo Oscar</h2>
<p>
  A temporada de premiações 2025 promete ser uma das mais disputadas dos últimos anos. Com produções
  de alta qualidade vindas de todos os cantos do mundo, a Academia terá trabalho para escolher os
  vencedores.
</p>
```

---

#### Artigo 3

- **title**: O Futuro do Streaming em 2025
- **subtitle**: Como as plataformas estão mudando o consumo de filmes
- **slug**: futuro-streaming-2025
- **description**: Análise profunda sobre as transformações no mercado de streaming e como isso afeta a produção e distribuição cinematográfica.
- **readTime**: 10 min de leitura
- **author**: Clara Monteiro
- **category**: Cinema
- **tags**: Streaming
- **cover**: https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=630&fit=crop

---

### Música

#### Artigo 4

- **title**: Guia Completo: Festivais de Verão 2025
- **subtitle**: Os melhores eventos musicais da temporada
- **slug**: festivais-verao-2025
- **description**: De Lollapalooza a Rock in Rio, confira tudo sobre os festivais que vão agitar o Brasil neste verão.
- **readTime**: 7 min de leitura
- **author**: Rafael Santos
- **category**: Música
- **tags**: Festivais, Shows
- **cover**: https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=630&fit=crop

**contentBlocks:**

1. **blocks.rich-text**

```html
<h2>Os Festivais Imperdíveis</h2>
<p>
  O verão brasileiro promete ser histórico para os amantes de música ao vivo. Confira o calendário
  completo:
</p>
```

2. **blocks.image-slider**

- title: Momentos dos Festivais
- images:
  - https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200
  - https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200
  - https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200

---

#### Artigo 5

- **title**: A Nova Geração da MPB
- **subtitle**: Artistas que estão reinventando a música brasileira
- **slug**: mpb-nova-geracao
- **description**: Conheça os novos nomes que estão levando a MPB para novos territórios sonoros sem perder a essência.
- **readTime**: 9 min de leitura
- **author**: Rafael Santos
- **category**: Música
- **tags**: MPB
- **cover**: https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop

---

#### Artigo 6

- **title**: O Retorno do Vinil: Nostalgia ou Qualidade?
- **subtitle**: Por que os discos de vinil voltaram a conquistar o público
- **slug**: vinil-retorno
- **description**: Investigamos o fenômeno do retorno do vinil e conversamos com colecionadores e especialistas sobre o formato.
- **readTime**: 6 min de leitura
- **author**: Rafael Santos
- **category**: Música
- **tags**: Vinil
- **cover**: https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=1200&h=630&fit=crop

---

### Literatura

#### Artigo 7

- **title**: Os 10 Livros Mais Esperados de 2025
- **subtitle**: Lançamentos imperdíveis para sua estante
- **slug**: livros-esperados-2025
- **description**: Selecionamos os lançamentos literários mais aguardados do ano, de ficção a ensaios.
- **readTime**: 8 min de leitura
- **author**: Marina Costa
- **category**: Literatura
- **tags**: Livros
- **cover**: https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=630&fit=crop

---

#### Artigo 8

- **title**: Autoras Brasileiras em Destaque
- **subtitle**: Vozes femininas que dominam a cena literária
- **slug**: autoras-brasileiras-destaque
- **description**: Perfis das escritoras brasileiras que estão conquistando prêmios e leitores ao redor do mundo.
- **readTime**: 7 min de leitura
- **author**: Marina Costa
- **category**: Literatura
- **tags**: Autoras
- **cover**: https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=630&fit=crop

---

#### Artigo 9

- **title**: Clubes de Leitura: A Nova Tendência Social
- **subtitle**: Como os grupos de discussão literária estão crescendo
- **slug**: clubes-leitura-tendencia
- **description**: Os clubes de leitura estão se tornando espaços de conexão e debate cultural nas grandes cidades.
- **readTime**: 5 min de leitura
- **author**: Marina Costa
- **category**: Literatura
- **cover**: https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop

---

### Gastronomia

#### Artigo 10

- **title**: Os Melhores Restaurantes de São Paulo em 2025
- **subtitle**: Guia definitivo para os amantes da boa mesa
- **slug**: melhores-restaurantes-sp-2025
- **description**: Nossa seleção dos restaurantes que estão definindo a cena gastronômica paulistana.
- **readTime**: 10 min de leitura
- **author**: Lucas Oliveira
- **category**: Gastronomia
- **tags**: Restaurantes
- **cover**: https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=630&fit=crop

---

#### Artigo 11

- **title**: Vinhos Naturais: O Movimento Que Chegou Para Ficar
- **subtitle**: Entenda a revolução no mundo dos vinhos
- **slug**: vinhos-naturais-movimento
- **description**: Os vinhos naturais conquistam paladares exigentes com sua produção artesanal e sabores únicos.
- **readTime**: 8 min de leitura
- **author**: Lucas Oliveira
- **category**: Gastronomia
- **tags**: Vinhos
- **cover**: https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=630&fit=crop

---

#### Artigo 12

- **title**: Chefs Brasileiros no Cenário Internacional
- **subtitle**: Os talentos que estão conquistando o mundo
- **slug**: chefs-brasileiros-internacional
- **description**: Brasileiros comandam cozinhas em restaurantes estrelados ao redor do mundo.
- **readTime**: 6 min de leitura
- **author**: Lucas Oliveira
- **category**: Gastronomia
- **tags**: Chefs
- **cover**: https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=630&fit=crop

---

## Checklist de Criação

- [ ] Criar 4 autores com avatares
- [ ] Criar 4 categorias com imagens
- [ ] Criar 14 tags
- [ ] Criar 12 artigos com blocos de conteúdo
- [ ] Publicar todos os artigos
- [ ] Configurar permissões públicas
- [ ] Testar endpoints da API
