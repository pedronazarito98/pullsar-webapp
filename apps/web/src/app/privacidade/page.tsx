import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const metadata = {
  title: 'Política de Privacidade | Pullsar Magazine',
  description: 'Conheça nossa política de privacidade e como tratamos seus dados pessoais.',
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-6">
            Política de Privacidade
          </h1>
          <p className="text-sm text-[#666666] mb-12">Última atualização: Janeiro de 2026</p>

          <div className="prose prose-lg max-w-none text-[#404040]">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">1. Introdução</h2>
              <p className="leading-relaxed mb-4">
                A Pullsar Magazine está comprometida em proteger sua privacidade. Esta política
                descreve como coletamos, usamos e protegemos suas informações pessoais quando você
                utiliza nosso site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                2. Informações que Coletamos
              </h2>
              <p className="leading-relaxed mb-4">
                Podemos coletar os seguintes tipos de informações:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Informações de contato (nome, email) quando você se inscreve em nossa newsletter
                </li>
                <li>Dados de navegação e uso do site através de cookies</li>
                <li>Informações fornecidas voluntariamente através de formulários de contato</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                3. Como Usamos suas Informações
              </h2>
              <p className="leading-relaxed mb-4">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Enviar nossa newsletter e atualizações sobre novos conteúdos</li>
                <li>Responder às suas solicitações e perguntas</li>
                <li>Melhorar nosso site e experiência do usuário</li>
                <li>Personalizar o conteúdo que você vê</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">4. Cookies</h2>
              <p className="leading-relaxed mb-4">
                Nosso site utiliza cookies para melhorar sua experiência de navegação. Cookies são
                pequenos arquivos de texto armazenados em seu dispositivo que nos ajudam a lembrar
                suas preferências e entender como você utiliza nosso site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                5. Compartilhamento de Dados
              </h2>
              <p className="leading-relaxed mb-4">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros
                para fins de marketing. Podemos compartilhar dados agregados e anônimos para fins
                estatísticos.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">6. Seus Direitos</h2>
              <p className="leading-relaxed mb-4">Você tem o direito de:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Acessar os dados pessoais que temos sobre você</li>
                <li>Solicitar a correção de dados incorretos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Cancelar sua inscrição de nossas comunicações a qualquer momento</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">7. Segurança</h2>
              <p className="leading-relaxed mb-4">
                Implementamos medidas de segurança técnicas e organizacionais apropriadas para
                proteger suas informações pessoais contra acesso não autorizado, alteração,
                divulgação ou destruição.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">8. Contato</h2>
              <p className="leading-relaxed mb-4">
                Se você tiver dúvidas sobre esta política de privacidade ou sobre como tratamos seus
                dados, entre em contato conosco através do email{' '}
                <a href="mailto:privacidade@pullsar.com" className="text-[#722F37] hover:underline">
                  privacidade@pullsar.com
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
