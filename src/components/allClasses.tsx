'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AllClassesTable from './AllClassesTable';
import { Divider } from '@nextui-org/react';

function AllClasses() {
  return (
    <motion.div
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="w-full h-full flex flex-col items-center pt-[3rem]"
    >
      <h3 className="text-white md:text-xl  text-center transition-all">
        Próximas <span className="text-[#f59b4b]">clases </span>
      </h3>
      <Divider
        aria-label="divider"
        className="bg-white w-[90%] max-w-[50rem] my-4"
      />
      <AllClassesTable />
    </motion.div>
  );
}

export default AllClasses;
