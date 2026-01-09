import { Post } from '@/types/strapiTypes';
import { useQuery } from '@tanstack/react-query';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

/**
 * React Query hook to fetch a single post
 * Use this on client components that need post data
 */
export const usePost = (category: string, slug: string) => {
  return useQuery({
    queryKey: ['post', category, slug],
    queryFn: async () => {
      const response = await fetch(
        `${STRAPI_URL}/articles?filters[slug][$eq]=${slug}&filters[category][slug][$eq]=${category}&populate[contentBlocks][populate]=*&populate[cover]=*&populate[author][populate]=*&populate[category]=*&populate[tags]=*`
      );
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      return data.data[0] || null;
    },
    enabled: !!category && !!slug,
  });
};
