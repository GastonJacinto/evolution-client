import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdSportsGymnastics } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { BsCalendarCheck } from 'react-icons/bs';
export const navLinks = [
  {
    name: 'Precios',
    hash: 'precios',
  },
  { name: 'Horarios', hash: 'horarios' },

  { name: 'Clases', hash: 'clases' },
  {
    name: 'Sobre nosotros',
    hash: 'about',
  },
] as const;

export const planes = [
  {
    name: 'Plan INICIAL',
    price: '3000',
    description:
      '3 clases por semana, ideal para personas que están comenzando a romper sus límites.',
    image:
      'https://www.cimformacion.com/blog/wp-content/uploads/2020/09/estudiar-ser-entrenador-personal.jpg',
  },
  {
    name: 'Plan INTERMEDIO',
    price: '4000',
    description:
      '4 clases por semana, ideal para aquellos que rompieron sus cadenas.',
    image:
      'https://www.europeanhealthschool.com/wp-content/uploads/2023/06/rutina-gimnasio-mujer.jpg',
  },
  {
    name: 'Plan AVANZADO',
    price: '5000',
    description:
      'Puedes asistir los días que quieras, en el horario que quieras.',
    image:
      'https://media.revistagq.com/photos/5f7ddbde78c4dd5b8fdf24da/4:3/w_959,h_719,c_limit/gimnasios-discotecas-nueva-normalidad.jpg',
  },
] as const;

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
    name: 'Estado de mi cuota',
    tab: 3,
    icon: React.createElement(BiMoneyWithdraw),
  },
  {
    name: 'Editar mi perfil',
    tab: 4,
    icon: React.createElement(CgProfile),
  },
] as const;
