/**
 * Script de Seed para popular dados de teste no Strapi
 *
 * Uso: npx ts-node scripts/seed.ts
 * Ou adicione ao package.json: "seed": "ts-node scripts/seed.ts"
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: unknown;
}

interface StrapiEntity {
  id: number;
  documentId: string;
  slug?: string;
}

// ============================================
// DADOS DE SEED
// ============================================

const categories = [
  {
    name: 'Tecnologia',
    slug: 'tecnologia',
    description: 'Artigos sobre as últimas tendências em tecnologia, programação e inovação.',
    color: '#3B82F6',
  },
  {
    name: 'Design',
    slug: 'design',
    description: 'Dicas e tutoriais sobre UI/UX, design gráfico e ferramentas criativas.',
    color: '#8B5CF6',
  },
  {
    name: 'Negócios',
    slug: 'negocios',
    description: 'Estratégias de negócios, empreendedorismo e gestão empresarial.',
    color: '#10B981',
  },
  {
    name: 'Carreira',
    slug: 'carreira',
    description: 'Desenvolvimento profissional, mercado de trabalho e soft skills.',
    color: '#F59E0B',
  },
];

const tags = [
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'React', slug: 'react' },
  { name: 'Node.js', slug: 'nodejs' },
  { name: 'Next.js', slug: 'nextjs' },
  { name: 'CSS', slug: 'css' },
  { name: 'UI/UX', slug: 'ui-ux' },
  { name: 'Produtividade', slug: 'produtividade' },
  { name: 'Startups', slug: 'startups' },
  { name: 'IA', slug: 'ia' },
];

const authors = [
  {
    name: 'Pedro Nazarito',
    bio: 'Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis. Especialista em React, Node.js e arquitetura de software.',
  },
  {
    name: 'Ana Silva',
    bio: 'Designer de produto com mais de 8 anos de experiência em UX/UI. Apaixonada por criar interfaces intuitivas e acessíveis.',
  },
  {
    name: 'Carlos Mendes',
    bio: 'Empreendedor serial e mentor de startups. Fundador de 3 empresas de tecnologia e investidor anjo.',
  },
];

const articles = [
  {
    title: 'Introdução ao TypeScript: Por que você deveria usar em 2025',
    subtitle: 'Descubra como TypeScript pode melhorar a qualidade do seu código',
    slug: 'introducao-typescript-2025',
    description:
      'TypeScript se tornou essencial para projetos JavaScript modernos. Neste artigo, exploramos os principais benefícios e como começar a usar.',
    readTime: '8 min',
    categorySlug: 'tecnologia',
    tagSlugs: ['typescript', 'javascript'],
    authorIndex: 0,
    contentBlocks: [
      {
        __component: 'blocks.rich-text',
        content:
          '## O que é TypeScript?\n\nTypeScript é um superconjunto tipado de JavaScript que compila para JavaScript puro. Desenvolvido pela Microsoft, ele adiciona tipagem estática opcional e recursos de programação orientada a objetos.\n\n### Principais benefícios\n\n- **Detecção de erros em tempo de compilação**: Encontre bugs antes de executar o código\n- **Melhor IntelliSense**: Autocompletar mais inteligente no seu editor\n- **Refatoração segura**: Renomeie variáveis e funções com confiança\n- **Documentação viva**: Os tipos servem como documentação do código',
      },
      {
        __component: 'blocks.quote',
        quote:
          'TypeScript não é apenas sobre tipos, é sobre criar código mais seguro e manutenível.',
        author: 'Anders Hejlsberg, criador do TypeScript',
      },
      {
        __component: 'blocks.rich-text',
        content:
          '## Começando com TypeScript\n\nPara começar, instale o TypeScript globalmente:\n\n```bash\nnpm install -g typescript\n```\n\nCrie seu primeiro arquivo `.ts` e compile com:\n\n```bash\ntsc arquivo.ts\n```\n\n### Conclusão\n\nTypeScript é uma ferramenta poderosa que pode transformar a forma como você escreve JavaScript. Comece aos poucos, adicionando tipos onde faz mais sentido, e você verá os benefícios rapidamente.',
      },
    ],
  },
  {
    title: 'Design System: Como criar componentes reutilizáveis',
    subtitle: 'Um guia prático para construir seu próprio design system',
    slug: 'design-system-componentes-reutilizaveis',
    description:
      'Aprenda a criar um design system escalável que mantém consistência visual e acelera o desenvolvimento de produtos digitais.',
    readTime: '12 min',
    categorySlug: 'design',
    tagSlugs: ['ui-ux', 'css', 'react'],
    authorIndex: 1,
    contentBlocks: [
      {
        __component: 'blocks.rich-text',
        content:
          '## O que é um Design System?\n\nUm Design System é uma coleção de componentes reutilizáveis, guiados por padrões claros, que podem ser combinados para construir qualquer número de aplicações.\n\n### Por que investir em um Design System?\n\n1. **Consistência**: Garante que todos os produtos tenham a mesma aparência\n2. **Velocidade**: Componentes prontos aceleram o desenvolvimento\n3. **Escalabilidade**: Facilita manter múltiplos produtos\n4. **Colaboração**: Une designers e desenvolvedores com uma linguagem comum',
      },
      {
        __component: 'blocks.cta',
        title: 'Quer aprender mais sobre Design Systems?',
        description: 'Baixe nosso guia completo com templates e exemplos práticos.',
        buttonText: 'Baixar Guia Gratuito',
        buttonUrl: '/guias/design-system',
      },
    ],
  },
  {
    title: 'Next.js 15: Novidades e como migrar seu projeto',
    subtitle: 'Tudo sobre a nova versão do framework React mais popular',
    slug: 'nextjs-15-novidades-migracao',
    description:
      'Next.js 15 trouxe melhorias significativas de performance e novos recursos. Veja como aproveitar o máximo da nova versão.',
    readTime: '10 min',
    categorySlug: 'tecnologia',
    tagSlugs: ['nextjs', 'react', 'javascript'],
    authorIndex: 0,
    contentBlocks: [
      {
        __component: 'blocks.rich-text',
        content:
          '## Principais novidades do Next.js 15\n\n### Turbopack estável\n\nO novo bundler Turbopack agora está estável e oferece builds até 10x mais rápidos que o Webpack.\n\n### React 19 Support\n\nNext.js 15 já suporta React 19 com todas as suas novidades, incluindo Actions e o novo hook `use`.\n\n### Partial Prerendering\n\nCombine conteúdo estático e dinâmico na mesma página de forma transparente.',
      },
      {
        __component: 'blocks.quote',
        quote: 'Next.js 15 representa o futuro do desenvolvimento web fullstack com React.',
        author: 'Guillermo Rauch, CEO da Vercel',
      },
    ],
  },
  {
    title: 'Como montar uma startup de sucesso em 2025',
    subtitle: 'Lições aprendidas de quem já fundou empresas de tecnologia',
    slug: 'startup-sucesso-2025',
    description:
      'Dicas práticas para empreendedores que querem lançar sua startup no mercado de tecnologia atual.',
    readTime: '15 min',
    categorySlug: 'negocios',
    tagSlugs: ['startups', 'produtividade'],
    authorIndex: 2,
    contentBlocks: [
      {
        __component: 'blocks.rich-text',
        content:
          '## A mentalidade do empreendedor\n\nAntes de falar sobre produto ou mercado, precisamos falar sobre mentalidade. Empreender é uma maratona, não uma corrida de 100 metros.\n\n### 5 princípios fundamentais\n\n1. **Resolva um problema real**: Não crie uma solução procurando um problema\n2. **Valide antes de construir**: Teste suas hipóteses com clientes reais\n3. **Comece pequeno**: MVP é seu melhor amigo\n4. **Itere rápido**: Aprenda com o feedback e adapte\n5. **Monte o time certo**: Pessoas são mais importantes que ideias',
      },
      {
        __component: 'blocks.cta',
        title: 'Quer mentoria para sua startup?',
        description: 'Agende uma sessão gratuita de 30 minutos para discutir sua ideia.',
        buttonText: 'Agendar Mentoria',
        buttonUrl: '/mentoria',
      },
    ],
  },
  {
    title: 'Inteligência Artificial para desenvolvedores: Um guia prático',
    subtitle: 'Como usar IA no seu dia a dia de programação',
    slug: 'ia-desenvolvedores-guia-pratico',
    description:
      'Ferramentas de IA estão transformando o desenvolvimento de software. Aprenda a usar GitHub Copilot, ChatGPT e outras ferramentas de forma eficiente.',
    readTime: '10 min',
    categorySlug: 'tecnologia',
    tagSlugs: ['ia', 'produtividade', 'javascript'],
    authorIndex: 0,
    contentBlocks: [
      {
        __component: 'blocks.rich-text',
        content:
          '## A revolução da IA no desenvolvimento\n\nFerramentas como GitHub Copilot e Claude estão mudando a forma como escrevemos código. Mas como usar essas ferramentas de forma eficiente?\n\n### Dicas para usar IA no código\n\n- **Seja específico nos prompts**: Quanto mais contexto, melhor o resultado\n- **Revise sempre**: IA pode gerar código incorreto ou inseguro\n- **Use para aprender**: Peça explicações sobre código que você não entende\n- **Automatize o tedioso**: Deixe a IA cuidar de boilerplate',
      },
      {
        __component: 'blocks.quote',
        quote:
          'IA não vai substituir desenvolvedores, mas desenvolvedores que usam IA vão substituir os que não usam.',
        author: 'Sam Altman, CEO da OpenAI',
      },
    ],
  },
];

// ============================================
// FUNÇÕES DE API
// ============================================

async function createEntity<T>(
  endpoint: string,
  data: Record<string, unknown>
): Promise<StrapiResponse<T & StrapiEntity>> {
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Erro ao criar ${endpoint}: ${JSON.stringify(error)}`);
  }

  return response.json() as Promise<StrapiResponse<T & StrapiEntity>>;
}

async function publishEntity(endpoint: string, documentId: string): Promise<void> {
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}/${documentId}/actions/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.warn(`Aviso: Não foi possível publicar ${endpoint}/${documentId}`);
  }
}

async function getEntities<T>(endpoint: string): Promise<StrapiResponse<T[]>> {
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}?pagination[limit]=100`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar ${endpoint}`);
  }
  return response.json() as Promise<StrapiResponse<T[]>>;
}

// ============================================
// FUNÇÕES DE SEED
// ============================================

async function seedCategories(): Promise<Map<string, number>> {
  console.log('\n📁 Criando categorias...');
  const slugToId = new Map<string, number>();

  for (const category of categories) {
    try {
      const result = await createEntity<{ slug: string }>('categories', category);
      slugToId.set(category.slug, result.data.id);
      console.log(`  ✅ Categoria criada: ${category.name}`);
    } catch (error) {
      console.log(`  ⚠️ Categoria já existe ou erro: ${category.name}`);
    }
  }

  // Buscar categorias existentes para pegar os IDs
  const existing = await getEntities<{ id: number; slug: string }>('categories');
  existing.data.forEach((cat) => {
    slugToId.set(cat.slug, cat.id);
  });

  return slugToId;
}

async function seedTags(): Promise<Map<string, number>> {
  console.log('\n🏷️ Criando tags...');
  const slugToId = new Map<string, number>();

  for (const tag of tags) {
    try {
      const result = await createEntity<{ slug: string }>('tags', tag);
      slugToId.set(tag.slug, result.data.id);
      console.log(`  ✅ Tag criada: ${tag.name}`);
    } catch (error) {
      console.log(`  ⚠️ Tag já existe ou erro: ${tag.name}`);
    }
  }

  // Buscar tags existentes
  const existing = await getEntities<{ id: number; slug: string }>('tags');
  existing.data.forEach((tag) => {
    slugToId.set(tag.slug, tag.id);
  });

  return slugToId;
}

async function seedAuthors(): Promise<number[]> {
  console.log('\n👤 Criando autores...');
  const ids: number[] = [];

  for (const author of authors) {
    try {
      const result = await createEntity<object>('authors', author);
      ids.push(result.data.id);
      // Publicar autor
      await publishEntity('authors', result.data.documentId);
      console.log(`  ✅ Autor criado e publicado: ${author.name}`);
    } catch (error) {
      console.log(`  ⚠️ Autor já existe ou erro: ${author.name}`);
    }
  }

  // Se não conseguiu criar, buscar existentes
  if (ids.length === 0) {
    const existing = await getEntities<{ id: number }>('authors');
    existing.data.forEach((author) => {
      ids.push(author.id);
    });
  }

  return ids;
}

async function seedArticles(
  categoryMap: Map<string, number>,
  tagMap: Map<string, number>,
  authorIds: number[]
): Promise<void> {
  console.log('\n📝 Criando artigos...');

  for (const article of articles) {
    const categoryId = categoryMap.get(article.categorySlug);
    const tagIds = article.tagSlugs
      .map((slug) => tagMap.get(slug))
      .filter((id): id is number => !!id);
    const authorId = authorIds[article.authorIndex] || authorIds[0];

    const articleData = {
      title: article.title,
      subtitle: article.subtitle,
      slug: article.slug,
      description: article.description,
      readTime: article.readTime,
      views: Math.floor(Math.random() * 5000) + 100,
      category: categoryId ? { connect: [{ id: categoryId }] } : undefined,
      tags: tagIds.length > 0 ? { connect: tagIds.map((id) => ({ id })) } : undefined,
      author: authorId ? { connect: [{ id: authorId }] } : undefined,
      contentBlocks: article.contentBlocks,
    };

    try {
      const result = await createEntity<object>('articles', articleData);
      // Publicar artigo
      await publishEntity('articles', result.data.documentId);
      console.log(`  ✅ Artigo criado e publicado: ${article.title}`);
    } catch (error) {
      console.log(`  ⚠️ Artigo já existe ou erro: ${article.title}`);
      if (error instanceof Error) {
        console.log(`     Detalhes: ${error.message}`);
      }
    }
  }
}

// ============================================
// EXECUÇÃO PRINCIPAL
// ============================================

async function main() {
  console.log('🌱 Iniciando seed do Strapi...');
  console.log(`📡 URL do Strapi: ${STRAPI_URL}`);

  try {
    // Verificar conexão com Strapi
    const healthCheck = await fetch(`${STRAPI_URL}/api/categories`);
    if (!healthCheck.ok) {
      throw new Error(
        'Não foi possível conectar ao Strapi. Verifique se ele está rodando e as permissões estão configuradas.'
      );
    }

    // Executar seeds na ordem correta (dependências primeiro)
    const categoryMap = await seedCategories();
    const tagMap = await seedTags();
    const authorIds = await seedAuthors();
    await seedArticles(categoryMap, tagMap, authorIds);

    console.log('\n✅ Seed concluído com sucesso!');
    console.log('\n📊 Resumo:');
    console.log(`   - ${categories.length} categorias`);
    console.log(`   - ${tags.length} tags`);
    console.log(`   - ${authors.length} autores`);
    console.log(`   - ${articles.length} artigos`);
  } catch (error) {
    console.error('\n❌ Erro durante o seed:', error);
    process.exit(1);
  }
}

main();
