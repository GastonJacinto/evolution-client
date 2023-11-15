/* eslint-disable @next/next/no-img-element */
'use client';
import SectionOne from '@/components/sections/sectionOne';
import SectionTwo from '@/components/sections/sectionTwo';

export default function Home() {
  return (
    <main className="flex w-full h-full flex-col items-center">
      <SectionOne />
      <SectionTwo />
    </main>
  );
}
