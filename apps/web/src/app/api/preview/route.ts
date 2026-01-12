import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  // Extrair parâmetros da URL
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const url = searchParams.get('url');
  const status = searchParams.get('status');

  // Validar o secret - deve corresponder ao PREVIEW_SECRET
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response('Token inválido', { status: 401 });
  }

  // Habilitar ou desabilitar draft mode baseado no status do conteúdo
  const draft = await draftMode();

  if (status === 'published') {
    draft.disable();
  } else {
    draft.enable();
  }

  // Validar que a URL é um path interno (previne open redirect)
  if (!url || !url.startsWith('/') || url.startsWith('//')) {
    return new Response('URL inválida', { status: 400 });
  }

  // Redirecionar para a URL do preview
  redirect(url);
}
