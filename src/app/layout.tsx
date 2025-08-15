
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobPlatform - Encuentra tu trabajo ideal',
  description: 'Plataforma de empleo moderna que conecta talento con oportunidades. Encuentra trabajos, publica ofertas y construye tu carrera profesional.',
  keywords: ['empleos', 'trabajos', 'carrera', 'profesional', 'ofertas laborales'],
  authors: [{ name: 'JobPlatform Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
            {children}
      </body>
    </html>
  );
}
