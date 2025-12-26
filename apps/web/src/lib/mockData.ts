import { Article } from '@/hooks/useArticles';
import { Category } from '@/hooks/useCategories';

/**
 * ============================================================================
 * DADOS MOCKADOS - Estrutura para Integração com Back-End
 * ============================================================================
 *
 * Este arquivo contém dados mockados que simulam as respostas da API.
 * O time de back-end deve implementar endpoints que retornem dados neste formato.
 *
 * ENDPOINTS ESPERADOS:
 * - GET /api/categories?populate=* -> Retorna lista de categorias com artigos
 * - GET /api/articles?populate=* -> Retorna lista de artigos
 * - GET /api/articles?filters[slug][$eq]={slug}&populate=* -> Artigo único
 *
 * ============================================================================
 */

// ============================================================================
// AUTORES
// ============================================================================

interface MockAuthor {
  id: number;
  documentId: string;
  name: string;
  bio: string;
  avatar: {
    url: string;
  };
}

export const mockAuthors: MockAuthor[] = [
  {
    id: 1,
    documentId: 'author-clara-monteiro',
    name: 'Clara Monteiro',
    bio: 'Crítica de cinema e cultura pop. Mestre em Cinema pela USP, escreve sobre filmes há mais de 10 anos.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
  },
  {
    id: 2,
    documentId: 'author-rafael-santos',
    name: 'Rafael Santos',
    bio: 'Jornalista musical e DJ. Cobre a cena musical brasileira e internacional desde 2015.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
  },
  {
    id: 3,
    documentId: 'author-marina-costa',
    name: 'Marina Costa',
    bio: 'Escritora e crítica literária. Autora de dois livros de contos e colaboradora de revistas culturais.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    },
  },
  {
    id: 4,
    documentId: 'author-lucas-oliveira',
    name: 'Lucas Oliveira',
    bio: 'Crítico gastronômico e sommelier. Já visitou mais de 500 restaurantes pelo Brasil.',
    avatar: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    },
  },
];

// ============================================================================
// ARTIGOS POR CATEGORIA
// ============================================================================

const cinemaArticles: Article[] = [
  {
    id: 1,
    documentId: 'art-cinema-renascimento',
    title: 'O Renascimento do Cinema de Arte',
    subtitle: 'Uma nova geração redefine a narrativa visual',
    description:
      'Uma nova geração de cineastas está redefinindo os limites da narrativa visual, trazendo de volta a essência experimental que marcou as grandes obras do século passado.',
    excerpt:
      'Uma nova geração de cineastas está redefinindo os limites da narrativa visual, trazendo de volta a essência experimental que marcou as grandes obras do século passado.',
    slug: 'cinema-renascimento',
    readTime: '8 min de leitura',
    views: 12450,
    publishedAt: '2025-12-20T10:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1666698907755-672d406ea71d?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[0].name,
      avatar: mockAuthors[0].avatar,
      bio: mockAuthors[0].bio,
    },
    category: {
      name: 'Cinema',
      slug: 'cinema',
      color: '#722F37',
    },
    tags: [
      { name: 'Cinema de Arte', slug: 'cinema-de-arte' },
      { name: 'Diretores', slug: 'diretores' },
    ],
  },
  {
    id: 2,
    documentId: 'art-oscar-2025',
    title: 'As Apostas Para o Oscar 2025',
    subtitle: 'Análise dos favoritos da temporada',
    description:
      'Com a temporada de premiações a todo vapor, analisamos os filmes e performances que devem dominar a cerimônia do Oscar.',
    excerpt:
      'Com a temporada de premiações a todo vapor, analisamos os filmes e performances que devem dominar a cerimônia do Oscar.',
    slug: 'apostas-oscar-2025',
    readTime: '6 min de leitura',
    views: 8920,
    publishedAt: '2025-12-18T14:30:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1585951237313-1979e4df7385?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[0].name,
      avatar: mockAuthors[0].avatar,
    },
    category: {
      name: 'Cinema',
      slug: 'cinema',
      color: '#722F37',
    },
    tags: [
      { name: 'Oscar', slug: 'oscar' },
      { name: 'Premiações', slug: 'premiacoes' },
    ],
  },
  {
    id: 3,
    documentId: 'art-streaming-futuro',
    title: 'O Futuro do Streaming em 2025',
    subtitle: 'Como as plataformas estão mudando o consumo de filmes',
    description:
      'Análise profunda sobre as transformações no mercado de streaming e como isso afeta a produção e distribuição cinematográfica.',
    excerpt:
      'Análise profunda sobre as transformações no mercado de streaming e como isso afeta a produção e distribuição cinematográfica.',
    slug: 'futuro-streaming-2025',
    readTime: '10 min de leitura',
    views: 6780,
    publishedAt: '2025-12-15T09:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[0].name,
      avatar: mockAuthors[0].avatar,
    },
    category: {
      name: 'Cinema',
      slug: 'cinema',
      color: '#722F37',
    },
    tags: [
      { name: 'Streaming', slug: 'streaming' },
      { name: 'Tecnologia', slug: 'tecnologia' },
    ],
  },
];

