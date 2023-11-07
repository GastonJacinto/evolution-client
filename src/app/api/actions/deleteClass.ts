import { getErrorMessage } from '@/utils/utils';

export const deleteClass = async (classId: string) => {
  let data;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/${classId}`,
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
  return { data };
};
