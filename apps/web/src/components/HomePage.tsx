import { useArticles } from '@/hooks/useArticles';
import { useCategories } from '@/hooks/useCategories';
import { CategorySection } from './CategorySection';
import { Footer } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';

interface HomePageProps {
  onNavigateToCategory: (categoryId: string) => void;
}

export function HomePage({ onNavigateToCategory }: HomePageProps) {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: articles, isLoading: isLoadingArticles } = useArticles();
  const featuredArticle = articles?.[0];

  const layouts: Array<'featured' | 'grid' | 'split' | 'minimal'> = [
    'featured',
    'grid',
    'split',
    'minimal',
    'featured',
    'grid',
    'split',
  ];

  if (isLoadingCategories || isLoadingArticles || !featuredArticle) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header
        categories={categories || []}
        onNavigateToHome={() => window.scrollTo(0, 0)}
        onNavigateToCategory={onNavigateToCategory}
      />

      {/* Hero needs padding for fixed header */}
      <div className="pt-16 sm:pt-20">
        <Hero featuredArticle={featuredArticle} />
      </div>

      {/* Categories */}
      {categories?.map((category, index) => (
        <CategorySection
          key={category.id}
          category={category}
          layout={layouts[index % layouts.length]}
        />
      ))}

      <Footer />
    </div>
  );
}
