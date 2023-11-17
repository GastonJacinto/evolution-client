import { getErrorMessage } from '@/utils/utils';

export const deleteInstructor = async (instructorId: string) => {
  let data;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/instructors/${instructorId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  data = await res.json();
  if (data.statusCode) {
    return {
      error: getErrorMessage(data),
    };
  }
  return { message: data.message };
};
