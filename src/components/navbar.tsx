/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@nextui-org/react';
import logo from '@/data/images/logo-removebg-preview.png';
import { navLinks } from '@/data/data';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BiUser } from 'react-icons/bi';
import { useAppSelector } from '@/utils/hooks';
import { useRouter } from 'next/navigation';
export default function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  const pathname = usePathname();
  return (
    <Navbar isBordered className="fixed bg-black bg-opacity-60 h-[4rem] ">
      {pathname !== '/profile' ? (
        <>
          <NavbarContent className="sm:hidden " justify="center">
            <NavbarMenuToggle className="text-[#f59b4b]" />
          </NavbarContent>{' '}
        </>
      ) : null}

      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Link
            href={
              pathname === '/auth/login' || pathname === '/profile'
                ? '/'
                : '#home'
            }
            className=""
          >
            <Image
              src={logo}
              alt="logo"
              width="65"
              priority={true}
              className="cursor-pointer "
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarBrand>
          <Link
            href={
              pathname === '/auth/login' || pathname === '/profile'
                ? '/'
                : '#home'
            }
            className=""
          >
            <Image
              src={logo}
              alt="logo"
              width="65"
              priority={true}
              className="cursor-pointer "
            />
          </Link>
        </NavbarBrand>
        {pathname === '/' ? (
          <>
            {navLinks.map((nav, index) => {
              return (
                <NavbarItem key={index}>
                  <Link
                    className="text-[#f59b4b] text-[1.2rem] font-valorant hover:scale-105 transition-all"
                    href={`#${nav.hash}`}
                  >
                    {nav.name}
                  </Link>
                </NavbarItem>
              );
            })}
          </>
        ) : (
          <NavbarItem>
            <Link
              className="text-[#f59b4b] text-[1.2rem] font-valorant hover:scale-105 transition-all"
              href={'/'}
            >
              Inicio
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      {
        //! ----------------- ESTO SE BORRA DESPUES -----------------
      }
      {/* {userProfile.email && pathname === '/' ? (
        <Button className="bg-[#f59b4b] font-semibold text-zinc-900 hover:scale-105 md:text-medium ">
          <Link href={'/auth/login'}>Iniciar sesión</Link>
        </Button>
      ) : ( */}
      <Button
        onPress={() => {
          router.push('/profile');
        }}
        startContent={<BiUser className="registerIcons" />}
        className="bg-[#f59b4b] font-semibold text-zinc-900 hover:scale-105 md:text-medium "
      >
        Mi perfil
      </Button>
      {/* )} */}
      <Button
        onPress={() => {
          router.push('/dashboard');
        }}
        startContent={<BiUser className="registerIcons" />}
        className="bg-[#f59b4b] font-semibold text-zinc-900 hover:scale-105 md:text-medium "
      >
        Dash
      </Button>
      {
        //! ----------------- ESTO SE BORRA DESPUES -----------------
      }

      <NavbarMenu className="bg-black w-[75%] bg-opacity-60 ">
        {navLinks.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-[70%] text-xl text-[#f59b4b] font-valorant font-bold"
              href={`#${item.hash}`}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
