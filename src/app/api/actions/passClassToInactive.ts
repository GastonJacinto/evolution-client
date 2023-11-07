import { getErrorMessage } from '@/utils/utils';

export const passClassToInactive = async (classId: string) => {
  let data;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/classes/passedClass/${classId}`,
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
