'use client';

import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'motion/react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  variant?: 'default' | 'network' | 'notfound';
}

export function ErrorState({
  title = 'Algo deu errado',
  message = 'Não foi possível carregar o conteúdo. Por favor, tente novamente.',
  onRetry,
  variant = 'default',
}: ErrorStateProps) {
  const icons = {
    default: AlertCircle,
    network: WifiOff,
    notfound: AlertCircle,
  };

  const Icon = icons[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6"
      >
        <Icon className="w-10 h-10 text-red-500" />
      </motion.div>

      <h3 className="text-xl text-[#2C2C2C] font-medium mb-2">{title}</h3>

      <p className="text-[#404040] max-w-md mb-6">{message}</p>

      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 bg-[#722F37] text-white rounded-lg hover:bg-[#8B3A42] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Tentar novamente</span>
        </motion.button>
      )}
    </motion.div>
  );
}

// Error Banner (inline, menos intrusivo)
export function ErrorBanner({
  message = 'Erro ao carregar dados. Exibindo conteúdo offline.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-50 border-b border-amber-100 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Wifi className="w-4 h-4 text-amber-600" />
          <p className="text-sm text-amber-800">{message}</p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm text-amber-700 hover:text-amber-900 font-medium"
          >
            Reconectar
          </button>
        )}
      </div>
    </motion.div>
  );
}
