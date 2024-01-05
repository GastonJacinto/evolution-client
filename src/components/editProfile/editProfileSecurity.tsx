import { Button, Divider, Input } from '@nextui-org/react';
import React from 'react';
import { GrSecure } from 'react-icons/gr';
import toast from 'react-hot-toast';
import { changePassword } from '@/app/api/actions/userActions/changePassword';
import { useAppSelector } from '@/utils/hooks';
import { ChangePasswordType } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { set } from 'date-fns';
export default function EditProfileSecurity() {
  //!---------------------- HOOKS -----------------------
  const { data: session } = useSession();
  const [pending, setPending] = React.useState(false);
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  const router = useRouter();
  const [repeatPass, setRepeatPass] = React.useState('');
  const [formData, setFormData] = React.useState<ChangePasswordType>({
    newPassword: '',
    actualPassword: '',
    email: userProfile.email,
  });
  const [canChange, setCanChange] = React.useState(false);
  //!---------------------- FUNCTIONS -----------------------
  React.useEffect(() => {
    if (repeatPass === formData.newPassword && repeatPass !== '') {
      setCanChange(true);
    } else {
      setCanChange(false);
    }
  }, [repeatPass, formData.newPassword]);
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.name === 'repeatPassword') {
      setRepeatPass(event.target.value);
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setPending(true);
    event.preventDefault();
    if (session && session.user) {
      const { success, error } = await changePassword(
        formData,
        session?.user.token
      );
      if (error) {
        toast.error(error, {
          position: 'bottom-center',
          duration: 2500,
        });
        setPending(false);

        return;
      }
      toast.success(success, {
        position: 'bottom-center',
        duration: 2500,
        icon: '🔒',
      });
      setTimeout(() => {
        handleSignOut();
        setPending(false);
        resetForm();
      }, 3000);
    }
  };
  function resetForm() {
    const form = document.getElementById('form') as HTMLFormElement | null;
    if (form) {
      form.reset();
    }
  }
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/auth/login',
    });
    router.push('/auth/login');
  };
  return (
    <motion.form
      initial={{
        x: 100,
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
        Actualizar mi <span className="text-[#f59b4b]">contraseña</span>
      </p>
      <Input
        name="actualPassword"
        label="Contraseña actual"
        placeholder="**********"
        aria-label="password"
        onChange={handleChange}
        value={formData.actualPassword}
        type={'password'}
        className=" text-black"
        isRequired
      />
      <Divider className="bg-white w-full my-1 " />
      <Input
        name="newPassword"
        label="Contraseña nueva"
        placeholder="**********"
        minLength={8}
        value={formData.newPassword}
        aria-label="password"
        onChange={handleChange}
        type={'password'}
        className=" text-black"
        isRequired
      />
      <Input
        name="repeatPassword"
        value={repeatPass}
        label="Repita la contraseña"
        placeholder="**********"
        minLength={8}
        aria-label="password"
        onChange={handleChange}
        type={'password'}
        className=" text-black"
        isRequired
      />
      <Button
        type="submit"
        isDisabled={!canChange || pending}
        className="group bg-[#f59b4b] text-black font-semibold  flex items-center p-2 w-[100%]  rounded-xl gap-2 justify-center hover:scale-110 active:scale-105 transition-all mt-5"
      >
        {pending ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black "></div>
        ) : (
          <>
            <GrSecure className="group-hover:scale-125 group-hover:rotate-[34deg] transition-all text-2xl" />
            Cambiar mi contraseña
          </>
        )}
      </Button>
    </motion.form>
  );
}
