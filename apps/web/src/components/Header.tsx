import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, Bookmark, User } from 'lucide-react';

interface HeaderProps {
  onNavigateToHome?: () => void;
}

export function Header({ onNavigateToHome }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Cinema', 'Música', 'Teatro', 'Literatura', 
    'Gastronomia', 'Vida Noturna', 'Moda'
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button 
              onClick={onNavigateToHome}
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 bg-[#722F37] flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-white tracking-wider">C</span>
              </div>
              <div className="hidden sm:block">
                <div className="tracking-tight text-[#2C2C2C]">CULTURA</div>
                <div className="text-[10px] text-[#722F37] tracking-widest">MAGAZINE</div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <button
                  key={category}
                  className="text-sm text-[#2C2C2C] hover:text-[#722F37] transition-colors relative group"
                >
                  {category}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#722F37] transition-all group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-[#FAFAFA] rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-[#2C2C2C]" />
              </button>

              {/* Bookmark */}
              <button className="hidden sm:block p-2 hover:bg-[#FAFAFA] rounded-full transition-colors">
                <Bookmark className="w-5 h-5 text-[#2C2C2C]" />
              </button>

              {/* User */}
              <button className="hidden sm:block p-2 hover:bg-[#FAFAFA] rounded-full transition-colors">
                <User className="w-5 h-5 text-[#2C2C2C]" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-[#FAFAFA] rounded-full transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-[#2C2C2C]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#2C2C2C]" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar artigos, autores, tópicos..."
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 rounded-none focus:outline-none focus:border-[#722F37] transition-colors"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <span className="tracking-wide text-[#2C2C2C]">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-[#FAFAFA] rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-[#2C2C2C]" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-1">
                    {categories.map((category, index) => (
                      <motion.button
                        key={category}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="w-full text-left px-4 py-3 text-[#2C2C2C] hover:bg-[#FAFAFA] hover:text-[#722F37] transition-colors rounded-sm"
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#2C2C2C] hover:bg-[#FAFAFA] transition-colors rounded-sm">
                      <Bookmark className="w-5 h-5" />
                      <span>Favoritos</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#2C2C2C] hover:bg-[#FAFAFA] transition-colors rounded-sm">
                      <User className="w-5 h-5" />
                      <span>Perfil</span>
                    </button>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
