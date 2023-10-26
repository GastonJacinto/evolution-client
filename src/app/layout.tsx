import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import NavBar from '@/components/navbar';
import { Toaster } from 'react-hot-toast';
import SessionAuthProvider from '@/context/SessionAuthProvider';

export const metadata: Metadata = {
  title: 'OLIMPO Training',
  description: 'Evolution Training WEB PAGE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth bg-zinc-900">
      <body
        suppressHydrationWarning={true}
        className="bg-zinc-900 w-full] h-[100vh] "
      >
        <Toaster reverseOrder={false} />
        <SessionAuthProvider>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
