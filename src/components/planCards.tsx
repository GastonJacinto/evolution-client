import React from 'react';
import { planes } from '@/data/data';
import PlanCard from './planCard';
export default function PlanCards() {
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {planes.map((plan, index) => {
        return (
          <React.Fragment key={index}>
            <PlanCard {...plan} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
