# Configuração do Supabase

Este guia explica como configurar o Supabase como banco de dados para o backend Strapi.

## Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Node.js >= 20.0.0

## Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **New Project**
3. Preencha os dados:
   - **Name**: `pullsar-cms` (ou outro nome de sua preferência)
   - **Database Password**: Anote essa senha!
   - **Region**: Escolha a mais próxima (ex: `South America - São Paulo`)
4. Clique em **Create new project**
5. Aguarde a criação do projeto (pode levar alguns minutos)

## Passo 2: Obter Connection String

1. No dashboard do projeto, vá em **Settings** → **Database**
2. Role até **Connection string** → **URI**
3. Escolha **Session pooler** para melhor performance
4. Copie a connection string, que terá este formato:

```
postgresql://postgres.XXXXXXXXXXXX:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

## Passo 3: Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com as credenciais do Supabase:

```env
# Strapi Server
HOST=0.0.0.0
PORT=1337
APP_KEYS="chave-secreta-1,chave-secreta-2"
API_TOKEN_SALT=sua-api-token-salt
ADMIN_JWT_SECRET=sua-admin-jwt-secret
TRANSFER_TOKEN_SALT=sua-transfer-token-salt
JWT_SECRET=sua-jwt-secret
ENCRYPTION_KEY=sua-encryption-key

# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=aws-0-sa-east-1.pooler.supabase.com
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres.XXXXXXXXXXXX
DATABASE_PASSWORD=sua-senha-supabase
DATABASE_SCHEMA=public
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

> **Importante**: Substitua `XXXXXXXXXXXX` pelo seu project reference e `sua-senha-supabase` pela senha que você definiu.

## Passo 4: Gerar Chaves Secretas

Use o seguinte comando para gerar chaves aleatórias:

```bash
# No PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Ou no Bash/Linux
openssl rand -base64 32
```

Gere uma chave para cada variável:

- `APP_KEYS` (gere 2 chaves separadas por vírgula)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY`

## Passo 5: Iniciar o Strapi

```bash
# Na raiz do monorepo
pnpm --filter @pullsar/backend dev

# Ou diretamente no diretório do backend
cd apps/backend
pnpm dev
```

Na primeira execução, o Strapi irá:

1. Conectar ao banco de dados Supabase
2. Criar as tabelas necessárias
3. Iniciar o servidor na porta 1337

## Passo 6: Criar Usuário Admin

1. Acesse http://localhost:1337/admin
2. Crie o primeiro usuário administrador
3. Faça login no painel

## Passo 7: Configurar Permissões Públicas

Para que o frontend possa acessar a API:

1. Vá em **Settings** → **Users & Permissions Plugin** → **Roles**
2. Clique em **Public**
3. Para cada tipo de conteúdo (Article, Author, Category, Tag), habilite:
   - `find` - Listar todos
   - `findOne` - Buscar um
4. Clique em **Save**

## Verificação

Teste os endpoints:

```bash
# Listar categorias
curl http://localhost:1337/api/categories?populate=*

# Listar artigos
curl http://localhost:1337/api/articles?populate=*
```

## Troubleshooting

### Erro de conexão SSL

Se receber erro de SSL, verifique se `DATABASE_SSL_REJECT_UNAUTHORIZED=false` está configurado.

### Erro de permissão

Verifique se as permissões públicas estão configuradas no painel do Strapi.

### Erro de pool de conexões

O Supabase tem limites de conexões. Use o Session Pooler (porta 5432) para melhor gerenciamento.
