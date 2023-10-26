import React from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { CgGym } from 'react-icons/cg';

export default function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group bg-[#f59b4b] text-black font-semibold  flex items-center p-2 w-[100%]  rounded-xl gap-2 justify-center hover:scale-110 active:scale-105 transition-all"
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black "></div>
      ) : (
        <>
          <CgGym className="group-hover:scale-125 group-hover:rotate-[34deg] transition-all text-2xl" />
          Crear mi cuenta
        </>
      )}
    </button>
  );
}
