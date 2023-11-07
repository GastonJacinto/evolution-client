import { getAllClasses } from '@/app/api/actions/getClasses';
import { getInstructors } from '@/app/api/actions/getInstructorsAndUsers';
import { getUserProfile } from '@/app/api/actions/getUserProfile';

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

export async function getAllInstructorsFunction() {
  const { instructors, error } = await getInstructors();
  if (instructors) {
    return { instructors };
  } else {
    return { error };
  }
}
