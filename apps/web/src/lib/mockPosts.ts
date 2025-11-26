import { Post, PostBlock } from '@/types/strapiTypes';

/**
 * Mock data for testing the dynamic post rendering system
 * Use these when Strapi backend is not available
 */

// Post 1: Low Complexity - Only Rich Text
export const mockPostLowComplexity: Post = {
  id: 1,
  documentId: 'post-baixa-complexidade',
  title: 'Introdução ao JAMstack Moderno',
  subtitle: 'Entendendo os fundamentos da arquitetura JAMstack',
  slug: 'introducao-jamstack-moderno',
  description: 'Uma introdução completa ao JAMstack, explorando seus benefícios e casos de uso.',
  readTime: '5 min de leitura',
  publishedAt: '2025-11-25T00:00:00.000Z',
  cover: {
    id: 1,
    documentId: 'cover-1',
    url: '/placeholder-low.jpg',
    width: 1200,
    height: 630,
  },
  author: {
    id: 1,
    documentId: 'author-1',
    name: 'Maria Silva',
    bio: 'Desenvolvedora Full Stack com foco em arquiteturas modernas.',
  },
  category: {
    id: 1,
    documentId: 'cat-tech',
    name: 'Tecnologia',
    slug: 'tecnologia',
    color: '#722F37',
  },
  contentBlocks: [
    {
      __component: 'blocks.rich-text',
      id: 1,
      content: `
        <h2>O que é JAMstack?</h2>
        <p>JAMstack é uma arquitetura moderna de desenvolvimento web baseada em JavaScript do lado do cliente, APIs reutilizáveis e Markup pré-renderizado.</p>
        <p>Esta abordagem traz diversos benefícios:</p>
        <ul>
          <li><strong>Performance superior</strong>: Sites pré-renderizados são extremamente rápidos</li>
          <li><strong>Segurança aprimorada</strong>: Sem servidor, menos vetores de ataque</li>
          <li><strong>Escalabilidade</strong>: CDNs distribuem conteúdo globalmente</li>
          <li><strong>Melhor experiência de desenvolvimento</strong>: Ferramentas modernas e workflow otimizado</li>
        </ul>
        <h3>Quando usar JAMstack?</h3>
        <p>JAMstack é ideal para sites de conteúdo, blogs, documentação, e-commerce, e landing pages. A arquitetura permite que você sirva conteúdo estático enquanto usa APIs para funcionalidades dinâmicas.</p>
        <blockquote>
          <p>"JAMstack represents a fundamental shift in how we build for the web, prioritizing performance and developer experience."</p>
        </blockquote>
      `,
    },
  ] as PostBlock[],
};

// Post 2: Medium Complexity - Rich Text + Image + Quote
export const mockPostMediumComplexity: Post = {
  id: 2,
  documentId: 'post-media-complexidade',
  title: 'Next.js 16 e React 19: O Futuro do Desenvolvimento Web',
  subtitle: 'Explorando as novidades das versões mais recentes',
  slug: 'nextjs-16-react-19-futuro',
  description: 'Descubra as novidades do Next.js 16 e React 19 que vão revolucionar seus projetos.',
  readTime: '8 min de leitura',
  publishedAt: '2025-11-24T00:00:00.000Z',
  cover: {
    id: 2,
    documentId: 'cover-2',
    url: '/placeholder-medium.jpg',
    width: 1200,
    height: 630,
  },
  author: {
    id: 2,
    documentId: 'author-2',
    name: 'João Santos',
    bio: 'Especialista em React e Next.js, compartilhando conhecimento há 5 anos.',
    avatar: {
      id: 3,
      documentId: 'avatar-2',
      url: '/placeholder-avatar.jpg',
      width: 200,
      height: 200,
    },
  },
  category: {
    id: 1,
    documentId: 'cat-tech',
    name: 'Tecnologia',
    slug: 'tecnologia',
    color: '#722F37',
  },
  contentBlocks: [
    {
      __component: 'blocks.rich-text',
      id: 2,
      content: `
        <h2>Next.js 16: App Router Evolution</h2>
        <p>O Next.js 16 traz melhorias significativas ao App Router, introduzindo suporte completo para React 19 e novos recursos de renderização.</p>
        <p>As principais novidades incluem:</p>
        <ul>
          <li>Server Components mais eficientes</li>
          <li>Streaming e Suspense aprimorados</li>
          <li>Partial Prerendering (PPR) production-ready</li>
        </ul>
      `,
    },
    {
      __component: 'blocks.image',
      id: 3,
      image: {
        id: 4,
        documentId: 'img-nextjs',
        url: '/placeholder-nextjs.jpg',
        width: 1200,
        height: 630,
      },
      caption: 'Arquitetura do Next.js App Router',
      alt: 'Diagrama mostrando a arquitetura do App Router',
    },
    {
      __component: 'blocks.quote',
      id: 4,
      quote: 'React 19 marca uma nova era no desenvolvimento de interfaces, com foco em performance e experiência do desenvolvedor.',
      author: 'Dan Abramov',
      role: 'React Core Team',
    },
    {
      __component: 'blocks.rich-text',
      id: 5,
      content: `
        <h2>React 19: New Features</h2>
        <p>React 19 introduz conceitos revolucionários como Actions, use() hook, e melhorias no Concurrent Rendering.</p>
        <p>Estas mudanças facilitam o desenvolvimento de aplicações complexas com melhor performance e menos código.</p>
      `,
    },
  ] as PostBlock[],
  tags: [
    { id: 1, name: 'Next.js', slug: 'nextjs' },
    { id: 2, name: 'React', slug: 'react' },
  ],
};

