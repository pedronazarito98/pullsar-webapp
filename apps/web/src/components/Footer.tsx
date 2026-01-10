import { Category } from '@/types/strapiTypes';
import { Facebook, Instagram, Mail, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  categories?: Category[];
}

export function Footer({ categories }: FooterProps) {
  // Fallback se não receber categorias
  const displayCategories = categories?.map((c) => ({ name: c.name, slug: c.slug })) || [
    { name: 'Cinema', slug: 'cinema' },
    { name: 'Música', slug: 'musica' },
    { name: 'Literatura', slug: 'literatura' },
    { name: 'Gastronomia', slug: 'gastronomia' },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-[#722F37] flex items-center justify-center">
                <span className="tracking-wider">P</span>
              </div>
              <div>
                <div className="tracking-tight">PULLSAR</div>
                <div className="text-[10px] text-[#722F37] tracking-widest">MAGAZINE</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              A revista digital para mentes curiosas e apaixonadas por cultura contemporânea.
            </p>
            <div className="flex items-center space-x-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-[#722F37] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-[#722F37] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-[#722F37] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-[#722F37] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="tracking-wide mb-4">Categorias</h3>
            <ul className="space-y-2">
              {displayCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog/${category.slug}`}
                    className="text-sm text-gray-400 hover:text-[#722F37] transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="tracking-wide mb-4">Sobre</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/sobre" className="hover:text-[#722F37] transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-[#722F37] transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="tracking-wide mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Receba as melhores histórias culturais direto no seu email.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#722F37] transition-colors"
              />
              <button className="px-4 py-2 bg-[#722F37] hover:bg-[#8B3A42] transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500">
            © 2025 Cultura Magazine. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <Link href="/privacidade" className="hover:text-[#722F37] transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-[#722F37] transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
