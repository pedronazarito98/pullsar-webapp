'use client';

import { CategorySection } from '@/components/CategorySection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorBanner } from '@/components/ui/ErrorState';
import { CategorySectionSkeleton, HeroSkeleton } from '@/components/ui/LoadingStates';
import { Article } from '@/hooks/useArticles';
import { Category } from '@/hooks/useCategories';
import { fetchCategories, fetchFeaturedArticle } from '@/lib/api';
import { mockCategories, mockFeaturedArticle } from '@/lib/mockData';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Layouts das seções para variar visualmente
const sectionLayouts: Array<'featured' | 'grid' | 'split' | 'minimal'> = [
  'featured',
  'grid',
  'split',
  'minimal',
];

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingMock, setIsUsingMock] = useState(false);

  async function loadData() {
    setIsLoading(true);

    try {
      const [categoriesResult, featuredResult] = await Promise.all([
        fetchCategories(),
        fetchFeaturedArticle(),
      ]);

      setCategories(categoriesResult.data);
      setFeaturedArticle(featuredResult.data);
      setIsUsingMock(categoriesResult.fromMock || featuredResult.fromMock);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setCategories(mockCategories as unknown as Category[]);
      setFeaturedArticle(mockFeaturedArticle as unknown as Article);
      setIsUsingMock(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={mockCategories as unknown as Category[]} />
        <HeroSkeleton />
        <CategorySectionSkeleton layout="featured" />
        <CategorySectionSkeleton layout="grid" />
      </div>
    );
  }

  if (!isLoading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={[]} />
        <EmptyState
          title="Nenhum conteúdo disponível"
          message="Ainda não há artigos publicados. Volte em breve!"
          icon="content"
        />
        <Footer categories={[]} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {isUsingMock && (
          <ErrorBanner
            message="Exibindo conteúdo offline. Alguns dados podem estar desatualizados."
            onRetry={loadData}
          />
        )}
      </AnimatePresence>

      <Header categories={categories} />

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

      <Footer categories={categories} />
    </div>
  );
}
