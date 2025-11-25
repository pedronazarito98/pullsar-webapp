# @pullsar/typescript-config

Configurações TypeScript compartilhadas para o monorepo Pullsar.

## Uso

### Next.js Apps

No `tsconfig.json`:
```json
{
  "extends": "@pullsar/typescript-config/nextjs.json"
}
```

### Strapi Apps

No `tsconfig.json`:
```json
{
  "extends": "@pullsar/typescript-config/strapi.json"
}
```

### Base (outros projetos)

No `tsconfig.json`:
```json
{
  "extends": "@pullsar/typescript-config/base.json"
}
```

## Configurações Disponíveis

- `base.json` - Configuração TypeScript base
- `nextjs.json` - Para aplicações Next.js
- `strapi.json` - Para aplicações Strapi CMS
