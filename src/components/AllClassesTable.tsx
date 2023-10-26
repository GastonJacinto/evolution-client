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
import { ActiveAccount, GymClassType, UserType } from '@/utils/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { reserveClass } from '@/app/api/actions/reserveClass';
import toast from 'react-hot-toast';
import { getAllClasses } from '@/app/api/actions/getClasses';
import { getClasses } from '@/app/redux/features/myClassesSlice';

export default function AllClassesTable() {
  //! ------------------ H O O K S -----------------------------
  const [isLoading, setIsLoading] = React.useState(false);
  const [toReserve, setToReserve] = React.useState({
    idClass: '',
    student: '',
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const classes: GymClassType[] = useAppSelector(
    (state) => state.myClassesSlice.myClasses
  );
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  const dispatch = useAppDispatch();
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
      toast.success(success);
      setIsLoading(false);
    }
  }
  //! ------------------ C O N S T A N T S -----------------------------
  const mappedClass = classes.map((clase, i) => {
    const unformatedDate = new Date(clase.date);
    const date = format(unformatedDate, 'EEEE, d MMMM HH:mm', {
      locale: es,
    });
    return {
      ...clase,
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
                        <span className="font-bold">gastarás</span> una de tus
                        clases. No te preocupes, puedes eliminar tu reserva
                        hasta <span className="font-bold">2 (dos) horas</span>{' '}
                        antes del comienzo de la misma. Pasado este plazo,{' '}
                        <span className="font-bold">no podrás</span> eliminar tu
                        reserva y tu clase se gastará de todas formas.
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
                      <Button
                        color="success"
                        className="font-bold"
                        onPress={() => {
                          setIsLoading(true);
                          reservePlaceOnClass(
                            toReserve.idClass,
                            toReserve.student
                          );
                        }}
                      >
                        ¡Quiero mi reserva!
                      </Button>
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
        isStriped
        className="w-[95%] max-w-[50rem] "
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn className="columnName">CLASE</TableColumn>
          <TableColumn className="columnName">FECHA Y HORA</TableColumn>
          <TableColumn className="columnName">INSTRUCTOR/A</TableColumn>
          <TableColumn className="columnName text-center">
            DISPONIBLES
          </TableColumn>
          <TableColumn className="columnName text-center ">
            RESERVAR
          </TableColumn>
        </TableHeader>

        <TableBody emptyContent={'No hay clases registradas.'}>
          {mappedClass.map((clase, i) => {
            return (
              <TableRow key={i}>
                <TableCell key={1}>{clase.name}</TableCell>
                <TableCell key={2}>{clase.date}</TableCell>
                {clase.instructor.active === ActiveAccount.ACTIVE ? (
                  <TableCell key={3}>
                    {clase.instructor.name} {clase.instructor.lastname}
                  </TableCell>
                ) : (
                  <TableCell key={3} className="text-red-400">
                    No hay instructor/a asignado/a
                  </TableCell>
                )}
                <TableCell key={4} className="text-center">
                  {clase.limit}
                </TableCell>
                <TableCell key={5} className="text-center">
                  <Button
                    onPress={() => {
                      onOpen();
                      setDataToReserveClass(clase.id);
                    }}
                    className="h-5 bg-[#f59b4b] font-semibold border-gray-500 border-1"
                  >
                    Reservar
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
