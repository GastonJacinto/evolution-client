import React from 'react';

export default function Schedule() {
  return (
    <div className=" z-10 h-full w-full flex flex-col items-center text-center text-xl text-[#cfcfcf] md:w-[70%] ">
      <h6 className=" tracking-wide">
        Contamos con horarios flexibles para que puedas venir cuando quieras.
      </h6>
      <br />
      <p>
        <span className="text-[#cf9050]">Olimpo</span> se encontrará abierto de{' '}
        <span className="text-[#cf9050] font-semibold">
          lunes a sabados desde las <span className="underline">08:00</span>{' '}
          hasta las <span className="underline">22:00</span> horas
        </span>
        . De ésta forma, nos aseguramos de que tengas un amplio rango horario
        para asitir a tus clases y estar cada día más cerca de tus metas. 💪
      </p>
    </div>
  );
}
