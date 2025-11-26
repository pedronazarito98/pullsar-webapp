import { api } from '@/lib/api';
import { Post, StrapiResponse } from '@/types/strapiTypes';
import { useQuery } from '@tanstack/react-query';

/**
 * React Query hook to fetch a single post
 * Use this on client components that need post data
 */
export const usePost = (category: string, slug: string) => {
  return useQuery({
    queryKey: ['post', category, slug],
    queryFn: async () => {
      const { data } = await api.get<StrapiResponse<Post[]>>(
        `/articles?filters[slug][$eq]=${slug}&filters[category][slug][$eq]=${category}&populate[contentBlocks][populate]=*&populate[cover]=*&populate[author][populate]=*&populate[category]=*&populate[tags]=*`
      );
      return data.data[0] || null;
    },
    enabled: !!category && !!slug,
  });
};
