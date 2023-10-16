/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
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

export default function NavBar() {
  return (
    <Navbar isBordered className="fixed  bg-black bg-opacity-60  ">
      <NavbarContent className="sm:hidden " justify="center">
        <NavbarMenuToggle className="text-[#f59b4b]" />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Link href="#home">
            <Image
              src={logo}
              priority={true}
              alt="logo"
              width="80"
              className="cursor-pointer"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarBrand>
          <Link href="#home" className="">
            <Image
              src={logo}
              alt="logo"
              width="80"
              priority={true}
              className="cursor-pointer "
            />
          </Link>
        </NavbarBrand>
        {navLinks.map((nav, index) => {
          return (
            <NavbarItem key={index}>
              <Link
                className="text-[#f59b4b] text-[1.2rem] font-valorant"
                href={`#${nav.hash}`}
              >
                {nav.name}
              </Link>
            </NavbarItem>
          );
        })}
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
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <NavbarMenu className="bg-black w-[75%] bg-opacity-60 ">
        {navLinks.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-[70%] text-xl text-[#f59b4b] font-valorant font-bold"
              href={`#${item.hash}`}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
