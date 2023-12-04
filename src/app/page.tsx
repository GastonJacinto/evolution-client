/* eslint-disable @next/next/no-img-element */
'use client';
import SectionFour from '@/components/sections/sectionFour';
import SectionOne from '@/components/sections/sectionOne';
import SectionThree from '@/components/sections/sectionThree';
import SectionTwo from '@/components/sections/sectionTwo';
import { useAppDispatch } from '@/utils/hooks';
import { useEffect } from 'react';
import { getAllPlans } from './api/actions/getPlans';
import toast from 'react-hot-toast';
import { loadAllPlans } from './redux/features/allPlansSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatchToChargePlans();
  });
  async function dispatchToChargePlans() {
    const { plans, error } = await getAllPlans();
    if (error) {
      return toast.error(error);
    }
    if (plans) {
      return dispatch(loadAllPlans(plans));
    }
  }
  return (
    <main className="flex w-full h-full flex-col items-center ">
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </main>
  );
}
