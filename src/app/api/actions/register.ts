import { FormDataType, RoleEnum } from '@/utils/types';
import { getErrorMessage } from '@/utils/utils';
import { user } from '@nextui-org/react';

export const registerUser = async (
  userData: FormDataType,
  userRole: RoleEnum
) => {
  let data;
  const role = userRole === RoleEnum.USER ? '/users' : '/instructors';
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${role}`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  });
  data = await res.json();
  if (data.statusCode) {
    return {
      error: getErrorMessage(data),
    };
  }
  return data;
};
