import { Post } from '@/types/strapiTypes';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogTestPage() {
  // Teste básico: verificar se a API está acessível
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const response = await fetch('http://localhost:1337/api/articles?populate=*', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      error = `API Error: ${response.status} ${response.statusText}`;
    } else {
      const data = await response.json();
      posts = data.data || [];
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#2C2C2C] mb-2">
          🧪 Blog Posts Test Page
        </h1>
        <p className="text-[#404040] mb-8">
          Página de teste para verificar integração Strapi + Next.js
        </p>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h2 className="text-red-800 font-semibold mb-2">❌ Erro na conexão com API</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="text-sm text-red-700 space-y-2">
              <p><strong>Possíveis causas:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Strapi não está rodando em <code>http://localhost:1337</code></li>
                <li>Permissões públicas não configuradas</li>
                <li>CORS bloqueando a requisição</li>
              </ul>
              <p className="mt-4">
                <strong>Solução:</strong> Veja{' '}
                <code>apps/backend/QUICK_START.md</code> passo 4
              </p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-yellow-800 font-semibold mb-2">
              ⚠️ Nenhum post encontrado
            </h2>
            <p className="text-yellow-700 mb-4">
              A API está funcionando, mas não há posts publicados.
            </p>
            <p className="text-sm text-yellow-600">
              <strong>Próximos passos:</strong> Crie posts no Strapi conforme{' '}
              <code>apps/backend/STRAPI_SETUP_GUIDE.md</code> seção 3
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-green-800 font-semibold mb-2">
              ✅ API conectada com sucesso!
            </h2>
            <p className="text-green-700">
              Encontrados <strong>{posts.length}</strong> post(s) publicado(s)
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-4">
              Posts Disponíveis
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const baseUrl = 'http://localhost:1337';
                const coverUrl = post.cover?.url.startsWith('http')
                  ? post.cover.url
                  : `${baseUrl}${post.cover?.url}`;

                const postUrl = `/blog/${post.category?.slug || 'uncategorized'}/${post.slug}`;
                
                const blockCount = post.contentBlocks?.length || 0;
                const blockTypes = post.contentBlocks?.map(b => 
                  b.__component.replace('blocks.', '')
                ) || [];

                return (
                  <Link
                    key={post.documentId}
                    href={postUrl}
                    className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {post.cover && (
                      <div className="relative w-full h-48 bg-[#F5F5F5]">
                        <Image
                          src={coverUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-4">
                      {post.category && (
                        <span
                          className="inline-block px-2 py-1 text-xs font-medium text-white rounded mb-2"
                          style={{ backgroundColor: post.category.color }}
                        >
                          {post.category.name}
                        </span>
                      )}
                      
                      <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2 group-hover:text-[#722F37] transition-colors">
                        {post.title}
                      </h3>
                      
                      {post.description && (
                        <p className="text-sm text-[#404040] mb-3 line-clamp-2">
                          {post.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-[#404040] mb-3">
                        <span>{post.author?.name || 'Unknown'}</span>
                        <span>•</span>
                        <span>{post.readTime || '5 min'}</span>
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs text-[#404040] mb-1">
                          <strong>Blocos:</strong> {blockCount}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {blockTypes.map((type, i) => (
                            <span
                              key={i}
                              className="text-xs bg-[#F5F5F5] text-[#404040] px-2 py-0.5 rounded"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-[#722F37] font-medium group-hover:underline">
                        Ver post completo →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 p-6 bg-[#F5F5F5] rounded-lg">
          <h3 className="text-lg font-semibold text-[#2C2C2C] mb-3">
            📚 Recursos
          </h3>
          <ul className="space-y-2 text-sm text-[#404040]">
            <li>
              <strong>Setup Guide:</strong>{' '}
              <code>apps/backend/STRAPI_SETUP_GUIDE.md</code>
            </li>
            <li>
              <strong>Quick Start:</strong>{' '}
              <code>apps/backend/QUICK_START.md</code>
            </li>
            <li>
              <strong>Permissions:</strong>{' '}
              <code>apps/backend/PERMISSIONS_SETUP.ts</code>
            </li>
            <li>
              <strong>Strapi Admin:</strong>{' '}
              <a
                href="http://localhost:1337/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#722F37] hover:underline"
              >
                http://localhost:1337/admin
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
