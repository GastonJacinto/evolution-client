'use client';
import React from 'react';
import { FormDataType, RoleEnum } from '@/utils/types';

export default function AddInstructorDashboard() {
  const [pending, setPending] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [formData, setFormData] = React.useState<FormDataType>({
    name: '',
    lastname: '',
    birth: '',
    password: '',
    email: '',
    phone: '',
    genre: '',
    dni: '',
    image: '',
  });
  return <div></div>;
}
