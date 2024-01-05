'use client';
import { Button, Divider, Input } from '@nextui-org/react';
import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { RiAdminLine } from 'react-icons/ri';
import { GrSecure } from 'react-icons/gr';
import { MdAdminPanelSettings } from 'react-icons/md';

export default function LoginDashboard() {
  //!---------------------- STATES / HOOKS --------------------------
  const [pending, setPending] = React.useState(false);
  const [formData, setFormData] = React.useState({
    password: '',
    username: '',
  });
  //!---------------------- FUNCTIONS -----------------------
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setPending(true);
    event.preventDefault();
    if (formData.password === password && formData.username === username) {
      toast.success('Redirigiendo al panel de administrador...', {
        duration: 3000,
      });
      setTimeout(() => {
        localStorage.setItem('adminLoggedIn', 'true');
        setPending(false);
      }, 1000);
      return;
    }
    setTimeout(() => {
      toast.error('Usuario o contraseña inválidos.');
      setPending(false);
    }, 1000);
    return;
  };
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  //! ----------------------- VARIABLES ------------------------------
  const username = '123123';
  const password = '123123';
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-28 text-white px-5">
      <h3 className="classesH3">
        Ingresa el usuario y contraseña para{' '}
        <span className="text-[#f59b4b]">entrar al panel de administrador</span>
      </h3>
      <Divider aria-label="divider" className="classesDivider" />
      <motion.form
        initial={{
          x: -100,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        action=""
        onSubmit={handleSubmit}
        id="form"
        className="w-[90%]  max-w-[30rem] flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg"
      >
        <Input
          type="text"
          name="username"
          label="Nombre de usuario"
          aria-label="Nombre"
          startContent={<RiAdminLine className="registerIcons " />}
          onChange={handleChange}
          className=" text-black "
        />
        <Input
          label="Contraseña"
          type="password"
          aria-label="Contraseña"
          name="password"
          startContent={<GrSecure className="registerIcons" />}
          onChange={handleChange}
          className=" text-black "
        />

        <Button
          type="submit"
          isDisabled={pending}
          className="group bg-[#f59b4b] text-black font-semibold  flex items-center p-2 w-[100%]  rounded-xl gap-2 justify-center hover:scale-110 active:scale-105 transition-all mt-5"
        >
          {pending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black "></div>
          ) : (
            <>
              <MdAdminPanelSettings className="group-hover:scale-125 group-hover:rotate-[34deg] transition-all text-2xl" />
              Ir al panel
            </>
          )}
        </Button>
      </motion.form>
    </div>
  );
}
