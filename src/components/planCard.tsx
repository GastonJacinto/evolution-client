/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';
import { planes } from '@/data/data';
import Image from 'next/image';
export type Plan = (typeof planes)[number];

export default function PlanCard({ name, price, description, image }: Plan) {
  return (
    <motion.div className="relative bg-[#fbf6ef] w-[20rem] h-[15rem]  border border-orange-300 rounded-xl flex flex-col items-center hover:scale-105 transition-all ">
      <img
        src={image}
        alt={name}
        className="w-full h-[100%] object-cover rounded-xl"
      />
      <div className="group  absolute  flex items-center flex-col justify-center bg-gray-900 bg-opacity-70 w-full h-full text-center p-4">
        <h1 className="text-[#fa8c48] font-bold text-3xl group-hover:scale-105 transition-all">
          {name}
        </h1>
        <span className="text-3xl text-white">
          $ <span className="text-[#fa8c48] font-bold text-4xl">{price}</span> /
          mes
        </span>
        <span className="text-white text-2xl">Sobre el plan:</span>
        <span className="text-white">{description}</span>
      </div>
    </motion.div>
  );
}
