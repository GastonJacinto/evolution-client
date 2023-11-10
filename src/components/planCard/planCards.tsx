import React from 'react';
import PlanCard from './planCard';
import { useAppSelector } from '@/utils/hooks';
export default function PlanCards() {
  const plans = useAppSelector((state) => state.allPlansSlice.allPlans);
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {plans?.map((plan, index) => {
        return (
          <React.Fragment key={index}>
            <PlanCard {...plan} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
