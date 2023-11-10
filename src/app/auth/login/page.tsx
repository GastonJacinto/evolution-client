'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from '@nextui-org/react';
import { ShowedPass } from '@/components/buttons/ShowedPass';
import { UnshowedPass } from '@/components/buttons/UnshowedPass';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { setTimeout } from 'timers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoFingerPrint } from 'react-icons/io5';
export default function Login() {
  //!---------------- HOOKS ---------------------
  const [isVisible, setIsVisible] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  //!---------------- FUNCTIONS ---------------------
  const handleSubmit = async () => {
    const responseNextAuth = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/profile',
    });
    if (responseNextAuth?.error) {
      toast.error(responseNextAuth.error, {
        position: 'bottom-center',
      });
      setPending(false);
      return;
    }
    toast.success('Iniciando sesión...', {
      position: 'bottom-center',
    });
    setTimeout(() => {
      router.push('/profile');
      setPending(false);
    }, 2000);
  };

  return (
    <div className="pt-[10rem] h-full w-full flex items-center justify-center text-center">
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className="relative w-[min(100%,30rem)] m-3 h-[25rem] flex flex-col  items-center gap-4 rounded-xl bg-zinc-800"
      >
        <h1 className="text-white text-2xl p-2">
          Inicia sesión en{' '}
          <span className="text-[#f59b4b] font-bold">OLIMPO</span>
        </h1>

        <form
          action={() => {
            setPending(true);
            handleSubmit();
          }}
          className="w-[90%] px-5 h-full flex flex-col justify-between text-white items-center"
        >
          <Input
            type="email"
            label="Email"
            name="email"
            isRequired
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-[100%] text-black "
          />
          <Input
            label="Contraseña"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <ShowedPass className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <UnshowedPass className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            className="w-[100%] text-black"
            isRequired
          />
          <p>
            {' '}
            <span className="text-[#f59b4b] hover:underline">Olvidé</span> mi
            contraseña
          </p>
          <Link href={'/auth/register'}>
            <p className="hover:underline">
              No tengo una cuenta en{' '}
              <span className="text-[#f59b4b] font-bold">OLIMPO</span>
            </p>
          </Link>
          <Button
            type="submit"
            isDisabled={pending}
            className="group bg-[#f59b4b] text-black font-semibold  flex items-center mb-5 w-[100%]  rounded-xl gap-2 justify-center hover:scale-110 active:scale-105 transition-all"
          >
            {pending ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black "></div>
            ) : (
              <>
                <IoFingerPrint className="group-hover:scale-125 transition-all " />
                Iniciar sesión
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
