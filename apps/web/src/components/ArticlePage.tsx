import { useArticle } from '@/hooks/useArticles';
import { useCategories } from '@/hooks/useCategories';
import {
  ArrowRight,
  Bookmark,
  Calendar,
  ChevronUp,
  Clock,
  Eye,
  Facebook,
  Heart,
  Linkedin,
  Link as LinkIcon,
  MessageCircle,
  Share2,
  Twitter,
  User,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticlePageProps {
  articleId: string;
  onNavigateToHome: () => void;
  onNavigateToCategory: (categoryId: string) => void;
}

export function ArticlePage({
  articleId,
  onNavigateToHome,
  onNavigateToCategory,
}: ArticlePageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [likes, setLikes] = useState(142);
  const [isLiked, setIsLiked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { data: article, isLoading } = useArticle(articleId);
  const { data: categories } = useCategories();

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadProgress(Math.min(progress, 100));
      setShowScrollTop(scrolled > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center">Article not found</div>;
  }

  const relatedArticles = [
    {
      id: 'related-1',
      title: 'Festivais de Cinema: O Circuito da Arte',
      image:
        'https://images.unsplash.com/photo-1605905898247-bb1fe36b587e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwbW9kZXJufGVufDF8fHx8MTc2MjAwNTI4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Cinema',
      readTime: '6 min',
    },
    {
      id: 'related-2',
      title: 'Cinematografia Digital: A Revolução Técnica',
      image:
        'https://images.unsplash.com/photo-1663215074193-46c175cf4673?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWdhemluZSUyMHJlYWRpbmd8ZW58MXx8fHwxNzYyMDA1Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Cinema',
      readTime: '7 min',
    },
    {
      id: 'related-3',
      title: 'Mulheres no Cinema: Novas Perspectivas',
      image:
        'https://images.unsplash.com/photo-1666698907755-672d406ea71d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyJTIwZGFya3xlbnwxfHx8fDE3NjE5MDQ0NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Cinema',
      readTime: '9 min',
    },
  ];

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        categories={categories || []}
        onNavigateToHome={onNavigateToHome}
        onNavigateToCategory={onNavigateToCategory}
      />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-16 sm:top-20 left-0 right-0 h-1 bg-gray-200 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full bg-[#722F37]"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Hero Section */}
      <article className="pt-24 sm:pt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category & Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => onNavigateToCategory('cinema')}
              className="inline-block px-4 py-2 bg-[#722F37] text-white text-xs tracking-widest hover:bg-[#8B3A42] transition-colors mb-6"
            >
              {article.category.name}
            </button>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#2C2C2C] mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-[#404040] mb-8 leading-relaxed">{article.subtitle}</p>

            {/* Author & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-gray-200 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F5F5F5]">
                  <ImageWithFallback
                    src={article.author.avatar?.url}
                    alt={article.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-[#2C2C2C] mb-1">{article.author.name}</div>
                  <div className="flex items-center space-x-3 text-sm text-[#404040]">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 transition-colors ${
                    isBookmarked
                      ? 'bg-[#722F37] text-white'
                      : 'bg-[#F5F5F5] text-[#404040] hover:bg-[#FAFAFA]'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3 bg-[#F5F5F5] text-[#404040] hover:bg-[#FAFAFA] transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 bg-white shadow-xl border border-gray-200 rounded-sm overflow-hidden z-10"
                    >
                      <button className="flex items-center space-x-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors w-full">
                        <Facebook className="w-4 h-4 text-[#1877F2]" />
                        <span className="text-sm whitespace-nowrap">Facebook</span>
                      </button>
                      <button className="flex items-center space-x-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors w-full">
                        <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                        <span className="text-sm whitespace-nowrap">Twitter</span>
                      </button>
                      <button className="flex items-center space-x-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors w-full">
                        <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                        <span className="text-sm whitespace-nowrap">LinkedIn</span>
                      </button>
                      <button className="flex items-center space-x-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors w-full">
                        <LinkIcon className="w-4 h-4 text-[#404040]" />
                        <span className="text-sm whitespace-nowrap">Copiar Link</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[16/9] overflow-hidden bg-[#F5F5F5] mb-12"
          >
            <ImageWithFallback
              src={article.cover?.url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6">
              O cinema de arte, aquele que desafia convenções e provoca reflexões profundas, parecia
              ter perdido espaço nos últimos anos para as grandes produções de estúdio. No entanto,
              uma nova geração de cineastas está provando que a narrativa experimental não apenas
              sobrevive, mas floresce em meio ao cenário contemporâneo.
            </p>

            <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6">
              Esses jovens diretores, armados com câmeras digitais acessíveis e uma visão ousada,
              estão criando obras que dialogam com os grandes mestres do passado enquanto trazem uma
              sensibilidade única do século XXI. São filmes que rejeitam fórmulas prontas e abraçam
              a complexidade da experiência humana.
            </p>

            <h2 className="text-3xl text-[#2C2C2C] mt-12 mb-6">O Retorno à Essência</h2>

            <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6">
              Diferentemente da era digital que prioriza a velocidade e o imediatismo, esses
              cineastas optam pela contemplação. Planos longos, silêncios significativos e
              narrativas não-lineares são algumas das características que marcam essa nova onda. É
              um cinema que exige do espectador, mas também o recompensa com experiências
              cinematográficas profundamente memoráveis.
            </p>

            <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6">
              Festivais independentes ao redor do mundo têm sido o palco de estreia para muitos
              desses trabalhos. Longe dos holofotes de Hollywood, essas produções encontram seu
              público: pessoas em busca de algo além do entretenimento superficial, que desejam ser
              desafiadas e transformadas pela arte cinematográfica.
            </p>

            <h2 className="text-3xl text-[#2C2C2C] mt-12 mb-6">Vozes Diversas, Histórias Únicas</h2>

            <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6">
              Uma das características mais marcantes deste renascimento é a diversidade. Mulheres,
              pessoas negras, LGBTQIA+ e outras vozes historicamente marginalizadas estão não apenas
              contando suas histórias, mas revolucionando a própria linguagem cinematográfica. Cada
              perspectiva traz consigo uma nova forma de ver e representar o mundo na tela.
            </p>

            <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6">
              Essa pluralidade enriquece o cinema como um todo, expandindo os limites do que
              consideramos possível em termos de narrativa visual. São histórias que desafiam o
              status quo, questionam estruturas de poder e oferecem representações autênticas de
              experiências antes invisibilizadas.
            </p>

            <h2 className="text-3xl text-[#2C2C2C] mt-12 mb-6">O Futuro é Experimental</h2>

            <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6">
              À medida que plataformas de streaming democratizam o acesso à distribuição, esses
              cineastas encontram novos caminhos para alcançar audiências globais. O modelo
              tradicional de exibição não é mais o único caminho, e isso abre possibilidades
              inimagináveis há uma década.
            </p>

            <p className="text-lg text-[#2C2C2C] leading-relaxed mb-6">
              O renascimento do cinema de arte não é apenas uma tendência passageira, mas um
              movimento cultural significativo que reafirma o poder transformador da sétima arte. Em
              um mundo saturado de conteúdo descartável, esses filmes nos lembram que o cinema pode
              — e deve — ser muito mais do que mero entretenimento.
            </p>
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-200">
            {article.tags?.map((tag) => (
              <span
                key={tag.slug}
                className="px-4 py-2 bg-[#F5F5F5] text-[#404040] text-sm hover:bg-[#722F37] hover:text-white transition-colors cursor-pointer"
              >
                #{tag.name}
              </span>
            ))}
          </div>

          {/* Author Bio */}
          <div className="bg-[#FAFAFA] p-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#F5F5F5] flex-shrink-0">
                <ImageWithFallback
                  src={article.author.avatar?.url}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-[#722F37]" />
                  <span className="text-[#2C2C2C]">Sobre o Autor</span>
                </div>
                <h3 className="text-xl text-[#2C2C2C] mb-2">{article.author.name}</h3>
                <p className="text-[#404040] leading-relaxed">
                  {article.author.bio || 'No bio available'}
                </p>
              </div>
            </div>
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between py-8 border-y border-gray-200 mb-12">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-colors ${
                  isLiked ? 'text-[#722F37]' : 'text-[#404040] hover:text-[#722F37]'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-[#404040] hover:text-[#722F37] transition-colors">
                <MessageCircle className="w-6 h-6" />
                <span>24</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-[#722F37] hover:text-[#8B3A42] transition-colors">
              <span className="text-sm tracking-wide">Compartilhar</span>
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <section className="bg-[#FAFAFA] py-16 mb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl text-[#2C2C2C]">Leia Também</h2>
              <button
                onClick={() => onNavigateToCategory('cinema')}
                className="group flex items-center space-x-2 text-[#722F37] hover:text-[#8B3A42] transition-colors"
              >
                <span className="text-sm tracking-wide">Ver Mais</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related, index) => (
                <motion.article
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer bg-white overflow-hidden hover:shadow-xl transition-all duration-500"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#F5F5F5]">
                    <ImageWithFallback
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="inline-block px-3 py-1 bg-[#722F37] text-white text-xs tracking-widest">
                      {related.category}
                    </span>
                    <h3 className="text-xl text-[#2C2C2C] group-hover:text-[#722F37] transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-[#404040]">
                      <Clock className="w-4 h-4" />
                      <span>{related.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </article>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 bg-[#722F37] text-white rounded-full shadow-lg hover:bg-[#8B3A42] transition-colors z-50"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
