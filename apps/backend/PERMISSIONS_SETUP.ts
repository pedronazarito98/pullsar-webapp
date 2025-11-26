/**
 * Strapi API Permissions Configuration Guide
 * 
 * PROBLEMA: 403 Forbidden ao acessar /api/articles
 * CAUSA: Strapi v5 bloqueia acesso público por padrão
 * 
 * SOLUÇÃO: Configurar permissões no Strapi Admin Panel
 */

// ==========================================
// OPÇÃO 1: Via Strapi Admin Panel (RECOMENDADO)
// ==========================================

/*
1. Acesse o Strapi Admin Panel:
   http://localhost:1337/admin

2. Navegue para Settings → Users & Permissions Plugin → Roles → Public

3. Expanda "Article" nas permissões

4. Marque as seguintes permissões:
   ✅ find (GET /api/articles)
   ✅ findOne (GET /api/articles/:id)

5. Expanda "Category" nas permissões

6. Marque as seguintes permissões:
   ✅ find (GET /api/categories)
   ✅ findOne (GET /api/categories/:id)

7. Expanda "Author" nas permissões (se necessário)

8. Marque:
   ✅ find
   ✅ findOne

9. Clique em "Save" no canto superior direito

10. Teste a API:
    curl http://localhost:1337/api/articles?populate=*
*/

// ==========================================
// OPÇÃO 2: Via Script de Configuração Automática
// ==========================================

/*
Se você quiser automatizar via código, crie um bootstrap script:

1. Crie o arquivo: 
   apps/backend/src/index.ts (se não existir) ou adicione ao bootstrap

2. Adicione o código de configuração de permissões (veja abaixo)

3. Reinicie o Strapi:
   cd apps/backend
   pnpm run develop
*/

// ==========================================
// CONFIGURAÇÃO DE CORS (se necessário)
// ==========================================

/*
Se você também tiver erros de CORS, atualize:
apps/backend/config/middlewares.ts

Substitua 'strapi::cors' por:

{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: ['http://localhost:3000'], // URL do Next.js
    credentials: true,
  },
},
*/

// ==========================================
// VERIFICAÇÃO
// ==========================================

/*
Após configurar as permissões, teste no terminal:

# Listar todos os articles
curl "http://localhost:1337/api/articles?populate=*"

# Buscar article específico
curl "http://localhost:1337/api/articles?filters[slug][\$eq]=seu-slug&populate=*"

# Listar categories
curl "http://localhost:1337/api/categories?populate=*"

Se retornar JSON (não 403), está funcionando! ✅
*/

// ==========================================
// PRÓXIMOS PASSOS
// ==========================================

/*
1. Configure as permissões conforme instruções acima
2. Verifique se a API responde corretamente
3. O Next.js já está configurado para consumir a API
4. A página /blog/[category]/[slug] funcionará automaticamente
*/

export { };