// Post 3: High Complexity - All block types with animations
export const mockPostHighComplexity: Post = {
  id: 3,
  documentId: 'post-alta-complexidade',
  title: 'Guia Completo: Strapi v5 + Next.js 16',
  subtitle: 'Construa um CMS Headless moderno com dynamic zones',
  slug: 'guia-completo-strapi-v5-nextjs-16',
  description: 'Tutorial completo mostrando como integrar Strapi v5 com Next.js 16 usando dynamic zones e blocos reutilizáveis.',
  readTime: '15 min de leitura',
  publishedAt: '2025-11-23T00:00:00.000Z',
  cover: {
    id: 5,
    documentId: 'cover-3',
    url: '/placeholder-high.jpg',
    width: 1200,
    height: 630,
  },
  author: {
    id: 1,
    documentId: 'author-1',
    name: 'Maria Silva',
    bio: 'Desenvolvedora Full Stack com foco em arquiteturas modernas e headless CMS.',
    avatar: {
      id: 6,
      documentId: 'avatar-1',
      url: '/placeholder-avatar-2.jpg',
      width: 200,
      height: 200,
    },
  },
  category: {
    id: 2,
    documentId: 'cat-tutorial',
    name: 'Tutoriais',
    slug: 'tutoriais',
    color: '#2C2C2C',
  },
  contentBlocks: [
    {
      __component: 'blocks.rich-text',
      id: 6,
      content: `
        <h2>Por que Strapi v5?</h2>
        <p>Strapi v5 representa uma evolução significativa no mundo dos headless CMS, trazendo melhorias em performance, Developer Experience (DX) e flexibilidade.</p>
        <p>As mudanças mais importantes incluem:</p>
        <ul>
          <li><strong>Nova estrutura de API</strong>: documentId substituindo attributes</li>
          <li><strong>Dynamic Zones aprimoradas</strong>: Blocos reutilizáveis mais poderosos</li>
          <li><strong>TypeScript nativo</strong>: Tipagem completa out-of-the-box</li>
        </ul>
      `,
    },
    {
      __component: 'blocks.image-slider',
      id: 7,
      title: 'Exemplos de Dynamic Zones no Strapi',
      images: [
        {
          id: 7,
          documentId: 'slider-1',
          url: '/placeholder-slider-1.jpg',
          alternativeText: 'Interface do Strapi mostrando Dynamic Zones',
          width: 1200,
          height: 630,
        },
        {
          id: 8,
          documentId: 'slider-2',
          url: '/placeholder-slider-2.jpg',
          alternativeText: 'Configuração de blocos reutilizáveis',
          width: 1200,
          height: 630,
        },
        {
          id: 9,
          documentId: 'slider-3',
          url: '/placeholder-slider-3.jpg',
          alternativeText: 'Preview do conteúdo renderizado',
          width: 1200,
          height: 630,
        },
      ],
    },
    {
      __component: 'blocks.quote',
      id: 8,
      quote: 'Dynamic Zones permitem que editores de conteúdo componham páginas flexíveis sem tocar em código.',
      author: 'Strapi Team',
    },
    {
      __component: 'blocks.video-embed',
      id: 9,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Tutorial em vídeo: Configurando Strapi v5',
    },
    {
      __component: 'blocks.rich-text',
      id: 10,
      content: `
        <h2>Integração com Next.js 16</h2>
        <p>A integração entre Strapi e Next.js é perfeita graças aos Server Components e à arquitetura de fetch do Next.js 16.</p>
        <p>Você pode fazer fetch direto em Server Components, aproveitando ISR, SSR ou SSG conforme necessário.</p>
      `,
    },
    {
      __component: 'blocks.cta',
      id: 11,
      title: 'Pronto para começar?',
      description: 'Baixe o template completo Strapi v5 + Next.js 16 e comece seu projeto em minutos.',
      buttonText: 'Acessar Template',
      buttonUrl: 'https://github.com',
      icon: 'ArrowRight',
      variant: 'primary',
    },
  ] as PostBlock[],
  tags: [
    { id: 3, name: 'Strapi', slug: 'strapi' },
    { id: 4, name: 'CMS', slug: 'cms' },
    { id: 5, name: 'Tutorial', slug: 'tutorial' },
  ],
};

// Export all mock posts
export const mockPosts = {
  low: mockPostLowComplexity,
  medium: mockPostMediumComplexity,
  high: mockPostHighComplexity,
};