const musicaArticles: Article[] = [
  {
    id: 4,
    documentId: 'art-festivais-verao',
    title: 'Guia Completo: Festivais de Verão 2025',
    subtitle: 'Os melhores eventos musicais da temporada',
    description:
      'De Lollapalooza a Rock in Rio, confira tudo sobre os festivais que vão agitar o Brasil neste verão.',
    excerpt:
      'De Lollapalooza a Rock in Rio, confira tudo sobre os festivais que vão agitar o Brasil neste verão.',
    slug: 'festivais-verao-2025',
    readTime: '7 min de leitura',
    views: 15320,
    publishedAt: '2025-12-22T08:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[1].name,
      avatar: mockAuthors[1].avatar,
      bio: mockAuthors[1].bio,
    },
    category: {
      name: 'Música',
      slug: 'musica',
      color: '#1E3A5F',
    },
    tags: [
      { name: 'Festivais', slug: 'festivais' },
      { name: 'Shows', slug: 'shows' },
    ],
  },
  {
    id: 5,
    documentId: 'art-mpb-nova-geracao',
    title: 'A Nova Geração da MPB',
    subtitle: 'Artistas que estão reinventando a música brasileira',
    description:
      'Conheça os novos nomes que estão levando a MPB para novos territórios sonoros sem perder a essência.',
    excerpt:
      'Conheça os novos nomes que estão levando a MPB para novos territórios sonoros sem perder a essência.',
    slug: 'mpb-nova-geracao',
    readTime: '9 min de leitura',
    views: 9840,
    publishedAt: '2025-12-19T11:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[1].name,
      avatar: mockAuthors[1].avatar,
    },
    category: {
      name: 'Música',
      slug: 'musica',
      color: '#1E3A5F',
    },
    tags: [
      { name: 'MPB', slug: 'mpb' },
      { name: 'Artistas', slug: 'artistas' },
    ],
  },
  {
    id: 6,
    documentId: 'art-vinil-retorno',
    title: 'O Retorno do Vinil: Nostalgia ou Qualidade?',
    subtitle: 'Por que os discos de vinil voltaram a conquistar o público',
    description:
      'Investigamos o fenômeno do retorno do vinil e conversamos com colecionadores e especialistas sobre o formato.',
    excerpt:
      'Investigamos o fenômeno do retorno do vinil e conversamos com colecionadores e especialistas sobre o formato.',
    slug: 'vinil-retorno',
    readTime: '6 min de leitura',
    views: 7230,
    publishedAt: '2025-12-16T16:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[1].name,
      avatar: mockAuthors[1].avatar,
    },
    category: {
      name: 'Música',
      slug: 'musica',
      color: '#1E3A5F',
    },
    tags: [
      { name: 'Vinil', slug: 'vinil' },
      { name: 'Áudio', slug: 'audio' },
    ],
  },
];

