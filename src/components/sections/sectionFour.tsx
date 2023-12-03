import React from 'react';
import { motion, useInView } from 'framer-motion';
import Schedule from '../schedules';
import About from '../about';

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
      id="about"
      viewport={{ once: true }}
      className="relative w-full h-full flex flex-col items-center scroll-mt-16 p-5 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/db7wpgkge/image/upload/v1701629806/evolution-training/landing/hoxwdwuactxe0g5k2m5g.jpg')`,
      }}
    >
      <div className="z-0 absolute w-full h-full bg-zinc-900 inset-0 bg-opacity-70"></div>
      <h1 className="z-10 text-[1.9rem] font-semibold mb-4 text-center md:text-5xl text-[#cf9050] ">
        ¿QUIENES SOMOS?
      </h1>
      <About />
    </motion.section>
  );
}
