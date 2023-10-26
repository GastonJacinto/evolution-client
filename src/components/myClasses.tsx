import { Divider } from '@nextui-org/react';
import React from 'react';
import MyClassesTable from './myClassesTable';

export default function MyClasses() {
  return (
    <div className="w-full h-full flex flex-col items-center pt-16">
      <h3 className="text-white ">
        Estas son las clases en las que estás{' '}
        <span className="text-[#f59b4b]">inscripto. </span>
      </h3>
      <Divider className="bg-white my-4 w-[min(95%,50rem)]" />
      <MyClassesTable />
    </div>
  );
}
