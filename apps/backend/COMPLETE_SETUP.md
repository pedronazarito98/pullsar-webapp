    # Componentes Restantes - Criação Rápida

## ✅ COMPLETO
1. **blocks.rich-text** ✓
2. **blocks.image** ✓

## 🔧 FALTAM (5-8 minutos no total)

### Step 1: blocks.quote (2 min)
1. Click **"Create new component"**
2. Display name: `Quote`
3. Category: `blocks` (já existe, só selecionar)
4. Icon: qualquer (ex: message)
5. Click **Continue**
6. **Add new field** → **Text** → **Long text**
   - Name: `quote`
   - Click **Finish**
7. **Add another field** → **Text** → **Short text**
   - Name: `author`
   - ⚠️ **Advanced settings** → DESMARCAR "Required field"
   - Click **Finish**
8. **Add another field** → **Text** → **Short text**
   - Name: `role`
   - ⚠️ **Advanced settings** → DESMARCAR "Required field"
   - Click **Finish**
9. Click **Save** (canto superior direito)
10. Aguardar Strapi reiniciar (~30s)

### Step 2: blocks.image-slider (2 min)
1. Click **"Create new component"**
2. Display name: `Image Slider`
3. Category: `blocks`
4. Click **Continue**
5. **Add new field** → **Media**
   - Name: `images`
   - ⚠️ Selecionar **"Multiple media"** (não Single!)
   - Click **Finish**
6. **Add another field** → **Text** → **Short text**
   - Name: `title`
   - **Advanced settings** → DESMARCAR "Required"
   - Click **Finish**
7. Click **Save**
8. Aguardar reiniciar

### Step 3: blocks.video-embed (2 min)
1. Click **"Create new component"**
2. Display name: `Video Embed`
3. Category: `blocks`
4. Click **Continue**
5. **Add new field** → **Text** → **Short text**
   - Name: `url`
   - (deixar Required marcado - obrigatório)
   - Click **Finish**
6. **Add another field** → **Text** → **Short text**
   - Name: `title`
   - **Advanced settings** → DESMARCAR "Required"
   - Click **Finish**
7. **Add another field** → **Boolean**
   - Name: `autoplay`
   - Default value: `false` (já vem assim)
   - Click **Finish**
8. Click **Save**
9. Aguardar reiniciar

### Step 4: blocks.cta (3 min - tem mais campos)
1. Click **"Create new component"**
2. Display name: `CTA`
3. Category: `blocks`
4. Click **Continue**
5. **Add new field** → **Text** → **Short text**
   - Name: `title`
   - Click **Finish**
6. **Add another field** → **Text** → **Long text**
   - Name: `description`
   - **Advanced settings** → DESMARCAR "Required"
   - Click **Finish**
7. **Add another field** → **Text** → **Short text**
   - Name: `buttonText`
   - Click **Finish**
8. **Add another field** → **Text** → **Short text**
   - Name: `buttonUrl`
   - Click **Finish**
9. **Add another field** → **Text** → **Short text**
   - Name: `icon`
   - **Advanced settings** → DESMARCAR "Required"
   - Click **Finish**
10. **Add another field** → **Enumeration**
    - Name: `variant`
    - Values (uma por linha):
      ```
      primary
      secondary
      outline
      ```
    - Default value: `primary`
    - Click **Finish**
11. Click **Save**
12. Aguardar reiniciar

---

## ✅ APÓS CRIAR OS 4 COMPONENTS

### Step 5: Adicionar Dynamic Zone ao Article (2 min)

1. No Content-Type Builder, lado esquerdo, em **COLLECTION TYPES**
2. Click em **Article**
3. Click **"Add another field to this collection type"**
4. Selecione **"Dynamic Zone"**
5. Name: `contentBlocks`
6. Click **"Add component to the zone"**
7. ⚠️ **IMPORTANTE**: Selecionar **TODOS** os 6 components:
   - ✅ blocks.rich-text
   - ✅ blocks.image
   - ✅ blocks.quote
   - ✅ blocks.image-slider
   - ✅ blocks.video-embed
   - ✅ blocks.cta
8. Click **Finish**
9. Click **Save**
10. Aguardar reiniciar

### Step 6: Configurar Permissões Públicas (1 min)

1. No menu lateral, click em **Settings** (⚙️)
2. **Users & Permissions Plugin** → **Roles**
3. Click em **Public**
4. Na seção **Permissions**, expanda **Article**:
   - ✅ Marcar `find`
   - ✅ Marcar `findOne`
5. Expanda **Category**:
   - ✅ Marcar `find`
   - ✅ Marcar `findOne`
6. Expanda **Author**:
   - ✅ Marcar `find`
   - ✅ Marcar `findOne`
7. Click **Save** (canto superior direito)

---

## 🎉 PRONTO!

Agora você pode:

1. **Testar a API**:
   ```bash
   curl "http://localhost:1337/api/articles?populate=*"
   ```

2. **Ver posts no frontend**:
   ```
   http://localhost:3000/blog/test
   ```

3. **Criar posts** no Content Manager do Strapi e eles aparecerão automaticamente no Next.js!

---

## 📝 Notas Importantes

- **"Required field"**: Por padrão vem MARCADO. Para campos opcionais, você DEVE ir em Advanced settings e DESMARCAR.
- **"Multiple media"** no Image Slider: crucial selecionar "Multiple" e não "Single"
- **Enumeration valores**: Digite cada valor em uma linha separada
- **Reiniciar**: Strapi sempre reinicia após salvar. Aguarde ~30 segundos antes de continuar.

## ⚡ Atalho

Se você configurar tudo acima (~10-12 min), o sistema estará 100% funcional e você poderá criar posts no Strapi que renderizarão dinamicamente no Next.js com animações!
