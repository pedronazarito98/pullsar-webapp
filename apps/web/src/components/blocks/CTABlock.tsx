'use client';

import { CTABlock as CTABlockType } from '@/types/strapiTypes';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

interface CTABlockProps {
  block: CTABlockType;
  animated?: boolean;
}

export function CTABlock({ block, animated = false }: CTABlockProps) {
  // Dynamically get the icon component from lucide-react
  const IconComponent = block.icon
    ? (LucideIcons[block.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>)
    : LucideIcons.ArrowRight;

  const isExternal = block.buttonUrl.startsWith('http');

  const buttonVariants = {
    primary: 'bg-[#722F37] hover:bg-[#8B3A42] text-white',
    secondary: 'bg-[#2C2C2C] hover:bg-[#404040] text-white',
    outline: 'bg-transparent border-2 border-[#722F37] text-[#722F37] hover:bg-[#722F37] hover:text-white',
  };

  const buttonClasses = `
    inline-flex items-center gap-3 px-8 py-4 rounded-lg
    font-medium text-lg transition-all duration-300
    hover:shadow-xl hover:scale-105 active:scale-95
    ${buttonVariants[block.variant || 'primary']}
  `;

  const content = (
    <div className="my-16 p-8 md:p-12 bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F5] rounded-2xl border border-gray-200">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h3 className="text-3xl md:text-4xl text-[#2C2C2C] font-medium">
          {block.title}
        </h3>
        
        {block.description && (
          <p className="text-lg text-[#404040] leading-relaxed">
            {block.description}
          </p>
        )}

        {isExternal ? (
          <a
            href={block.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses}
          >
            <span>{block.buttonText}</span>
            {IconComponent && <IconComponent className="w-5 h-5" />}
          </a>
        ) : (
          <Link href={block.buttonUrl} className={buttonClasses}>
            <span>{block.buttonText}</span>
            {IconComponent && <IconComponent className="w-5 h-5" />}
          </Link>
        )}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
