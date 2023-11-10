'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Divider } from '@nextui-org/react';
import AllClassesDashboardTable from './AllClassesDashboardTable';

function AllClassesDashboard() {
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
      className="w-full h-full flex flex-col items-center  overflow-hidden"
    >
      <h3 className="classesH3">
        Clases <span className="text-[#f59b4b]">disponibles</span>
      </h3>
      <Divider aria-label="divider" className="classesDivider" />
      <AllClassesDashboardTable />
    </motion.div>
  );
}

export default AllClassesDashboard;
