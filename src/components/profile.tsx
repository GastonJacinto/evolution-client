'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { Divider } from '@nextui-org/react';
function UserProfile() {
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
      className="w-full h-full items-center pt-10 flex flex-col text-white "
    >
      <div className=" items-center flex flex-col h-[40rem] p-4 w-[min(90%,30rem)]">
        <h3 className="capitalize text-3xl text-center">Gastón jacinto</h3>
        <Divider className="my-4 bg-white" />
        <div className="w-full flex items-center flex-col h-full ">
          <div className="flex items-center gap-4">
            <AiOutlineMail className="w-8 h-8" />
            <span>gastibarossi@gmail.com</span>
          </div>
          <Divider className="my-4 bg-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default UserProfile;
