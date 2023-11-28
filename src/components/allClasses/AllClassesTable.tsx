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
import { ActiveAccount } from '@/utils/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { reserveClass } from '@/app/api/actions/userActions/reserveClass';
import toast from 'react-hot-toast';
import { GiGymBag } from 'react-icons/gi';
import { BsCalendarEvent } from 'react-icons/bs';
import { MdSportsGymnastics } from 'react-icons/md';
import { FaPeopleRobbery } from 'react-icons/fa6';
import { CgGym } from 'react-icons/cg';
import {
  deletingClassesToInactive,
  getAllClassesFunction,
  getUser,
} from '@/utils/utils';
import { loadProfile } from '@/app/redux/features/userProfileSlice';
import { loadAllClasses } from '@/app/redux/features/gymClassesSlice';
import { useSession } from 'next-auth/react';
import { utcToZonedTime } from 'date-fns-tz';

export default function AllClassesTable() {
  //! ------------------ H O O K S -----------------------------
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [toReserve, setToReserve] = React.useState({
    idClass: '',
    student: '',
  });
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const classes = useAppSelector((state) => state.gymClassesSlice.allClasses);
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  React.useEffect(() => {
    dispatchToChargeAllClasses();
  });
  //! ------------------ F U N C T I O N S -----------------------------

  function setDataToReserveClass(idClass: string) {
    setToReserve({
      idClass,
      student: userProfile.id,
    });
  }
  async function reservePlaceOnClass(idClass: string, studentId: string) {
    const { success, error } = await reserveClass(idClass, studentId);
    if (error) {
      toast.error(error);
      setIsLoading(false);
    }
    if (success) {
      dispatchToChargeUserProfile();
      dispatchToChargeAllClasses();
      toast.success(success);
      setIsLoading(false);
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
  async function dispatchToChargeAllClasses() {
    const { classes, error } = await getAllClassesFunction();
    if (classes) {
      return dispatch(loadAllClasses(classes));
    } else if (error) {
      return toast.error(error);
    }
  }

  //! ------------------ C O N S T A N T S -----------------------------
  const mappedClass = classes?.map((clase, i) => {
    let userInClass = false;
    // Este forEach es para verificar si el usuario ya está registrado en la clase.
    clase.students.forEach((student) => {
      if (userProfile.id === student.id) {
        userInClass = true;
      }
    });
    const unformattedDate = new Date(clase.date);
    const timeZone = 'America/Argentina/Buenos_Aires';

    const zonedDate = utcToZonedTime(unformattedDate, timeZone);
    const date = format(zonedDate, 'EEEE, d MMMM HH:mm', {
      locale: es,
    });

    return {
      ...clase,
      userInClass,
      date: date,
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
                      <span className="font-bold underline">reservar</span> un
                      lugar en esta clase?
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
                        Ten en cuenta que al reservar un lugar,{' '}
                        <span className="font-bold">gastarás</span> uno de tus
                        créditos. No te preocupes, puedes eliminar tu reserva
                        hasta <span className="font-bold">2 (dos) horas</span>{' '}
                        antes del comienzo de la misma. Pasado este plazo,{' '}
                        <span className="font-bold">no podrás</span> eliminar tu
                        reserva y tu crédito se gastará de todas formas.
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
                      {userProfile.remaining_classes > 0 ? (
                        <Button
                          color="success"
                          className="font-bold"
                          onPress={async () => {
                            setIsLoading(true);
                            await reservePlaceOnClass(
                              toReserve.idClass,
                              toReserve.student
                            );
                            onClose();
                          }}
                        >
                          ¡Quiero mi reserva!
                        </Button>
                      ) : (
                        <Button isDisabled color="danger" className="font-bold">
                          No tienes suficientes créditos
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
        isHeaderSticky
        className="w-[95%] max-w-[55rem] "
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
            {' '}
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
              <CgGym className="text-xl" />
              <span>RESERVAR</span>
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody
          loadingContent={<Spinner />}
          emptyContent={'No hay clases registradas.'}
        >
          {mappedClass?.map((clase, i) => {
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
                <TableCell key={4} className="text-center">
                  {clase.limit}
                </TableCell>
                <TableCell key={5} className="text-center">
                  {clase.userInClass ? (
                    <Button
                      isDisabled
                      className="h-7 bg-[#f54b4b] font-bold hover:scale-105"
                    >
                      Reservado
                    </Button>
                  ) : (
                    <Button
                      onPress={() => {
                        onOpen();
                        setDataToReserveClass(clase.id);
                      }}
                      className="h-7 bg-[#f59b4b] font-semibold border-gray-500 border-1 hover:scale-105"
                    >
                      Reservar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
