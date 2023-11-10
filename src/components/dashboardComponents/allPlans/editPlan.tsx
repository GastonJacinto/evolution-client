'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Divider, Select, SelectItem } from '@nextui-org/react';
export default function EditPlanDashboard() {
  return (
    <motion.div
      initial={{
        y: -100,
        x: 100,
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
        ¿Qué <span className="text-[#f59b4b]">plan</span> quieres{' '}
        <span className="text-[#f59b4b]">editar</span>?
      </h3>
      <Divider aria-label="divider" className="classesDivider" />
      <form action="" className="bg-zinc-600 w-[50%] min-w-[17rem]">
        <Select className="w-full" placeholder="Selecciona un plan para editar">
          <SelectItem key={'ASD'}>asd</SelectItem>
        </Select>
      </form>
    </motion.div>
  );
}
