'use client';

import { PostBlock } from '@/types/strapiTypes';
import { CTABlock } from './CTABlock';
import { ImageBlock } from './ImageBlock';
import { ImageSliderBlock } from './ImageSliderBlock';
import { QuoteBlock } from './QuoteBlock';
import { RichTextBlock } from './RichTextBlock';
import { VideoEmbedBlock } from './VideoEmbedBlock';

interface BlockManagerProps {
  blocks: PostBlock[];
  animated?: boolean; // Enable animations for high-complexity posts
}

/**
 * BlockManager component - Renders dynamic content blocks from Strapi v5
 * 
 * This component safely handles all block types from Strapi's Dynamic Zone.
 * Unknown block types are ignored (return null) to prevent breaking the page.
 * 
 * @param blocks - Array of content blocks from Strapi API
 * @param animated - Whether to enable motion animations (recommended for complex posts)
 */
export function BlockManager({ blocks, animated = false }: BlockManagerProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {blocks.map((block) => {
        // Safe rendering with fallback for unknown block types
        switch (block.__component) {
          case 'blocks.rich-text':
            return <RichTextBlock key={block.id} block={block} animated={animated} />;

          case 'blocks.image':
            return <ImageBlock key={block.id} block={block} animated={animated} />;

          case 'blocks.quote':
            return <QuoteBlock key={block.id} block={block} animated={animated} />;

          case 'blocks.image-slider':
            return <ImageSliderBlock key={block.id} block={block} animated={animated} />;

          case 'blocks.video-embed':
            return <VideoEmbedBlock key={block.id} block={block} animated={animated} />;

          case 'blocks.cta':
            return <CTABlock key={block.id} block={block} animated={animated} />;

          default:
            // Unknown block type - log warning but don't break the page
            if (process.env.NODE_ENV === 'development') {
              const unknownBlock = block as { __component: string; id: number };
              console.warn(
                `Unknown block type: ${unknownBlock.__component}. Block ID: ${unknownBlock.id}`
              );
            }
            return null;
        }
      })}
    </div>
  );
}
