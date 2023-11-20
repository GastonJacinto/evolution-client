'use client';
import React from 'react';
import DrawerProfile from '@/components/drawerProfile';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import AllClasses from '@/components/allClasses/allClasses';
import { loadProfile } from '../redux/features/userProfileSlice';
import toast from 'react-hot-toast';
import MyClasses from '@/components/myClasses/myClasses';
import { loadAllClasses } from '../redux/features/gymClassesSlice';
import {
  deletingClassesToInactive,
  getAllClassesFunction,
  getUser,
} from '@/utils/utils';
import { useSession } from 'next-auth/react';
import RechargeCredits from '@/components/rechargeCredits/rechargeCredits';
import { useRouter } from 'next/navigation';
import { getAllPlans } from '../api/actions/getPlans';
import { loadAllPlans } from '../redux/features/allPlansSlice';
import EditProfile from '@/components/editProfile/editProfile';

export default function Profile() {
  //!----------- HOOKS -----------------
  const { data: session } = useSession();
  const router = useRouter();
  const tab = useAppSelector((state) => state.drawerSelectorSlice.tab);
  const classes = useAppSelector((state) => state.gymClassesSlice.allClasses);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatchToChargeUserProfile();
    dispatchToChargePlans();
    getClassesToTable();
    deletingClassesToInactive(classes);
  });
  //!----------- FUNCTIONS -----------------
  async function dispatchToChargePlans() {
    const { plans, error } = await getAllPlans();
    if (error) {
      return toast.error(error);
    }
    if (plans) {
      return dispatch(loadAllPlans(plans));
    }
  }
  async function getClassesToTable() {
    const { classes, error } = await getAllClassesFunction();
    if (error) {
      return toast.error(error);
    }
    if (classes) {
      return dispatch(loadAllClasses(classes));
    }
  }
  async function dispatchToChargeUserProfile() {
    if (session) {
      const { user, error } = await getUser(session?.user.token);
      if (user) {
        return dispatch(loadProfile(user));
      } else {
        return toast.error(error);
      }
    }
  }
  const displayInfo = (key: number) => {
    switch (key) {
      case 1:
        return <MyClasses />;
      case 2:
        return <AllClasses />;
      case 3:
        return <RechargeCredits />;
      case 4:
        return <EditProfile />;
      default:
        return <MyClasses />;
    }
  };

  return (
    <div className="w-full flex items-center pt-10 text-black font-bold h-[100vh]">
      <DrawerProfile />
      {displayInfo(tab)}
    </div>
  );
}
