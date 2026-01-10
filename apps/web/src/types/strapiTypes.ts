// Strapi v5 API Response Types
// Note: Strapi v5 uses documentId and id at the root level, not inside attributes

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  bio?: string;
  avatar?: StrapiImage;
}

export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
  image?: StrapiImage;
}

// Dynamic Zone Block Types

export interface RichTextBlock {
  __component: 'blocks.rich-text';
  id: number;
  content: string; // HTML or Markdown content from Strapi rich text editor
}

export interface ImageBlock {
  __component: 'blocks.image';
  id: number;
  image: StrapiImage;
  caption?: string;
  alt?: string;
}

export interface QuoteBlock {
  __component: 'blocks.quote';
  id: number;
  quote: string;
  author?: string;
  role?: string;
}

export interface ImageSliderBlock {
  __component: 'blocks.image-slider';
  id: number;
  images: StrapiImage[];
  title?: string;
}

export interface VideoEmbedBlock {
  __component: 'blocks.video-embed';
  id: number;
  url: string; // YouTube or Vimeo URL
  title?: string;
  autoplay?: boolean;
}

export interface CTABlock {
  __component: 'blocks.cta';
  id: number;
  title: string;
  description?: string;
  buttonText: string;
  buttonUrl: string;
  icon?: string; // Lucide icon name (e.g., 'ArrowRight', 'ExternalLink')
  variant?: 'primary' | 'secondary' | 'outline';
}

// Union type for all possible blocks
export type PostBlock =
  | RichTextBlock
  | ImageBlock
  | QuoteBlock
  | ImageSliderBlock
  | VideoEmbedBlock
  | CTABlock;

// Main Article Interface (formerly Post)
export interface Article {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  excerpt?: string; // Added for compatibility
  readTime?: string;
  views?: number;
  publishedAt: string;
  cover?: StrapiImage;
  author: StrapiAuthor;
  category: StrapiCategory;
  contentBlocks?: PostBlock[]; // Dynamic Zone
  tags?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

// Extended Category with Articles
export interface Category extends StrapiCategory {
  articles?: Article[];
}

// Strapi API Response Wrapper
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Type guard helpers for block components
export const isRichTextBlock = (block: PostBlock): block is RichTextBlock =>
  block.__component === 'blocks.rich-text';

export const isImageBlock = (block: PostBlock): block is ImageBlock =>
  block.__component === 'blocks.image';

export const isQuoteBlock = (block: PostBlock): block is QuoteBlock =>
  block.__component === 'blocks.quote';

export const isImageSliderBlock = (block: PostBlock): block is ImageSliderBlock =>
  block.__component === 'blocks.image-slider';

export const isVideoEmbedBlock = (block: PostBlock): block is VideoEmbedBlock =>
  block.__component === 'blocks.video-embed';

export const isCTABlock = (block: PostBlock): block is CTABlock =>
  block.__component === 'blocks.cta';
