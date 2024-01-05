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
import { IoMdLogIn } from 'react-icons/io';
import { CiLogout } from 'react-icons/ci';
export default function NavBar() {
  //!---------------------- H O O K S ---------------------------------
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();

  //! ------------------------ V A R I A B L E S ------------------------------------

  return (
    <Navbar isBordered className="fixed bg-black bg-opacity-60 h-[4rem] ">
      {pathname === '/' && (
        <>
          <NavbarContent className="sm:hidden" justify="center">
            <NavbarMenuToggle className="text-[#f59b4b]" />
          </NavbarContent>{' '}
        </>
      )}

      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Link
            href={'/'}
            className="w-[3rem] flex items-center justify-center"
          >
            <Image
              src={logo}
              alt="logo"
              priority={true}
              className="cursor-pointer "
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarBrand>
          <Link
            href={'/'}
            className="w-[3rem] flex items-center justify-center"
          >
            <Image
              src={logo}
              alt="logo"
              width="90"
              priority={true}
              className="cursor-pointer"
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

      {pathname !== '/dashboard' &&
        (session ? (
          <Button
            size="sm"
            onPress={() => {
              router.push('/profile');
            }}
            startContent={<BiUser className="registerIcons" />}
            className="bg-[#f59b4b] font-semibold text-zinc-900 hover:scale-105 md:text-medium "
          >
            Mi perfil
          </Button>
        ) : pathname === '/auth/login' ? null : (
          <Button
            size="sm"
            onPress={() => {
              router.push('/auth/login');
            }}
            startContent={<IoMdLogIn className="registerIcons" />}
            className="bg-[#f59b4b] font-semibold text-zinc-900 hover:scale-105 md:text-medium "
          >
            Iniciar sesión
          </Button>
        ))}
      {/* )} */}

      {
        //! ----------------- ESTO SE BORRA DESPUES -----------------
      }
      <NavbarMenu className="bg-black w-[80%] max-w-[24rem] bg-opacity-60 ">
        {navLinks.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-[90%] flex items-center gap-2 text-xl text-[#f59b4b] font-valorant font-bold"
              href={`#${item.hash}`}
            >
              {item.icon} {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
