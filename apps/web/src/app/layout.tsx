import QueryProvider from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pullsar - Cultura Magazine',
  description:
    'A revista digital para mentes curiosas e apaixonadas por cultura contemporânea. Cinema, música, literatura, gastronomia e muito mais.',
  keywords: ['cultura', 'cinema', 'música', 'literatura', 'gastronomia', 'revista digital'],
  openGraph: {
    title: 'Pullsar - Cultura Magazine',
    description: 'A revista digital para mentes curiosas e apaixonadas por cultura contemporânea.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
