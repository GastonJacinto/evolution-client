import { getErrorMessage } from '@/utils/utils';

export async function removeStudentFromClass(
  idClass: string,
  studentId: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${idClass}/student/${studentId}`,
    {
      method: 'DELETE',
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
    data: data.message,
  };
}
