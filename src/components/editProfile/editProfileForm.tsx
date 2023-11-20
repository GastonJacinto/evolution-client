import { updateProfile } from '@/app/api/actions/userActions/updateProfile';
import { useAppSelector } from '@/utils/hooks';
import { EditProfileType } from '@/utils/types';
import { Button, Input } from '@nextui-org/react';
import React from 'react';
import toast from 'react-hot-toast';
import { BsTelephone } from 'react-icons/bs';
import { CgGym } from 'react-icons/cg';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { HiOutlineIdentification } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { HiMiniIdentification } from 'react-icons/hi2';
import { motion } from 'framer-motion';
export default function EditProfileForm() {
  //!---------------------- STATES / HOOKS --------------------------
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  const [pending, setPending] = React.useState(false);
  const [formData, setFormData] = React.useState<EditProfileType>({});
  const router = useRouter();
  //!---------------------- FUNCTIONS -----------------------
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
    const { success, error } = await updateProfile(userProfile.id, formData);
    if (error) {
      toast.error(error, {
        position: 'bottom-center',
      });
      setPending(false);

      return;
    }
    toast.success(success, {
      position: 'bottom-center',
    });
    setPending(false);
    resetForm();
  };

  function resetForm() {
    const form = document.getElementById('form') as HTMLFormElement | null;
    if (form) {
      form.reset();
    }
  }
  //! ----------------------- VARIABLES ------------------------------
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  );
  const minDateString = minDate.toISOString().split('T')[0];
  return (
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
      id="form"
      onSubmit={handleSubmit}
      className="w-[90%]  max-w-[30rem] flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg"
    >
      <p className="text-white text-sm text-center">
        Actualizar mis <span className="text-[#f59b4b]">datos personales</span>
      </p>

      <Input
        type="text"
        name="name"
        label="Nombre"
        aria-label="Nombre"
        startContent={<HiOutlineIdentification className="registerIcons " />}
        placeholder={`${userProfile.name}`}
        onChange={handleChange}
        className=" text-black "
      />
      <Input
        label="Apellido"
        type="text"
        aria-label="Apellido"
        placeholder={`${userProfile.lastname}`}
        name="lastname"
        startContent={<HiMiniIdentification className="registerIcons" />}
        onChange={handleChange}
        className=" text-black "
      />
      <div className="flex gap-2 w-full  ">
        <Input
          type="text"
          label="Celular"
          aria-label="phone"
          name="phone"
          placeholder={`${userProfile.phone}`}
          onChange={handleChange}
          startContent={<BsTelephone className="registerIcons" />}
          className=" text-black w-[40%]"
        />
        <Input
          type="date"
          label="Fecha de nacimiento"
          aria-label="birth"
          name="birth"
          max={minDateString}
          placeholder="Fecha de nacimiento"
          startContent={<LiaBirthdayCakeSolid className="registerIcons" />}
          onChange={handleChange}
          className=" text-black w-[60%]"
        />
      </div>
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
            Actualizar mis datos
          </>
        )}
      </Button>
    </motion.form>
  );
}
