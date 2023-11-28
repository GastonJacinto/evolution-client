'use client';
import { getErrorMessage } from '@/utils/utils';
import { Divider } from '@nextui-org/react';
import React from 'react';
import toast from 'react-hot-toast';
import PlanCards from '../planCard/planCards';
import { IoWarning } from 'react-icons/io5';
import { motion } from 'framer-motion';

async function getPlansToRechargeCredits() {
  let plans;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    plans = await res.json();
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return toast.error(errorMessage);
  }
  return { plans };
}
export default function RechargeCredits() {
  //! ----------------- H O O K S ----------------------
  return (
    <motion.div
      initial={{
        x: 100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="classesMotionDiv"
    >
      <h3 className=" classesH3">
        <span className="text-[#fa8c48]">Elige</span> el plan que mejor se{' '}
        <span className="text-[#fa8c48]">adapte</span> a tus{' '}
        <span className="text-[#fa8c48]">metas</span>
      </h3>
      <Divider
        aria-label="divider"
        className="bg-white w-[90%] max-w-[55rem] my-4"
      />
      <div className=" flex items-center justify-center bg-gray-700 w-[80%] max-w-[55rem] -mt-2 mb-2 rounded-lg">
        <p className="text-tiny w-[90%] items-center p-1 text-white font-light flex justify-center gap-3">
          <IoWarning className="text-[50px] sm:text-[30px] text-yellow-400" />{' '}
          <span>
            Puedes asistir cuando quieras, pero ten en cuenta que solo podrás
            recargar siempre y cuando no te queden créditos disponibles.
          </span>
        </p>
      </div>
      <PlanCards />
    </motion.div>
  );
}
