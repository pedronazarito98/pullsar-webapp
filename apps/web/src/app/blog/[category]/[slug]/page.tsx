import { BlockManager } from '@/components/blocks/BlockManager';
import { getPost } from '@/lib/api';
import { Calendar, Clock, User } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  
  try {
    const post = await getPost(category, slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:1337';
    const imageUrl = post.cover?.url.startsWith('http')
      ? post.cover.url
      : `${baseUrl}${post.cover?.url}`;

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.cover ? [imageUrl] : [],
        type: 'article',
        publishedTime: post.publishedAt,
        authors: [post.author.name],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: post.cover ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Post',
    };
  }
}

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params;
  const post = await getPost(category, slug);

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:1337';
  const coverUrl = post.cover?.url.startsWith('http')
    ? post.cover.url
    : `${baseUrl}${post.cover?.url}`;

  const authorAvatarUrl = post.author.avatar?.url.startsWith('http')
    ? post.author.avatar.url
    : `${baseUrl}${post.author.avatar?.url}`;

  // Determine if this is a high-complexity post (enable animations)
  const hasComplexContent = post.contentBlocks.some(
    (block) =>
      block.__component === 'blocks.image-slider' ||
      block.__component === 'blocks.video-embed' ||
      block.__component === 'blocks.cta'
  );

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative w-full">
        {/* Cover Image */}
        {post.cover && (
          <div className="relative w-full h-[60vh] md:h-[70vh] bg-[#F5F5F5]">
            <Image
              src={coverUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}

        {/* Post Header Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className="inline-block px-4 py-2 text-sm font-medium text-white rounded-full"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#2C2C2C] font-bold leading-tight mb-6">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-[#404040] leading-relaxed mb-8">
                {post.subtitle}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#404040] border-t border-gray-200 pt-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                {post.author.avatar && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={authorAvatarUrl}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                </div>
              </div>

              {/* Published Date */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-xs bg-[#F5F5F5] text-[#404040] rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content Blocks */}
      <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-16">Loading content...</div>}>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <BlockManager blocks={post.contentBlocks} animated={hasComplexContent} />
        </main>
      </Suspense>

      {/* Author Bio */}
      {post.author.bio && (
        <aside className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
          <div className="flex gap-6 items-start">
            {post.author.avatar && (
              <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={authorAvatarUrl}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-xl text-[#2C2C2C] font-medium mb-2">
                Sobre {post.author.name}
              </h3>
              <p className="text-[#404040] leading-relaxed">{post.author.bio}</p>
            </div>
          </div>
        </aside>
      )}
    </article>
  );
}
