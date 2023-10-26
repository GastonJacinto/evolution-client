'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DrawerProfile from '@/components/drawerProfile';
import UserProfile from '@/components/profile';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import MyClassesTable from '@/components/myClassesTable';
import AllClasses from '@/components/allClasses';
import { getUserProfile } from '../api/actions/getUserProfile';
import { getProfile } from '../redux/features/userProfileSlice';
import toast from 'react-hot-toast';
import MyClasses from '@/components/myClasses';
import { getAllClasses } from '../api/actions/getClasses';
import { getClasses } from '../redux/features/myClassesSlice';

export default function Profile() {
  //!----------- HOOKS -----------------
  const tab = useAppSelector((state) => state.drawerSelectorSlice.tab);
  const classes = useAppSelector((state) => state.myClassesSlice.myClasses);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    getUser();
    getClassesToTable();
  }, [classes]);
  //!----------- FUNCTIONS -----------------
  async function getClassesToTable() {
    const classes = await getAllClasses();
    dispatch(getClasses(classes));
    return;
  }
  async function getUser() {
    try {
      const data = await getUserProfile();
      if (!data) {
        return toast.error('Hubo un error al buscar tu perfil.', {
          position: 'top-right',
        });
      } else if ('error' in data) {
        return toast.error('Hubo un error al buscar tu perfil.', {
          position: 'top-right',
        });
      } else {
        dispatch(getProfile(data));
      }
    } catch (error) {
      return toast.error('Hubo un error al buscar tu perfil.', {
        position: 'top-right',
      });
    }
  }

  const displayInfo = (key: number) => {
    switch (key) {
      case 1:
        return <MyClasses />;
      case 2:
        return <AllClasses />;
      case 3:
        return <AllClasses />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="w-full flex items-center pt-10 text-black font-bold h-[100vh]">
      <DrawerProfile />
      {displayInfo(tab)}
    </div>
  );
}
