# Guia de Implementação Back-End - Strapi

## Visão Geral

Este documento guia o time de back-end na criação da estrutura de dados e rotas no Strapi para integração com o frontend em Next.js.

> [!IMPORTANT]
> O frontend já está funcionando com dados mockados. A estrutura abaixo deve ser seguida **exatamente** para garantir compatibilidade.

---

## Collection Types

### 1. Category (Categoria)

Crie um Collection Type chamado `Category` com os seguintes campos:

| Campo         | Tipo              | Configuração               |
| ------------- | ----------------- | -------------------------- |
| `name`        | Text (Short text) | Required                   |
| `slug`        | UID               | Based on `name`, Required  |
| `description` | Text (Long text)  | -                          |
| `color`       | Text (Short text) | Regex: `^#[0-9A-Fa-f]{6}$` |
| `image`       | Media (Single)    | Images only                |
| `articles`    | Relation          | One-to-Many → Article      |

**Exemplo de resposta esperada:**

```json
{
  "id": 1,
  "documentId": "cat-cinema",
  "name": "Cinema",
  "slug": "cinema",
  "description": "Críticas, análises e notícias do mundo cinematográfico",
  "color": "#722F37",
  "image": { "url": "/uploads/cinema.jpg" },
  "articles": [...]
}
```

---

### 2. Author (Autor)

Crie um Collection Type chamado `Author` com os seguintes campos:

| Campo      | Tipo              | Configuração          |
| ---------- | ----------------- | --------------------- |
| `name`     | Text (Short text) | Required              |
| `bio`      | Text (Long text)  | -                     |
| `avatar`   | Media (Single)    | Images only           |
| `articles` | Relation          | One-to-Many → Article |

---

### 3. Tag

Crie um Collection Type chamado `Tag` com os seguintes campos:

| Campo  | Tipo              | Configuração              |
| ------ | ----------------- | ------------------------- |
| `name` | Text (Short text) | Required                  |
| `slug` | UID               | Based on `name`, Required |

---

### 4. Article (Artigo)

O Collection Type principal. Crie `Article` com os seguintes campos:

| Campo           | Tipo              | Configuração               |
| --------------- | ----------------- | -------------------------- |
| `title`         | Text (Short text) | Required                   |
| `subtitle`      | Text (Short text) | -                          |
| `slug`          | UID               | Based on `title`, Required |
| `description`   | Text (Long text)  | Required                   |
| `readTime`      | Text (Short text) | Ex: "8 min de leitura"     |
| `views`         | Number (Integer)  | Default: 0                 |
| `publishedAt`   | DateTime          | -                          |
| `cover`         | Media (Single)    | Images only                |
| `author`        | Relation          | Many-to-One → Author       |
| `category`      | Relation          | Many-to-One → Category     |
| `tags`          | Relation          | Many-to-Many → Tag         |
| `contentBlocks` | Dynamic Zone      | Ver seção abaixo           |

---

## Components (para Dynamic Zone)

Crie os seguintes componentes na categoria `blocks`:

### blocks.rich-text

| Campo     | Tipo      |
| --------- | --------- |
| `content` | Rich Text |

### blocks.image

| Campo     | Tipo              |
| --------- | ----------------- |
| `image`   | Media (Single)    |
| `caption` | Text (Short text) |
| `alt`     | Text (Short text) |

### blocks.quote

| Campo    | Tipo              |
| -------- | ----------------- |
| `quote`  | Text (Long text)  |
| `author` | Text (Short text) |
| `role`   | Text (Short text) |

### blocks.image-slider

| Campo    | Tipo              |
| -------- | ----------------- |
| `title`  | Text (Short text) |
| `images` | Media (Multiple)  |

### blocks.video-embed

| Campo      | Tipo              |
| ---------- | ----------------- |
| `url`      | Text (Short text) |
| `title`    | Text (Short text) |
| `autoplay` | Boolean           |

### blocks.cta

| Campo         | Tipo              |
| ------------- | ----------------- | --------------------------- |
| `title`       | Text (Short text) |
| `description` | Text (Long text)  |
| `buttonText`  | Text (Short text) |
| `buttonUrl`   | Text (Short text) |
| `icon`        | Text (Short text) |
| `variant`     | Enumeration       | primary, secondary, outline |

---

## API Endpoints Esperados

### Listar Categorias com Artigos

```
GET /api/categories?populate[articles][populate]=*
```

### Listar Todos os Artigos

```
GET /api/articles?populate=*
```

### Buscar Artigo por Slug

```
GET /api/articles?filters[slug][$eq]={slug}&filters[category][slug][$eq]={category}&populate[contentBlocks][populate]=*&populate[cover]=*&populate[author][populate]=*&populate[category]=*&populate[tags]=*
```

---

## Permissões Públicas

No painel do Strapi, vá em **Settings → Roles → Public** e habilite:

- **Article**: `find`, `findOne`
- **Category**: `find`, `findOne`
- **Author**: `find`, `findOne`
- **Tag**: `find`, `findOne`

---

## Dados de Seed

Crie ao menos:

- 4 categorias (Cinema, Música, Literatura, Gastronomia)
- 4 autores com avatar e bio
- 12 artigos (3 por categoria)
- Tags variadas

> [!TIP]
> Use o arquivo `mockData.ts` do frontend como referência para os dados.

---

## Estrutura de Pastas Esperada

```
src/
├── api/
│   ├── article/
│   │   ├── content-types/article/schema.json
│   │   ├── controllers/article.ts
│   │   ├── routes/article.ts
│   │   └── services/article.ts
│   ├── author/
│   ├── category/
│   └── tag/
└── components/
    └── blocks/
        ├── rich-text.json
        ├── image.json
        ├── quote.json
        ├── image-slider.json
        ├── video-embed.json
        └── cta.json
```

---

## Verificação

Após configurar, teste os endpoints:

1. `http://localhost:1337/api/categories?populate=*`
2. `http://localhost:1337/api/articles?populate=*`
3. `http://localhost:1337/api/articles?filters[slug][$eq]=cinema-renascimento&populate=*`

O frontend pode ser configurado para usar a API real alterando:

- `NEXT_PUBLIC_API_URL=http://localhost:1337/api` no `.env.local`
