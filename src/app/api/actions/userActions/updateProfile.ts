import { EditProfileType } from '@/utils/types';
import { getErrorMessage } from '@/utils/utils';

export async function updateProfile(userId: string, userData: EditProfileType) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
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
