'use strict';

/**
 * Script de Seed para Pullsar Magazine
 *
 * Este script popula o Strapi com os dados do magazine cultural.
 *
 * USO:
 *   cd apps/backend
 *   node scripts/seed-pullsar.js
 *
 * NOTA: O Strapi NÃO precisa estar rodando. O script carrega o Strapi internamente.
 */

const fs = require('fs-extra');
const path = require('path');
const { categories, tags, authors, articles, global, about } = require('../data/pullsar-data.json');

async function seedPullsarApp() {
  const shouldImportSeedData = await isFirstRun();

  if (!shouldImportSeedData) {
    console.log('⚠️  Dados já foram importados anteriormente.');
    console.log('   Para reimportar, limpe o banco de dados primeiro.');
    console.log('   Você pode deletar o arquivo database/.tmp/data.db e rodar novamente.\n');

    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const answer = await new Promise((resolve) => {
      rl.question('Deseja forçar a reimportação? (s/N): ', resolve);
    });
    rl.close();

    if (answer.toLowerCase() !== 's') {
      console.log('Operação cancelada.');
      return;
    }

    // Reset o flag para permitir reimportação
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'type',
      name: 'setup',
    });
    await pluginStore.set({ key: 'initHasRun', value: false });
  }

  try {
    console.log('🚀 Iniciando seed do Pullsar Magazine...\n');
    await importSeedData();
    console.log('\n✅ Seed concluído com sucesso!');
    console.log('   Agora você pode acessar o admin em http://localhost:1337/admin');
  } catch (error) {
    console.error('❌ Erro ao importar dados:', error);
    throw error;
  }
}

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: 'type',
    name: 'setup',
  });
  const initHasRun = await pluginStore.get({ key: 'initHasRun' });
  await pluginStore.set({ key: 'initHasRun', value: true });
  return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
  console.log('🔓 Configurando permissões públicas...');

  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query('plugin::users-permissions.permission').create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });

  await Promise.all(allPermissionsToCreate);
  console.log('   ✓ Permissões configuradas');
}

async function createEntry({ model, entry }) {
  try {
    const result = await strapi.documents(`api::${model}.${model}`).create({
      data: entry,
    });
    return result;
  } catch (error) {
    console.error(`   ⚠️  Erro ao criar ${model}:`, error.message);
    return null;
  }
}

async function importCategories() {
  console.log('📁 Importando categorias...');
  const createdCategories = [];

  for (const category of categories) {
    const result = await createEntry({ model: 'category', entry: category });
    if (result) {
      createdCategories.push(result);
      console.log(`   ✓ ${category.name}`);
    }
  }

  return createdCategories;
}

async function importTags() {
  console.log('🏷️  Importando tags...');
  const createdTags = [];

  // Verificar se o modelo tag existe
  try {
    for (const tag of tags) {
      const result = await createEntry({ model: 'tag', entry: tag });
      if (result) {
        createdTags.push(result);
      }
    }
    console.log(`   ✓ ${createdTags.length} tags criadas`);
  } catch (error) {
    console.log('   ⚠️  Modelo Tag não encontrado, pulando...');
  }

  return createdTags;
}

async function importAuthors() {
  console.log('👤 Importando autores...');
  const createdAuthors = [];

  for (const author of authors) {
    // Remover referência ao avatar por enquanto (precisa de upload)
    const { avatar, ...authorData } = author;
    const result = await createEntry({ model: 'author', entry: authorData });
    if (result) {
      createdAuthors.push(result);
      console.log(`   ✓ ${author.name}`);
    }
  }

  return createdAuthors;
}

async function importArticles(createdCategories, createdAuthors) {
  console.log('📝 Importando artigos...');

  for (const article of articles) {
    // Mapear IDs de categoria e autor
    const categoryIndex = article.category?.id ? article.category.id - 1 : 0;
    const authorIndex = article.author?.id ? article.author.id - 1 : 0;

    const category = createdCategories[categoryIndex];
    const author = createdAuthors[authorIndex];

    if (!category || !author) {
      console.log(`   ⚠️  Pulando "${article.title}" - categoria ou autor não encontrado`);
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
        author: author.name || 'Pullsar Magazine',
        role: 'Editor',
      },
      {
        __component: 'blocks.rich-text',
        content: `<h2>Desenvolvimento</h2><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p><p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p><h3>Conclusão</h3><p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>`,
      },
    ];

    const articleData = {
      title: article.title,
      subtitle: article.subtitle,
      slug: article.slug,
      description: article.description,
      readTime: article.readTime,
      category: category.documentId,
      author: author.documentId,
      contentBlocks: contentBlocks,
      publishedAt: new Date().toISOString(),
    };

    const result = await createEntry({ model: 'article', entry: articleData });
    if (result) {
      console.log(`   ✓ ${article.title}`);
    }
  }
}

async function importGlobal() {
  console.log('🌐 Importando configurações globais...');

  try {
    await createEntry({
      model: 'global',
      entry: {
        ...global,
        publishedAt: new Date().toISOString(),
      },
    });
    console.log('   ✓ Configurações globais');
  } catch (error) {
    console.log('   ⚠️  Modelo Global não encontrado, pulando...');
  }
}

async function importAbout() {
  console.log('ℹ️  Importando página Sobre...');

  try {
    await createEntry({
      model: 'about',
      entry: {
        ...about,
        publishedAt: new Date().toISOString(),
      },
    });
    console.log('   ✓ Página Sobre');
  } catch (error) {
    console.log('   ⚠️  Modelo About não encontrado, pulando...');
  }
}

async function importSeedData() {
  // Configurar permissões públicas
  await setPublicPermissions({
    article: ['find', 'findOne'],
    category: ['find', 'findOne'],
    author: ['find', 'findOne'],
    tag: ['find', 'findOne'],
    global: ['find', 'findOne'],
    about: ['find', 'findOne'],
  });

  // Criar entradas na ordem correta (por causa das relações)
  const createdCategories = await importCategories();
  const createdTags = await importTags();
  const createdAuthors = await importAuthors();
  await importArticles(createdCategories, createdAuthors);
  await importGlobal();
  await importAbout();

  console.log('\n📊 Resumo:');
  console.log(`   - ${createdCategories.length} categorias`);
  console.log(`   - ${createdTags.length} tags`);
  console.log(`   - ${createdAuthors.length} autores`);
  console.log(`   - ${articles.length} artigos`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');

  console.log('⏳ Carregando Strapi...\n');

  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  // Silenciar logs do Strapi
  app.log.level = 'error';

  // Tornar strapi global para as funções
  global.strapi = app;

  await seedPullsarApp();
  await app.destroy();

  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
