'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
type AuthContextProviderProps = {
  children: React.ReactNode;
};
export default function SessionAuthProvider({
  children,
}: AuthContextProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
