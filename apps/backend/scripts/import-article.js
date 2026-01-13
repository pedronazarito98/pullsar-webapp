const strapiFactory = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

// Ajuste o caminho para onde você salvará o JSON gerado
// Pode passar o arquivo via argumento: node scripts/import-article.js meu-artigo.json
const fileName = process.argv[2] || 'article-to-import.json';
const filePath = path.resolve(process.cwd(), fileName);

async function importArticle() {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${filePath}`);
    console.log('📌 Uso: node scripts/import-article.js <nome-do-arquivo.json>');
    process.exit(1);
  }

  const articleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`📖 Lendo arquivo: ${articleData.title}`);

  // Inicia o Strapi Instance
  const strapi = await strapiFactory.createStrapi({ distDir: './dist' }).load();

  try {
    // Helper simples para garantir slugs válidos (estrito)
    const slugify = (text) => {
      return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // separa acentos
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/[^a-z0-9]+/g, '-') // substitui não-alphanumericos por hifen
        .replace(/-+/g, '-') // remove hifens duplicados
        .replace(/^-+/, '') // remove hifen do inicio
        .replace(/-+$/, ''); // remove hifen do fim
    };

    console.log('🚀 Iniciando importação...');

    // 1. Categoria (Busca ou Cria)
    let category = null;
    if (articleData.category) {
      const existingCategories = await strapi.entityService.findMany('api::category.category', {
        filters: { name: articleData.category },
      });

      if (existingCategories.length > 0) {
        category = existingCategories[0];
        console.log(`✅ Categoria encontrada: ${category.name}`);
      } else {
        // Cria nova categoria simplificada
        category = await strapi.entityService.create('api::category.category', {
          data: {
            name: articleData.category,
            slug: slugify(articleData.category),
            description: `Categoria ${articleData.category} criada via importação.`,
          },
        });
        console.log(
          `✨ Nova categoria criada: ${category.name} (slug: ${slugify(articleData.category)})`
        );
      }
    }

    // 2. Tags (Busca ou Cria)
    const tagsIds = [];
    if (articleData.tags && Array.isArray(articleData.tags)) {
      for (const tagName of articleData.tags) {
        const existingTags = await strapi.entityService.findMany('api::tag.tag', {
          filters: { name: tagName },
        });

        if (existingTags.length > 0) {
          tagsIds.push(existingTags[0].id);
        } else {
          const newTag = await strapi.entityService.create('api::tag.tag', {
            data: {
              name: tagName,
              slug: slugify(tagName),
            },
          });
          tagsIds.push(newTag.id);
          console.log(`✨ Nova tag criada: ${tagName}`);
        }
      }
    }

    // 3. Cria o Artigo
    const rawSlug = articleData.slug || articleData.title;
    console.log(`🔍 Raw Slug: "${rawSlug}" (Type: ${typeof rawSlug})`);

    const finalSlug = slugify(rawSlug);
    console.log(`🔹 Slug final gerado: "${finalSlug}"`);

    const newArticle = await strapi.entityService.create('api::article.article', {
      data: {
        title: articleData.title,
        subtitle: articleData.subtitle,
        slug: finalSlug,
        description: articleData.description,
        readTime: articleData.readTime,
        imagePrompt: articleData.imagePrompt,
        category: category ? category.id : null,
        tags: tagsIds,
        contentBlocks: articleData.contentBlocks,
        publishedAt: null, // Salva como Rascunho (Draft)
      },
    });

    console.log(`🎉 Artigo criado com sucesso: ${newArticle.title}`);
    console.log(`🆔 ID: ${newArticle.id}`);
    console.log(`🔗 Prompt de Imagem salvo: "${newArticle.imagePrompt}"`);
  } catch (error) {
    console.error('❌ Erro na importação:', error);
  } finally {
    strapi.stop();
  }
}

importArticle();
