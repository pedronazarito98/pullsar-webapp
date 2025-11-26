'use client';

import { VideoEmbedBlock as VideoEmbedBlockType } from '@/types/strapiTypes';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

interface VideoEmbedBlockProps {
  block: VideoEmbedBlockType;
  animated?: boolean;
}

// Extract video ID from YouTube or Vimeo URLs
function extractVideoId(url: string): { platform: 'youtube' | 'vimeo' | null; id: string | null } {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^&\s]+)/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) return { platform: 'youtube', id: match[1] };
  }

  // Vimeo pattern
  const vimeoPattern = /vimeo\.com\/(\d+)/;
  const vimeoMatch = url.match(vimeoPattern);
  if (vimeoMatch) return { platform: 'vimeo', id: vimeoMatch[1] };

  return { platform: null, id: null };
}

export function VideoEmbedBlock({ block, animated = false }: VideoEmbedBlockProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { platform, id } = extractVideoId(block.url);

  if (!platform || !id) {
    return (
      <div className="my-12 p-8 bg-[#F5F5F5] rounded-lg text-center">
        <p className="text-[#404040]">Invalid video URL</p>
      </div>
    );
  }

  const embedUrl =
    platform === 'youtube'
      ? `https://www.youtube.com/embed/${id}${block.autoplay ? '?autoplay=1' : ''}`
      : `https://player.vimeo.com/video/${id}${block.autoplay ? '?autoplay=1' : ''}`;

  const thumbnailUrl =
    platform === 'youtube'
      ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      : null;

  const content = (
    <div className="my-12">
      {block.title && (
        <h3 className="text-2xl text-[#2C2C2C] font-medium mb-6">{block.title}</h3>
      )}
      
      <div className="relative w-full aspect-video bg-[#000] rounded-lg overflow-hidden">
        {!isLoaded && thumbnailUrl ? (
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer"
          >
            <Image
              src={thumbnailUrl}
              alt={block.title || 'Video thumbnail'}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="bg-[#722F37] hover:bg-[#8B3A42] p-6 rounded-full transition-all group-hover:scale-110 shadow-2xl">
                <Play className="w-12 h-12 text-white fill-white" />
              </div>
            </div>
          </button>
        ) : (
          <iframe
            src={embedUrl}
            title={block.title || 'Embedded video'}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
