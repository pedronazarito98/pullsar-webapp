# Pullsar CMS - Backend Strapi

Backend headless CMS construído com **Strapi v5** para a plataforma Pullsar de arte e cultura.

## Pré-requisitos

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0

## Quick Start (SQLite - Desenvolvimento Local)

```bash
# Na raiz do monorepo
pnpm install
pnpm --filter @pullsar/backend dev
```

Acesse http://localhost:1337/admin para criar o usuário administrador.

## Configuração com Supabase (Produção)

Para usar o PostgreSQL do Supabase:

1. Leia o guia completo em [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)
2. Configure as variáveis de ambiente no `.env`
3. Inicie o servidor

## Scripts Disponíveis

| Script            | Descrição                                   |
| ----------------- | ------------------------------------------- |
| `pnpm dev`        | Inicia em modo desenvolvimento (hot-reload) |
| `pnpm build`      | Build para produção                         |
| `pnpm start`      | Inicia servidor em produção                 |
| `pnpm strapi`     | CLI do Strapi                               |
| `pnpm type-check` | Verifica tipos TypeScript                   |
| `pnpm clean`      | Limpa cache e build                         |

## Estrutura do Projeto

```
src/
├── api/
│   ├── article/          # Artigos
│   │   ├── content-types/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   ├── author/           # Autores
│   ├── category/         # Categorias
│   └── tag/              # Tags
├── components/
│   └── blocks/           # Components para Dynamic Zone
│       ├── rich-text.json
│       ├── image.json
│       ├── quote.json
│       ├── image-slider.json
│       ├── video-embed.json
│       └── cta.json
├── seed/
│   └── seed-data.ts      # Dados de exemplo
└── index.ts
```

## Content Types

### Article

O tipo principal. Inclui:

- Campos básicos: title, subtitle, slug, description, readTime, views
- Mídia: cover (imagem de capa)
- Relações: author, category, tags
- Dynamic Zone: contentBlocks (blocos de conteúdo flexíveis)

### Author

Autores dos artigos com nome, bio e avatar.

### Category

Categorias (Cinema, Música, Literatura, Gastronomia) com nome, slug, descrição, cor e imagem.

### Tag

Tags simples para categorização de artigos.

## Dynamic Zone Blocks

Os artigos suportam blocos de conteúdo dinâmico:

| Bloco                 | Descrição                 |
| --------------------- | ------------------------- |
| `blocks.rich-text`    | Texto formatado (WYSIWYG) |
| `blocks.image`        | Imagem com legenda        |
| `blocks.quote`        | Citação com autor         |
| `blocks.image-slider` | Carrossel de imagens      |
| `blocks.video-embed`  | Embed de YouTube/Vimeo    |
| `blocks.cta`          | Call to Action            |

## API Endpoints

Após configurar permissões públicas:

```bash
# Listar categorias com artigos
GET /api/categories?populate[articles][populate]=*&populate[image]=*

# Listar todos os artigos
GET /api/articles?populate=*

# Buscar artigo por slug
GET /api/articles?filters[slug][$eq]={slug}&populate[contentBlocks][populate]=*&populate[cover]=*&populate[author][populate]=*&populate[category]=*&populate[tags]=*
```

## Configuração de Permissões

1. Acesse **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Habilite `find` e `findOne` para:
   - Article
   - Author
   - Category
   - Tag

## Variáveis de Ambiente

Veja `.env.example` para todas as variáveis disponíveis.

### Principais:

```env
# Servidor
HOST=0.0.0.0
PORT=1337

# Banco de Dados
DATABASE_CLIENT=sqlite   # ou 'postgres' para Supabase
DATABASE_HOST=...
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=...
DATABASE_PASSWORD=...
```

## Documentação

- [Guia de Setup Supabase](docs/SUPABASE_SETUP.md)
- [Strapi Documentation](https://docs.strapi.io)

## Licença

Privado
