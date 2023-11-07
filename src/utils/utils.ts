import { getAllClasses } from '@/app/api/actions/getClasses';
import { getInstructors } from '@/app/api/actions/getInstructorsAndUsers';
import { getUserProfile } from '@/app/api/actions/getUserProfile';
import { passClassToInactive } from '@/app/api/actions/passClassToInactive';
import { GymClassType } from './types';

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
