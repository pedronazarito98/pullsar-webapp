import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const metadata = {
  title: 'Contato | Pullsar Magazine',
  description: 'Entre em contato com a equipe da Pullsar Magazine. Estamos aqui para ouvir você.',
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-6">Contato</h1>
          <p className="text-xl text-[#404040] leading-relaxed">
            Tem alguma dúvida, sugestão ou quer colaborar conosco? Estamos sempre abertos a novas
            conexões.
          </p>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-8">Informações de Contato</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#722F37] rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2C2C2C] mb-1">Email</h3>
                    <a href="mailto:contato@pullsar.com" className="text-[#722F37] hover:underline">
                      contato@pullsar.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#722F37] rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2C2C2C] mb-1">Telefone</h3>
                    <p className="text-[#404040]">+55 (11) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#722F37] rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#2C2C2C] mb-1">Endereço</h3>
                    <p className="text-[#404040]">São Paulo, SP - Brasil</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-[#FAFAFA] rounded-lg">
                <h3 className="font-medium text-[#2C2C2C] mb-2">Horário de Atendimento</h3>
                <p className="text-[#404040]">
                  Segunda a Sexta: 9h às 18h
                  <br />
                  Sábado: 9h às 13h
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-8">Envie uma Mensagem</h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-[#2C2C2C] placeholder:text-gray-400 focus:outline-none focus:border-[#722F37] transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-[#2C2C2C] placeholder:text-gray-400 focus:outline-none focus:border-[#722F37] transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                  >
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-[#2C2C2C] placeholder:text-gray-400 focus:outline-none focus:border-[#722F37] transition-colors"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#2C2C2C] mb-2"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-[#2C2C2C] placeholder:text-gray-400 focus:outline-none focus:border-[#722F37] transition-colors resize-none"
                    placeholder="Sua mensagem..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] text-white hover:bg-[#8B3A42] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
