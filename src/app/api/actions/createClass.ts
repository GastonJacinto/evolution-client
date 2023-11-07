import { CreateClassType } from '@/utils/types';
import { getErrorMessage } from '@/utils/utils';

export const createNewClass = async (newClass: CreateClassType) => {
  let data;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`, {
    method: 'POST',
    body: JSON.stringify(newClass),
    headers: { 'Content-Type': 'application/json' },
  });
  data = await res.json();
  if (data.statusCode) {
    return {
      error: getErrorMessage(data),
    };
  }
  return { data };
};
