import { Article, Category } from '@/types/strapiTypes';
import { draftMode } from 'next/headers';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

/**
 * Valida formato de slug (apenas letras minúsculas, números e hífens)
 */
function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length <= 200;
}

/**
 * Sanitiza slug para uso seguro em queries
 */
function sanitizeSlug(slug: string): string {
  return encodeURIComponent(slug.toLowerCase().trim());
}

/**
 * Verifica se está em draft mode de forma segura
 * Retorna false se chamado fora do contexto de request (ex: durante build)
 */
async function isDraftModeEnabled(): Promise<boolean> {
  try {
    const { isEnabled } = await draftMode();
    return isEnabled;
  } catch {
    // Fora do contexto de request (ex: generateStaticParams)
    return false;
  }
}

/**
 * Fetch helper com tratamento de erros e suporte a draft mode
 */
async function fetchStrapi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Verificar se está em draft mode (preview) de forma segura
  const isDraft = await isDraftModeEnabled();

  let url = `${STRAPI_URL}${endpoint}`;

  // Adicionar status=draft quando em draft mode para buscar conteúdo não publicado
  if (isDraft) {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}status=draft`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Strapi error:', errorText);
    throw new Error(`Erro ao buscar ${endpoint}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Buscar todas as categorias com artigos
 */
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetchStrapi<{ data: Category[] }>(
    '/categories?populate[0]=image&populate[1]=articles.cover&populate[2]=articles.author&populate[3]=articles.category'
  );

  return (response.data || []).map((cat) => ({
    ...cat,
    articles: (cat.articles || []).map((article) => ({
      ...article,
      excerpt: article.description || article.excerpt,
    })),
  }));
}

/**
 * Buscar todos os artigos
 */
export async function fetchArticles(): Promise<Article[]> {
  const response = await fetchStrapi<{ data: Article[] }>('/articles?populate=*');

  return (response.data || []).map((article) => ({
    ...article,
    excerpt: article.description || article.excerpt,
  }));
}

/**
 * Buscar artigo destaque (mais recente)
 */
export async function fetchFeaturedArticle(): Promise<Article | null> {
  const response = await fetchStrapi<{ data: Article[] }>(
    '/articles?populate=*&pagination[limit]=1&sort=publishedAt:desc'
  );

  const articles = response.data || [];

  if (articles.length > 0) {
    return {
      ...articles[0],
      excerpt: articles[0].description || articles[0].excerpt,
    };
  }

  return null;
}

/**
 * Buscar categoria por slug
 */
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isValidSlug(slug)) {
    console.warn('Invalid category slug format:', slug);
    return null;
  }

  const safeSlug = sanitizeSlug(slug);
  const response = await fetchStrapi<{ data: Category[] }>(
    `/categories?filters[slug][$eq]=${safeSlug}&populate[0]=image&populate[1]=articles.cover&populate[2]=articles.author&populate[3]=articles.category`
  );

  const categories = response.data || [];

  if (categories.length > 0) {
    const category = categories[0];
    return {
      ...category,
      articles: (category.articles || []).map((article) => ({
        ...article,
        excerpt: article.description || article.excerpt,
      })),
    };
  }

  return null;
}

/**
 * Buscar artigo por slug e categoria
 */
export async function fetchArticleBySlug(
  categorySlug: string,
  articleSlug: string
): Promise<Article | null> {
  if (!isValidSlug(categorySlug) || !isValidSlug(articleSlug)) {
    console.warn('Invalid slug format:', { categorySlug, articleSlug });
    return null;
  }

  const safeCategorySlug = sanitizeSlug(categorySlug);
  const safeArticleSlug = sanitizeSlug(articleSlug);

  const response = await fetchStrapi<{ data: Article[] }>(
    `/articles?filters[slug][$eq]=${safeArticleSlug}&filters[category][slug][$eq]=${safeCategorySlug}&populate=*`
  );

  const articles = response.data || [];

  if (articles.length > 0) {
    return {
      ...articles[0],
      excerpt: articles[0].description || articles[0].excerpt,
    };
  }

  return null;
}

/**
 * Buscar todos os slugs de categorias para generateStaticParams
 */
export async function fetchAllCategorySlugs(): Promise<string[]> {
  const response = await fetchStrapi<{ data: Array<{ slug: string }> }>(
    '/categories?fields[0]=slug'
  );

  return (response.data || []).map((cat) => cat.slug);
}

/**
 * Buscar todos os slugs de artigos para generateStaticParams
 */
export async function fetchAllArticleSlugs(): Promise<Array<{ category: string; slug: string }>> {
  const response = await fetchStrapi<{
    data: Array<{ slug: string; category: { slug: string } }>;
  }>('/articles?fields[0]=slug&populate[category][fields][0]=slug');

  return (response.data || [])
    .filter((article) => article.category?.slug)
    .map((article) => ({
      category: article.category.slug,
      slug: article.slug,
    }));
}
