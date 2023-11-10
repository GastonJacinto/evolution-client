'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { useAppSelector } from '@/utils/hooks';
import { AiFillEye, AiOutlineUser } from 'react-icons/ai';
import { BiImageAdd, BiRename, BiSolidSave } from 'react-icons/bi';
import { BsCardText, BsCashCoin } from 'react-icons/bs';
import { GiTwoCoins } from 'react-icons/gi';
export default function EditPlanDashboard() {
  //!---------------------- STATES / HOOKS --------------------------
  const plans = useAppSelector((state) => state.allPlansSlice.allPlans);
  const [selectedPlan, setSelectedPlan] = React.useState('');
  const [planToEdit, setPlanToEdit] = React.useState({
    planId: '',
    planPrice: 0,
    planCredits: 0,
    planImage: '',
    planDescription: '',
    isEditing: false,
  });
  //!---------------------- FUNCTIONS -----------------------
  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setPlanToEdit({
      ...planToEdit,
      [event.target.name]: [event.target.value],
    });
    console.log(planToEdit);
  }
  return (
    <motion.div
      initial={{
        y: -100,
        x: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        x: 0,
        opacity: 1,
      }}
      className="w-full h-full flex flex-col items-center pb-5 overflow-hidden"
    >
      <h3 className="classesH3">
        ¿Qué <span className="text-[#f59b4b]">plan</span> quieres{' '}
        <span className="text-[#f59b4b]">editar</span>?
      </h3>
      <Divider
        aria-label="divider"
        className="bg-white w-[90%] max-w-[25rem] my-4"
      />
      <div className="w-[60%] min-w-[17rem] max-w-[25rem] flex items-center justify-between">
        <Select
          size="sm"
          label="Selecciona un plan"
          aria-label="select-plans"
          className="w-full "
          onChange={(event) => {
            setSelectedPlan(event.target.value);
            setPlanToEdit({
              ...planToEdit,
              isEditing: true,
            });
          }}
        >
          {plans?.map((plan, i) => {
            return <SelectItem key={plan.name}>{plan.name}</SelectItem>;
          })}
        </Select>
      </div>
      <Divider
        aria-label="divider"
        className="bg-white w-[90%] max-w-[25rem] my-4"
      />

      {planToEdit.isEditing && (
        <form
          action=""
          className="relative flex flex-col items-center w-[60%] min-w-[17rem] max-w-[25rem] h-full p-2 bg-zinc-800 rounded-lg"
        >
          <button
            type="button"
            className="absolute flex items-center justify-center -top-1 -right-1 w-6 h-6 bg-[#f59b4b] rounded-full"
          >
            <AiFillEye className="text-xl" />
          </button>
          <p className="text-white  pb-2 text-sm font-semibold">
            Estas editando el{' '}
            <span className="text-[#f59b4b] underline"> {selectedPlan}</span>
          </p>
          <Input
            type="file"
            name="planImage"
            aria-label="image"
            label="Imágen del plan"
            startContent={<BiImageAdd className="registerIcons " />}
            onChange={handleChange}
            size="sm"
            className=" text-black "
          />
          <Textarea
            type="text"
            name="planDescription"
            aria-label="description"
            placeholder="Descripción del plan"
            onChange={handleChange}
            size="sm"
            className="w-full mt-[.15rem] text-black "
          />
          <div className="w-full mt-1 flex gap-2 ">
            <Input
              type="number"
              name="planPrice"
              label="Precio del plan"
              aria-label="price"
              startContent={<BsCashCoin className="registerIcons " />}
              onChange={handleChange}
              size="sm"
              className="w-[50%] text-black "
            />
            <Input
              type="number"
              name="planCredits"
              label="Créditos del plan"
              aria-label="credits"
              startContent={<GiTwoCoins className="registerIcons " />}
              onChange={handleChange}
              size="sm"
              className="w-[50%] text-black "
            />
          </div>
          <Button
            startContent={<BiSolidSave className="registerIcons" />}
            className="bg-[#f59b4b] mt-3 w-full border-1 border-black text-md font-semibold"
          >
            Guardar cambios
          </Button>
        </form>
      )}
    </motion.div>
  );
}
