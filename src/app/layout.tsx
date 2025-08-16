import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '../presentation/providers/app.provider';
import { APP_CONFIG } from '../shared/constants/app.constants';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_CONFIG.NAME,
  description: APP_CONFIG.DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
  },
};

/**
 * Root layout - Configuración global de la aplicación
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
