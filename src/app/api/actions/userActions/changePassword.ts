import { ChangePasswordType } from '@/utils/types';
import { getErrorMessage } from '@/utils/utils';

export async function changePassword(
  userData: ChangePasswordType,
  token: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change/password`,
    {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (data.statusCode) {
    return {
      error: getErrorMessage(data),
    };
  }
  return {
    success: data.message,
  };
}
