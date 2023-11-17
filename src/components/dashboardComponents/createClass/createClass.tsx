'use client';
import { ActiveAccount, CreateClassType } from '@/utils/types';
import { Button, Divider, Input, Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { BsCalendar2Check } from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiGymBag, GiTeacher } from 'react-icons/gi';
import {
  MdDriveFileRenameOutline,
  MdOutlineSportsGymnastics,
} from 'react-icons/md';
import startOfToday from 'date-fns/startOfToday';
import { useAppSelector } from '@/utils/hooks';
import { createNewClass } from '@/app/api/actions/createClass';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
export default function CreateClass() {
  //! ----------------------- H O O K S ----------------------------
  const [disabled, setDisabled] = React.useState(false);
  const [classData, setClassData] = React.useState<CreateClassType>({
    name: '',
    limit: 0,
    date: '',
    instructor: undefined,
  });
  const instructors = useAppSelector(
    (state) => state.instructorAndUsersSlice.instructors
  );
  //! ----------------------- F U N C T I O N S ----------------------------
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setClassData({
      ...classData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    event.preventDefault();
    const { data, error } = await createNewClass(classData);
    if (error) {
      toast.error(error, {
        position: 'top-right',
      });
      setDisabled(false);
      return;
    }
    if (data) {
      toast.success('Clase creada con éxito.', {
        position: 'top-right',
      });
    }
    setDisabled(false);
    return;
  };
  //! -------------------------- V A R I A B L E S --------------------------
  const newDate = startOfToday();
  const today = newDate.toISOString().slice(0, 16);
  const mappedInstructors = instructors?.filter((instructor) => {
    return instructor.active === ActiveAccount.ACTIVE;
  });
  return (
    <motion.div
      initial={{
        x: 100,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="w-[100%] items-center flex flex-col max-w-[50rem]"
    >
      <h3 className="classesH3">
        Aquí puedes <span className="text-[#f59b4b]">crear</span> una clase.
      </h3>
      <Divider
        aria-label="divider"
        className="bg-white w-[60%] max-w-[50rem] my-4"
      />
      <form
        onSubmit={handleSubmit}
        className="w-[60%] min-w-[17rem] max-w-[30rem] flex flex-col gap-2 p-2 bg-zinc-800 rounded-lg"
      >
        <Input
          size="lg"
          type="text"
          label="Nombre de la clase"
          aria-label="name"
          startContent={<MdDriveFileRenameOutline className="registerIcons" />}
          name="name"
          isRequired
          onChange={handleChange}
          className="w-[100%] text-black "
        />
        <Input
          size="lg"
          type="number"
          label="Límite de estudiantes"
          aria-label="limit"
          name="limit"
          isRequired
          startContent={<FaPeopleGroup className="registerIcons" />}
          onChange={handleChange}
          className="w-[100%] text-black "
        />
        <Input
          size="lg"
          type="datetime-local"
          name="date"
          aria-label="date"
          label="Fecha y hora"
          isRequired
          min={today}
          startContent={<BsCalendar2Check className="registerIcons" />}
          onChange={handleChange}
          className="w-[100%] text-black "
        />
        <Select
          size="lg"
          aria-label="instructor"
          startContent={<GiTeacher className="registerIcons" />}
          placeholder="Instructor de la clase"
          radius="lg"
          onChange={handleChange}
          className="text-black text-center"
          name="instructor"
        >
          {mappedInstructors.length ? (
            mappedInstructors?.map((instructor, i) => {
              return (
                <SelectItem
                  key={instructor.id}
                  textValue={`${instructor.name} ${instructor.lastname}`}
                  color="warning"
                  startContent={<MdOutlineSportsGymnastics />}
                >
                  {instructor.name} {instructor.lastname}
                </SelectItem>
              );
            })
          ) : (
            <SelectItem
              key={0}
              isDisabled
              className="bg-red-200 text-red-950 text-xl"
            >
              No hay instructores registrados o habilitados.
            </SelectItem>
          )}
        </Select>
        <Button
          type="submit"
          disabled={disabled}
          className="bg-[#f59b4b] text-md font-semibold "
        >
          {!disabled ? (
            <span className="flex items-center justify-center gap-2">
              <GiGymBag className="text-2xl" /> Crear clase
            </span>
          ) : (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white "></div>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
