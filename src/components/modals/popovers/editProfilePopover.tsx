import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';

export default function EditProfilePopover() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <button className="w-8 h-8 text-xl flex items-center justify-center bg-[#f59b4b] border-1 border-black font-bold text-black rounded-full  transition-all">
          ?
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-semibold">
            En esta pestaña podrás editar
            <span className="font-bold "> tu perfil</span>{' '}
          </div>
          <div className="text-tiny">
            No es necesario que edites toda la información, solo aquella que
            quieras{' '}
            <span className="text-[#f59b4b] font-semibold">cambiar.</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
