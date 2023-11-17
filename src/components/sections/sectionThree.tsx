import React from 'react';
import { motion, useInView } from 'framer-motion';

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
      className="w-full h-full flex flex-col items-center scroll-mt-20 md:scroll-mt-44 p-5 bg-zinc-700"
    >
      <h1 className="text-[2rem] font-semibold mb-4 text-center">
        <span className=" md:text-5xl text-[#cf9050] ">HORARIOS</span>{' '}
      </h1>
    </motion.section>
  );
}
