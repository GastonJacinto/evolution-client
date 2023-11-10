'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react';
import { ShowedPass } from '@/components/buttons/ShowedPass';
import { UnshowedPass } from '@/components/buttons/UnshowedPass';
import {
  MdOutlineMailOutline,
  MdOutlineSportsGymnastics,
} from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import { PiIdentificationCardLight } from 'react-icons/pi';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { BsTelephone, BsGenderAmbiguous } from 'react-icons/bs';
import { GiTeacher, GiGymBag } from 'react-icons/gi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FormDataType, RoleEnum } from '@/utils/types';
import { registerUser } from '../../api/actions/register';
import InfoPopover from '@/components/modals/popovers/registerPopover';
import { CgGym } from 'react-icons/cg';

export default function RegisterPage() {
  //!---------------------- STATES / HOOKS --------------------------
  const [pending, setPending] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [formData, setFormData] = React.useState<FormDataType>({
    name: '',
    lastname: '',
    birth: '',
    password: '',
    email: '',
    phone: '',
    genre: '',
    dni: '',
    image: '',
  });
  const [blockRegister, setBlockRegister] = React.useState(false);
  const [role, setRole] = React.useState<RoleEnum>(RoleEnum.USER);
  //!------------------------ HOOKS ---------------------------
  const router = useRouter();
  //!---------------------- FUNCTIONS -----------------------
  const toggleVisibility = () => setIsVisible(!isVisible);
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setPending(true);
    event.preventDefault();
    const { data, error } = await registerUser(formData, role);
    if (error) {
      toast.error(error, {
        position: 'bottom-center',
      });
      setPending(false);

      setBlockRegister(false);
      return;
    }
    if (role === RoleEnum.USER) {
      toast.success('Registrado con éxito. Redireccionando.', {
        position: 'bottom-center',
      });

      setTimeout(() => {
        router.push('/auth/login');
        setPending(false);
        setBlockRegister(false);
      }, 2000);
    } else {
      setPending(false);
      toast.success(
        'Tu cuenta se encuentra pendiente de activación, puedes acercarte al establecimiento, o bien, esperar que un administrador se comunique contigo para activar tu cuenta.',
        {
          icon: '💪',
          duration: 6000,
          position: 'top-center',
        }
      );
    }
  };
  return (
    <div className="h-full pt-16 2xl:pt-32 w-full flex items-center justify-center text-center">
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className="relative w-[min(100%,30rem)] m-3 h-[35rem] flex flex-col items-center rounded-xl bg-zinc-800"
      >
        {blockRegister ? (
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
        <div className="w-full relative ">
          {' '}
          <h1 className="text-white text-2xl sm:text-3xl pt-4 transition-all">
            Bienvenido a{' '}
            <span className="text-[#f59b4b] font-bold">OLIMPO</span>
          </h1>
          <div className="absolute right-0 top-0 p-1">
            {' '}
            <InfoPopover />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-[90%] p-5 h-full flex flex-col gap-2 text-white items-center"
        >
          <Select
            size="sm"
            isRequired
            title="¿Cómo quieres registrarte?"
            color="success"
            placeholder="¿Cómo quieres registrarte?"
            aria-label="role"
            radius="lg"
            className="text-black text-center"
            value={role}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              const role =
                event.target.value === RoleEnum.INSTRUCTOR
                  ? RoleEnum.INSTRUCTOR
                  : RoleEnum.USER;
              setRole(role);
            }}
            name="genre"
            startContent={<GiGymBag className="registerIcons" />}
          >
            <SelectItem
              key={RoleEnum.INSTRUCTOR}
              color="warning"
              startContent={<GiTeacher className="registerIcons" />}
              className=" text-center"
            >
              Soy instructor/a
            </SelectItem>

            <SelectItem
              color="warning"
              className=" text-center"
              key={RoleEnum.USER}
              startContent={
                <MdOutlineSportsGymnastics className="registerIcons" />
              }
            >
              Soy estudiante
            </SelectItem>
          </Select>
          <Divider className="bg-white" />
          <div className="flex gap-2 w-full">
            <Input
              type="text"
              name="name"
              aria-label="Nombre"
              startContent={<AiOutlineUser className="registerIcons " />}
              placeholder="Nombre"
              isRequired
              onChange={handleChange}
              size="lg"
              className=" text-black "
            />
            <Input
              type="text"
              size="lg"
              aria-label="Apellido"
              placeholder="Apellido"
              name="lastname"
              isRequired
              startContent={<AiOutlineUser className="registerIcons" />}
              onChange={handleChange}
              className=" text-black "
            />
          </div>

          <Input
            size="lg"
            type="email"
            name="email"
            aria-label="email"
            placeholder="olimpo@olimpo.com"
            isRequired
            onChange={handleChange}
            startContent={<MdOutlineMailOutline className="registerIcons" />}
            className=" text-black "
          />
          <Input
            size="lg"
            name="password"
            placeholder="********"
            minLength={8}
            aria-label="password"
            onChange={handleChange}
            startContent={<RiLockPasswordLine className="registerIcons" />}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <ShowedPass className="buttonShowPass" />
                ) : (
                  <UnshowedPass className="buttonShowPass" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            className=" text-black"
            isRequired
          />
          <Input
            size="lg"
            type="date"
            aria-label="birth"
            name="birth"
            placeholder="Fecha de nacimiento"
            isRequired
            startContent={<LiaBirthdayCakeSolid className="registerIcons" />}
            onChange={handleChange}
            className=" text-black  "
          />
          <div className="flex gap-2 w-full  ">
            <Input
              size="lg"
              type="text"
              aria-label="phone"
              name="phone"
              placeholder="0123456789"
              isRequired
              onChange={handleChange}
              startContent={<BsTelephone className="registerIcons" />}
              className=" text-black w-[50%]"
            />
            <Select
              size="sm"
              aria-label="gender"
              isRequired
              radius="lg"
              className="text-black w-[50%]  "
              onChange={handleChange}
              name="genre"
              startContent={<BsGenderAmbiguous className="registerIcons" />}
              placeholder="Género"
            >
              <SelectItem key="masc" color="warning">
                Masculino
              </SelectItem>
              <SelectItem key="fem" color="warning">
                Femenino
              </SelectItem>
              <SelectItem key="other" color="warning">
                Otro
              </SelectItem>
            </Select>
          </div>
          <Input
            size="lg"
            type="text"
            aria-label="dni"
            name="dni"
            placeholder="DNI"
            isRequired
            onChange={handleChange}
            startContent={
              <PiIdentificationCardLight className="registerIcons" />
            }
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
                <CgGym className="group-hover:scale-125 group-hover:rotate-[34deg] transition-all text-2xl" />
                Crear mi cuenta
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
