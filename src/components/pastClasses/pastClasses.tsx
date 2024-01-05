'use client';
import { Divider } from '@nextui-org/react';
import React from 'react';
import { motion } from 'framer-motion';
// import MyClassesTable from './pastClassesTable';

export default function PastClasses() {
  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="classesMotionDiv"
    >
      <h3 className="classesH3">
        Clases <span className="text-[#f59b4b]">pasadas </span>
      </h3>
      <Divider className="classesDivider" />
      {/* <MyClassesTable /> */}
    </motion.div>
  );
}
