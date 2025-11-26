# Guia Completo: Configuração do Strapi v5 com Dynamic Zones

## 📋 Índice

1. [Criar Components (Blocos Reutilizáveis)](#1-criar-components)
2. [Configurar Content Type Article](#2-configurar-article)
3. [Adicionar Conteúdo de Exemplo](#3-adicionar-conteúdo)
4. [Configurar Permissões Públicas](#4-configurar-permissões)
5. [Testar API](#5-testar-api)
6. [Verificar Frontend](#6-verificar-frontend)

---

## 1. Criar Components (Blocos Reutilizáveis)

### 1.1. Rich Text Block

1. No Strapi Admin, vá para **Content-Type Builder**
2. Clique em **Create new component** (lado esquerdo)
3. Configure:
   - **Display name**: `Rich Text`
   - **Category**: `blocks` (crie se não existir)
   - **Icon**: Escolha um ícone (ex: Document)
4. Clique em **Continue**
5. Adicione campo:
   - **Type**: Rich Text (Editor)
   - **Name**: `content`
   - Clique em **Add another field**
6. Clique em **Finish** e depois em **Save**

### 1.2. Image Block

1. **Create new component**
2. Configure:
   - **Display name**: `Image`
   - **Category**: `blocks`
3. Adicione campos:
   
   **Campo 1:**
   - **Type**: Media
   - **Name**: `image`
   - **Type**: Single media
   
   **Campo 2:**
   - **Type**: Text (Short text)
   - **Name**: `caption`
   - **Advanced settings**: Not required
   
   **Campo 3:**
   - **Type**: Text (Short text)
   - **Name**: `alt`
   - **Advanced settings**: Not required

4. Clique em **Finish** e **Save**

### 1.3. Quote Block

1. **Create new component**
2. Configure:
   - **Display name**: `Quote`
   - **Category**: `blocks`
3. Adicione campos:
   
   **Campo 1:**
   - **Type**: Text (Long text)
   - **Name**: `quote`
   
   **Campo 2:**
   - **Type**: Text (Short text)
   - **Name**: `author`
   - **Advanced settings**: Not required
   
   **Campo 3:**
   - **Type**: Text (Short text)
   - **Name**: `role`
   - **Advanced settings**: Not required

4. **Finish** e **Save**

### 1.4. Image Slider Block

1. **Create new component**
2. Configure:
   - **Display name**: `Image Slider`
   - **Category**: `blocks`
3. Adicione campos:
   
   **Campo 1:**
   - **Type**: Media
   - **Name**: `images`
   - **Type**: Multiple media
   
   **Campo 2:**
   - **Type**: Text (Short text)
   - **Name**: `title`
   - **Advanced settings**: Not required

4. **Finish** e **Save**

### 1.5. Video Embed Block

1. **Create new component**
2. Configure:
   - **Display name**: `Video Embed`
   - **Category**: `blocks`
3. Adicione campos:
   
   **Campo 1:**
   - **Type**: Text (Short text)
   - **Name**: `url`
   
   **Campo 2:**
   - **Type**: Text (Short text)
   - **Name**: `title`
   - **Advanced settings**: Not required
   
   **Campo 3:**
   - **Type**: Boolean
   - **Name**: `autoplay`
   - **Default value**: False

4. **Finish** e **Save**

### 1.6. CTA Block

1. **Create new component**
2. Configure:
   - **Display name**: `CTA`
   - **Category**: `blocks`
3. Adicione campos:
   
   **Campo 1:**
   - **Type**: Text (Short text)
   - **Name**: `title`
   
   **Campo 2:**
   - **Type**: Text (Long text)
   - **Name**: `description`
   - **Advanced settings**: Not required
   
   **Campo 3:**
   - **Type**: Text (Short text)
   - **Name**: `buttonText`
   
   **Campo 4:**
   - **Type**: Text (Short text)
   - **Name**: `buttonUrl`
   
   **Campo 5:**
   - **Type**: Text (Short text)
   - **Name**: `icon`
   - **Advanced settings**: Not required
   - **Placeholder**: Ex: ArrowRight, ExternalLink
   
   **Campo 6:**
   - **Type**: Enumeration
   - **Name**: `variant`
   - **Values**: `primary`, `secondary`, `outline`
   - **Default**: `primary`

4. **Finish** e **Save**

---

## 2. Configurar Content Type Article

### 2.1. Verificar/Editar Article Content Type

1. No **Content-Type Builder**, clique em **Article** (se já existe) ou crie novo
2. Se não tiver o campo **contentBlocks**, adicione:
   - Clique em **Add another field to this collection type**
   - **Type**: Dynamic Zone
   - **Name**: `contentBlocks`
   - Clique em **Add component to the zone**
   - Selecione **TODOS** os 6 components criados:
     - ✅ blocks.rich-text
     - ✅ blocks.image
     - ✅ blocks.quote
     - ✅ blocks.image-slider
     - ✅ blocks.video-embed
     - ✅ blocks.cta
   - Clique em **Finish**

3. Verifique se Article tem os seguintes campos essenciais:
   - `title` (Text - Short)
   - `subtitle` (Text - Long) - opcional
   - `slug` (UID - baseado em title)
   - `description` (Text - Long)
   - `readTime` (Text - Short)
   - `cover` (Media - Single)
   - `author` (Relation - Many to One com Author)
   - `category` (Relation - Many to One com Category)
   - `tags` (Relation - Many to Many com Tag) - opcional
   - `contentBlocks` (Dynamic Zone)

4. Clique em **Save**

---

## 3. Adicionar Conteúdo de Exemplo

### 3.1. Post de Baixa Complexidade

1. Vá para **Content Manager** → **Article** → **Create new entry**

2. Preencha:
   - **Title**: `Introdução ao JAMstack Moderno`
   - **Subtitle**: `Entendendo os fundamentos da arquitetura JAMstack`
   - **Slug**: `introducao-jamstack-moderno` (gerado automaticamente)
   - **Description**: `Uma introdução completa ao JAMstack, explorando seus benefícios e casos de uso.`
   - **Read Time**: `5 min de leitura`
   - **Cover**: Upload uma imagem qualquer
   - **Author**: Selecione um autor existente
   - **Category**: Selecione "Tecnologia" (crie se não existir)

3. Em **Content Blocks**, clique em **Add a component** → **Rich Text**

4. No editor de Rich Text, adicione:
   ```html
   <h2>O que é JAMstack?</h2>
   <p>JAMstack é uma arquitetura moderna de desenvolvimento web baseada em JavaScript do lado do cliente, APIs reutilizáveis e Markup pré-renderizado.</p>
   <p>Esta abordagem traz diversos benefícios:</p>
   <ul>
     <li><strong>Performance superior</strong>: Sites pré-renderizados são extremamente rápidos</li>
     <li><strong>Segurança aprimorada</strong>: Sem servidor, menos vetores de ataque</li>
     <li><strong>Escalabilidade</strong>: CDNs distribuem conteúdo globalmente</li>
   </ul>
   ```

5. Clique em **Save** e depois **Publish**

### 3.2. Post de Média Complexidade

1. **Create new entry** em Article

2. Preencha:
   - **Title**: `Next.js 16 e React 19: O Futuro do Desenvolvimento Web`
   - **Subtitle**: `Explorando as novidades das versões mais recentes`
   - **Description**: `Descubra as novidades do Next.js 16 e React 19.`
   - **Read Time**: `8 min de leitura`
   - Adicione cover, author, category

3. Em **Content Blocks**, adicione:

   **Bloco 1**: Rich Text
   ```html
   <h2>Next.js 16: App Router Evolution</h2>
   <p>O Next.js 16 traz melhorias significativas ao App Router.</p>
   ```

   **Bloco 2**: Image
   - Upload uma imagem
   - **Caption**: `Arquitetura do Next.js App Router`
   - **Alt**: `Diagrama mostrando a arquitetura do App Router`

   **Bloco 3**: Quote
   - **Quote**: `React 19 marca uma nova era no desenvolvimento de interfaces`
   - **Author**: `Dan Abramov`
   - **Role**: `React Core Team`

   **Bloco 4**: Rich Text
   ```html
   <h2>React 19: New Features</h2>
   <p>React 19 introduz conceitos revolucionários.</p>
   ```

4. **Save** e **Publish**

### 3.3. Post de Alta Complexidade

1. **Create new entry**

2. Preencha:
   - **Title**: `Guia Completo: Strapi v5 + Next.js 16`
   - **Subtitle**: `Construa um CMS Headless moderno com dynamic zones`
   - **Description**: `Tutorial completo mostrando como integrar Strapi v5 com Next.js 16.`
   - **Read Time**: `15 min de leitura`

3. **Content Blocks**:

   **Bloco 1**: Rich Text
   ```html
   <h2>Por que Strapi v5?</h2>
   <p>Strapi v5 representa uma evolução significativa no mundo dos headless CMS.</p>
   ```

   **Bloco 2**: Image Slider
   - Upload 3 imagens
   - **Title**: `Exemplos de Dynamic Zones no Strapi`

   **Bloco 3**: Quote
   - **Quote**: `Dynamic Zones permitem que editores componham páginas flexíveis sem tocar em código`
   - **Author**: `Strapi Team`

   **Bloco 4**: Video Embed
   - **URL**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - **Title**: `Tutorial em vídeo: Configurando Strapi v5`

   **Bloco 5**: Rich Text
   ```html
   <h2>Integração com Next.js 16</h2>
   <p>A integração entre Strapi e Next.js é perfeita.</p>
   ```

   **Bloco 6**: CTA
   - **Title**: `Pronto para começar?`
   - **Description**: `Baixe o template completo Strapi v5 + Next.js 16`
   - **Button Text**: `Acessar Template`
   - **Button URL**: `https://github.com`
   - **Icon**: `ArrowRight`
   - **Variant**: `primary`

4. **Save** e **Publish**

---

## 4. Configurar Permissões Públicas

1. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**

2. Expanda **Article** e marque:
   - ✅ `find`
   - ✅ `findOne`

3. Expanda **Category** e marque:
   - ✅ `find`
   - ✅ `findOne`

4. Expanda **Author** e marque:
   - ✅ `find`
   - ✅ `findOne`

5. **Save**

---

## 5. Testar API

No terminal, teste se a API está respondendo:

```bash
# Listar todos os articles
curl "http://localhost:1337/api/articles?populate=*"

# Article específico com todos os blocos
curl "http://localhost:1337/api/articles?filters[slug][\$eq]=introducao-jamstack-moderno&populate[contentBlocks][populate]=*&populate[cover]=*&populate[author][populate]=*&populate[category]=*"
```

**Resposta esperada**: JSON com os dados dos articles ✅

---

## 6. Verificar Frontend

### 6.1. Teste no Navegador

Acesse as URLs no navegador:

- **Baixa complexidade**: `http://localhost:3000/blog/tecnologia/introducao-jamstack-moderno`
- **Média complexidade**: `http://localhost:3000/blog/tecnologia/nextjs-16-react-19-futuro`
- **Alta complexidade**: `http://localhost:3000/blog/tutoriais/guia-completo-strapi-v5-nextjs-16`

### 6.2. Verificações

- ✅ Página carrega sem erros
- ✅ Blocos renderizam corretamente
- ✅ Imagens aparecem
- ✅ Animações funcionam (post de alta complexidade)
- ✅ Sem warnings de hidratação no console

---

## 🎉 Pronto!

Agora você tem um sistema completo de posts dinâmicos integrado entre Strapi v5 e Next.js 16!

## 📝 Notas Importantes

1. **Imagens**: Use imagens reais ou placeholders do Unsplash
2. **Slugs**: Certifique-se que o slug no URL corresponde ao slug no Strapi
3. **Category slug**: O slug da categoria também deve corresponder na URL
4. **Populate**: O frontend já está configurado para fazer populate correto dos campos

## 🐛 Troubleshooting

- **403 Error**: Verifique permissões públicas (Passo 4)
- **404 Not Found**: Verifique se o slug está correto e o post está publicado
- **Blocos não aparecem**: Verifique se `populate[contentBlocks][populate]=*` está funcionando na API
- **Imagens não carregam**: Verifique se o Strapi está servindo media files corretamente
