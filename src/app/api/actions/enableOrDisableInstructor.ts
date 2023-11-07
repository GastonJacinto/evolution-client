import { EnableOrDisableEnum } from '@/utils/types';
import { getErrorMessage } from '@/utils/utils';

export const enableOrDisableInstructor = async (
  instructorId: string,
  action: EnableOrDisableEnum
) => {
  let data;
  console.log(instructorId, 'action' + action);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/instructors/${action}/${instructorId}`,
    {
      method: 'POST',
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
