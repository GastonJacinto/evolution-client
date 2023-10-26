import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react';

export default function InfoPopover() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <button className="w-[1.7rem] bg-[#f59b4b] border-1 border-black font-bold text-black rounded-full hover:scale-110 active:scale-105 transition-all">
          ?
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-semibold">
            Si eres <span className="font-bold underline">instructor</span>:
          </div>
          <div className="text-tiny">
            Luego de registrarte, un administrador se contactará contigo para
            pedirte información y dar de alta tu cuenta.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
