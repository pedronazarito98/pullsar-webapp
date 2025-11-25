# Setup Inicial do Monorepo Pullsar

## Passo 1: Instalar o pnpm

O pnpm não está instalado no seu sistema. Você precisa instalá-lo primeiro.

### Opção 1: Via npm (Recomendado)
```bash
npm install -g pnpm@9.15.0
```

### Opção 2: Via Corepack (Node.js 16.13+)
```bash
corepack enable
corepack prepare pnpm@9.15.0 --activate
```

### Opção 3: Via PowerShell (Windows)
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

## Passo 2: Verificar Instalação

```bash
pnpm --version
# Deve retornar: 9.15.0 (ou superior)
```

## Passo 3: Instalar Dependências do Monorepo

Navegue até a raiz do projeto e execute:

```bash
cd C:\Users\Pedro\Documents\Projetos_Front\pullsar-webapp
pnpm install
```

Este comando irá:
- Instalar todas as dependências de todos os workspaces
- Criar links simbólicos entre os pacotes locais
- Configurar o cache do Turborepo
- Preparar o ambiente de desenvolvimento

## Passo 4: Iniciar Desenvolvimento

Depois da instalação, você pode iniciar todos os apps:

```bash
pnpm dev
```

Ou iniciar apps individualmente:

```bash
# Apenas frontend
pnpm --filter @pullsar/web dev

# Apenas backend
pnpm --filter @pullsar/backend dev
```

## Passo 5: Configurar Variáveis de Ambiente

### Backend (Strapi)
1. Navegue até `apps/backend/`
2. Copie `.env.example` para `.env`
3. Configure as variáveis necessárias

### Frontend (Next.js)
1. Navegue até `apps/web/`
2. Crie `.env.local` se necessário
3. Configure variáveis `NEXT_PUBLIC_*`

## Estrutura Criada

```
pullsar-webapp/                    (✅ Criado)
├── apps/
│   ├── web/                       (✅ Movido de pullsar-front)
│   └── backend/                   (✅ Movido de pullsar-backend)
├── packages/
│   ├── typescript-config/         (✅ Criado)
│   └── eslint-config/             (✅ Criado)
├── .gitignore                     (✅ Criado)
├── .npmrc                         (✅ Criado)
├── .prettierrc                    (✅ Criado)
├── .editorconfig                  (✅ Criado)
├── pnpm-workspace.yaml            (✅ Criado)
├── turbo.json                     (✅ Criado)
├── package.json                   (✅ Criado)
├── README.md                      (✅ Criado)
└── SETUP.md                       (✅ Este arquivo)
```

## Comandos Disponíveis

Após a instalação, você terá acesso a:

```bash
pnpm dev          # Desenvolvimento de todos os apps
pnpm build        # Build de todos os apps
pnpm lint         # Lint de todos os apps
pnpm type-check   # Verificação de tipos
pnpm format       # Formatar código com Prettier
pnpm clean        # Limpar builds e node_modules
```

## Troubleshooting

### Erro: "pnpm: command not found"
- Instale o pnpm seguindo o Passo 1
- Reinicie o terminal após a instalação

### Erro ao instalar dependências
- Verifique a versão do Node.js: `node --version` (deve ser >= 18.0.0)
- Limpe o cache: `pnpm store prune`
- Tente novamente: `pnpm install`

### Erro de permissões no Windows
- Execute o terminal como Administrador
- Ou use PowerShell com política de execução ajustada

### Workspaces não encontrados
- Verifique se `pnpm-workspace.yaml` existe na raiz
- Verifique se as pastas `apps/` e `packages/` existem

## Próximos Passos

1. ✅ Instalar pnpm
2. ⏳ Executar `pnpm install`
3. ⏳ Configurar variáveis de ambiente
4. ⏳ Executar `pnpm dev`
5. ⏳ Acessar http://localhost:3000 (frontend) e http://localhost:1337 (backend)

## Suporte

Para mais informações, consulte:
- [Documentação do pnpm](https://pnpm.io)
- [Documentação do Turborepo](https://turbo.build)
- [Documentação do Next.js](https://nextjs.org)
- [Documentação do Strapi](https://strapi.io)
