'use client';

import { CategorySection } from '@/components/CategorySection';
import { Hero } from '@/components/Hero';
import { Article } from '@/hooks/useArticles';
import { Category } from '@/hooks/useCategories';
import { AnimatePresence, motion } from 'motion/react';

// Layouts das seções para variar visualmente
const sectionLayouts: Array<'featured' | 'grid' | 'split' | 'minimal'> = [
  'featured',
  'grid',
  'split',
  'minimal',
];

interface HomeContentProps {
  categories: Category[];
  featuredArticle: Article | null;
}

export function HomeContent({ categories, featuredArticle }: HomeContentProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        {featuredArticle && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero featuredArticle={featuredArticle} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {categories.map((category, index) => (
          <motion.div
            key={category.id || category.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CategorySection
              category={category}
              layout={sectionLayouts[index % sectionLayouts.length]}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
