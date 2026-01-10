import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Target, Heart } from 'lucide-react';

export const metadata = {
  title: 'Quem Somos | Pullsar Magazine',
  description:
    'Conheça a história e a equipe por trás da Pullsar Magazine, a revista digital para mentes curiosas.',
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-6">Quem Somos</h1>
          <p className="text-xl text-[#404040] leading-relaxed">
            A Pullsar Magazine é uma revista digital dedicada a explorar e celebrar a cultura
            contemporânea em todas as suas formas.
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-[#FAFAFA] py-16 mb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#722F37] rounded-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#2C2C2C]">Nossa Missão</h2>
                </div>
                <p className="text-[#404040] leading-relaxed">
                  Conectar pessoas através de histórias que inspiram, informam e provocam reflexão.
                  Acreditamos no poder da cultura como ferramenta de transformação social.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#722F37] rounded-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#2C2C2C]">Nossos Valores</h2>
                </div>
                <p className="text-[#404040] leading-relaxed">
                  Autenticidade, diversidade e qualidade editorial são os pilares que guiam nosso
                  trabalho diário. Valorizamos vozes únicas e perspectivas inovadoras.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
