'use client';

import {
  CTABlock,
  ImageBlock,
  ImageSliderBlock,
  isCTABlock,
  isImageBlock,
  isImageSliderBlock,
  isQuoteBlock,
  isRichTextBlock,
  isVideoEmbedBlock,
  PostBlock,
  QuoteBlock,
  RichTextBlock,
  VideoEmbedBlock,
} from '@/types/strapiTypes';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ERROR_IMG_SRC, ImageWithFallback } from './figma/ImageWithFallback';

interface ContentBlockRendererProps {
  blocks: PostBlock[];
}

// Rich Text Block
function RichTextBlockComponent({ block }: { block: RichTextBlock }) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-[#2C2C2C] prose-p:text-[#404040] prose-a:text-[#722F37] prose-strong:text-[#2C2C2C] prose-blockquote:border-l-[#722F37] prose-blockquote:text-[#404040]"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );
}

// Image Block
function ImageBlockComponent({ block }: { block: ImageBlock }) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <ImageWithFallback
          src={block.image.url}
          alt={block.alt || block.image.alternativeText || ''}
          className="w-full h-full object-cover"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 text-center text-sm text-[#666666] italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

// Quote Block
function QuoteBlockComponent({ block }: { block: QuoteBlock }) {
  return (
    <blockquote className="my-8 border-l-4 border-[#722F37] pl-6 py-4 bg-[#F8F4F5] rounded-r-lg">
      <p className="text-xl italic text-[#404040] leading-relaxed">&ldquo;{block.quote}&rdquo;</p>
      {(block.author || block.role) && (
        <footer className="mt-4 text-sm text-[#666666] not-italic">
          {block.author && <span className="font-medium">— {block.author}</span>}
          {block.role && <span>, {block.role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

// Image Slider Block
function ImageSliderBlockComponent({ block }: { block: ImageSliderBlock }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="my-8">
      {block.title && <h3 className="text-lg font-medium text-[#2C2C2C] mb-4">{block.title}</h3>}
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-[16/9]">
          <Image
            src={block.images[currentIndex]?.url || ERROR_IMG_SRC}
            alt={block.images[currentIndex]?.alternativeText || `Imagem ${currentIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
          />
        </div>
        {block.images.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {block.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#722F37]' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Video Embed Block
function VideoEmbedBlockComponent({ block }: { block: VideoEmbedBlock }) {
  const getEmbedUrl = (url: string) => {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}${block.autoplay ? '?autoplay=1' : ''}`;
    }
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}${block.autoplay ? '?autoplay=1' : ''}`;
    }
    return url;
  };

  return (
    <div className="my-8">
      {block.title && <h3 className="text-lg font-medium text-[#2C2C2C] mb-4">{block.title}</h3>}
      <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
        <iframe
          src={getEmbedUrl(block.url)}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={block.title || 'Vídeo incorporado'}
        />
      </div>
    </div>
  );
}

// CTA Block
function CTABlockComponent({ block }: { block: CTABlock }) {
  const getIcon = () => {
    switch (block.icon) {
      case 'ExternalLink':
        return <ExternalLink className="w-5 h-5" />;
      default:
        return <ArrowRight className="w-5 h-5" />;
    }
  };

  const variantClasses = {
    primary: 'bg-[#722F37] text-white hover:bg-[#5a252c]',
    secondary: 'bg-[#2C2C2C] text-white hover:bg-[#444444]',
    outline:
      'bg-transparent border-2 border-[#722F37] text-[#722F37] hover:bg-[#722F37] hover:text-white',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="my-8 p-8 bg-gradient-to-r from-[#722F37]/10 to-[#722F37]/5 rounded-2xl"
    >
      <h3 className="text-2xl font-bold text-[#2C2C2C] mb-2">{block.title}</h3>
      {block.description && (
        <p className="text-[#404040] mb-6 leading-relaxed">{block.description}</p>
      )}
      <Link
        href={block.buttonUrl}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
          variantClasses[block.variant || 'primary']
        }`}
      >
        {block.buttonText}
        {getIcon()}
      </Link>
    </motion.div>
  );
}

// Main renderer component
export function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (isRichTextBlock(block)) {
          return <RichTextBlockComponent key={`${block.__component}-${index}`} block={block} />;
        }
        if (isImageBlock(block)) {
          return <ImageBlockComponent key={`${block.__component}-${index}`} block={block} />;
        }
        if (isQuoteBlock(block)) {
          return <QuoteBlockComponent key={`${block.__component}-${index}`} block={block} />;
        }
        if (isImageSliderBlock(block)) {
          return <ImageSliderBlockComponent key={`${block.__component}-${index}`} block={block} />;
        }
        if (isVideoEmbedBlock(block)) {
          return <VideoEmbedBlockComponent key={`${block.__component}-${index}`} block={block} />;
        }
        if (isCTABlock(block)) {
          return <CTABlockComponent key={`${block.__component}-${index}`} block={block} />;
        }
        // Fallback para blocos não reconhecidos
        return null;
      })}
    </div>
  );
}
