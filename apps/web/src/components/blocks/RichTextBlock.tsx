'use client';

import { RichTextBlock as RichTextBlockType } from '@/types/strapiTypes';
import { motion } from 'motion/react';

interface RichTextBlockProps {
  block: RichTextBlockType;
  animated?: boolean;
}

export function RichTextBlock({ block, animated = false }: RichTextBlockProps) {
  const content = (
    <div
      className="prose prose-lg max-w-none
        prose-headings:text-[#2C2C2C] prose-headings:font-medium
        prose-p:text-[#404040] prose-p:leading-relaxed
        prose-a:text-[#722F37] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-[#2C2C2C] prose-strong:font-semibold
        prose-ul:list-disc prose-ol:list-decimal
        prose-blockquote:border-l-4 prose-blockquote:border-[#722F37] prose-blockquote:pl-4
        prose-code:bg-[#F5F5F5] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-[#2C2C2C] prose-pre:text-white"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="my-8"
      >
        {content}
      </motion.div>
    );
  }

  return <div className="my-8">{content}</div>;
}
