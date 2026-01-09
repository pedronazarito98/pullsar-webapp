'use client';

import { ContentBlockRenderer } from '@/components/ContentBlockRenderer';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Article } from '@/hooks/useArticles';
import { ArrowLeft, Bookmark, Calendar, Clock, Share2, User } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

interface ArticleContentProps {
  article: Article;
  relatedArticles: Article[];
  categorySlug: string;
}

export function ArticleContent({ article, relatedArticles, categorySlug }: ArticleContentProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">
      <header className="relative">
        {article.cover?.url && (
          <div className="relative w-full h-[50vh] sm:h-[60vh] bg-[#F5F5F5]">
            <ImageWithFallback
              src={article.cover.url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}

        <div
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${article.cover?.url ? '-mt-32' : 'mt-8'}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 ${article.cover?.url ? 'shadow-xl' : 'border border-gray-100'}`}
          >
            <Link
              href={`/blog/${categorySlug}`}
              className="inline-flex items-center space-x-2 text-[#404040] hover:text-[#722F37] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Voltar para {article.category?.name}</span>
            </Link>

            <div className="mb-6">
              <span
                className="inline-block px-4 py-2 text-sm font-medium text-white rounded-full"
                style={{ backgroundColor: article.category?.color || '#722F37' }}
              >
                {article.category?.name}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C] font-bold leading-tight mb-6">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-xl md:text-2xl text-[#404040] leading-relaxed mb-8">
                {article.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#404040] border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3">
                {article.author?.avatar?.url && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={article.author.avatar.url}
                      alt={article.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{article.author?.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishedAt}>{publishedDate}</time>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime || '5 min de leitura'}</span>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="px-3 py-1 text-xs bg-[#F5F5F5] text-[#404040] rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-[#404040] leading-relaxed mb-8">{article.description}</p>

          {article.contentBlocks && article.contentBlocks.length > 0 ? (
            <ContentBlockRenderer blocks={article.contentBlocks} />
          ) : (
            <div className="space-y-6 text-[#2C2C2C]">
              <p className="text-[#666666] italic">Este artigo não possui conteúdo adicional.</p>
            </div>
          )}
        </div>
      </motion.main>

      {article.author?.bio && (
        <aside className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
          <div className="flex gap-6 items-start">
            {article.author.avatar?.url && (
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={article.author.avatar.url}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl text-[#2C2C2C] font-medium mb-2">
                Sobre {article.author.name}
              </h3>
              <p className="text-[#404040] leading-relaxed">{article.author.bio}</p>
            </div>
          </div>
        </aside>
      )}

      {relatedArticles.length > 0 && (
        <section className="bg-[#FAFAFA] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl text-[#2C2C2C] mb-8">
              Mais em {article.category?.name}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <motion.article
                  key={related.id || related.slug}
                  whileHover={{ y: -5 }}
                  className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-500"
                >
                  <Link href={`/blog/${categorySlug}/${related.slug}`}>
                    <div className="aspect-[16/10] overflow-hidden bg-[#F5F5F5]">
                      <ImageWithFallback
                        src={related.cover?.url}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-lg text-[#2C2C2C] group-hover:text-[#722F37] transition-colors leading-snug">
                        {related.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-xs text-[#404040]">
                        <span>{related.author?.name}</span>
                        <span>•</span>
                        <span>{related.readTime || '5 min'}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.article>
  );
}
