import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { CategorySection } from './CategorySection';
import { Footer } from './Footer';

interface HomePageProps {
  onNavigateToCategory: (categoryId: string) => void;
  onNavigateToArticle: (articleId: string) => void;
}

export function HomePage({ onNavigateToCategory, onNavigateToArticle }: HomePageProps) {
  const categories = [
    {
      id: 'cinema',
      name: 'Cinema',
      color: '#722F37',
      image: 'https://images.unsplash.com/photo-1666698907755-672d406ea71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwZGFya3xlbnwxfHx8fDE3NjE5MDQ0NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      articles: [
        {
          id: 'cinema-1',
          title: 'As Novas Vozes do Cinema Independente',
          excerpt: 'Descubra os diretores emergentes que estão revolucionando a sétima arte com orçamentos modestos e visão ousada.',
          author: 'Marina Silva',
          readTime: '6 min',
          image: 'https://images.unsplash.com/photo-1666698907755-672d406ea71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwZGFya3xlbnwxfHx8fDE3NjE5MDQ0NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'cinema-2',
          title: 'Hitchcock Revisitado',
          excerpt: 'Uma análise profunda dos elementos que tornaram o mestre do suspense eternamente relevante.',
          author: 'Roberto Costa',
          readTime: '10 min'
        }
      ]
    },
    {
      id: 'musica',
      name: 'Música',
      color: '#8B3A42',
      image: 'https://images.unsplash.com/photo-1672841821756-fc04525771c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjE5NTIzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      articles: [
        {
          id: 'musica-1',
          title: 'A Ressurreição do Jazz em São Paulo',
          excerpt: 'Novos clubes, artistas e um público renovado fazem o jazz voltar com força à cena paulistana.',
          author: 'Beatriz Almeida',
          readTime: '7 min',
          image: 'https://images.unsplash.com/photo-1672841821756-fc04525771c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjE5NTIzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'musica-2',
          title: 'MPB Contemporânea',
          excerpt: 'Como a nova geração está reinventando a Música Popular Brasileira para o século XXI.',
          author: 'Lucas Santos',
          readTime: '5 min'
        },
        {
          id: 'musica-3',
          title: 'Festivais de Verão 2025',
          excerpt: 'Os eventos musicais mais esperados da temporada e o que esperar de cada um.',
          author: 'Ana Paula',
          readTime: '4 min'
        }
      ]
    },
    {
      id: 'teatro',
      name: 'Teatro',
      color: '#5A252B',
      image: 'https://images.unsplash.com/photo-1539964604210-db87088e0c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjIwMDUxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      articles: [
        {
          id: 'teatro-1',
          title: 'Teatro Experimental em Alta',
          excerpt: 'Conheça as companhias que estão quebrando paradigmas e conquistando novos públicos.',
          author: 'Fernanda Lima',
          readTime: '8 min',
          image: 'https://images.unsplash.com/photo-1539964604210-db87088e0c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjIwMDUxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'teatro-2',
          title: 'Clássicos Reinventados',
          excerpt: 'Shakespeare, Molière e outros mestres ganham novas interpretações provocativas.',
          author: 'Diego Martins',
          readTime: '9 min'
        }
      ]
    },
    {
      id: 'literatura',
      name: 'Literatura',
      color: '#404040',
      image: 'https://images.unsplash.com/photo-1652711475965-61d2e00904e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpdGVyYXR1cmUlMjBsaWJyYXJ5fGVufDF8fHx8MTc2MjAwNTExM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      articles: [
        {
          id: 'literatura-1',
          title: 'Os Autores Brasileiros que o Mundo Está Lendo',
          excerpt: 'Literatura nacional conquista prêmios e leitores internacionais com narrativas únicas.',
          author: 'Juliana Fernandes',
          readTime: '11 min',
          image: 'https://images.unsplash.com/photo-1652711475965-61d2e00904e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpdGVyYXR1cmUlMjBsaWJyYXJ5fGVufDF8fHx8MTc2MjAwNTExM3ww&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'literatura-2',
          title: 'Poesia no Século XXI',
          excerpt: 'Das redes sociais aos saraus, a poesia encontra novos espaços e vozes.',
          author: 'Paulo Henrique',
          readTime: '6 min'
        },
        {
          id: 'literatura-3',
          title: 'Clubes de Leitura',
          excerpt: 'O fenômeno que está transformando a experiência de ler em algo coletivo.',
          author: 'Mariana Souza',
          readTime: '5 min'
        }
      ]
    },
    {
      id: 'gastronomia',
      name: 'Gastronomia',
      color: '#722F37',
      image: 'https://images.unsplash.com/photo-1757358957218-67e771ec07bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZ291cm1ldCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYyMDA1MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      articles: [
        {
          id: 'gastronomia-1',
          title: 'A Nova Cozinha Brasileira',
          excerpt: 'Chefs revisitam receitas tradicionais com técnicas contemporâneas e ingredientes regionais.',
          author: 'Ricardo Andrade',
          readTime: '7 min',
          image: 'https://images.unsplash.com/photo-1757358957218-67e771ec07bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZ291cm1ldCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYyMDA1MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'gastronomia-2',
          title: 'Vinhos Naturais em Ascensão',
          excerpt: 'A tendência que está mudando a forma como consumimos e apreciamos vinhos.',
          author: 'Sofia Oliveira',
          readTime: '8 min'
        },
        {
          id: 'gastronomia-3',
          title: 'Food Halls Modernos',
          excerpt: 'Espaços gastronômicos que combinam diversidade culinária e experiência social.',
          author: 'Carlos Eduardo',
          readTime: '6 min'
        }
      ]
    },
    {
      id: 'vida-noturna',
      name: 'Vida Noturna',
      color: '#8B3A42',
      image: 'https://images.unsplash.com/photo-1682344439128-c1ae6f8d4c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBjaXR5JTIwbGlnaHRzfGVufDF8fHx8MTc2MTkyNzk1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      articles: [
        {
          id: 'vida-noturna-1',
          title: 'Bares Secretos e Speakeasies',
          excerpt: 'Descubra os endereços escondidos que oferecem as experiências mais exclusivas da cidade.',
          author: 'Thiago Rocha',
          readTime: '5 min',
          image: 'https://images.unsplash.com/photo-1682344439128-c1ae6f8d4c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGxpZmUlMjBjaXR5JTIwbGlnaHRzfGVufDF8fHx8MTc2MTkyNzk1M3ww&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'vida-noturna-2',
          title: 'A Cena Eletrônica Nacional',
          excerpt: 'DJs e produtores brasileiros conquistam palcos internacionais e trazem novos sons.',
          author: 'Amanda Costa',
          readTime: '7 min'
        }
      ]
    },
    {
      id: 'moda',
      name: 'Moda',
      color: '#5A252B',
      image: 'https://images.unsplash.com/photo-1670132718453-70321d9ecf20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzYxOTUxMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      articles: [
        {
          id: 'moda-1',
          title: 'Moda Sustentável: O Futuro é Agora',
          excerpt: 'Marcas brasileiras lideram movimento por uma indústria mais consciente e responsável.',
          author: 'Isabella Ferreira',
          readTime: '9 min',
          image: 'https://images.unsplash.com/photo-1670132718453-70321d9ecf20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzYxOTUxMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          id: 'moda-2',
          title: 'Street Style das Capitais',
          excerpt: 'O que as ruas de São Paulo, Rio e outras metrópoles revelam sobre tendências.',
          author: 'Gabriel Mendes',
          readTime: '6 min'
        },
        {
          id: 'moda-3',
          title: 'Designers Emergentes',
          excerpt: 'Novos talentos que estão redefinindo a estética da moda brasileira.',
          author: 'Camila Reis',
          readTime: '8 min'
        }
      ]
    }
  ];

  const layouts: Array<'featured' | 'grid' | 'split' | 'minimal'> = [
    'featured', 'grid', 'split', 'minimal', 'featured', 'grid', 'split'
  ];

  return (
    <div className="min-h-screen">
      <Header onNavigateToHome={() => window.scrollTo(0, 0)} />
      
      {/* Hero needs padding for fixed header */}
      <div className="pt-16 sm:pt-20">
        <Hero onNavigateToArticle={onNavigateToArticle} />
      </div>

      {/* Categories */}
      {categories.map((category, index) => (
        <CategorySection
          key={category.id}
          category={category}
          layout={layouts[index]}
          onNavigateToArticle={onNavigateToArticle}
          onNavigateToCategory={onNavigateToCategory}
        />
      ))}

      <Footer />
    </div>
  );
}
