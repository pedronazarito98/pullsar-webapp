# @pullsar/eslint-config

Configurações ESLint compartilhadas para o monorepo Pullsar.

## Uso

### Next.js Apps

No `.eslintrc.js`:
```js
module.exports = {
  extends: ['@pullsar/eslint-config/nextjs'],
};
```

### Strapi Apps

No `.eslintrc.js`:
```js
module.exports = {
  extends: ['@pullsar/eslint-config/strapi'],
};
```

### Base (outros projetos)

No `.eslintrc.js`:
```js
module.exports = {
  extends: ['@pullsar/eslint-config/base'],
};
```

## Configurações Disponíveis

- `base.js` - Configuração ESLint base com TypeScript
- `nextjs.js` - Para aplicações Next.js (inclui React, hooks, a11y)
- `strapi.js` - Para aplicações Strapi CMS
