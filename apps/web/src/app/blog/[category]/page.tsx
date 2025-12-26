'use client';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { EmptySection } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { CategorySectionSkeleton } from '@/components/ui/LoadingStates';
import { Article } from '@/hooks/useArticles';
import { Category } from '@/hooks/useCategories';
import { fetchCategories, fetchCategoryBySlug } from '@/lib/api';
import { getCategoryBySlug as getMockCategory, mockCategories } from '@/lib/mockData';
import { ArrowLeft, Calendar, Clock, Eye, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  async function loadData() {
    setIsLoading(true);
    setError(null);

    try {
      const [categoryResult, categoriesResult] = await Promise.all([
        fetchCategoryBySlug(categorySlug),
        fetchCategories(),
      ]);

      setCategory(categoryResult.data);
      setAllCategories(categoriesResult.data);
    } catch (err) {
      console.error('Erro ao carregar categoria:', err);
      setError('Não foi possível carregar a categoria');
      const mockCategory = getMockCategory(categorySlug);
      if (mockCategory) {
        setCategory(mockCategory as unknown as Category);
      }
      setAllCategories(mockCategories as unknown as Category[]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (categorySlug) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug]);

  const filteredArticles = (category?.articles || [])
    .filter(
      (article: Article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: Article, b: Article) => {
      if (sortBy === 'recent') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      return 0;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={mockCategories as unknown as Category[]} />
        <div className="pt-20">
          <div className="relative h-[40vh] bg-gray-200 animate-pulse" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <CategorySectionSkeleton layout="grid" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !category) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={allCategories} />
        <div className="pt-20">
          <ErrorState
            title="Categoria não encontrada"
            message="Não foi possível carregar esta categoria."
            onRetry={loadData}
            variant="notfound"
          />
        </div>
        <Footer categories={allCategories} />
      </div>
    );
  }

  if (!category) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header categories={allCategories} />

      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative pt-20">
        <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
          {category.image?.url ? (
            <ImageWithFallback
              src={category.image.url}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: category.color }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar para Home</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className="inline-block px-4 py-1 text-sm text-white rounded-full mb-4"
                style={{ backgroundColor: category.color }}
              >
                {category.articles?.length || 0} artigos
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold mb-4">
                {category.name}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 max-w-2xl">{category.description}</p>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#722F37]/20 focus:border-[#722F37]"
              />
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Ordenar por:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSortBy('recent')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm transition-colors ${
                    sortBy === 'recent'
                      ? 'bg-white shadow-sm text-[#2C2C2C]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Recentes</span>
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm transition-colors ${
                    sortBy === 'popular'
                      ? 'bg-white shadow-sm text-[#2C2C2C]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Populares</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <main className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <EmptySection
              message={
                searchTerm
                  ? `Nenhum artigo encontrado para "${searchTerm}"`
                  : 'Nenhum artigo publicado nesta categoria ainda.'
              }
            />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.map((article: Article) => (
                <motion.article
                  key={article.id || article.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-500"
                >
                  <Link href={`/blog/${category.slug}/${article.slug}`}>
                    <div className="aspect-[16/10] overflow-hidden bg-[#F5F5F5]">
                      <ImageWithFallback
                        src={article.cover?.url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <h2 className="text-xl text-[#2C2C2C] group-hover:text-[#722F37] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h2>

                      {article.description && (
                        <p className="text-[#404040] text-sm line-clamp-2">{article.description}</p>
                      )}

                      <div className="flex items-center justify-between text-xs text-[#404040]">
                        <div className="flex items-center space-x-3">
                          <span>{article.author?.name}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime || '5 min'}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer categories={allCategories} />
    </div>
  );
}
