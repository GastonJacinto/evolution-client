import { GymClassType } from '@/utils/types';
import { getErrorMessage } from '@/utils/utils';

export async function getAllClasses() {
  let classes: GymClassType[];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/classes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    classes = await res.json();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  return { classes };
}
