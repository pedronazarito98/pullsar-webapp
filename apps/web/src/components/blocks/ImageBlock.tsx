'use client';

import { ImageBlock as ImageBlockType } from '@/types/strapiTypes';
import { motion } from 'motion/react';
import Image from 'next/image';

interface ImageBlockProps {
  block: ImageBlockType;
  animated?: boolean;
}

export function ImageBlock({ block, animated = false }: ImageBlockProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:1337';
  const imageUrl = block.image.url.startsWith('http') 
    ? block.image.url 
    : `${baseUrl}${block.image.url}`;

  const content = (
    <figure className="my-12">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F5F5F5] rounded-lg">
        <Image
          src={imageUrl}
          alt={block.alt || block.image.alternativeText || block.caption || 'Image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-4 text-center text-sm text-[#404040] italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
