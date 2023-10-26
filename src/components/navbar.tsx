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
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import logo from '@/data/images/logo-removebg-preview.png';
import { navLinks } from '@/data/data';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
export default function NavBar() {
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

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="warning"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="login" color="success" className="text-black">
            <Link href={'/auth/login'}>Iniciar sesión</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
