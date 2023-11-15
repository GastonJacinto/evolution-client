'use client';
import { Divider } from '@nextui-org/react';
import { motion } from 'framer-motion';
import React from 'react';
import AddInstructorDashboardForm from './addInstructorDashboardForm';

export default function AddInstructorDashboard() {
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
      className="w-full h-full flex flex-col items-center"
    >
      <h3 className="classesH3">
        {' '}
        Agregar un <span className="text-[#f59b4b]">instructor</span>
      </h3>
      <Divider aria-label="divider" className="classesDivider" />
      <AddInstructorDashboardForm />
    </motion.div>
  );
}
