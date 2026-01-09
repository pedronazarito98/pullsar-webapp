import { useQuery } from '@tanstack/react-query';
import { Article } from './useArticles';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

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
      const response = await fetch(`${STRAPI_URL}/categories?populate=*`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      return data.data as Category[];
    },
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const response = await fetch(
        `${STRAPI_URL}/categories?filters[slug][$eq]=${slug}&populate[articles][populate]=*`
      );
      if (!response.ok) throw new Error('Failed to fetch category');
      const data = await response.json();
      return data.data[0] as Category;
    },
    enabled: !!slug,
  });
};
