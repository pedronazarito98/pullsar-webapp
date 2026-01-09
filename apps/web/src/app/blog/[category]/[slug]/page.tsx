import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ArticleContent } from '@/components/ArticleContent';
import {
  fetchAllArticleSlugs,
  fetchArticleBySlug,
  fetchArticles,
  fetchCategories,
} from '@/lib/api';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchAllArticleSlugs();
  return slugs;
}

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category: categorySlug, slug: articleSlug } = await params;

  const [article, allCategories, allArticles] = await Promise.all([
    fetchArticleBySlug(categorySlug, articleSlug),
    fetchCategories(),
    fetchArticles(),
  ]);

  if (!article) {
    notFound();
  }

  // Artigos relacionados da mesma categoria
  const relatedArticles = allArticles
    .filter((a) => a.category?.slug === categorySlug && a.slug !== articleSlug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header categories={allCategories} />
      <ArticleContent
        article={article}
        relatedArticles={relatedArticles}
        categorySlug={categorySlug}
      />
      <Footer categories={allCategories} />
    </div>
  );
}
