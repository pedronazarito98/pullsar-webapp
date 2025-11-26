import { useArticles } from '@/hooks/useArticles';
import { useCategories } from '@/hooks/useCategories';
import { CategorySection } from './CategorySection';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';

interface HomePageProps {
  onNavigateToCategory: (categoryId: string) => void;
  onNavigateToArticle: (articleId: string) => void;
}

export function HomePage({ onNavigateToCategory, onNavigateToArticle }: HomePageProps) {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: articles, isLoading: isLoadingArticles } = useArticles();

  const layouts: Array<'featured' | 'grid' | 'split' | 'minimal'> = [
    'featured', 'grid', 'split', 'minimal', 'featured', 'grid', 'split'
  ];

  if (isLoadingCategories || isLoadingArticles) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header onNavigateToHome={() => window.scrollTo(0, 0)} />
      
      {/* Hero needs padding for fixed header */}
      <div className="pt-16 sm:pt-20">
        <Hero onNavigateToArticle={onNavigateToArticle} />
      </div>

      {/* Categories */}
      {categories?.map((category, index) => (
        <CategorySection
          key={category.id}
          category={category}
          layout={layouts[index % layouts.length]}
          onNavigateToArticle={onNavigateToArticle}
          onNavigateToCategory={onNavigateToCategory}
        />
      ))}

      <Footer />
    </div>
  );
}
