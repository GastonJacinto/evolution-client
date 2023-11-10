'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Divider } from '@nextui-org/react';
import PlanCards from '@/components/planCard/planCards';

function AllPlansDashboard() {
  return (
    <motion.div
      initial={{
        y: -100,
        x: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        x: 0,
        opacity: 1,
      }}
      className="w-full h-full flex flex-col items-center pb-5 overflow-hidden"
    >
      <h3 className="classesH3">
        Todos los planes <span className="text-[#f59b4b]">disponibles</span>
      </h3>
      <Divider aria-label="divider" className="classesDivider" />
      <PlanCards />
    </motion.div>
  );
}

export default AllPlansDashboard;
