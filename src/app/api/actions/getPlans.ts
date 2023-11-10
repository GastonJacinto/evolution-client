import { PlanType } from '@/utils/types';
import { getErrorMessage } from '@/utils/utils';

export async function getAllPlans() {
  let plans: PlanType[];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    plans = await res.json();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  return { plans };
}
