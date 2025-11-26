import { useCategory } from '@/hooks/useCategories';
import { ArrowRight, Filter, Grid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryPageProps {
  categoryId: string;
  onNavigateToArticle: (articleId: string) => void;
  onNavigateToHome: () => void;
}

export function CategoryPage({ categoryId, onNavigateToArticle, onNavigateToHome }: CategoryPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('todos');
  const { data: category, isLoading } = useCategory(categoryId);

  const filters = ['todos', 'crítica', 'análise', 'entrevista', 'eventos', 'técnica'];

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!category) {
    return <div className="min-h-screen flex items-center justify-center">Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigateToHome={onNavigateToHome} />

      {/* Category Hero */}
      <section className="pt-32 pb-16 bg-[#FAFAFA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div 
                className="w-2 h-16 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h1 className="text-5xl lg:text-6xl text-[#2C2C2C]">
                {category.name}
              </h1>
            </div>
            <p className="text-xl text-[#404040] max-w-2xl">
              {category.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and View Options */}
      <section className="py-8 border-b border-gray-200 sticky top-16 sm:top-20 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="w-4 h-4 text-[#404040] flex-shrink-0" />
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    filter === f
                      ? 'bg-[#722F37] text-white'
                      : 'bg-[#F5F5F5] text-[#404040] hover:bg-[#FAFAFA]'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#722F37] text-white'
                    : 'bg-[#F5F5F5] text-[#404040] hover:bg-[#FAFAFA]'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#722F37] text-white'
                    : 'bg-[#F5F5F5] text-[#404040] hover:bg-[#FAFAFA]'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.articles.map((article: any, index: number) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => onNavigateToArticle(article.id)}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#F5F5F5] mb-6">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <span 
                      className="inline-block px-3 py-1 text-xs tracking-widest text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {article.category}
                    </span>
                    
                    <h3 className="text-2xl text-[#2C2C2C] group-hover:text-[#722F37] transition-colors leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-[#404040] leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-3 text-sm text-[#404040] pt-2">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {category.articles.map((article: any, index: number) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer pb-8 border-b border-gray-200 last:border-0"
                  onClick={() => onNavigateToArticle(article.id)}
                >
                  <div className="grid sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-4">
                      <div className="aspect-[16/10] overflow-hidden bg-[#F5F5F5]">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-8 space-y-4">
                      <div className="flex items-center space-x-3">
                        <span 
                          className="inline-block px-3 py-1 text-xs tracking-widest text-white"
                          style={{ backgroundColor: category.color }}
                        >
                          {article.category}
                        </span>
                        <span className="text-sm text-[#404040]">{article.date}</span>
                      </div>
                      
                      <h3 className="text-3xl text-[#2C2C2C] group-hover:text-[#722F37] transition-colors leading-tight">
                        {article.title}
                      </h3>
                      
                      <p className="text-[#404040] leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-[#404040]">
                          <span>{article.author}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                        
                        <button className="group/btn flex items-center space-x-2 text-[#722F37] hover:text-[#8B3A42] transition-colors">
                          <span className="text-sm tracking-wide">Ler Mais</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
