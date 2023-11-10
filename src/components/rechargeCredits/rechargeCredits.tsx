'use client';
import { getErrorMessage } from '@/utils/utils';
import { Button } from '@nextui-org/react';
import React from 'react';
import toast from 'react-hot-toast';
import PlanCards from '../planCard/planCards';
import { CgDanger } from 'react-icons/cg';
import { IoWarning } from 'react-icons/io5';
import { useAppSelector } from '@/utils/hooks';

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
    <>
      <div className="w-full text-center h-full pt-10 ">
        <h1 className=" text-white text-2xl">
          <span className="text-[#fa8c48]">Elige</span> el plan que mejor se{' '}
          <span className="text-[#fa8c48]">adapte</span> a tus{' '}
          <span className="text-[#fa8c48]">metas</span>
        </h1>
        <div className="w-full flex items-center justify-center">
          <p className="text-tiny w-[70%] items-center py-5 text-white font-light flex  justify-center gap-3">
            <IoWarning className="text-[50px] sm:text-[30px] text-yellow-400" />{' '}
            <span>
              Puedes asistir cuando quieras, pero ten en cuenta que solo podrás
              recargar siempre y cuando no te queden créditos disponibles.
            </span>
          </p>
        </div>
        <PlanCards />
      </div>
    </>
  );
}
