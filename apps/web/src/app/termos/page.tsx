import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const metadata = {
  title: 'Termos de Uso | Pullsar Magazine',
  description: 'Leia os termos e condições de uso do site Pullsar Magazine.',
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-6">Termos de Uso</h1>
          <p className="text-sm text-[#666666] mb-12">Última atualização: Janeiro de 2026</p>

          <div className="prose prose-lg max-w-none text-[#404040]">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="leading-relaxed mb-4">
                Ao acessar e usar o site da Pullsar Magazine, você concorda em cumprir e estar
                sujeito a estes Termos de Uso. Se você não concordar com qualquer parte destes
                termos, não deverá usar nosso site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">2. Uso do Conteúdo</h2>
              <p className="leading-relaxed mb-4">
                Todo o conteúdo publicado na Pullsar Magazine, incluindo textos, imagens, gráficos,
                vídeos e outros materiais, é protegido por direitos autorais e pertence à Pullsar
                Magazine ou aos seus respectivos autores.
              </p>
              <p className="leading-relaxed mb-4">Você pode:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Ler e compartilhar nosso conteúdo para fins não comerciais</li>
                <li>Citar trechos de artigos com devida atribuição</li>
                <li>Compartilhar links para nossos artigos em redes sociais</li>
              </ul>
              <p className="leading-relaxed mb-4">Você não pode:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Reproduzir artigos completos sem autorização prévia</li>
                <li>Usar nosso conteúdo para fins comerciais sem permissão</li>
                <li>Modificar ou criar obras derivadas do nosso conteúdo</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">3. Conduta do Usuário</h2>
              <p className="leading-relaxed mb-4">Ao usar nosso site, você concorda em não:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Violar qualquer lei ou regulamento aplicável</li>
                <li>Publicar conteúdo ofensivo, difamatório ou prejudicial</li>
                <li>Tentar acessar áreas restritas do site sem autorização</li>
                <li>Interferir no funcionamento normal do site</li>
                <li>Coletar informações de outros usuários sem consentimento</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                4. Comentários e Contribuições
              </h2>
              <p className="leading-relaxed mb-4">
                Se você enviar comentários, sugestões ou outros materiais para nosso site, você nos
                concede uma licença não exclusiva, gratuita e perpétua para usar, modificar e
                publicar esse conteúdo.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                5. Links para Outros Sites
              </h2>
              <p className="leading-relaxed mb-4">
                Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelo
                conteúdo, políticas de privacidade ou práticas desses sites. Recomendamos que você
                leia os termos de uso de qualquer site que visitar.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                6. Isenção de Garantias
              </h2>
              <p className="leading-relaxed mb-4">
                O conteúdo do site é fornecido &quot;como está&quot;, sem garantias de qualquer
                tipo. Não garantimos que o site estará sempre disponível, livre de erros ou que o
                conteúdo seja sempre preciso e atualizado.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                7. Limitação de Responsabilidade
              </h2>
              <p className="leading-relaxed mb-4">
                Em nenhuma circunstância a Pullsar Magazine será responsável por quaisquer danos
                diretos, indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou
                da incapacidade de usar nosso site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
                8. Alterações nos Termos
              </h2>
              <p className="leading-relaxed mb-4">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações
                entrarão em vigor imediatamente após sua publicação no site. O uso continuado do
                site após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">9. Lei Aplicável</h2>
              <p className="leading-relaxed mb-4">
                Estes termos são regidos pelas leis do Brasil. Qualquer disputa relacionada a estes
                termos será resolvida nos tribunais competentes da cidade de São Paulo.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">10. Contato</h2>
              <p className="leading-relaxed mb-4">
                Para dúvidas sobre estes termos, entre em contato através do email{' '}
                <a href="mailto:contato@pullsar.com" className="text-[#722F37] hover:underline">
                  contato@pullsar.com
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
