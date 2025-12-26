#!/usr/bin/env node

/**
 * Script de Seed para Pullsar Magazine via API REST (v2)
 *
 * Este script busca dados existentes antes de criar novos.
 *
 * USO:
 *   STRAPI_TOKEN=seu_token node scripts/seed-api.js
 */

const fs = require('fs');
const path = require('path');

const API_URL = process.env.STRAPI_URL || 'http://localhost:1337/api';
const API_TOKEN = process.env.STRAPI_TOKEN || '';

const data = require('../data/pullsar-data.json');

// Mapa para armazenar IDs (existentes ou criados)
const entityIds = {
  categories: {},
  authors: {},
  tags: {},
};

async function request(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || JSON.stringify(result));
  }

  return result;
}

// Buscar entidades existentes
async function fetchExisting(endpoint, keyField) {
  try {
    const result = await request(`${endpoint}?pagination[pageSize]=100`);
    const items = {};

    if (result.data) {
      for (const item of result.data) {
        const key = item[keyField] || item.attributes?.[keyField];
        if (key) {
          items[key] = item.id;
        }
      }
    }

    return items;
  } catch (error) {
    return {};
  }
}

async function loadExistingData() {
  console.log('📥 Carregando dados existentes...');

  entityIds.categories = await fetchExisting('/categories', 'slug');
  console.log(`   - ${Object.keys(entityIds.categories).length} categorias encontradas`);

  entityIds.authors = await fetchExisting('/authors', 'email');
  console.log(`   - ${Object.keys(entityIds.authors).length} autores encontrados`);

  entityIds.tags = await fetchExisting('/tags', 'slug');
  console.log(`   - ${Object.keys(entityIds.tags).length} tags encontradas`);
}

async function createCategories() {
  console.log('\n📁 Processando categorias...');

  for (const category of data.categories) {
    if (entityIds.categories[category.slug]) {
      console.log(`   ✓ ${category.name} (já existe, ID: ${entityIds.categories[category.slug]})`);
      continue;
    }

    try {
      const result = await request('/categories', 'POST', { data: category });
      entityIds.categories[category.slug] = result.data.id;
      console.log(`   ✓ ${category.name} (criado, ID: ${result.data.id})`);
    } catch (error) {
      console.log(`   ⚠️  ${category.name}: ${error.message}`);
    }
  }
}

async function createTags() {
  console.log('\n🏷️  Processando tags...');
  let created = 0;
  let existing = 0;

  for (const tag of data.tags) {
    if (entityIds.tags[tag.slug]) {
      existing++;
      continue;
    }

    try {
      const result = await request('/tags', 'POST', { data: tag });
      entityIds.tags[tag.slug] = result.data.id;
      created++;
    } catch (error) {
      // Silently skip
    }
  }

  console.log(`   ✓ ${existing} já existentes, ${created} criadas`);
}

async function createAuthors() {
  console.log('\n👤 Processando autores...');

  for (const author of data.authors) {
    if (entityIds.authors[author.email]) {
      console.log(`   ✓ ${author.name} (já existe, ID: ${entityIds.authors[author.email]})`);
      continue;
    }

    try {
      const { avatar, ...authorData } = author;
      const result = await request('/authors', 'POST', { data: authorData });
      entityIds.authors[author.email] = result.data.id;
      console.log(`   ✓ ${author.name} (criado, ID: ${result.data.id})`);
    } catch (error) {
      console.log(`   ⚠️  ${author.name}: ${error.message}`);
    }
  }
}

async function deleteAllArticles() {
  console.log('\n🗑️  Deletando artigos existentes (para recriar com contentBlocks)...');

  try {
    const result = await request('/articles?pagination[pageSize]=100');
    const articles = result.data || [];

    if (articles.length === 0) {
      console.log('   ✓ Nenhum artigo para deletar');
      return;
    }

    let deleted = 0;
    for (const article of articles) {
      try {
        await request(`/articles/${article.documentId}`, 'DELETE');
        deleted++;
      } catch (error) {
        console.log(`   ⚠️  Erro ao deletar artigo ${article.id}: ${error.message}`);
      }
    }

    console.log(`   ✓ ${deleted} artigos deletados`);
  } catch (error) {
    console.log(`   ⚠️  Erro ao listar artigos: ${error.message}`);
  }
}

