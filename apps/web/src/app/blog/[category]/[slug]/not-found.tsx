import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-[#722F37] mb-4">404</h1>
        <h2 className="text-3xl text-[#2C2C2C] font-medium mb-4">Post não encontrado</h2>
        <p className="text-[#404040] mb-8">
          O post que você está procurando não existe ou foi removido.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-[#722F37] hover:bg-[#8B3A42] text-white rounded-lg transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
