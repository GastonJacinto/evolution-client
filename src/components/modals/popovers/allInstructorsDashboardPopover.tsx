import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react';

export default function AllInstructorsDashboardPopover() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <button className="w-8 h-8 text-xl bg-[#f59b4b] border-1 border-black font-bold text-black rounded-full hover:scale-110 active:scale-105 transition-all">
          ?
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-semibold">
            En esta pestaña podrás ver los
            <span className="font-bold underline">
              {' '}
              instructores registrados.
            </span>{' '}
          </div>
          <div className="text-tiny">
            Debes tener en cuenta que solo podrás{' '}
            <span className="font-semibold">asignar</span> a una clase a
            aquellos instructores cuya cuenta{' '}
            <span className="text-green-600 font-semibold">
              se encuentre habilitada
            </span>
            . Acción que puedes realizar con los botones que se encuentran en la
            tabla. Los mismos te permiten tanto{' '}
            <span className="text-green-600 font-semibold">habilitar</span> como
            <span className="text-red-600 font-semibold"> inhabilitar</span> la
            cuenta de un instructor.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
