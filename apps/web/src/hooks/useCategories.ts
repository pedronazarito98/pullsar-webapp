import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { Article } from './useArticles';

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  image: {
    url: string;
  };
  articles: Article[];
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories?populate=*');
      return data.data as Category[];
    },
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const { data } = await api.get(`/categories?filters[slug][$eq]=${slug}&populate[articles][populate]=*`);
      return data.data[0] as Category;
    },
    enabled: !!slug,
  });
};
