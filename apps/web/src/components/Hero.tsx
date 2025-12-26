'use client';

import { Article } from '@/hooks/useArticles';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  featuredArticle: Article;
}

export function Hero({ featuredArticle }: HeroProps) {
  const publishedDate = new Date(featuredArticle.publishedAt).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-[#1A1A1A]">
      {/* Background Image with Overlay */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <ImageWithFallback
          src={
            featuredArticle.cover?.url ||
            'https://images.unsplash.com/photo-1666698907755-672d406ea71d?w=1200'
          }
          alt={featuredArticle.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/70 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <span
              className="inline-block px-4 py-1.5 text-white text-xs tracking-widest"
              style={{ backgroundColor: featuredArticle.category.color }}
            >
              DESTAQUE DA SEMANA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight"
          >
            {featuredArticle.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
          >
            {featuredArticle.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              href={`/blog/${featuredArticle.category.slug}/${featuredArticle.slug}`}
              className="group flex items-center space-x-3 px-8 py-4 bg-[#722F37] hover:bg-[#8B3A42] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#722F37]/30"
            >
              <span className="tracking-wide">Ler Matéria</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{featuredArticle.readTime}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <p className="text-sm text-gray-500">
              Por {featuredArticle.author.name} • {featuredArticle.category.name} • {publishedDate}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-gray-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
