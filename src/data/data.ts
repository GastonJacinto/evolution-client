import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdSportsGymnastics } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { BsCalendarCheck, BsPersonFillAdd, BsTable } from 'react-icons/bs';
import { PlanEnum } from '@/utils/types';
import { GrTable, GrTableAdd } from 'react-icons/gr';
import { FaUsers, FaUsersGear } from 'react-icons/fa6';
import { TbCardsFilled } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import { BsCashCoin } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import { GiConqueror } from 'react-icons/gi';

export const navLinks = [
  {
    name: 'Precios',
    icon: React.createElement(BsCashCoin),
    hash: 'precios',
  },
  {
    name: 'Horarios',
    hash: 'horarios',
    icon: React.createElement(FaCalendarAlt),
  },
  {
    name: 'Sobre nosotros',
    icon: React.createElement(GiConqueror),
    hash: 'about',
  },
] as const;

export const dashboardButtons = [
  {
    name: 'Clases',
  },
  { name: 'Crear clase' },

  { name: 'Instructores' },
  {
    name: 'Usuarios',
  },
] as const;

export const itemsDashboardsClasse = [
  {
    id: 'allClasses',
    name: 'Clases',
    description: 'Ver todas las clases.',
    icon: React.createElement(GrTable),
  },
  {
    id: 'createClass',
    name: 'Crear clase',
    description: 'Crear una nueva clase.',
    icon: React.createElement(GrTableAdd),
  },
] as const;

export const itemsDashboardsUsers = [
  {
    id: 'allUsers',
    name: 'Usuarios',
    description: 'Ver todas los usuarios registrados.',
    icon: React.createElement(FaUsers),
  },
  {
    id: 'allInstructors',
    name: 'Instructores',
    description: 'Ver todos los instructores registrados.',
    icon: React.createElement(FaUsersGear),
  },
  {
    id: 'createInstructor',
    name: 'Agregar instructor',
    description: 'Agregar un nuevo instructor.',
    icon: React.createElement(BsPersonFillAdd),
  },
] as const;
export const itemsDashboardsPlans = [
  {
    id: 'allPlans',
    name: 'Planes',
    description: 'Ver todos los planes actuales.',
    icon: React.createElement(TbCardsFilled),
  },
  {
    id: 'editPlan',
    name: 'Editar planes',
    description: 'Editar los planes actuales.',
    icon: React.createElement(FaEdit),
  },
] as const;
export const planes = [
  {
    name: 'Plan INICIAL',
    price: '3000',
    description: 'Consta de 8 créditos, ideal para asistir 2 veces por semana.',
    image:
      'https://www.cimformacion.com/blog/wp-content/uploads/2020/09/estudiar-ser-entrenador-personal.jpg',
    plan: PlanEnum.initial,
  },
  {
    name: 'Plan INTERMEDIO',
    price: '4000',
    description:
      'Consta de 12 créditos, ideal para asistir 3 veces por semana.',
    image:
      'https://www.europeanhealthschool.com/wp-content/uploads/2023/06/rutina-gimnasio-mujer.jpg',
    plan: PlanEnum.inter,
  },
  {
    name: 'Plan AVANZADO',
    price: '5000',
    description:
      'Consta de 16 créditos, ideal para asistir 4 veces por semana.',
    image:
      'https://media.revistagq.com/photos/5f7ddbde78c4dd5b8fdf24da/4:3/w_959,h_719,c_limit/gimnasios-discotecas-nueva-normalidad.jpg',
    plan: PlanEnum.advanced,
  },
];

export const drawerOptions = [
  {
    name: 'Mis clases',
    tab: 1,
    icon: React.createElement(MdSportsGymnastics),
  },
  {
    name: 'Reservar una clase',
    tab: 2,
    icon: React.createElement(BsCalendarCheck),
  },
  {
    name: 'Recargar créditos',
    tab: 3,
    icon: React.createElement(BiMoneyWithdraw),
  },
  {
    name: 'Editar mi perfil',
    tab: 4,
    icon: React.createElement(CgProfile),
  },
] as const;
