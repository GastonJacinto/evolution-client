/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';
export default function SectionOne() {
  return (
    <motion.section
      id="home"
      initial={{
        x: -100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className=" w-full h-[100vh]  "
    >
      <div className="flex w-full h-[100%] relative items-center justify-center text-center ">
        <img
          src={
            'https://res.cloudinary.com/db7wpgkge/image/upload/v1697307306/evolution-training/landing/kvebu0hpnmj8cm07k0ua.jpg'
          }
          alt={'landing'}
          className="w-full h-[100%] object-cover z-0"
        />
        <div className="absolute font-valorant flex items-center flex-col justify-center md:pt-20 bg-gray-950 bg-opacity-50 w-full h-full transition-all">
          <h2 className="h2SectionOne text-[#cf9050] hover:scale-105 transition-all">
            LOS
          </h2>
          <h2 className="h2SectionOne  text-[#d8a971] hover:scale-105 transition-all">
            LÍMITES
          </h2>
          <h2 className="h2SectionOne text-[#cf9050] hover:scale-105 transition-all">
            TE LOS
          </h2>
          <h2 className="h2SectionOne text-[#d8a971] hover:scale-105 transition-all">
            PONES
          </h2>
          <h2 className="text-[6rem] font-bold text-[#cf9050] hover:scale-125  transition-all cursor-default">
            TÚ
          </h2>
        </div>
      </div>
    </motion.section>
  );
}
