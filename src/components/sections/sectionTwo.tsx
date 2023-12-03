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
        delay: 0.2,
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
      className="relative w-full  h-full flex flex-col items-center scroll-mt-16  p-5 bg-a bg-cover bg-top transition-all "
      style={{
        backgroundImage: `url('https://res.cloudinary.com/db7wpgkge/image/upload/v1701634061/evolution-training/landing/rphydajjuhuehul2jazh.jpg')`,
      }}
    >
      <div className="z-0 absolute w-full h-full bg-gray-950 bg-opacity-50 inset-0 "></div>

      <h1 className="text-[2rem] font-semibold mb-4 text-center z-10">
        <span className=" md:text-5xl text-[#cf9050] ">PLANES</span>{' '}
        <span className="text-[#d8a971]">Y</span>{' '}
        <span className=" md:text-5xl text-[#cf9050] ">PRECIOS</span>
      </h1>
      <PlanCards />
      <p className="text-center w-[100%] md:w-[70%] mt-10 text-xl text-[#cfcfcf] z-10">
        Con nuestros planes te aseguramos que podrás conseguir todos tus
        <span className="tracking-wider text-[#cf9050]"> objetivos.</span>
        <br />
        Tenemos un plan a la medida para cada una de tus{' '}
        <span className="tracking-wider text-[#cf9050]"> necesidades</span>.
        Además, contamos con entrenadores con basta experiencia y que estarán
        dispuestos a dar el{' '}
        <span className="tracking-wider text-[#cf9050]">110%</span> para
        ayudarte a alcanzar tus metas.
      </p>
    </motion.section>
  );
}
