/* eslint-disable @next/next/no-img-element */
'use client';
import NavBar from '@/components/navbar';
import SectionOne from '@/components/sectionOne';
import SectionTwo from '@/components/sectionTwo';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex flex-col items-center h-[5000px]">
      <SectionOne />
      <SectionTwo />
    </main>
  );
}
