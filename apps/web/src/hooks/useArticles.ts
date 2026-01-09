import { PostBlock } from '@/types/strapiTypes';
import { useQuery } from '@tanstack/react-query';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export interface Article {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  description: string;
  excerpt?: string;
  slug: string;
  readTime?: string;
  views?: number;
  publishedAt: string;
  cover?: {
    url: string;
  };
  author: {
    name: string;
    avatar?: {
      url: string;
    };
    bio?: string;
  };
  category: {
    name: string;
    slug: string;
    color: string;
  };
  tags?: {
    name: string;
    slug: string;
  }[];
  contentBlocks?: PostBlock[];
}

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await fetch(`${STRAPI_URL}/articles?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      const articles = data.data as Article[];
      return articles.map((article) => ({
        ...article,
        excerpt: article.description || article.excerpt,
      })) as Article[];
    },
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const response = await fetch(`${STRAPI_URL}/articles?filters[slug][$eq]=${slug}&populate=*`);
      if (!response.ok) throw new Error('Failed to fetch article');
      const data = await response.json();
      const article = data.data[0] as Article;
      return {
        ...article,
        excerpt: article.description || article.excerpt,
      } as Article;
    },
    enabled: !!slug,
  });
};
