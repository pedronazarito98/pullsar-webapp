# Quick Start: Strapi + Next.js Dynamic Posts

## ✅ Checklist Rápido

### 1. Criar Components (blocks.*)

No **Content-Type Builder** → **Create new component**:

- [x] **blocks.rich-text** → Campo: `content` (Rich Text) ✅ Criado
- [x] **blocks.image** → Campos: `image` (Media), `caption` (Text), `alt` (Text) ✅ Criado
- [ ] **blocks.quote** → Campos: `quote` (Long text), `author` (Text), `role` (Text)
- [ ] **blocks.image-slider** → Campos: `images` (Multiple Media), `title` (Text)
- [ ] **blocks.video-embed** → Campos: `url` (Text), `title` (Text), `autoplay` (Boolean)
- [ ] **blocks.cta** → Campos: `title`, `description`, `buttonText`, `buttonUrl`, `icon`, `variant` (Enum)

### 2. Adicionar Dynamic Zone ao Article

- [ ] Editar **Article** → Add field → **Dynamic Zone**
- [ ] Nome: `contentBlocks`
- [ ] Adicionar TODOS os 6 components criados

### 3. Criar 3 Posts de Exemplo

- [ ] **Post 1 (Baixa)**: Apenas 1 Rich Text block
- [ ] **Post 2 (Média)**: Rich Text + Image + Quote
- [ ] **Post 3 (Alta)**: Rich Text + Image Slider + Quote + Video + CTA

### 4. Configurar Permissões

**Settings → Roles → Public**:
- [ ] Article: `find`, `findOne`
- [ ] Category: `find`, `findOne`
- [ ] Author: `find`, `findOne`

### 5. Testar

```bash
# API
curl "http://localhost:1337/api/articles?populate=*"

# Frontend
http://localhost:3000/blog/[category]/[slug]
```

## 🚀 URLs para Testar

Substitua `[category]` e `[slug]` pelos valores corretos:

- `http://localhost:3000/blog/tecnologia/introducao-jamstack-moderno`
- `http://localhost:3000/blog/tecnologia/nextjs-16-react-19-futuro`
- `http://localhost:3000/blog/tutoriais/guia-completo-strapi-v5-nextjs-16`

## 📖 Documentação Completa

Veja `STRAPI_SETUP_GUIDE.md` para instruções detalhadas passo a passo.
