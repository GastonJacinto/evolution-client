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
import {
  ActiveAccount,
  GymClassType,
  InstructorType,
  UserType,
} from '@/utils/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { GiGymBag } from 'react-icons/gi';
import { BsCalendarEvent } from 'react-icons/bs';
import { MdSportsGymnastics } from 'react-icons/md';
import { FaPeopleGroup, FaPeopleRobbery } from 'react-icons/fa6';
import {
  AiFillDelete,
  AiFillInfoCircle,
  AiFillSetting,
  AiFillWarning,
} from 'react-icons/ai';
import { deleteClass } from '@/app/api/actions/deleteClass';
import { loadAllClasses } from '@/app/redux/features/gymClassesSlice';
import { removeStudentFromClass } from '@/app/api/actions/removeStudentFromClass';
import { CgCalendar } from 'react-icons/cg';
import { BiSolidUser } from 'react-icons/bi';
import { getAllClassesFunction } from '@/utils/utils';

export default function AllClassesDashboardTable() {
  //! ------------------ H O O K S -----------------------------
  const [isLoading, setIsLoading] = React.useState(false);
  const [classInfo, setClassInfo] = React.useState({
    id: '',
    name: '',
    instructor: {} as InstructorType,
    students: [] as UserType[],
    date: '',
  });
  const dispatch = useAppDispatch();
  const [classToDelete, setClassToDelete] = React.useState('');
  // SI ESTA EN FALSE, MUESTRA LA INFO DE LA CLASE, SINO, LA MODAL PARA CONFIRMAR ELIMINACION DE LA CLASE.
  const [showInfo, setShowInfo] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const classes = useAppSelector((state) => state.gymClassesSlice.allClasses);
  //! ------------------ F U N C T I O N S -----------------------------
  function setDataToClassInfo(
    className: string,
    students: UserType[],
    instructor: InstructorType,
    date: string,
    id: string
  ) {
    setClassInfo({
      name: className,
      students,
      instructor,
      date,
      id,
    });
  }
  async function deleteStudentFromClass(studentId: string, classId: string) {
    const { data, error } = await removeStudentFromClass(classId, studentId);
    if (error) {
      toast.error(error);
      return setIsLoading(false);
    }
    toast.success('Eliminado con éxito.');
    getClassesToTableAfterDeleting();
    return setIsLoading(false);
  }
  async function deleteClassFromDashboard() {
    const { data, error } = await deleteClass(classToDelete);
    if (error) {
      toast.error(error);
      setIsLoading(false);
    }
    toast.success(data.message);
    getClassesToTableAfterDeleting();
    setIsLoading(false);
    return;
  }
  async function getClassesToTableAfterDeleting() {
    const { classes, error } = await getAllClassesFunction();
    if (classes) {
      return dispatch(loadAllClasses(classes));
    }
    if (error) {
      return toast.error(error);
    }
  }
  //! ------------------ C O N S T A N T S -----------------------------
  const mappedClass = classes?.map((clase, i) => {
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
      {isOpen && (
        <Modal placement={'center'} isOpen={isOpen} onOpenChange={onOpenChange}>
          {
            //----------- VENTANA MODAL INFORMACIÓN DE LA CLASE ------------------
          }
          {showInfo ? (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {!isLoading ? (
                      <p className="text-center">
                        {' '}
                        Información de la clase:{' '}
                        <span className="font-bold underline">
                          {classInfo.name}
                        </span>
                      </p>
                    ) : (
                      <p className="text-center">
                        Aguarda un{' '}
                        <span className="text-[#f59b4b]">momento</span> por
                        favor...
                      </p>
                    )}
                  </ModalHeader>
                  {!isLoading ? (
                    <>
                      <ModalBody>
                        <label className="flex gap-2 " htmlFor="">
                          <span className="font-semibold underline  flex items-center gap-2">
                            <BiSolidUser /> Instructor:{' '}
                          </span>
                          <p className="capitalize ">
                            {classInfo.instructor?.name}{' '}
                            {classInfo.instructor?.lastname}
                          </p>
                        </label>
                        <label className="flex gap-2 " htmlFor="">
                          <span className="font-semibold underline flex items-center gap-2">
                            <CgCalendar /> Fecha y hora:{' '}
                          </span>
                          <p className="capitalize ">{classInfo.date}</p>
                        </label>
                        <span className="font-semibold underline flex items-center gap-2">
                          <FaPeopleGroup /> Estudiantes:
                        </span>
                        {classInfo.students.length ? (
                          <>
                            <div className="border border-black rounded-lg p-2 max-h-[15rem] scroll-auto">
                              {classInfo.students?.map((student, i) => {
                                return (
                                  <div key={i} className="flex p-1 gap-2">
                                    <button
                                      onClick={async () => {
                                        setIsLoading(true);
                                        await deleteStudentFromClass(
                                          student.id,
                                          classInfo.id
                                        );
                                        onClose();
                                      }}
                                      className=""
                                    >
                                      <AiFillDelete className="text-2xl" />
                                    </button>
                                    <p>
                                      {student.name} {student.lastname}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <>
                            <p>No hay estudiantes registrados en esta clase.</p>
                          </>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          className="font-bold"
                          variant="light"
                          onPress={onClose}
                        >
                          Cerrar
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
          ) : (
            <ModalContent>
              {
                //----------- VENTANA MODAL CONFIRMACIÓN DE ELIMINACIÓN DE CLASE ------------------
              }
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {!isLoading ? (
                      <p className="text-center flex gap-2 items-center justify-center">
                        <AiFillWarning /> ¿Quieres
                        <span className="font-bold underline">eliminar</span>
                        esta clase?
                        <AiFillWarning />
                      </p>
                    ) : (
                      <p className="text-center">
                        Aguarda un{' '}
                        <span className="text-[#f59b4b]">momento</span> por
                        favor...
                      </p>
                    )}
                  </ModalHeader>
                  {!isLoading ? (
                    <>
                      <ModalBody>
                        <p>
                          Ten en cuenta que esta acción{' '}
                          <span className="font-semibold text-red-600">NO</span>{' '}
                          puede deshacerse.
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="font-bold"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancelar
                        </Button>
                        <Button
                          className="font-bold bg-red-200 text-red-700"
                          onPress={async () => {
                            setIsLoading(true);
                            await deleteClassFromDashboard();
                            onClose();
                          }}
                        >
                          Eliminar clase
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
          )}
        </Modal>
      )}

      <Table
        isHeaderSticky
        className="w-[95%] max-w-[50rem] min-h-[25rem] h-[60vh]"
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
              <AiFillSetting className="text-xl" />
              <span>ACCIONES</span>
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
                <TableCell key={4} className="text-center font-bold">
                  {clase.limit}
                </TableCell>
                <TableCell
                  key={5}
                  className="text-center justify-center flex gap-2"
                >
                  <button
                    onClick={() => {
                      setShowInfo(true);
                      setDataToClassInfo(
                        clase.name,
                        clase.students,
                        clase.instructor,
                        clase.date,
                        clase.id
                      );
                      onOpen();
                    }}
                    className="dashboardClassesTableButtons"
                  >
                    <AiFillInfoCircle className="text-2xl" />
                  </button>
                  <button
                    onClick={() => {
                      setShowInfo(false);
                      setClassToDelete(clase.id);
                      onOpen();
                    }}
                    className="dashboardClassesTableButtons"
                  >
                    <AiFillDelete className="text-2xl" />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
