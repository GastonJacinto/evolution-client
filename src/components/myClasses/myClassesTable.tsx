import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { BsCalendarEvent } from 'react-icons/bs';
import { ActiveAccount, GymClassType } from '@/utils/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { FaPeopleRobbery } from 'react-icons/fa6';
import { GiGymBag } from 'react-icons/gi';
import { MdSportsGymnastics } from 'react-icons/md';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { removeStudentFromClass } from '@/app/api/actions/removeStudentFromClass';
import { deletingClassesToInactive, getUser } from '@/utils/utils';
import { loadProfile } from '@/app/redux/features/userProfileSlice';
import { getAllClasses } from '@/app/api/actions/getClasses';
import { loadMyClasses } from '@/app/redux/features/gymClassesSlice';
import { useSession } from 'next-auth/react';

export default function MyClassesTable() {
  //! ------------------ H O O K S -----------------------------
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const [limitToDeleteReserve, setLimitToDeleteReserve] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [deleteReserve, setDeleteReserve] = React.useState({
    idClass: '',
    student: '',
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  //! ------------------ F U N C T I O N S -----------------------------
  function setDataToRemoveReserve(idClass: string) {
    setDeleteReserve({
      idClass,
      student: userProfile.id,
    });
  }
  async function removePlaceFromClass(idClass: string, studentId: string) {
    const { data, error } = await removeStudentFromClass(idClass, studentId);
    if (error) {
      toast.error(error);
      return setIsLoading(false);
    }
    if (data) {
      toast.success(data);
      setIsLoading(false);
      return dispatchToChargeUserProfile();
    }
  }
  async function dispatchToChargeUserProfile() {
    if (session) {
      const { user, error } = await getUser(session.user?.token);
      if (user) {
        return dispatch(loadProfile(user));
      } else {
        return toast.error(error);
      }
    }
  }
  function canDeleteReserve(classDate: Date) {
    const now = new Date();
    const timeDifference = classDate.getTime() - now.getTime();
    const hoursDifference = timeDifference / 3600000;
    if (hoursDifference > 2) {
      return setLimitToDeleteReserve(false);
    } else {
      return setLimitToDeleteReserve(true);
    }
  }
  //! ------------------ C O N S T A N T S -----------------------------
  const mappedClass = userProfile.classes?.map((clase, i) => {
    const unformatedDate = new Date(clase.date);
    const date = format(unformatedDate, 'EEEE, d MMMM HH:mm', {
      locale: es,
    });
    return {
      ...clase,
      date: date,
      unformatedDate: new Date(clase.date),
    };
  });

  return (
    <>
      {isOpen ? (
        <Modal placement={'center'} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {!isLoading ? (
                    <p className="text-center">
                      {' '}
                      ¿Quieres{' '}
                      <span className="font-bold underline text-red-700">
                        eliminar
                      </span>{' '}
                      tu reserva esta clase?
                    </p>
                  ) : (
                    <p className="text-center">
                      Aguarda un <span className="text-[#f59b4b]">momento</span>{' '}
                      por favor...
                    </p>
                  )}
                </ModalHeader>
                {!isLoading ? (
                  <>
                    <ModalBody>
                      <p>
                        Al{' '}
                        <span className="font-semibold underline">
                          eliminar
                        </span>{' '}
                        tu reserva,{' '}
                        <span className="font-semibold">recuperarás</span> tu
                        crédito. Puedes volver a reservar un lugar si es lo que
                        deseas. Recuerda que solo puedes eliminar tu reserva
                        hasta <span className="font-bold">2 (dos) horas</span>{' '}
                        antes del comienzo de la clase.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        className="font-bold"
                        variant="light"
                        onPress={onClose}
                      >
                        Cancelar
                      </Button>
                      {!limitToDeleteReserve ? (
                        <Button
                          isDisabled={limitToDeleteReserve}
                          className="font-semibold bg-red-600 text-white"
                          onPress={async () => {
                            setIsLoading(true);
                            await removePlaceFromClass(
                              deleteReserve.idClass,
                              deleteReserve.student
                            );
                            onClose();
                          }}
                        >
                          Eliminar mi reserva
                        </Button>
                      ) : (
                        <Button
                          isDisabled
                          className="font-semibold  bg-red-600 text-white"
                        >
                          Ya no puedes cancelar
                        </Button>
                      )}
                    </ModalFooter>
                  </>
                ) : (
                  <div className="flex items-center justify-center pb-4">
                    <Spinner color="warning" />
                  </div>
                )}
              </>
            )}
          </ModalContent>
        </Modal>
      ) : null}
      <Table
        className="w-[95%] max-w-[50rem]"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>
            <div className="columnName">
              <GiGymBag className="text-xl" />
              <span>CLASE</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="columnName ">
              <BsCalendarEvent className="text-xl" />
              <span>FECHA Y HORA</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="columnName">
              <MdSportsGymnastics className="text-xl" />
              <span>INSTRUCTOR/A</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="columnName text-center">
              <FaPeopleRobbery className="text-xl" />
              <span>DISPONIBLES</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="columnName text-center ">
              <AiFillDelete className="text-xl" />
              <span>ELIMINAR RESERVA</span>
            </div>
          </TableColumn>
        </TableHeader>

        <TableBody
          emptyContent={'No te has registrado a ninguna clase.'}
          loadingContent={<Spinner />}
        >
          {mappedClass.map((clase, i) => {
            return (
              <TableRow key={i}>
                <TableCell key={1}>{clase.name}</TableCell>
                <TableCell key={2} className="capitalize">
                  {clase.date}
                </TableCell>
                {clase.instructor?.active === ActiveAccount.ACTIVE ? (
                  <TableCell key={3} className="capitalize">
                    {clase.instructor.name} {clase.instructor.lastname}
                  </TableCell>
                ) : (
                  <TableCell key={3} className="text-red-400">
                    No asignado/a
                  </TableCell>
                )}
                <TableCell key={4} className="text-center font-bold">
                  {clase.limit}
                </TableCell>
                <TableCell key={5} className="text-center">
                  <Button
                    onPress={() => {
                      onOpen();
                      setDataToRemoveReserve(clase.id);
                      canDeleteReserve(clase.unformatedDate);
                    }}
                    size="sm"
                    className="h-7 bg-[#a82e2e] font-semibold border-gray-500 border-1 hover:scale-105 "
                  >
                    <AiOutlineDelete className="text-[1rem] " />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