const literaturaArticles: Article[] = [
  {
    id: 7,
    documentId: 'art-livros-2025',
    title: 'Os 10 Livros Mais Esperados de 2025',
    subtitle: 'Lançamentos imperdíveis para sua estante',
    description:
      'Selecionamos os lançamentos literários mais aguardados do ano, de ficção a ensaios.',
    excerpt: 'Selecionamos os lançamentos literários mais aguardados do ano, de ficção a ensaios.',
    slug: 'livros-esperados-2025',
    readTime: '8 min de leitura',
    views: 11200,
    publishedAt: '2025-12-21T10:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[2].name,
      avatar: mockAuthors[2].avatar,
      bio: mockAuthors[2].bio,
    },
    category: {
      name: 'Literatura',
      slug: 'literatura',
      color: '#2D5016',
    },
    tags: [
      { name: 'Livros', slug: 'livros' },
      { name: 'Lançamentos', slug: 'lancamentos' },
    ],
  },
  {
    id: 8,
    documentId: 'art-autoras-brasileiras',
    title: 'Autoras Brasileiras em Destaque',
    subtitle: 'Vozes femininas que dominam a cena literária',
    description:
      'Perfis das escritoras brasileiras que estão conquistando prêmios e leitores ao redor do mundo.',
    excerpt:
      'Perfis das escritoras brasileiras que estão conquistando prêmios e leitores ao redor do mundo.',
    slug: 'autoras-brasileiras-destaque',
    readTime: '7 min de leitura',
    views: 8450,
    publishedAt: '2025-12-17T13:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[2].name,
      avatar: mockAuthors[2].avatar,
    },
    category: {
      name: 'Literatura',
      slug: 'literatura',
      color: '#2D5016',
    },
    tags: [
      { name: 'Autoras', slug: 'autoras' },
      { name: 'Brasil', slug: 'brasil' },
    ],
  },
  {
    id: 9,
    documentId: 'art-clubes-leitura',
    title: 'Clubes de Leitura: A Nova Tendência Social',
    subtitle: 'Como os grupos de discussão literária estão crescendo',
    description:
      'Os clubes de leitura estão se tornando espaços de conexão e debate cultural nas grandes cidades.',
    excerpt:
      'Os clubes de leitura estão se tornando espaços de conexão e debate cultural nas grandes cidades.',
    slug: 'clubes-leitura-tendencia',
    readTime: '5 min de leitura',
    views: 5670,
    publishedAt: '2025-12-14T15:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[2].name,
      avatar: mockAuthors[2].avatar,
    },
    category: {
      name: 'Literatura',
      slug: 'literatura',
      color: '#2D5016',
    },
    tags: [
      { name: 'Clubes', slug: 'clubes' },
      { name: 'Comunidade', slug: 'comunidade' },
    ],
  },
];

