import { useRouter } from 'next/navigation';
import React from 'react';
import { GiMuscleUp } from 'react-icons/gi';

export default function About() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-xl h-full w-full md:w-[70%]  z-10 text-[#cfcfcf] text-center">
      <p className="">
        <span className="text-[#cf9050]">Olimpo Training </span>
        es un gimnasio de élite ubicado en San Martín, Mendoza.
      </p>
      <br />
      <p>
        <span className="text-[#cf9050]">Olimpo </span> nace de una propuesta
        para ofrecerte un lugar donde te puedas desafiar a romper tus límites,
        ponerte a prueba y mejorar tu calidad de vida ejercitándote a través de
        las distintas clases que ofrecemos, entregándote toda la ayuda necesaria
        para que logres tu meta:
        <span className="font-semibold tracking-widest">
          {' '}
          SER MEJOR QUE AYER.
        </span>
      </p>
      <br />

      <p>
        Con nuestro <span className="text-[#cf9050] ">sistema de créditos</span>
        , podrás recargar tus clases comprando el plan que mejor se adapte a tus
        objetivos y metas pagando desde la plataforma mediante{' '}
        <span className="text-blue-400">Mercado Pago.</span>
      </p>
      <br />
      <p>
        Contamos con entrenadores de
        <span className="text-[#cf9050] "> primer nivel</span>, que estarán
        disponibles para tí en todo momento dentro del gimnasio, y buscaremos
        ofrecerte clases que sean personalizadas y la oportunidad de desarrollar
        para ti una rutina de ejercicios para que puedas mejorar y lograr los
        objetivos que te propongas.
      </p>
      <br />
      <p className="">
        Es momento de dar el{' '}
        <span className="text-[#cf9050] font-semibold">siguiente paso:</span>
      </p>
      <button
        onClick={() => router.push('/auth/register')}
        className="flex items-center justify-center gap-3 bg-[#cf9050] py-2 px-10 text-black font-semibold mt-2 rounded-lg border-black group text-medium"
      >
        <GiMuscleUp className="text-3xl group-hover:scale-125 duration-250" />{' '}
        <span>
          {' '}
          Registrarme en <span className="font-bold">OLIMPO</span>
        </span>
      </button>
    </div>
  );
}
