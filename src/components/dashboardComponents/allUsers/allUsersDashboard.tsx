'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Divider } from '@nextui-org/react';
import AllUsersDashboardTable from './allUsersDashboardTable';

function AllUsersDashboard() {
  return (
    <motion.div
      initial={{
        x: -100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="w-full h-full flex flex-col items-center  overflow-hidden"
    >
      <h3 className="classesH3">
        Usuarios <span className="text-[#f59b4b]">registrados</span>
      </h3>

      <Divider aria-label="divider" className="classesDivider" />
      <AllUsersDashboardTable />
    </motion.div>
  );
}

export default AllUsersDashboard;
