'use client';

import { Article } from '@/hooks/useArticles';
import { Calendar, Clock, Eye, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface ArticleFiltersProps {
  articles: Article[];
  categorySlug: string;
  categoryColor?: string;
}

export function ArticleFilters({ articles, categorySlug, categoryColor }: ArticleFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const filteredArticles = articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      return (b.views || 0) - (a.views || 0);
    });

  return (
    <>
      {/* Barra de filtros */}
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

      {/* Lista de artigos */}
      <main className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">
                {searchTerm
                  ? `Nenhum artigo encontrado para "${searchTerm}"`
                  : 'Nenhum artigo publicado nesta categoria ainda.'}
              </p>
            </div>
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
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id || article.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-500"
                >
                  <Link href={`/blog/${categorySlug}/${article.slug}`}>
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
    </>
  );
}
