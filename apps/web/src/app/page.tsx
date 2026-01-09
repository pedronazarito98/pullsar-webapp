import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomeContent } from '@/components/HomeContent';
import { EmptyState } from '@/components/ui/EmptyState';
import { fetchCategories, fetchFeaturedArticle } from '@/lib/api';

export const revalidate = 60; // Revalidar a cada 60 segundos

export default async function HomePage() {
  const [categories, featuredArticle] = await Promise.all([
    fetchCategories(),
    fetchFeaturedArticle(),
  ]);

  if (categories.length === 0) {
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
      <Header categories={categories} />
      <HomeContent categories={categories} featuredArticle={featuredArticle} />
      <Footer categories={categories} />
    </div>
  );
}
