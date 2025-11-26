'use client';

import { QuoteBlock as QuoteBlockType } from '@/types/strapiTypes';
import { Quote as QuoteIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface QuoteBlockProps {
  block: QuoteBlockType;
  animated?: boolean;
}

export function QuoteBlock({ block, animated = false }: QuoteBlockProps) {
  const content = (
    <blockquote className="my-12 relative">
      <div className="absolute left-0 top-0 w-1 h-full bg-[#722F37] rounded-full" />
      <div className="pl-8 pr-4 py-6">
        <QuoteIcon className="w-10 h-10 text-[#722F37] opacity-20 mb-4" />
        <p className="text-xl md:text-2xl text-[#2C2C2C] leading-relaxed italic mb-4">
          &ldquo;{block.quote}&rdquo;
        </p>
        {(block.author || block.role) && (
          <footer className="text-sm text-[#404040]">
            {block.author && <cite className="not-italic font-medium">{block.author}</cite>}
            {block.author && block.role && <span className="mx-2">•</span>}
            {block.role && <span>{block.role}</span>}
          </footer>
        )}
      </div>
    </blockquote>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
