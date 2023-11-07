'use client';
import React from 'react';
import { dashboardButtons } from '@/data/data';
import { Button } from '@nextui-org/react';
import AllClassesDashboard from '@/components/dashboardComponents/allClasses/allClassesDashboard';
import CreateClass from '@/components/dashboardComponents/createClass/createClass';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { getUsers } from '../api/actions/getInstructorsAndUsers';
import {
  loadInstructors,
  loadUsers,
} from '../redux/features/instructorsAndUsersSlice';
import toast from 'react-hot-toast';
import { loadAllClasses } from '../redux/features/gymClassesSlice';
import AllInstructorsDashboard from '@/components/dashboardComponents/allInstructors/allInstructorsDashboard';
import {
  deletingClassesToInactive,
  getAllClassesFunction,
  getAllInstructorsFunction,
} from '@/utils/utils';
import { GymClassType } from '@/utils/types';
export default function Dashboard() {
  //!---------------------- H O O K S --------------------------
  const [tab, setTab] = React.useState(0);
  const dispatch = useAppDispatch();
  const classes = useAppSelector((state) => state.gymClassesSlice.allClasses);

  React.useEffect(() => {
    getAllInstructors();
    getAllUsers();
    getClassesToTable();
    deletingClassesToInactive(classes);
  });

  const displayInfo = (key: number) => {
    switch (key) {
      case 0:
        return <AllClassesDashboard />;
      case 1:
        return <CreateClass />;
      case 2:
        return <AllInstructorsDashboard />;
    }
  };
  //!---------------------- F U N C T I O N S --------------------------

  async function getAllUsers() {
    const { users, error } = await getUsers();
    if (users) {
      dispatch(loadUsers(users));
    }
    if (error) {
      toast.error(error, {
        position: 'top-right',
      });
    }
    return;
  }
  async function getAllInstructors() {
    const { instructors, error } = await getAllInstructorsFunction();
    if (instructors) {
      return dispatch(loadInstructors(instructors));
    }
    if (error) {
      return toast.error(error, {
        position: 'top-right',
      });
    }
  }
  async function getClassesToTable() {
    const { classes, error } = await getAllClassesFunction();
    if (error) {
      return toast.error(error);
    }
    return dispatch(loadAllClasses(classes));
  }
  return (
    <div className="w-full pt-16 flex flex-col items-center text-black font-bold">
      <div className=" justify-center p-3 gap-2 items-center mb-5 flex flex-wrap">
        {dashboardButtons.map((but, i) => {
          return (
            <Button
              key={i}
              className={` ${
                i === tab
                  ? 'bg-[#f59b4b]  shadow-md shadow-[#f59a4b42]'
                  : 'bg-gray-200'
              } transition-all`}
              onPress={() => {
                setTab(i);
              }}
            >
              {but.name}
            </Button>
          );
        })}
      </div>
      {displayInfo(tab)}
    </div>
  );
}
