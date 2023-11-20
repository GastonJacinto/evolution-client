'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import EditProfileForm from './editProfileForm';
import EditProfileSecurity from './editProfileSecurity';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { editProfileOptions } from '@/data/data';
import { IoSettings } from 'react-icons/io5';
import EditProfilePopover from '../modals/popovers/editProfilePopover';
export default function EditProfile() {
  //!----------- HOOKS -----------------
  const [tab, setTab] = React.useState(1);
  //!----------- FUNCTIONS -----------------
  const displayInfo = (key: number) => {
    switch (key) {
      case 1:
        return <EditProfileForm />;
      case 2:
        return <EditProfileSecurity />;
      default:
        return <EditProfileForm />;
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="classesMotionDiv"
    >
      <h3 className="classesH3">
        Editar mi <span className="text-[#f59b4b]">perfil</span>
      </h3>
      <div className="absolute flex flex-col items-end gap-1  top-16 right-0 rounded-full">
        {' '}
        <Dropdown
          aria-label="dropdown-edit-profile"
          className="border-1 border-zinc-900"
        >
          <DropdownTrigger>
            <button className="bg-[#f59b4b] w-8 h-8 rounded-full flex items-center justify-center text-xl">
              <IoSettings />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="dropdown-menu">
            {editProfileOptions.map((item, i) => {
              return (
                <DropdownItem
                  textValue={item.name}
                  className={`border-1 border-black h-8 ${
                    item.tab === tab
                      ? 'bg-[#f59b4b]  shadow-md shadow-[#f59a4b42]'
                      : 'bg-gray-200'
                  } transition-all`}
                  onClick={() => {
                    setTab(item.tab);
                  }}
                  key={i}
                  startContent={React.cloneElement(
                    item.icon as React.ReactElement,
                    {
                      className: 'text-xl',
                    }
                  )}
                >
                  <span className="font-semibold">{item.name}</span>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <EditProfilePopover />
      </div>
      <Divider aria-label="divider" className="classesDivider" />
      {displayInfo(tab)}
    </motion.div>
  );
}
