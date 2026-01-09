/**
 * Seed Script - Pullsar CMS
 *
 * Este script popula o banco de dados com dados de exemplo.
 * Execute com: pnpm strapi console < src/seed/seed.ts
 *
 * Ou importe a função e execute no bootstrap do Strapi.
 */

interface SeedAuthor {
  name: string;
  bio: string;
}

interface SeedTag {
  name: string;
  slug: string;
}

interface SeedCategory {
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface SeedArticle {
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  readTime: string;
  views: number;
  categorySlug: string;
  authorIndex: number;
  tags: string[];
}

export const seedAuthors: SeedAuthor[] = [
  {
    name: 'Clara Monteiro',
    bio: 'Crítica de cinema e cultura pop. Mestre em Cinema pela USP, escreve sobre filmes há mais de 10 anos.',
  },
  {
    name: 'Rafael Santos',
    bio: 'Jornalista musical e DJ. Cobre a cena musical brasileira e internacional desde 2015.',
  },
  {
    name: 'Marina Costa',
    bio: 'Escritora e crítica literária. Autora de dois livros de contos e colaboradora de revistas culturais.',
  },
  {
    name: 'Lucas Oliveira',
    bio: 'Crítico gastronômico e sommelier. Já visitou mais de 500 restaurantes pelo Brasil.',
  },
];

export const seedTags: SeedTag[] = [
  { name: 'Cinema de Arte', slug: 'cinema-de-arte' },
  { name: 'Diretores', slug: 'diretores' },
  { name: 'Oscar', slug: 'oscar' },
  { name: 'Premiações', slug: 'premiacoes' },
  { name: 'Streaming', slug: 'streaming' },
  { name: 'Tecnologia', slug: 'tecnologia' },
  { name: 'Festivais', slug: 'festivais' },
  { name: 'Shows', slug: 'shows' },
  { name: 'MPB', slug: 'mpb' },
  { name: 'Artistas', slug: 'artistas' },
  { name: 'Vinil', slug: 'vinil' },
  { name: 'Áudio', slug: 'audio' },
  { name: 'Livros', slug: 'livros' },
  { name: 'Lançamentos', slug: 'lancamentos' },
  { name: 'Autoras', slug: 'autoras' },
  { name: 'Brasil', slug: 'brasil' },
  { name: 'Clubes', slug: 'clubes' },
  { name: 'Comunidade', slug: 'comunidade' },
  { name: 'Restaurantes', slug: 'restaurantes' },
  { name: 'São Paulo', slug: 'sao-paulo' },
  { name: 'Vinhos', slug: 'vinhos' },
  { name: 'Bebidas', slug: 'bebidas' },
  { name: 'Chefs', slug: 'chefs' },
  { name: 'Internacional', slug: 'internacional' },
];

export const seedCategories: SeedCategory[] = [
  {
    name: 'Cinema',
    slug: 'cinema',
    description: 'Críticas, análises e notícias do mundo cinematográfico',
    color: '#722F37',
  },
  {
    name: 'Música',
    slug: 'musica',
    description: 'Shows, álbuns e artistas que movem a cena musical',
    color: '#1E3A5F',
  },
  {
    name: 'Literatura',
    slug: 'literatura',
    description: 'Livros, autores e tendências literárias',
    color: '#2D5016',
  },
  {
    name: 'Gastronomia',
    slug: 'gastronomia',
    description: 'Restaurantes, chefs e cultura gastronômica',
    color: '#8B4513',
  },
];

export const seedArticles: SeedArticle[] = [
  // Cinema
  {
    title: 'O Renascimento do Cinema de Arte',
    subtitle: 'Uma nova geração redefine a narrativa visual',
    slug: 'cinema-renascimento',
    description:
      'Uma nova geração de cineastas está redefinindo os limites da narrativa visual, trazendo de volta a essência experimental que marcou as grandes obras do século passado.',
    readTime: '8 min de leitura',
    views: 12450,
    categorySlug: 'cinema',
    authorIndex: 0,
    tags: ['cinema-de-arte', 'diretores'],
  },
  {
    title: 'As Apostas Para o Oscar 2025',
    subtitle: 'Análise dos favoritos da temporada',
    slug: 'apostas-oscar-2025',
    description:
      'Com a temporada de premiações a todo vapor, analisamos os filmes e performances que devem dominar a cerimônia do Oscar.',
    readTime: '6 min de leitura',
    views: 8920,
    categorySlug: 'cinema',
    authorIndex: 0,
    tags: ['oscar', 'premiacoes'],
  },
  {
    title: 'O Futuro do Streaming em 2025',
    subtitle: 'Como as plataformas estão mudando o consumo de filmes',
    slug: 'futuro-streaming-2025',
    description:
      'Análise profunda sobre as transformações no mercado de streaming e como isso afeta a produção e distribuição cinematográfica.',
    readTime: '10 min de leitura',
    views: 6780,
    categorySlug: 'cinema',
    authorIndex: 0,
    tags: ['streaming', 'tecnologia'],
  },
  // Música
  {
    title: 'Guia Completo: Festivais de Verão 2025',
    subtitle: 'Os melhores eventos musicais da temporada',
    slug: 'festivais-verao-2025',
    description:
      'De Lollapalooza a Rock in Rio, confira tudo sobre os festivais que vão agitar o Brasil neste verão.',
    readTime: '7 min de leitura',
    views: 15320,
    categorySlug: 'musica',
    authorIndex: 1,
    tags: ['festivais', 'shows'],
  },
  {
    title: 'A Nova Geração da MPB',
    subtitle: 'Artistas que estão reinventando a música brasileira',
    slug: 'mpb-nova-geracao',
    description:
      'Conheça os novos nomes que estão levando a MPB para novos territórios sonoros sem perder a essência.',
    readTime: '9 min de leitura',
    views: 9840,
    categorySlug: 'musica',
    authorIndex: 1,
    tags: ['mpb', 'artistas'],
  },
  {
    title: 'O Retorno do Vinil: Nostalgia ou Qualidade?',
    subtitle: 'Por que os discos de vinil voltaram a conquistar o público',
    slug: 'vinil-retorno',
    description:
      'Investigamos o fenômeno do retorno do vinil e conversamos com colecionadores e especialistas sobre o formato.',
    readTime: '6 min de leitura',
    views: 7230,
    categorySlug: 'musica',
    authorIndex: 1,
    tags: ['vinil', 'audio'],
  },
  // Literatura
  {
    title: 'Os 10 Livros Mais Esperados de 2025',
    subtitle: 'Lançamentos imperdíveis para sua estante',
    slug: 'livros-esperados-2025',
    description:
      'Selecionamos os lançamentos literários mais aguardados do ano, de ficção a ensaios.',
    readTime: '8 min de leitura',
    views: 11200,
    categorySlug: 'literatura',
    authorIndex: 2,
    tags: ['livros', 'lancamentos'],
  },
  {
    title: 'Autoras Brasileiras em Destaque',
    subtitle: 'Vozes femininas que dominam a cena literária',
    slug: 'autoras-brasileiras-destaque',
    description:
      'Perfis das escritoras brasileiras que estão conquistando prêmios e leitores ao redor do mundo.',
    readTime: '7 min de leitura',
    views: 8450,
    categorySlug: 'literatura',
    authorIndex: 2,
    tags: ['autoras', 'brasil'],
  },
  {
    title: 'Clubes de Leitura: A Nova Tendência Social',
    subtitle: 'Como os grupos de discussão literária estão crescendo',
    slug: 'clubes-leitura-tendencia',
    description:
      'Os clubes de leitura estão se tornando espaços de conexão e debate cultural nas grandes cidades.',
    readTime: '5 min de leitura',
    views: 5670,
    categorySlug: 'literatura',
    authorIndex: 2,
    tags: ['clubes', 'comunidade'],
  },
  // Gastronomia
  {
    title: 'Os Melhores Restaurantes de São Paulo em 2025',
    subtitle: 'Guia definitivo para os amantes da boa mesa',
    slug: 'melhores-restaurantes-sp-2025',
    description:
      'Nossa seleção dos restaurantes que estão definindo a cena gastronômica paulistana.',
    readTime: '10 min de leitura',
    views: 18900,
    categorySlug: 'gastronomia',
    authorIndex: 3,
    tags: ['restaurantes', 'sao-paulo'],
  },
  {
    title: 'Vinhos Naturais: O Movimento Que Chegou Para Ficar',
    subtitle: 'Entenda a revolução no mundo dos vinhos',
    slug: 'vinhos-naturais-movimento',
    description:
      'Os vinhos naturais conquistam paladares exigentes com sua produção artesanal e sabores únicos.',
    readTime: '8 min de leitura',
    views: 7340,
    categorySlug: 'gastronomia',
    authorIndex: 3,
    tags: ['vinhos', 'bebidas'],
  },
  {
    title: 'Chefs Brasileiros no Cenário Internacional',
    subtitle: 'Os talentos que estão conquistando o mundo',
    slug: 'chefs-brasileiros-internacional',
    description: 'Brasileiros comandam cozinhas em restaurantes estrelados ao redor do mundo.',
    readTime: '6 min de leitura',
    views: 6120,
    categorySlug: 'gastronomia',
    authorIndex: 3,
    tags: ['chefs', 'internacional'],
  },
];

// Função exemplo para usar no bootstrap do Strapi
// Descomente e adicione ao src/index.ts se quiser rodar automaticamente
/*
export async function seedDatabase(strapi) {
  console.log('🌱 Starting database seed...');
  
  // Check if data already exists
  const existingCategories = await strapi.documents('api::category.category').findMany();
  if (existingCategories.length > 0) {
    console.log('⏭️  Database already has data, skipping seed.');
    return;
  }

  // Create Authors
  const createdAuthors = [];
  for (const author of seedAuthors) {
    const created = await strapi.documents('api::author.author').create({
      data: { ...author, publishedAt: new Date() },
    });
    createdAuthors.push(created);
    console.log(`✅ Created author: ${author.name}`);
  }

  // Create Tags
  const createdTags = {};
  for (const tag of seedTags) {
    const created = await strapi.documents('api::tag.tag').create({
      data: tag,
    });
    createdTags[tag.slug] = created;
    console.log(`✅ Created tag: ${tag.name}`);
  }

  // Create Categories
  const createdCategories = {};
  for (const category of seedCategories) {
    const created = await strapi.documents('api::category.category').create({
      data: category,
    });
    createdCategories[category.slug] = created;
    console.log(`✅ Created category: ${category.name}`);
  }

  // Create Articles
  for (const article of seedArticles) {
    const author = createdAuthors[article.authorIndex];
    const category = createdCategories[article.categorySlug];
    const tags = article.tags.map(slug => createdTags[slug]).filter(Boolean);

    await strapi.documents('api::article.article').create({
      data: {
        title: article.title,
        subtitle: article.subtitle,
        slug: article.slug,
        description: article.description,
        readTime: article.readTime,
        views: article.views,
        author: author.documentId,
        category: category.documentId,
        tags: tags.map(t => t.documentId),
        publishedAt: new Date(),
        contentBlocks: [
          {
            __component: 'blocks.rich-text',
            content: `<p>${article.description}</p><p>Este é um conteúdo de exemplo gerado automaticamente.</p>`,
          },
        ],
      },
    });
    console.log(`✅ Created article: ${article.title}`);
  }

  console.log('🎉 Database seed completed!');
}
*/
