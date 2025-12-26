'use client';

import { BookOpen, FileText, FolderOpen, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: 'articles' | 'categories' | 'search' | 'content';
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({
  title = 'Nenhum conteúdo encontrado',
  message = 'Não há itens para exibir no momento.',
  icon = 'content',
  action,
}: EmptyStateProps) {
  const icons = {
    articles: FileText,
    categories: FolderOpen,
    search: Search,
    content: BookOpen,
  };

  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-8"
      >
        <Icon className="w-12 h-12 text-[#404040]" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-[#2C2C2C] font-medium mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[#404040] max-w-md mb-6"
      >
        {message}
      </motion.p>

      {action && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Link
            href={action.href}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#722F37] text-white rounded-lg hover:bg-[#8B3A42] transition-colors"
          >
            <span>{action.label}</span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

// Empty State para seções (menor, inline)
export function EmptySection({
  message = 'Nenhum artigo publicado nesta categoria ainda.',
}: {
  message?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F5F5F5] flex items-center justify-center">
        <FileText className="w-8 h-8 text-[#404040]" />
      </div>
      <p className="text-[#404040]">{message}</p>
    </motion.div>
  );
}
