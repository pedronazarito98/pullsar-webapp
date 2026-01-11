# Pullsar Webapp

Plataforma de arte e cultura | Next.js + Strapi CMS

## Requisitos

- Node.js 20+
- pnpm 9+

```bash
npm install -g pnpm
```

## Setup Rápido

```bash
# 1. Instalar dependências
pnpm install

# 2. Configurar backend
cp apps/backend/.env.example apps/backend/.env

# 3. Configurar frontend
cp apps/web/.env.example apps/web/.env.local

# 4. Rodar tudo
pnpm dev
```

**URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:1337/api
- Admin Strapi: http://localhost:1337/admin

## Estrutura

```
apps/
  web/        # Next.js 16 + React 19 + Tailwind
  backend/    # Strapi 5 CMS
packages/
  typescript-config/
  eslint-config/
```

## Variáveis de Ambiente

### Backend (`apps/backend/.env`)

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=chave1,chave2
API_TOKEN_SALT=valor
ADMIN_JWT_SECRET=valor
TRANSFER_TOKEN_SALT=valor
JWT_SECRET=valor
ENCRYPTION_KEY=valor

# Banco de dados (SQLite local ou Postgres)
DATABASE_CLIENT=sqlite
# DATABASE_CLIENT=postgres
# DATABASE_HOST=seu_host
# DATABASE_PORT=5432
# DATABASE_NAME=postgres
# DATABASE_USERNAME=seu_usuario
# DATABASE_PASSWORD=sua_senha
```

Gerar secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
```

## Comandos

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Roda frontend e backend |
| `pnpm build` | Build de produção |
| `pnpm lint` | Lint do código |
| `pnpm type-check` | Verifica tipos |
| `pnpm clean` | Limpa builds e node_modules |

### Rodar apenas um app

```bash
pnpm --filter @pullsar/web dev      # Só frontend
pnpm --filter @pullsar/backend dev  # Só backend
```

## Primeiro Acesso ao Strapi

1. Rode `pnpm dev`
2. Acesse http://localhost:1337/admin
3. Crie seu usuário admin
4. Configure as permissões em Settings > Roles > Public

## Deploy

- **Backend**: Railway (usa Dockerfile)
- **Frontend**: Vercel
- **Banco**: Supabase (Postgres)

## Tecnologias

- Next.js 16 + React 19
- Strapi 5
- Tailwind CSS 4
- TypeScript
- pnpm + Turborepo
