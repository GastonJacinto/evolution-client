import React from 'react';
import { motion, useInView } from 'framer-motion';
import Schedule from '../schedules';

export default function SectionThree() {
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
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      id="horarios"
      viewport={{ once: true }}
      className=" relative w-full h-full flex flex-col items-center scroll-mt-16 p-5 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/db7wpgkge/image/upload/v1697078561/evolution-training/landing/ass1i5otlp9asrntz2bk.jpg')`,
      }}
    >
      <div className="z-0 absolute w-full h-full bg-zinc-900 inset-0 bg-opacity-70"></div>
      <h1 className="z-10 text-[2rem] font-semibold mb-4 text-center md:text-5xl text-[#cf9050] ">
        HORARIOS
      </h1>
      <Schedule />
    </motion.section>
  );
}
