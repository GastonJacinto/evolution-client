import { getErrorMessage } from '@/utils/utils';
import { InstructorType, UserType } from '@/utils/types';

export async function getInstructors() {
  let instructors: InstructorType[];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/instructors`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    instructors = await res.json();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  return { instructors };
}

export async function getUsers() {
  let users: UserType[];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    users = await res.json();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
  return { users };
}
