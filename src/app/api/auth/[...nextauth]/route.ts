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
        cookies().set('token', data.token, { secure: true });
        return data;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
