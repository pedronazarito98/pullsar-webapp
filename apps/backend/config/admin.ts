// Função para gerar o pathname de preview baseado no content-type
const getPreviewPathname = (
  uid: string,
  { locale, document }: { locale?: string; document: any }
): string | null => {
  const { slug } = document;

  switch (uid) {
    case 'api::article.article':
      if (!slug) return '/blog';
      // Artigos precisam do slug da categoria
      const categorySlug = document.category?.slug;
      if (categorySlug) {
        return `/blog/${categorySlug}/${slug}`;
      }
      return '/blog';

    case 'api::category.category':
      if (!slug) return '/blog';
      return `/blog/${slug}`;

    default:
      // Content-types sem preview retornam null
      return null;
  }
};

export default ({ env }) => {
  const clientUrl = env('CLIENT_URL');
  const previewSecret = env('PREVIEW_SECRET');

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY'),
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
    config: {
      locales: ['pt-BR'], // Adiciona Português do Brasil
    },
    // Configuração do Preview
    preview: {
      enabled: true,
      config: {
        allowedOrigins: clientUrl,
        async handler(uid, { documentId, locale, status }) {
          // Buscar o documento com populate da categoria (para artigos)
          const document = await strapi.documents(uid).findOne({
            documentId,
            populate: ['category'],
          });

          // Gerar o pathname baseado no content-type
          const pathname = getPreviewPathname(uid, { locale, document });

          // Se não há pathname (content-type sem preview), retornar null
          if (!pathname) {
            return null;
          }

          // Construir URL de preview com parâmetros para Next.js draft mode
          const urlSearchParams = new URLSearchParams({
            url: pathname,
            secret: previewSecret,
            status,
          });

          return `${clientUrl}/api/preview?${urlSearchParams}`;
        },
      },
    },
  };
};
