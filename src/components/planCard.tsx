import React from 'react';
import { motion } from 'framer-motion';
export default function PlanCard() {
  return (
    <motion.div className="bg-[#fbf6ef] w-[20rem] h-fit p-3 border border-orange-300 rounded-md flex flex-col items-center ">
      <h1 className="font-bold text-4xl">Plan NOVATO</h1>
      <span className="text-2xl">$3000 / mes</span>
      <span>Beneficios:</span>
      <span>* 2 clases por semana</span>
      <span>* 2 clases por semana</span>
      <span>* 2 clases por semana</span>
    </motion.div>
  );
}
