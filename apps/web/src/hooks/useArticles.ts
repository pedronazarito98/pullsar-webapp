import { api } from '@/lib/api';
import { PostBlock } from '@/types/strapiTypes';
import { useQuery } from '@tanstack/react-query';

export interface Article {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  description: string;
  excerpt?: string; // Alias for description for compatibility
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
      const { data } = await api.get('/articles?populate=*');
      const articles = data.data as Article[];
      // Map description to excerpt for compatibility
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
      const { data } = await api.get(`/articles?filters[slug][$eq]=${slug}&populate=*`);
      const article = data.data[0] as Article;
      return {
        ...article,
        excerpt: article.description || article.excerpt,
      } as Article;
    },
    enabled: !!slug,
  });
};
