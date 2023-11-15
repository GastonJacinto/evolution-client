import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { ActiveAccount } from '@/utils/types';
import { FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { BsFillPersonCheckFill, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import {
  AiFillSetting,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import { GrSecure, GrInsecure } from 'react-icons/gr';
import { enableOrDisableInstructor } from '@/app/api/actions/enableOrDisableInstructor';
import { EnableOrDisableEnum } from '@/utils/types';
import { getAllInstructorsFunction } from '@/utils/utils';
import { loadInstructors } from '@/app/redux/features/instructorsAndUsersSlice';

export default function AllInstructorsDashboardTable() {
  //! ------------------ H O O K S -----------------------------
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const instructors = useAppSelector(
    (state) => state.instructorAndUsersSlice.instructors
  );
  //! ------------------ F U N C T I O N S -----------------------------
  async function enableOrDisable(
    instructorId: string,
    action: EnableOrDisableEnum
  ) {
    setIsLoading(true);
    const { message, error } = await enableOrDisableInstructor(
      instructorId,
      action
    );
    if (error) {
      toast.error(error);
      return setIsLoading(false);
    }
    if (message) {
      getInstructorsAfterEnableOrDisable();
      toast.success(message);
      return setIsLoading(false);
    }
  }
  async function getInstructorsAfterEnableOrDisable() {
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
  //! ------------------ C O N S T A N T S -----------------------------
  return (
    <>
      <Table
        isHeaderSticky
        className="w-[95%] max-w-[50rem] min-h-[25rem] h-[60vh]"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>
            <div className="columnName">
              <FaUserCircle className="text-xl" />
              <span>NOMBRE COMPLETO</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="columnName ">
              <MdEmail className="text-xl" />
              <span>EMAIL</span>
            </div>
          </TableColumn>
          <TableColumn>
            {' '}
            <div className="columnName">
              <BsFillTelephoneFill className="text-xl" />
              <span>CELULAR</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="columnName text-center">
              <BsFillPersonCheckFill className="text-xl" />
              <span>HABILITADO</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className=" columnName text-center">
              <AiFillSetting className="text-xl" />
              <span>ACCIONES</span>
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody
          loadingContent={<Spinner />}
          emptyContent={'No hay instructores/as registrados/as.'}
        >
          {instructors?.map((instructor, i) => {
            return (
              <TableRow key={i}>
                <TableCell key={1} className="capitalize">
                  {instructor.name} {instructor.lastname}
                </TableCell>
                <TableCell key={2}>{instructor.email}</TableCell>

                <TableCell key={3} className="text-center">
                  {instructor.phone}
                </TableCell>
                {instructor.active === ActiveAccount.ACTIVE ? (
                  <TableCell
                    key={4}
                    className="text-3xl flex justify-center items-center text-green-600 text-center font-semibold"
                  >
                    <AiOutlineCheckCircle />
                  </TableCell>
                ) : (
                  <TableCell
                    key={4}
                    className="text-red-600 flex justify-center items-center text-3xl font-semibold rounded-lg text-center"
                  >
                    <AiOutlineCloseCircle />
                  </TableCell>
                )}
                {instructor.active === ActiveAccount.INACTIVE ? (
                  <TableCell key={5} className="text-center ">
                    <Button
                      isDisabled={isLoading}
                      onPress={() => {
                        enableOrDisable(
                          instructor.id,
                          EnableOrDisableEnum.ENABLE
                        );
                      }}
                      className="h-7 bg-green-200 font-semibold"
                      startContent={<GrInsecure />}
                    >
                      HABILITAR
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell key={5} className="text-center">
                    <Button
                      isDisabled={isLoading}
                      onPress={() => {
                        enableOrDisable(
                          instructor.id,
                          EnableOrDisableEnum.DISABLE
                        );
                      }}
                      className="h-7 bg-red-200 font-semibold"
                      startContent={<GrSecure />}
                    >
                      DESHABILITAR
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
