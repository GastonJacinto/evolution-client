import React from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { IoFingerPrint } from 'react-icons/io5';

export default function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group bg-[#f59b4b] text-black font-semibold  flex items-center p-3 w-[100%]  rounded-xl gap-2 justify-center hover:scale-110 active:scale-105 transition-all"
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black "></div>
      ) : (
        <>
          <IoFingerPrint className="group-hover:scale-125 transition-all " />
          Iniciar sesión
        </>
      )}
    </button>
  );
}
