/* eslint-disable @next/next/no-img-element */
'use client';
import SectionOne from '@/components/sections/sectionOne';
import SectionThree from '@/components/sections/sectionThree';
import SectionTwo from '@/components/sections/sectionTwo';

export default function Home() {
  return (
    <main className="flex w-full h-full flex-col items-center gap-14">
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </main>
  );
}
