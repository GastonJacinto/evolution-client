import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import NavBar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Evolution Training',
  description: 'Evolution Training WEB PAGE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth ">
      <body suppressHydrationWarning={true} className="bg-[#080808] ">
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
