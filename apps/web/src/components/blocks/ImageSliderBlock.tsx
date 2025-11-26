'use client';

import { ImageSliderBlock as ImageSliderBlockType } from '@/types/strapiTypes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

interface ImageSliderBlockProps {
  block: ImageSliderBlockType;
  animated?: boolean;
}

export function ImageSliderBlock({ block, animated = false }: ImageSliderBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:1337';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % block.images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + block.images.length) % block.images.length);
  };

  const currentImage = block.images[currentIndex];
  const imageUrl = currentImage.url.startsWith('http')
    ? currentImage.url
    : `${baseUrl}${currentImage.url}`;

  const content = (
    <div className="my-12">
      {block.title && (
        <h3 className="text-2xl text-[#2C2C2C] font-medium mb-6">{block.title}</h3>
      )}
      
      <div className="relative w-full aspect-[16/9] bg-[#F5F5F5] rounded-lg overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={imageUrl}
              alt={currentImage.alternativeText || `Slide ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {block.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 
                bg-white/90 hover:bg-white p-3 rounded-full 
                shadow-lg transition-all opacity-0 group-hover:opacity-100
                hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-[#2C2C2C]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 
                bg-white/90 hover:bg-white p-3 rounded-full 
                shadow-lg transition-all opacity-0 group-hover:opacity-100
                hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-[#2C2C2C]" />
            </button>
          </>
        )}

        {/* Indicators */}
        {block.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {block.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {block.images.length}
        </div>
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
