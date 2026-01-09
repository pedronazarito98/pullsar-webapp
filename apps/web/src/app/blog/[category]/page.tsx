import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ArticleFilters } from '@/components/ArticleFilters';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { fetchAllCategorySlugs, fetchCategories, fetchCategoryBySlug } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

  const [category, allCategories] = await Promise.all([
    fetchCategoryBySlug(categorySlug),
    fetchCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header categories={allCategories} />

      {/* Header da categoria */}
      <header className="relative pt-20">
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

            <div>
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
            </div>
          </div>
        </div>
      </header>

      {/* Filtros e lista de artigos (Client Component) */}
      <ArticleFilters
        articles={category.articles || []}
        categorySlug={categorySlug}
        categoryColor={category.color}
      />

      <Footer categories={allCategories} />
    </div>
  );
}
