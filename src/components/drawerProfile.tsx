/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import React from 'react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { BiArrowToLeft } from 'react-icons/bi';
import { drawerOptions } from '@/data/data';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { changeTab } from '@/app/redux/features/drawerSelectorSlice';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { FaCoins } from 'react-icons/fa6';

const DrawerProfile = () => {
  //!---------------------- H O O K S -------------------
  const [loggingOut, setLoggingOut] = React.useState(false);
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const router = useRouter();
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  const dispatch = useAppDispatch();
  //!---------------------- F U N C T I O N S -------------------
  const handleSignOut = async () => {
    setLoggingOut(true);
    await signOut({
      redirect: false,
      callbackUrl: '/auth/login',
    });
    router.push('/auth/login');
    setLoggingOut(false);
  };
  const userGender = userProfile.genre === 'masc' ? 'Bienvenido' : 'Bienvenida';
  return (
    <div
      className={`z-10 mt-[5rem] pb-16 h-full fixed flex flex-col  transition-all ${
        !open
          ? 'w-[1.7rem] bg-opacity-100'
          : 'bg-zinc-600 w-[15rem]  bg-opacity-90 '
      }`}
    >
      {userProfile.email ? (
        <button
          onClick={toggleOpen}
          className="absolute z-[1000] top-1 right-0 w-[1.7rem] h-[1.7rem] flex items-center justify-center transition-all"
        >
          {open ? (
            <BiArrowToLeft className="w-[1.5rem] h-[1.5rem] duration-400 text-white hover:-translate-x-1" />
          ) : (
            <BiArrowToLeft className="w-[1.5rem] h-[1.5rem] -rotate-180 duration-400 bg-[#f59b4b] rounded-full text-black hover:translate-x-1" />
          )}
        </button>
      ) : (
        <div className="absolute z-20 top-[.5rem] left-[.5rem] w-[1.5rem] h-[1.5rem] animate-spin border-b-2 border white rounded-full"></div>
      )}
      <div
        className={`relative h-full p-2 flex flex-col items-center text-[#f3f0e5] overflow-auto ${
          open ? '' : 'hidden'
        }`}
      >
        <div className="flex items-center w-full justify-center flex-col mt-1 ">
          <img
            src="https://res.cloudinary.com/db7wpgkge/image/upload/v1699670220/evolution-training/cnuybcladukvdvshayd4.png"
            className="w-20 h-20 rounded-full "
          />
          <p className="font-semibold text-white capitalize">
            {userGender},{' '}
            <span className="text-[#f59b4b]">
              {userProfile.name} {userProfile.lastname}
            </span>
          </p>
        </div>
        <div className="mt-5 w-full h-[full] pb-10 flex flex-col cursor-default">
          <div className="group mx-1 p-2 text-center border-1 rounded-md bg-zinc-700 transition-all">
            <p className="flex items-center gap-2">
              <FaCoins className="text-xl" /> Créditos restantes:{' '}
              <span className="group-hover:scale-125 transition-all ">
                {userProfile.remaining_classes || 0}
              </span>
            </p>
          </div>
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
        <div className="fixed w-[15rem] h-[3rem] border-t-1 border-zinc-700 bottom-0 bg-zinc-600 flex items-center justify-center">
          <button
            className="group flex items-center gap-2 border-1 border-zinc-700 bg-zinc-800 bg-opacity-50 py-1 px-5 rounded-xl"
            onClick={() => {
              handleSignOut();
            }}
          >
            {!loggingOut ? (
              <>
                <RiLogoutCircleLine className="w-[1rem] h-[1rem] group-hover:-rotate-180 group-hover:scale-125 transition-all" />{' '}
                Cerrar sesión
              </>
            ) : (
              <div className=" w-[1.5rem] h-[1.5rem] animate-spin border-b-2 border white rounded-full"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawerProfile;
