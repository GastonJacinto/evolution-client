import { getAllClasses } from '@/app/api/actions/getClasses';
import { getInstructors } from '@/app/api/actions/getInstructorsAndUsers';
import { getUserProfile } from '@/app/api/actions/getUserProfile';
import { passClassToInactive } from '@/app/api/actions/passClassToInactive';
import { CreatePaymentType, GymClassType, PlanType } from './types';

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }
  return message;
};

export async function getUser(token: string) {
  const { user, error } = await getUserProfile(token);
  if (user) {
    return { user };
  } else {
    return { error };
  }
}

export async function getAllClassesFunction() {
  const { classes, error } = await getAllClasses();
  if (error) {
    return { error };
  }
  return { classes };
}

export async function softDeletingClass(classId: string) {
  const { data, error } = await passClassToInactive(classId);
  if (data) {
    return { data };
  } else {
    return { error };
  }
}
export async function deletingClassesToInactive(allClasses: GymClassType[]) {
  const now = new Date();
  allClasses.forEach(async (clase) => {
    const classDate = new Date(clase.date);
    const timeDifference = classDate.getTime() - now.getTime();
    const hoursDifference = timeDifference / 3600000;
    if (hoursDifference <= 0) {
      await passClassToInactive(clase.id);
    }
  });
}
export async function getAllInstructorsFunction() {
  const { instructors, error } = await getInstructors();
  if (instructors) {
    return { instructors };
  } else {
    return { error };
  }
}

type PayerDataType = {
  email: string;
  name: string;
  dni: string;
};
export async function getPlansForCredits(
  planData: PlanType,
  payerData: PayerDataType
) {
  let data;
  const createPayment: CreatePaymentType = {
    id: planData.id,
    description: planData.description,
    title: planData.name,
    quantity: 1,
    unit_price: planData.price,
    image: planData.image,
    currency_id: 'ARS',
    payer: {
      name: payerData.name,
      email: payerData.email,
      identification: {
        type: 'DNI',
        number: payerData.dni,
      },
    },
  };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/createPreference`,
      {
        method: 'POST',
        body: JSON.stringify(createPayment),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    data = await res.json();
    return { data };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}
export type InfoToAddCreditsType = {
  name: string;
  creditsToAdd: number;
  userId: string;
};

export async function addCreditsFromDashboard(
  infoToAddCredits: InfoToAddCreditsType
) {
  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addRemainingClasses/${infoToAddCredits.creditsToAdd}/to/${infoToAddCredits.userId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    data = await res.json();
    return { data };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}
