'use client';
import React from 'react';
import { itemsDashboardsPlans, itemsDashboardsUsers } from '@/data/data';

import { IoMdArrowDropdownCircle } from 'react-icons/io';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
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
import { itemsDashboardsClasse } from '@/data/data';
import AllUsersDashboard from '@/components/dashboardComponents/allUsers/allUsersDashboard';
import AllPlansDashboard from '@/components/dashboardComponents/allPlans/allPlans';
import EditPlanDashboard from '@/components/dashboardComponents/allPlans/editPlan';
import { getAllPlans } from '../api/actions/getPlans';
import { loadAllPlans } from '../redux/features/allPlansSlice';
export default function Dashboard() {
  //!---------------------- H O O K S ---------------------------------
  const [tab, setTab] = React.useState('');
  const dispatch = useAppDispatch();
  const classes = useAppSelector((state) => state.gymClassesSlice.allClasses);

  React.useEffect(() => {
    getAllInstructors();
    getAllUsers();
    getClassesToTable();
    dispatchToChargePlans();
    deletingClassesToInactive(classes);
  });
  //!---------------------- F U N C T I O N S --------------------------
  const displayInfo = (id: string) => {
    //* Son arrays de objetos, cada posición tiene, entre otras, una propiedad "id",
    //* que se utilziará para determinár cual componente renderizar de acuerdo al "id"
    //* y al estado local "tab".
    switch (id) {
      case itemsDashboardsClasse[0].id:
        return <AllClassesDashboard />;
      case itemsDashboardsClasse[1].id:
        return <CreateClass />;
      case itemsDashboardsUsers[0].id:
        return <AllUsersDashboard />;
      case itemsDashboardsUsers[1].id:
        return <AllInstructorsDashboard />;
      case itemsDashboardsUsers[2].id:
        return <p>Agregar instructores</p>;
      case itemsDashboardsPlans[0].id:
        return <AllPlansDashboard />;
      case itemsDashboardsPlans[1].id:
        return <EditPlanDashboard />;
      default:
        return <AllClassesDashboard />;
    }
  };
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
  async function dispatchToChargePlans() {
    const { plans, error } = await getAllPlans();
    if (error) {
      return toast.error(error);
    }
    if (plans) {
      return dispatch(loadAllPlans(plans));
    }
  }
  //! ------------------------ V A R I A B L E S ------------------------------------
  return (
    <div className="w-full pt-16 flex flex-col items-center text-black font-bold">
      <div className=" justify-center p-3 gap-2 items-center mb-5 flex flex-wrap">
        {
          //! ---------- DROPDOWN MENU PARA CLASES-----------}
        }
        <Dropdown
          aria-label="dropdown-clases"
          className="border-1 border-zinc-900"
        >
          <DropdownTrigger>
            <Button
              startContent={<IoMdArrowDropdownCircle />}
              className="bg-[#f59b4b]"
            >
              Clases
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="dropdown-menu">
            {itemsDashboardsClasse.map((item, i) => {
              return (
                <DropdownItem
                  textValue={item.name}
                  className={`border-1 border-black  ${
                    item.id === tab
                      ? 'bg-[#f59b4b]  shadow-md shadow-[#f59a4b42]'
                      : 'bg-gray-200'
                  } transition-all`}
                  onClick={() => {
                    setTab(item.id);
                  }}
                  key={i}
                  description={item.description}
                  startContent={React.cloneElement(
                    item.icon as React.ReactElement,
                    {
                      className: 'text-3xl',
                    }
                  )}
                >
                  <span className="font-semibold">{item.name}</span>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>

        {
          //! ---------- DROPDOWN MENU PARA PLANES ----------}
        }
        <Dropdown
          aria-label="dropdown-planes"
          className="border-1 border-zinc-900"
        >
          <DropdownTrigger>
            <Button
              startContent={<IoMdArrowDropdownCircle />}
              className="bg-[#f59b4b]"
            >
              Planes
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="dropdown-menu">
            {itemsDashboardsPlans.map((item, i) => {
              return (
                <DropdownItem
                  textValue={item.name}
                  className={`border-1 border-black  ${
                    item.id === tab
                      ? 'bg-[#f59b4b]  shadow-md shadow-[#f59a4b42]'
                      : 'bg-gray-200'
                  } transition-all`}
                  onClick={() => {
                    setTab(item.id);
                  }}
                  key={i}
                  description={item.description}
                  startContent={React.cloneElement(
                    item.icon as React.ReactElement,
                    {
                      className: 'text-3xl',
                    }
                  )}
                >
                  <span className="font-semibold">{item.name}</span>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        {
          //! ---------- DROPDOWN MENU PARA USUARIOS E INSTRUCTORES-----------}
        }
        <Dropdown
          aria-label="dropdown-users-instructors"
          className="border-1 border-zinc-900"
        >
          <DropdownTrigger>
            <Button
              startContent={<IoMdArrowDropdownCircle />}
              className="bg-[#f59b4b]"
            >
              Usuarios/Instructores
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="dropdown-menu">
            {itemsDashboardsUsers.map((item, i) => {
              return (
                <DropdownItem
                  textValue={item.name}
                  className={`border-1 border-black  ${
                    item.id === tab
                      ? 'bg-[#f59b4b]  shadow-md shadow-[#f59a4b42]'
                      : 'bg-gray-200'
                  } transition-all`}
                  onClick={() => {
                    setTab(item.id);
                  }}
                  key={i}
                  description={item.description}
                  startContent={React.cloneElement(
                    item.icon as React.ReactElement,
                    {
                      className: 'text-3xl',
                    }
                  )}
                >
                  <span className="font-semibold">{item.name}</span>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
      {displayInfo(tab)}
    </div>
  );
}
