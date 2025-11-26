export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-[#F5F5F5] animate-pulse" />

      {/* Header Skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Category Badge Skeleton */}
          <div className="mb-6">
            <div className="h-8 w-24 bg-[#F5F5F5] rounded-full animate-pulse" />
          </div>

          {/* Title Skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-12 bg-[#F5F5F5] rounded animate-pulse" />
            <div className="h-12 bg-[#F5F5F5] rounded w-3/4 animate-pulse" />
          </div>

          {/* Meta Skeleton */}
          <div className="flex gap-6 border-t border-gray-200 pt-6">
            <div className="h-4 w-32 bg-[#F5F5F5] rounded animate-pulse" />
            <div className="h-4 w-32 bg-[#F5F5F5] rounded animate-pulse" />
            <div className="h-4 w-24 bg-[#F5F5F5] rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          <div className="h-4 bg-[#F5F5F5] rounded animate-pulse" />
          <div className="h-4 bg-[#F5F5F5] rounded animate-pulse" />
          <div className="h-4 bg-[#F5F5F5] rounded w-2/3 animate-pulse" />
          <div className="h-64 bg-[#F5F5F5] rounded-lg animate-pulse mt-8" />
          <div className="h-4 bg-[#F5F5F5] rounded animate-pulse" />
          <div className="h-4 bg-[#F5F5F5] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