async function createArticles() {
  console.log('\n📝 Processando artigos...');

  // Mapear índices para slugs/emails
  const categoryMap = ['cinema', 'musica', 'literatura', 'gastronomia'];
  const authorEmails = data.authors.map((a) => a.email);

  // Buscar artigos existentes
  const existingArticles = await fetchExisting('/articles', 'slug');

  let created = 0;
  let skipped = 0;

  for (const article of data.articles) {
    // Pular se já existe
    if (existingArticles[article.slug]) {
      console.log(`   ✓ ${article.title} (já existe)`);
      skipped++;
      continue;
    }

    // Resolver categoria e autor
    const categoryIndex = article.category?.id ? article.category.id - 1 : 0;
    const authorIndex = article.author?.id ? article.author.id - 1 : 0;

    const categorySlug = categoryMap[categoryIndex];
    const authorEmail = authorEmails[authorIndex];

    const categoryId = entityIds.categories[categorySlug];
    const authorId = entityIds.authors[authorEmail];
    const authorName = data.authors[authorIndex]?.name || 'Pullsar Magazine';

    if (!categoryId) {
      console.log(`   ⚠️  ${article.title}: categoria "${categorySlug}" não encontrada`);
      continue;
    }

    if (!authorId) {
      console.log(`   ⚠️  ${article.title}: autor "${authorEmail}" não encontrado`);
      continue;
    }

    // Criar contentBlocks dinâmicos baseados no artigo
    const contentBlocks = [
      {
        __component: 'blocks.rich-text',
        content: `<h2>Introdução</h2><p>${article.description}</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><h3>Por que isso importa</h3><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
      },
      {
        __component: 'blocks.quote',
        quote: 'A cultura é a chave para entender quem somos e para onde vamos.',
        author: authorName,
        role: 'Editor',
      },
      {
        __component: 'blocks.rich-text',
        content: `<h2>Desenvolvimento</h2><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p><p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p><h3>Conclusão</h3><p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>`,
      },
    ];

    const articleData = {
      title: article.title,
      subtitle: article.subtitle || '',
      slug: article.slug,
      description: article.description,
      readTime: article.readTime || '5 min de leitura',
      category: categoryId,
      author: authorId,
      contentBlocks: contentBlocks,
      publishedAt: new Date().toISOString(),
    };

    try {
      await request('/articles', 'POST', { data: articleData });
      console.log(`   ✓ ${article.title} (criado com contentBlocks)`);
      created++;
    } catch (error) {
      console.log(`   ⚠️  ${article.title}: ${error.message}`);
    }
  }

  console.log(`\n   Total: ${created} criados, ${skipped} já existentes`);
}

async function main() {
  console.log('🚀 Pullsar Magazine - Seed via API REST (v2)\n');
  console.log(`   API: ${API_URL}`);
  console.log(`   Token: ${API_TOKEN ? '✓ Configurado' : '✗ Não configurado'}\n`);

  if (!API_TOKEN) {
    console.error('❌ Token não configurado. Use:');
    console.log('   STRAPI_TOKEN=seu_token node scripts/seed-api.js');
    process.exit(1);
  }

  try {
    // Testar conexão
    console.log('🔌 Testando conexão...');
    await request('/categories');
    console.log('   ✓ Strapi está acessível');
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    process.exit(1);
  }

  try {
    await loadExistingData();
    await createCategories();
    await createTags();
    await createAuthors();
    await deleteAllArticles(); // Deletar artigos existentes para recriar com contentBlocks
    await createArticles();

    console.log('\n' + '═'.repeat(50));
    console.log('✅ Seed concluído com sucesso!');
    console.log('═'.repeat(50));
    console.log('\n📊 IDs disponíveis:');
    console.log(
      '   Categorias:',
      JSON.stringify(entityIds.categories, null, 2).replace(/\n/g, '\n   ')
    );
    console.log('   Autores:', JSON.stringify(entityIds.authors, null, 2).replace(/\n/g, '\n   '));
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

main();
