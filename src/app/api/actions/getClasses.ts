import { getErrorMessage } from '@/utils/utils';

export async function getAllClasses() {
  let data;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    data = await res.json();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  return data;
}
