import { Post, StrapiResponse } from '@/types/strapiTypes';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api',
});

/**
 * Get a single post by category and slug from Strapi
 * Can be used in Server Components or Client Components
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
