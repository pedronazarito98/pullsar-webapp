import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  category: {
    id: string;
    name: string;
    color: string;
    image: string;
    articles: Array<{
      id: string;
      title: string;
      excerpt: string;
      author: string;
      readTime: string;
      image?: string;
    }>;
  };
  layout: 'featured' | 'grid' | 'split' | 'minimal';
  onNavigateToArticle: (articleId: string) => void;
  onNavigateToCategory: (categoryId: string) => void;
}

export function CategorySection({ 
  category, 
  layout, 
  onNavigateToArticle,
  onNavigateToCategory 
}: CategorySectionProps) {
  const featuredArticle = category.articles[0];
  const otherArticles = category.articles.slice(1);

  if (layout === 'featured') {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div className="flex items-center space-x-4">
              <div 
                className="w-1 h-12 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h2 className="text-3xl sm:text-4xl text-[#2C2C2C]">
                {category.name}
              </h2>
            </div>
            <button
              onClick={() => onNavigateToCategory(category.id)}
              className="group flex items-center space-x-2 text-[#722F37] hover:text-[#8B3A42] transition-colors"
            >
              <span className="text-sm tracking-wide">Ver Todos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Featured Article */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => onNavigateToArticle(featuredArticle.id)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
                <ImageWithFallback
                  src={featuredArticle.image || category.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <span 
                  className="inline-block px-3 py-1 text-xs tracking-widest text-white mb-4"
                  style={{ backgroundColor: category.color }}
                >
                  DESTAQUE
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl text-[#2C2C2C] mb-4 leading-tight">
                  {featuredArticle.title}
                </h3>
                <p className="text-lg text-[#404040] leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="flex items-center space-x-4 text-sm text-[#404040]">
                <span>{featuredArticle.author}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <button
                onClick={() => onNavigateToArticle(featuredArticle.id)}
                className="group flex items-center space-x-2 text-[#722F37] hover:text-[#8B3A42] transition-colors"
              >
                <span className="tracking-wide">Continuar Lendo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'grid') {
    return (
      <section className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div className="flex items-center space-x-4">
              <div 
                className="w-1 h-12 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h2 className="text-3xl sm:text-4xl text-[#2C2C2C]">
                {category.name}
              </h2>
            </div>
            <button
              onClick={() => onNavigateToCategory(category.id)}
              className="group flex items-center space-x-2 text-[#722F37] hover:text-[#8B3A42] transition-colors"
            >
              <span className="text-sm tracking-wide">Ver Todos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {category.articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer bg-white overflow-hidden hover:shadow-2xl transition-all duration-500"
                onClick={() => onNavigateToArticle(article.id)}
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#F5F5F5]">
                  <ImageWithFallback
                    src={article.image || category.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl text-[#2C2C2C] group-hover:text-[#722F37] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#404040] line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-[#404040]">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'split') {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div className="flex items-center space-x-4">
              <div 
                className="w-1 h-12 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h2 className="text-3xl sm:text-4xl text-[#2C2C2C]">
                {category.name}
              </h2>
            </div>
            <button
              onClick={() => onNavigateToCategory(category.id)}
              className="group flex items-center space-x-2 text-[#722F37] hover:text-[#8B3A42] transition-colors"
            >
              <span className="text-sm tracking-wide">Ver Todos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {category.articles.slice(0, 2).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group cursor-pointer"
                onClick={() => onNavigateToArticle(article.id)}
              >
                <div className="aspect-[16/11] overflow-hidden bg-[#F5F5F5] mb-6">
                  <ImageWithFallback
                    src={article.image || category.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl text-[#2C2C2C] mb-4 group-hover:text-[#722F37] transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-[#404040] mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center space-x-3 text-sm text-[#404040]">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Minimal layout
  return (
    <section className="py-16 lg:py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center space-x-4">
            <div 
              className="w-1 h-12 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h2 className="text-3xl sm:text-4xl text-[#2C2C2C]">
              {category.name}
            </h2>
          </div>
          <button
            onClick={() => onNavigateToCategory(category.id)}
            className="group flex items-center space-x-2 text-[#722F37] hover:text-[#8B3A42] transition-colors"
          >
            <span className="text-sm tracking-wide">Ver Todos</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Minimal List */}
        <div className="space-y-8">
          {category.articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer pb-8 border-b border-gray-200 last:border-0"
              onClick={() => onNavigateToArticle(article.id)}
            >
              <div className="grid sm:grid-cols-12 gap-6">
                <div className="sm:col-span-8 lg:col-span-9 space-y-3">
                  <h3 className="text-2xl text-[#2C2C2C] group-hover:text-[#722F37] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#404040] line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center space-x-3 text-sm text-[#404040]">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                {article.image && (
                  <div className="sm:col-span-4 lg:col-span-3">
                    <div className="aspect-square overflow-hidden bg-[#F5F5F5]">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
