/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi';
import { drawerOptions } from '@/data/data';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { changeTab } from '@/app/redux/features/drawerSelectorSlice';
import { UserType } from '@/utils/types';
const DrawerProfile = () => {
  //!---------------------- HOOKS -------------------
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  const dispatch = useAppDispatch();
  //!---------------------- FUNCTIONS -------------------

  return (
    <div
      className={`z-10 mt-[5rem] h-full fixed flex flex-col transition-all  ${
        !open
          ? 'w-[2rem] bg-opacity-100'
          : 'bg-zinc-600 w-[15rem]  bg-opacity-90 '
      }`}
    >
      <button
        onClick={toggleOpen}
        className="absolute z-20 top-0 right-0 w-[2rem] h-[2rem]flex items-center justify-center transition-all"
      >
        {open ? (
          <BiArrowToLeft className="w-[2rem] h-[2rem] transition-all text-white" />
        ) : (
          <BiArrowToRight className="w-[2rem] h-[2rem] transition-all text-white" />
        )}
      </button>
      <div
        className={`relative h-full p-2 flex flex-col items-center text-[#f3f0e5] ${
          open ? '' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-center flex-col mt-1 ">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="w-20 h-20 rounded-full "
          />
          <p className="font-semibold text-white capitalize">
            {userProfile.name} {userProfile.lastname}
          </p>
        </div>
        <div className="mt-10 w-full flex flex-col">
          {drawerOptions.map((option) => {
            return (
              <Listbox
                key={option.tab}
                aria-label="Actions"
                onAction={() => {
                  toggleOpen();
                  dispatch(changeTab(option.tab));
                }}
                className="w-full"
              >
                <ListboxItem
                  key={option.tab}
                  startContent={option.icon}
                  className="w-full text-2xl bg-gray-300 bg-opacity-30 transition-all"
                >
                  {option.name}
                </ListboxItem>
              </Listbox>
            );
          })}
        </div>
        <div className="fixed bottom-2 flex items-center w-[12rem] p-1 justify-center gap-2 border-gray-500 border-1 rounded-xl bg-zinc-950 bg-opacity-30 group hover:scale-105 transition-all cursor-pointer active:scale-100">
          <RiLogoutCircleLine className="w-[1rem] h-[1rem] group-hover:-translate-x-5 group-hover:scale-125 transition-all" />{' '}
          Cerrar sesión
        </div>
      </div>
    </div>
  );
};

export default DrawerProfile;
