'use server';
import { cookies } from 'next/headers';
import jwt_decode from 'jwt-decode';
import { getErrorMessage } from '@/utils/utils';
import { UserType } from '@/utils/types';
type JwtType = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};
export async function getUserProfile() {
  const cookieStore = cookies();
  const undecodedToken = cookieStore.get('token');
  let user: UserType;
  if (undecodedToken) {
    const { id }: JwtType = jwt_decode(undecodedToken.value);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/` + id,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      user = await res.json();
    } catch (error) {
      console.log(error);
      return {
        error: getErrorMessage(error),
      };
    }
    return user;
  }
}
