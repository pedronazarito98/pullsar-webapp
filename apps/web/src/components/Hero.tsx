import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Clock } from 'lucide-react';

interface HeroProps {
  onNavigateToArticle: (articleId: string) => void;
}

export function Hero({ onNavigateToArticle }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-[#1A1A1A]">
      {/* Background Image with Overlay */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1666698907755-672d406ea71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwZGFya3xlbnwxfHx8fDE3NjE5MDQ0NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cinema Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/70 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 bg-[#722F37] text-white text-xs tracking-widest">
              DESTAQUE DA SEMANA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight"
          >
            O Renascimento do Cinema de Arte
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Uma nova geração de cineastas está redefinindo os limites da narrativa visual, 
            trazendo de volta a essência experimental que marcou as grandes obras do século passado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button
              onClick={() => onNavigateToArticle('cinema-renascimento')}
              className="group flex items-center space-x-3 px-8 py-4 bg-[#722F37] hover:bg-[#8B3A42] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#722F37]/30"
            >
              <span className="tracking-wide">Ler Matéria</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">8 min de leitura</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <p className="text-sm text-gray-500">Por Clara Monteiro • Cinema • 1 Nov 2025</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-gray-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
