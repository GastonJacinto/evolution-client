'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@nextui-org/react';
import { ShowedPass } from '@/utils/ShowedPass';
import { UnshowedPass } from '@/utils/UnshowedPass';
import toast from 'react-hot-toast';
import LoginButton from '@/components/loginButton';
import { signIn, useSession } from 'next-auth/react';
import { setTimeout } from 'timers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Login() {
  //!---------------- HOOKS ---------------------
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [email, setEmail] = React.useState('admin@test.com');
  const [password, setPassword] = React.useState('12345678');
  const [blockLogin, setBlockLogin] = React.useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  //!---------------- FUNCTIONS ---------------------
  const handleSubmit = async () => {
    const responseNextAuth = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (responseNextAuth?.error) {
      toast.error(responseNextAuth.error, {
        position: 'bottom-center',
      });
      return;
    }
    setBlockLogin(true);
    toast.success('Iniciando sesión...', {
      position: 'bottom-center',
    });
    setTimeout(() => {
      router.push('/profile');
    }, 2000);
  };

  return (
    <div className="pt-20 h-[100vh] w-full flex items-center justify-center text-center">
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className="relative w-[min(100%,30rem)] m-3 h-[30rem] flex flex-col  items-center gap-4 rounded-xl bg-zinc-800"
      >
        {blockLogin ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="absolute z-[50] bg-zinc-600 backdrop-blur-sm rounded-xl bg-opacity-60 w-full h-full"
          ></motion.div>
        ) : null}
        <h1 className="text-white text-2xl">
          Inicia sesión en{' '}
          <span className="text-[#f59b4b] font-bold">OLIMPO</span>
        </h1>

        <form
          // onSubmit={handleSubmit}
          action={handleSubmit}
          className="w-[90%] p-5 h-full flex flex-col justify-between text-white items-center"
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
            <span className="text-[#f59b4b]">Olvidé</span> mi contraseña
          </p>
          <Link href={'/auth/register'}>
            <p>
              No tengo una cuenta en{' '}
              <span className="text-[#f59b4b] font-bold">OLIMPO</span>
            </p>
          </Link>
          <LoginButton />
          <div className="">
            <span>Iniciar sesión con</span>
            <p>Google Facebook</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
