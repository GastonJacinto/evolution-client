import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import PlanCards from '../planCard/planCards';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { getAllPlans } from '@/app/api/actions/getPlans';
import toast from 'react-hot-toast';
import { loadAllPlans } from '@/app/redux/features/allPlansSlice';
export default function SectionTwo() {
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
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: () => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
      },
    }),
  };
  return (
    <motion.section
      initial="initial"
      variants={fadeInAnimationVariants}
      whileInView="animate"
      id="precios"
      viewport={{ once: true }}
      className="w-full flex flex-col items-center scroll-mt-20 md:scroll-mt-44 mt-10 p-5"
    >
      <h1 className="text-[2rem] font-semibold mb-4">
        <span className=" md:text-5xl text-[#cf9050] ">PLANES</span>{' '}
        <span className="text-[#d8a971]">Y</span>{' '}
        <span className=" md:text-5xl text-[#cf9050] ">PRECIOS</span>
      </h1>
      <PlanCards />
    </motion.section>
  );
}
