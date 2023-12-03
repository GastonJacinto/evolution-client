/* eslint-disable @next/next/no-img-element */
'use client';
import SectionFour from '@/components/sections/sectionFour';
import SectionOne from '@/components/sections/sectionOne';
import SectionThree from '@/components/sections/sectionThree';
import SectionTwo from '@/components/sections/sectionTwo';

export default function Home() {
  return (
    <main className="flex w-full h-full flex-col items-center ">
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </main>
  );
}
