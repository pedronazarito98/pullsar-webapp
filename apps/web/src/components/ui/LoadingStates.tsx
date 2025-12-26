'use client';

import { motion } from 'motion/react';

// Skeleton base com animação de shimmer
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-[#1A1A1A]">
      <Skeleton className="absolute inset-0 !bg-gray-800" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <Skeleton className="w-40 h-8 mb-6 rounded" />
          <Skeleton className="w-full h-16 mb-4 rounded" />
          <Skeleton className="w-3/4 h-16 mb-6 rounded" />
          <Skeleton className="w-full h-6 mb-2 rounded !bg-gray-700" />
          <Skeleton className="w-2/3 h-6 mb-8 rounded !bg-gray-700" />
          <div className="flex items-center space-x-4">
            <Skeleton className="w-40 h-14 rounded" />
            <Skeleton className="w-32 h-6 rounded !bg-gray-700" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Article Card Skeleton
export function ArticleCardSkeleton() {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group bg-white overflow-hidden"
    >
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="w-full h-6 rounded" />
        <Skeleton className="w-3/4 h-6 rounded" />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-2/3 h-4 rounded" />
        <div className="flex items-center space-x-3">
          <Skeleton className="w-20 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
      </div>
    </motion.article>
  );
}

// Category Section Skeleton
export function CategorySectionSkeleton({
  layout = 'grid',
}: {
  layout?: 'featured' | 'grid' | 'split' | 'minimal';
}) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-1 h-12 rounded-full" />
            <Skeleton className="w-40 h-10 rounded" />
          </div>
          <Skeleton className="w-24 h-6 rounded" />
        </div>

        {/* Grid */}
        {layout === 'grid' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Featured */}
        {layout === 'featured' && (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Skeleton className="aspect-[4/5] w-full rounded" />
            <div className="space-y-6">
              <Skeleton className="w-24 h-6 rounded" />
              <Skeleton className="w-full h-12 rounded" />
              <Skeleton className="w-3/4 h-12 rounded" />
              <Skeleton className="w-full h-20 rounded" />
              <Skeleton className="w-40 h-6 rounded" />
            </div>
          </div>
        )}

        {/* Split */}
        {layout === 'split' && (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="aspect-[16/11] w-full rounded" />
                <Skeleton className="w-full h-10 rounded" />
                <Skeleton className="w-full h-16 rounded" />
                <Skeleton className="w-40 h-4 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Minimal */}
        {layout === 'minimal' && (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid sm:grid-cols-12 gap-6 pb-8 border-b border-gray-200">
                <div className="sm:col-span-8 lg:col-span-9 space-y-3">
                  <Skeleton className="w-full h-8 rounded" />
                  <Skeleton className="w-full h-4 rounded" />
                  <Skeleton className="w-40 h-4 rounded" />
                </div>
                <div className="sm:col-span-4 lg:col-span-3">
                  <Skeleton className="aspect-square w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Article Page Skeleton
export function ArticlePageSkeleton() {
  return (
    <article className="min-h-screen bg-white pt-20">
      {/* Hero Image */}
      <Skeleton className="w-full h-[50vh] sm:h-[60vh]" />

      {/* Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 space-y-6">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-24 h-8 rounded-full" />
          <Skeleton className="w-full h-12 rounded" />
          <Skeleton className="w-3/4 h-12 rounded" />
          <Skeleton className="w-full h-8 rounded" />
          <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-24 h-4 rounded" />
            </div>
            <Skeleton className="w-24 h-4 rounded" />
            <Skeleton className="w-20 h-4 rounded" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <Skeleton className="w-full h-6 rounded" />
        <Skeleton className="w-full h-6 rounded" />
        <Skeleton className="w-3/4 h-6 rounded" />
        <Skeleton className="w-full h-6 rounded" />
        <Skeleton className="w-5/6 h-6 rounded" />
      </div>
    </article>
  );
}

// Page Loading (Full page)
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-12 h-12 border-4 border-[#722F37] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-[#404040] text-sm">Carregando...</p>
      </motion.div>
    </div>
  );
}
