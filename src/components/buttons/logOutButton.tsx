import React from 'react';
import { IoFingerPrint } from 'react-icons/io5';

export default function LogOutButton() {
  return (
    <button
      type="button"
      className="group bg-gray-400 text-black font-semibold  flex items-center p-3  rounded-xl gap-2 justify-center hover:scale-110 active:scale-105 transition-all"
    >
      <IoFingerPrint className="group-hover:scale-125 transition-all " />
      Cerrar sesión
    </button>
  );
}
