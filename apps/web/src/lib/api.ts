import { Article } from '@/hooks/useArticles';
import { Category } from '@/hooks/useCategories';
import { Post, StrapiResponse } from '@/types/strapiTypes';
import axios from 'axios';
import {
  getArticleBySlug,
  getCategoryBySlug,
  mockAllArticles,
  mockCategories,
  mockFeaturedArticle,
} from './mockData';

// Configuração do Axios com timeout
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api',
  timeout: 5000, // 5 segundos de timeout
});

// Flag para indicar se estamos usando dados mockados
let isUsingMockData = false;

export function getIsUsingMockData() {
  return isUsingMockData;
}

/**
 * Buscar todas as categorias com fallback para mock
 */
export async function fetchCategories(): Promise<{ data: Category[]; fromMock: boolean }> {
  try {
    const response = await api.get('/categories?populate[articles][populate]=*&populate[image]=*');
    const categories = response.data.data || [];

    // Mapear para adicionar excerpt aos artigos
    const mappedCategories = categories.map((cat: Category) => ({
      ...cat,
      articles: (cat.articles || []).map((article: Article) => ({
        ...article,
        excerpt: article.description || article.excerpt,
      })),
    }));

    isUsingMockData = false;
    return { data: mappedCategories, fromMock: false };
  } catch (error) {
    console.warn('API indisponível, usando dados mockados:', (error as Error).message);
    isUsingMockData = true;
    return { data: mockCategories as unknown as Category[], fromMock: true };
  }
}

/**
 * Buscar todos os artigos com fallback para mock
 */
export async function fetchArticles(): Promise<{ data: Article[]; fromMock: boolean }> {
  try {
    const response = await api.get('/articles?populate=*');
    const articles = (response.data.data || []).map((article: Article) => ({
      ...article,
      excerpt: article.description || article.excerpt,
    }));

    isUsingMockData = false;
    return { data: articles, fromMock: false };
  } catch (error) {
    console.warn('API indisponível, usando dados mockados:', (error as Error).message);
    isUsingMockData = true;
    return { data: mockAllArticles as unknown as Article[], fromMock: true };
  }
}

/**
 * Buscar artigo destaque (primeiro da lista ou mockado)
 */
export async function fetchFeaturedArticle(): Promise<{ data: Article | null; fromMock: boolean }> {
  try {
    const response = await api.get(
      '/articles?populate=*&pagination[limit]=1&sort=publishedAt:desc'
    );
    const articles = response.data.data || [];

    if (articles.length > 0) {
      const article = {
        ...articles[0],
        excerpt: articles[0].description || articles[0].excerpt,
      };
      isUsingMockData = false;
      return { data: article, fromMock: false };
    }

    // Se não há artigos na API, usar mock
    isUsingMockData = true;
    return { data: mockFeaturedArticle as unknown as Article, fromMock: true };
  } catch (error) {
    console.warn('API indisponível, usando artigo destaque mockado:', (error as Error).message);
    isUsingMockData = true;
    return { data: mockFeaturedArticle as unknown as Article, fromMock: true };
  }
}

/**
 * Buscar categoria por slug com fallback
 */
export async function fetchCategoryBySlug(
  slug: string
): Promise<{ data: Category | null; fromMock: boolean }> {
  try {
    const response = await api.get(
      `/categories?filters[slug][$eq]=${slug}&populate[articles][populate]=*&populate[image]=*`
    );
    const categories = response.data.data || [];

    if (categories.length > 0) {
      const category = {
        ...categories[0],
        articles: (categories[0].articles || []).map((article: Article) => ({
          ...article,
          excerpt: article.description || article.excerpt,
        })),
      };
      isUsingMockData = false;
      return { data: category, fromMock: false };
    }

    // Se não encontrou, tentar mock
    const mockCategory = getCategoryBySlug(slug);
    if (mockCategory) {
      isUsingMockData = true;
      return { data: mockCategory as unknown as Category, fromMock: true };
    }

    return { data: null, fromMock: false };
  } catch (error) {
    console.warn('API indisponível, usando categoria mockada:', (error as Error).message);
    const mockCategory = getCategoryBySlug(slug);
    isUsingMockData = true;
    return { data: mockCategory as unknown as Category | null, fromMock: true };
  }
}

/**
 * Buscar artigo por slug com fallback
 */
export async function fetchArticleBySlug(
  categorySlug: string,
  articleSlug: string
): Promise<{ data: Article | null; fromMock: boolean }> {
  try {
    // Usando populate deep para trazer contentBlocks com todos os seus componentes
    const queryParams = new URLSearchParams({
      'filters[slug][$eq]': articleSlug,
      'filters[category][slug][$eq]': categorySlug,
      'populate[cover]': '*',
      'populate[author][populate]': '*',
      'populate[category]': '*',
      'populate[tags]': '*',
      'populate[contentBlocks][populate]': '*',
    });

    const url = `/articles?${queryParams.toString()}`;
    console.log('🔍 Fetching article with URL:', url);

    const response = await api.get(url);
    console.log('📦 API Response:', JSON.stringify(response.data, null, 2));

    const articles = response.data.data || [];

    if (articles.length > 0) {
      const article = {
        ...articles[0],
        excerpt: articles[0].description || articles[0].excerpt,
      };
      console.log('✅ Article contentBlocks:', article.contentBlocks);
      isUsingMockData = false;
      return { data: article, fromMock: false };
    }

    // Tentar mock
    const mockArticle = getArticleBySlug(articleSlug);
    if (mockArticle && mockArticle.category.slug === categorySlug) {
      isUsingMockData = true;
      return { data: mockArticle as unknown as Article, fromMock: true };
    }

    return { data: null, fromMock: false };
  } catch (error) {
    console.warn('API indisponível, usando artigo mockado:', (error as Error).message);
    const mockArticle = getArticleBySlug(articleSlug);
    if (mockArticle && mockArticle.category.slug === categorySlug) {
      isUsingMockData = true;
      return { data: mockArticle as unknown as Article, fromMock: true };
    }
    return { data: null, fromMock: true };
  }
}

/**
 * Get a single post by category and slug from Strapi (legacy)
 */
export async function getPost(category: string, slug: string): Promise<Post | null> {
  try {
    const { data } = await api.get<StrapiResponse<Post[]>>(
      `/articles?filters[slug][$eq]=${slug}&filters[category][slug][$eq]=${category}&populate[contentBlocks][populate]=*&populate[cover]=*&populate[author][populate]=*&populate[category]=*&populate[tags]=*`
    );

    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