const gastronomiaArticles: Article[] = [
  {
    id: 10,
    documentId: 'art-restaurantes-2025',
    title: 'Os Melhores Restaurantes de São Paulo em 2025',
    subtitle: 'Guia definitivo para os amantes da boa mesa',
    description:
      'Nossa seleção dos restaurantes que estão definindo a cena gastronômica paulistana.',
    excerpt: 'Nossa seleção dos restaurantes que estão definindo a cena gastronômica paulistana.',
    slug: 'melhores-restaurantes-sp-2025',
    readTime: '10 min de leitura',
    views: 18900,
    publishedAt: '2025-12-23T09:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[3].name,
      avatar: mockAuthors[3].avatar,
      bio: mockAuthors[3].bio,
    },
    category: {
      name: 'Gastronomia',
      slug: 'gastronomia',
      color: '#8B4513',
    },
    tags: [
      { name: 'Restaurantes', slug: 'restaurantes' },
      { name: 'São Paulo', slug: 'sao-paulo' },
    ],
  },
  {
    id: 11,
    documentId: 'art-vinhos-naturais',
    title: 'Vinhos Naturais: O Movimento Que Chegou Para Ficar',
    subtitle: 'Entenda a revolução no mundo dos vinhos',
    description:
      'Os vinhos naturais conquistam paladares exigentes com sua produção artesanal e sabores únicos.',
    excerpt:
      'Os vinhos naturais conquistam paladares exigentes com sua produção artesanal e sabores únicos.',
    slug: 'vinhos-naturais-movimento',
    readTime: '8 min de leitura',
    views: 7340,
    publishedAt: '2025-12-19T17:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[3].name,
      avatar: mockAuthors[3].avatar,
    },
    category: {
      name: 'Gastronomia',
      slug: 'gastronomia',
      color: '#8B4513',
    },
    tags: [
      { name: 'Vinhos', slug: 'vinhos' },
      { name: 'Bebidas', slug: 'bebidas' },
    ],
  },
  {
    id: 12,
    documentId: 'art-chefs-brasileiros',
    title: 'Chefs Brasileiros no Cenário Internacional',
    subtitle: 'Os talentos que estão conquistando o mundo',
    description: 'Brasileiros comandam cozinhas em restaurantes estrelados ao redor do mundo.',
    excerpt: 'Brasileiros comandam cozinhas em restaurantes estrelados ao redor do mundo.',
    slug: 'chefs-brasileiros-internacional',
    readTime: '6 min de leitura',
    views: 6120,
    publishedAt: '2025-12-16T12:00:00.000Z',
    cover: {
      url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=630&fit=crop',
    },
    author: {
      name: mockAuthors[3].name,
      avatar: mockAuthors[3].avatar,
    },
    category: {
      name: 'Gastronomia',
      slug: 'gastronomia',
      color: '#8B4513',
    },
    tags: [
      { name: 'Chefs', slug: 'chefs' },
      { name: 'Internacional', slug: 'internacional' },
    ],
  },
];

// ============================================================================
// CATEGORIAS COM ARTIGOS
// ============================================================================

export const mockCategories: Category[] = [
  {
    id: 1,
    documentId: 'cat-cinema',
    name: 'Cinema',
    slug: 'cinema',
    description: 'Críticas, análises e notícias do mundo cinematográfico',
    color: '#722F37',
    image: {
      url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop',
    },
    articles: cinemaArticles,
  },
  {
    id: 2,
    documentId: 'cat-musica',
    name: 'Música',
    slug: 'musica',
    description: 'Shows, álbuns e artistas que movem a cena musical',
    color: '#1E3A5F',
    image: {
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
    },
    articles: musicaArticles,
  },
  {
    id: 3,
    documentId: 'cat-literatura',
    name: 'Literatura',
    slug: 'literatura',
    description: 'Livros, autores e tendências literárias',
    color: '#2D5016',
    image: {
      url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop',
    },
    articles: literaturaArticles,
  },
  {
    id: 4,
    documentId: 'cat-gastronomia',
    name: 'Gastronomia',
    slug: 'gastronomia',
    description: 'Restaurantes, chefs e cultura gastronômica',
    color: '#8B4513',
    image: {
      url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    },
    articles: gastronomiaArticles,
  },
];

// ============================================================================
// ARTIGO DESTAQUE (HERO)
// ============================================================================

export const mockFeaturedArticle: Article = cinemaArticles[0];

// ============================================================================
// TODOS OS ARTIGOS
// ============================================================================

export const mockAllArticles: Article[] = [
  ...cinemaArticles,
  ...musicaArticles,
  ...literaturaArticles,
  ...gastronomiaArticles,
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

// ============================================================================
// FUNÇÕES HELPER
// ============================================================================

/**
 * Busca categoria por slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find((cat) => cat.slug === slug);
}

/**
 * Busca artigo por slug
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return mockAllArticles.find((art) => art.slug === slug);
}

/**
 * Busca artigos de uma categoria
 */
export function getArticlesByCategory(categorySlug: string): Article[] {
  return mockAllArticles.filter((art) => art.category.slug === categorySlug);
}
