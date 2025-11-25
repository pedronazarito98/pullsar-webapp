# Pullsar Webapp - Monorepo

Plataforma de arte e cultura construída com Next.js e Strapi CMS.

## Estrutura do Projeto

Este é um monorepo gerenciado por **pnpm workspaces** e **Turborepo**.

```
pullsar-webapp/
├── apps/
│   ├── web/         # Next.js frontend (porta 3000)
│   └── backend/     # Strapi CMS (porta 1337)
├── packages/
│   ├── typescript-config/  # Configurações TypeScript compartilhadas
│   └── eslint-config/      # Configurações ESLint compartilhadas
├── turbo.json       # Configuração do Turborepo
├── pnpm-workspace.yaml
└── package.json
```

## Pré-requisitos

- **Node.js** >= 18.0.0
- **pnpm** >= 9.0.0

Instale o pnpm globalmente:
```bash
npm install -g pnpm@9.15.0
```

## Instalação

Instale todas as dependências do monorepo:

```bash
pnpm install
```

## Scripts Disponíveis

### Desenvolvimento

Execute todos os apps em modo dev simultaneamente:
```bash
pnpm dev
```

Execute apenas um app específico:
```bash
pnpm --filter @pullsar/web dev
pnpm --filter @pullsar/backend dev
```

### Build

Build de todos os apps:
```bash
pnpm build
```

Build de um app específico:
```bash
pnpm --filter @pullsar/web build
pnpm --filter @pullsar/backend build
```

### Lint

Execute linting em todos os workspaces:
```bash
pnpm lint
```

### Type Check

Verifique tipos TypeScript em todos os projetos:
```bash
pnpm type-check
```

### Clean

Limpe todos os artefatos de build e node_modules:
```bash
pnpm clean
```

## Apps

### Web (@pullsar/web)

Frontend Next.js com React 19 e Tailwind CSS.

- **Porta:** 3000
- **Tecnologias:** Next.js 16, React 19, Tailwind CSS 4, Motion
- **Diretório:** `apps/web/`

### Backend (@pullsar/backend)

API Strapi CMS para gerenciamento de conteúdo.

- **Porta:** 1337
- **Tecnologias:** Strapi 5.30.0, SQLite
- **Diretório:** `apps/backend/`
- **Admin:** http://localhost:1337/admin

## Packages Compartilhados

### @pullsar/typescript-config

Configurações TypeScript reutilizáveis:
- `base.json` - Configuração base
- `nextjs.json` - Para apps Next.js
- `strapi.json` - Para apps Strapi

### @pullsar/eslint-config

Configurações ESLint reutilizáveis:
- `base.js` - Configuração base
- `nextjs.js` - Para apps Next.js
- `strapi.js` - Para apps Strapi

## Comandos Úteis do Turborepo

```bash
# Executar comando em workspace específico
turbo run build --filter=@pullsar/web

# Ver cache do Turborepo
turbo run build --dry-run

# Limpar cache do Turborepo
rm -rf .turbo

# Ver gráfico de dependências
turbo run build --graph
```

## Comandos Úteis do pnpm

```bash
# Adicionar dependência a workspace específico
pnpm add <package> --filter @pullsar/web

# Adicionar dependência dev a workspace específico
pnpm add -D <package> --filter @pullsar/backend

# Listar todos os workspaces
pnpm list --depth 0

# Atualizar dependências
pnpm update --interactive --latest
```

## Variáveis de Ambiente

### Backend
Copie `.env.example` para `.env` em `apps/backend/` e configure:
- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `DATABASE_*` (se não usar SQLite)

### Web
Crie `.env.local` em `apps/web/` para variáveis de ambiente do Next.js.

## Características do Monorepo

✅ **Cache Inteligente** - Turborepo cacheia builds e testes
✅ **Execução Paralela** - Executa tarefas em paralelo quando possível
✅ **Workspaces pnpm** - Compartilhamento eficiente de dependências
✅ **Configurações Compartilhadas** - TypeScript e ESLint centralizados
✅ **Type Safety** - TypeScript em todos os projetos

## Desenvolvimento

1. Instale as dependências: `pnpm install`
2. Inicie o desenvolvimento: `pnpm dev`
3. Acesse:
   - Frontend: http://localhost:3000
   - Backend Admin: http://localhost:1337/admin
   - Backend API: http://localhost:1337/api

## Build para Produção

```bash
# Build de todos os apps
pnpm build

# Start em produção
pnpm --filter @pullsar/backend start
pnpm --filter @pullsar/web start
```

## Licença

Privado
