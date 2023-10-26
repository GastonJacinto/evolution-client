import { UserType } from '@/utils/types';
import { getErrorMessage } from '@/utils/utils';

export async function reserveClass(idClass: string, studentId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${idClass}/student/${studentId}`,
    {
      method: 'POST',
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
    success: 'Has reservado tu lugar en la clase.',
  };
}
