import { Article } from '@/hooks/useArticles';
import { Category } from '@/hooks/useCategories';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

/**
 * Fetch helper com tratamento de erros
 */
async function fetchStrapi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${STRAPI_URL}${endpoint}`;

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
  const response = await fetchStrapi<{ data: Category[] }>('/categories?populate=*');

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
  const response = await fetchStrapi<{ data: Category[] }>(
    `/categories?filters[slug][$eq]=${slug}&populate=*`
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
  const response = await fetchStrapi<{ data: Article[] }>(
    `/articles?filters[slug][$eq]=${articleSlug}&filters[category][slug][$eq]=${categorySlug}&populate=*`
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
