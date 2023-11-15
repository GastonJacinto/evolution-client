import { registerUser } from '@/app/api/actions/register';
import { ShowedPass } from '@/components/buttons/ShowedPass';
import { FormDataType, RoleEnum } from '@/utils/types';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import toast from 'react-hot-toast';
import { AiOutlineUser } from 'react-icons/ai';
import { BsGenderAmbiguous, BsTelephone } from 'react-icons/bs';
import { CgGym } from 'react-icons/cg';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { MdOutlineMailOutline } from 'react-icons/md';
import { PiIdentificationCardLight } from 'react-icons/pi';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function AddInstructorDashboardForm() {
  //! ------------------------------ H O O K S ---------------------------------
  const [pending, setPending] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [role, setRole] = React.useState<RoleEnum>(RoleEnum.INSTRUCTOR);

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
    const { data, error } = await registerUser(formData, role);
    if (error) {
      toast.error(error);
      setPending(false);

      return;
    }
    toast.success(
      'Instructor agregado con éxito. Habilite su cuenta desde el panel "Instructores".'
    );
    setPending(false);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] p-2 h-full flex flex-col gap-2 text-whit bg-zinc-800 rounded-xl items-center"
      >
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
          startContent={<PiIdentificationCardLight className="registerIcons" />}
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
              Agregar instructor
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
