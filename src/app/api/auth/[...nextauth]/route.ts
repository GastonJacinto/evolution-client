import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { getErrorMessage } from '@/utils/utils';
import { cookies } from 'next/headers';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        let data;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signIn`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        data = await res.json();
        if (data.statusCode) {
          throw new Error(getErrorMessage(data));
        }
        return data;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login', // Ruta de inicio de sesión personalizada
  },
});

export { handler as GET, handler as POST };
