import jwt_decode from 'jwt-decode';
import { getErrorMessage } from '@/utils/utils';
import { UserType } from '@/utils/types';
type JwtType = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};
export async function getUserProfile(undecodedToken: string) {
  let user: UserType;
  try {
    const { id }: JwtType = await jwt_decode(undecodedToken);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/` + id,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    user = await res.json();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  return { user };
}
