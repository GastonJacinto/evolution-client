'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Divider } from '@nextui-org/react';
import AllInstructorsDashboardTable from './allInstructorsDashboardTable';
import AllInstructorsDashboardPopover from '@/components/modals/popovers/allInstructorsDashboardPopover';

function AllInstructorsDashboard() {
  return (
    <motion.div
      initial={{
        x: 100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="w-full h-full flex flex-col items-center  overflow-hidden"
    >
      <h3 className="classesH3">
        Instructores <span className="text-[#f59b4b]">registrados</span>
        <AllInstructorsDashboardPopover />
      </h3>

      <Divider aria-label="divider" className="classesDivider" />
      <AllInstructorsDashboardTable />
    </motion.div>
  );
}

export default AllInstructorsDashboard;
