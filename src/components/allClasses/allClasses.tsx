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
      className="classesMotionDiv"
    >
      <h3 className="classesH3">
        Próximas <span className="text-[#f59b4b]">clases</span>
      </h3>
      <Divider aria-label="divider" className="classesDivider" />
      <AllClassesTable />
    </motion.div>
  );
}

export default AllClasses;
