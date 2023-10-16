import React from 'react';
import { motion } from 'framer-motion';
import PlanCard from './planCard';
export default function SectionTwo() {
  return (
    <motion.section
      id="precios"
      className="w-full h-[80vh] flex flex-col items-center  scroll-mt-28"
    >
      <h1 className="text-4xl font-semibold mb-4">
        <span className="text-3xl md:text-5xl text-[#cf9050] font-valorant">
          PLANES
        </span>{' '}
        <span className="text-[#d8a971]">Y</span>{' '}
        <span className="text-3xl md:text-5xl text-[#cf9050] font-valorant">
          PRECIOS
        </span>
      </h1>
      <PlanCard />
    </motion.section>
  );
}
