/* eslint-disable @next/next/no-img-element */
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { useAppSelector } from '@/utils/hooks';
import { AiFillEye } from 'react-icons/ai';
import { BiImageAdd, BiSolidSave } from 'react-icons/bi';
import { BsCashCoin } from 'react-icons/bs';
import { GiTwoCoins } from 'react-icons/gi';
import { PlanType } from '@/utils/types';
import { editPlan } from '@/app/api/actions/editPlan';
import toast from 'react-hot-toast';

export default function EditPlanDashboard() {
  //!---------------------- STATES / HOOKS --------------------------
  const [pending, setPending] = React.useState(false);
  const [planId, setPlanId] = React.useState('');
  const [changes, setChanges] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [imageToCloudinary, setImageToCloudinary] =
    React.useState<File | null>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const plans = useAppSelector((state) => state.allPlansSlice.allPlans);
  const [selectedPlan, setSelectedPlan] = React.useState('');
  const [prevImage, setPrevImage] = React.useState('');
  const [planToEdit, setPlanToEdit] = React.useState({
    name: '',
    price: 0,
    credits: 0,
    description: '',
  });
  const [imageURL, setImageURL] = React.useState('');

  //!---------------------- FUNCTIONS -----------------------
  function resetForm() {
    const form = document.getElementById('form') as HTMLFormElement | null;
    if (form) {
      form.reset();
    }
  }
  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    setChanges(false);
    if (event.target.name === 'image') {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const path = URL.createObjectURL(file);

        setImageURL(path);
        setImageToCloudinary(file);
      }
    } else {
      setPlanToEdit({
        ...planToEdit,
        [event.target.name]: event.target.value,
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setPending(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append('description', planToEdit.description);
    formData.append('credits', `${planToEdit.credits}`);
    formData.append('price', `${planToEdit.price}`);

    if (imageToCloudinary) {
      formData.append('image', imageToCloudinary);
      const { data, error } = await editPlan(formData, planId);
      if (error) {
        return toast.error(error);
      }
      setPending(false);
      resetForm();
      return toast.success('Plan actualizado con éxito.');
    } else {
      const { data, error } = await editPlan(formData, planId);
      if (error) {
        return toast.error(error);
      }
      setPending(false);
      resetForm();
      return toast.success('Plan actualizado con éxito.');
    }
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
      {isOpen ? (
        <Modal
          className="bg-zinc-800 bg-opacity-95"
          placement={'center'}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <p className="text-center">
                    <span className="text-[#f59b4b]">
                      Previsualización del plan
                    </span>{' '}
                  </p>
                  <p className="text-tiny font-light text-white text-center bg-zinc-700 p-1 rounded-lg border-1 border-[#f59b4b]">
                    Asegurate de que los créditos que mencionas en la
                    descripción{' '}
                    <span className="font-semibold underline">
                      sean los mismos{' '}
                    </span>
                    que asignas al plan, ya que{' '}
                    <span className="font-semibold underline">
                      estos ultimos
                    </span>{' '}
                    serán los que se le agregarán al usuario al realizar una
                    recarga.
                  </p>
                </ModalHeader>
                <>
                  <ModalBody className="flex items-center justify-center">
                    <div className="relative cursor-default w-[17rem] h-[15rem] border border-orange-300 rounded-xl flex flex-col items-center hover:scale-105 transition-all ">
                      <img
                        src={imageURL || prevImage}
                        alt={planToEdit.name}
                        className="w-full h-[100%] object-cover rounded-xl"
                      />
                      <div className="group absolute  flex items-center flex-col justify-center rounded-xl bg-gray-900 bg-opacity-70 w-full h-full text-center">
                        <h1 className="text-white font-bold text-3xl group-hover:scale-105 transition-all">
                          {planToEdit.name.split(' ')[0]}{' '}
                          <span className="text-[#fa8c48]">
                            {planToEdit.name.split(' ')[1]}
                          </span>
                        </h1>
                        <span className="text-3xl text-white">
                          ${' '}
                          <span className="text-[#fa8c48] font-bold text-4xl">
                            {planToEdit.price}
                          </span>
                        </span>
                        <span className="text-white text-xl">
                          Sobre el plan:
                        </span>
                        <span className="text-white text-tiny p-1">
                          {planToEdit.description}
                        </span>
                      </div>
                    </div>
                  </ModalBody>
                </>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : null}
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
          className="w-full"
          onChange={(event) => {
            setImageURL('');
            resetForm();
            if (!event.target.value) {
              setIsEditing(false);
              setImageToCloudinary(null);
              setPlanToEdit({
                name: '',
                price: 0,
                credits: 0,
                description: '',
              });
            } else {
              setIsEditing(true);
              setSelectedPlan(event.target.value);
              const planFound: PlanType[] = plans.filter(
                (plan) => plan.name === event.target.value
              );
              setPrevImage(planFound[0].image);
              setPlanId(planFound[0].id);
              setPlanToEdit({
                ...planToEdit,
                name: planFound[0].name,
                credits: planFound[0].credits,
                description: planFound[0].description,
                price: planFound[0].price,
              });
            }
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

      {isEditing && (
        <form
          id="form"
          action=""
          onSubmit={handleSubmit}
          className="relative flex flex-col items-center w-[60%] min-w-[17rem] max-w-[25rem] h-full p-2 bg-zinc-800 rounded-lg"
        >
          <button
            type="button"
            onClick={() => {
              onOpen();
            }}
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
            name="image"
            aria-label="image"
            label="Imágen del plan"
            startContent={<BiImageAdd className="registerIcons " />}
            onChange={handleChange}
            size="sm"
            className=" text-black "
          />
          <Textarea
            type="text"
            name="description"
            aria-label="description"
            placeholder="Descripción del plan"
            onChange={handleChange}
            size="sm"
            className="w-full mt-[.15rem] text-black "
          />
          <div className="w-full mt-1 flex gap-2 ">
            <Input
              type="number"
              name="price"
              label="Precio del plan"
              aria-label="price"
              startContent={<BsCashCoin className="registerIcons " />}
              onChange={handleChange}
              size="sm"
              className="w-[50%] text-black "
            />
            <Input
              type="number"
              name="credits"
              label="Créditos del plan"
              aria-label="credits"
              startContent={<GiTwoCoins className="registerIcons " />}
              onChange={handleChange}
              size="sm"
              className="w-[50%] text-black "
            />
          </div>
          <Button
            type="submit"
            isDisabled={changes || pending}
            className="bg-[#f59b4b] mt-3 w-full border-1 border-black text-md font-semibold"
          >
            {pending ? (
              <div className="animate-spin w-5 h-5 border-b border-white rounded-full"></div>
            ) : (
              <div className="flex items-center gap-2">
                <BiSolidSave className="registerIcons" /> Guardar cambios
              </div>
            )}{' '}
          </Button>
        </form>
      )}
    </motion.div>
  );
}
