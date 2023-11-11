/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { FcCancel, FcMoneyTransfer } from 'react-icons/fc';
import { useAppSelector } from '@/utils/hooks';
import { getPlansForCredits } from '@/utils/utils';
import toast from 'react-hot-toast';
import { PlanType } from '@/utils/types';

export default function PlanCard({
  name,
  price,
  description,
  image,
  credits,
  id,
}: PlanType) {
  //! ------------------------- H O O K S ----------------------------
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  //! --------------------- F U N C T I O N S -----------------------------
  async function rechargeCredits() {
    const planData = {
      name,
      image,
      price,
      description,
      credits,
      id,
    };
    const payerInfo = {
      name: userProfile.name + ' ' + userProfile.lastname,
      email: userProfile.email,
    };
    setIsLoading(true);
    const { data, error } = await getPlansForCredits(planData, payerInfo);
    if (data) {
      return router.push(data.init_point);
    }
    if (error) {
      toast.error(error);
      return setIsLoading(false);
    }
  }
  return (
    <motion.div className="relative cursor-default w-[17rem] h-[15rem] border border-orange-300 rounded-xl flex flex-col items-center hover:scale-105 transition-all ">
      <img
        src={image}
        alt={name}
        className="w-full h-[100%] object-cover rounded-xl"
      />
      <div className="group absolute  flex items-center flex-col justify-center bg-gray-900 bg-opacity-70 w-full h-full text-center">
        <h1 className="text-white font-bold text-3xl group-hover:scale-105 transition-all">
          {name.split(' ')[0]}{' '}
          <span className="text-[#fa8c48]">{name.split(' ')[1]}</span>
        </h1>
        <span className="text-3xl text-white">
          $ <span className="text-[#fa8c48] font-bold text-4xl">{price}</span>
        </span>
        <span className="text-white text-xl">Sobre el plan:</span>
        <span className="text-white text-tiny">{description}</span>
        {pathname === '/profile' &&
          (userProfile.remaining_classes ? (
            <Button
              isDisabled
              className=" mt-2 bg-[#fa8c48] font-semibold border-1 border-white text-white hover:scale-110 active:scale-105"
              startContent={<FcCancel className="text-2xl " />}
            >
              No disponible
            </Button>
          ) : (
            <Button
              isDisabled={isLoading}
              onPress={() => {
                rechargeCredits();
              }}
              className=" mt-2 bg-[#fa8c48] font-semibold border-1 border-white text-white hover:scale-110 active:scale-105"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <div className="flex items-center gap-2">
                  <FcMoneyTransfer className="text-3xl" /> Recargar
                </div>
              )}
            </Button>
          ))}
      </div>
    </motion.div>
  );
}
