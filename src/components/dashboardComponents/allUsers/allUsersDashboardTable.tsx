import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Input,
  TableRow,
  TableCell,
  Button,
  Spinner,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Pagination,
} from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { ActiveAccount } from '@/utils/types';
import { FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import {
  BsDatabaseFillAdd,
  BsFillPersonCheckFill,
  BsFillTelephoneFill,
} from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import {
  AiFillSetting,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';
import { GrSecure, GrInsecure } from 'react-icons/gr';
import { EnableOrDisableEnum } from '@/utils/types';
import {
  InfoToAddCreditsType,
  addCreditsFromDashboard,
  getAllInstructorsFunction,
} from '@/utils/utils';
import { loadInstructors } from '@/app/redux/features/instructorsAndUsersSlice';
import { FaCoins } from 'react-icons/fa6';
import { BiSolidCoinStack } from 'react-icons/bi';
import { IoSearchCircleOutline } from 'react-icons/io5';

export default function AllUsersDashboardTable() {
  //! ------------------ H O O K S -----------------------------
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [infoToAddCredits, setInfoToAddCredits] =
    React.useState<InfoToAddCreditsType>({
      name: '',
      creditsToAdd: 0,
      userId: '',
    });

  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.instructorAndUsersSlice.users);
  const plans = useAppSelector((state) => state.allPlansSlice.allPlans);
  const [filterValue, setFilterValue] = React.useState('');
  const hasSearchFilter = Boolean(filterValue);

  //! ------------------ F U N C T I O N S -----------------------------
  async function enableOrDisable(
    instructorId: string,
    action: EnableOrDisableEnum
  ) {
    // setIsLoading(true);
    // const { message, error } = await enableOrDisableInstructor(
    //   instructorId,
    //   action
    // );
    // if (error) {
    //   toast.error(error);
    //   return setIsLoading(false);
    // }
    // if (message) {
    //   getInstructorsAfterEnableOrDisable();
    //   toast.success(message);
    //   return setIsLoading(false);
    // }
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
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) => {
        const userName = user.name + ' ' + user.lastname;
        return userName.toLowerCase().includes(filterValue.toLowerCase());
      });
    }
    return filteredUsers;
  }, [users, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const topContent = React.useMemo(() => {
    return (
      <Input
        isClearable
        className="w-full sm:max-w-[30%] "
        placeholder="Buscar usuario"
        startContent={<IoSearchCircleOutline className="registerIcons" />}
        value={filterValue}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      />
    );
  }, [filterValue, onSearchChange, onClear]);
  return (
    <>
      {
        //? ---------------- VENTANA MODAL PARA AGREGAR CRÉDITOS --------------------------
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="bg-gray-200"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center gap-2">
                  <BsDatabaseFillAdd /> Agregar créditos a
                  <span className="capitalize text-[#e28d43]">
                    {infoToAddCredits.name}
                  </span>
                </ModalHeader>
                <ModalBody>
                  <p>
                    Selecciona un{' '}
                    <span className="text-[#f59b4b] font-semibold">plan</span>{' '}
                    para asignar créditos al usuario:
                  </p>
                  <Select
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      setInfoToAddCredits({
                        ...infoToAddCredits,
                        creditsToAdd: parseInt(event.target.value),
                      });
                    }}
                    aria-label="select-plans"
                    placeholder="Selecciona un plan"
                    className="bg-gray-200"
                  >
                    {plans?.map((plan, i) => {
                      const credits = plan.credits;
                      return (
                        <SelectItem
                          startContent={
                            <BiSolidCoinStack className="text-lg" />
                          }
                          key={credits}
                          textValue={plan.name}
                        >
                          <span className="font-semibold">{plan.name}</span> (
                          {credits} créditos)
                        </SelectItem>
                      );
                    })}
                  </Select>

                  <p className="text-tiny font-light text-red-800">
                    Asegurate de que sea el usuario correcto, no podrás deshacer
                    esta acción.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button className="font-semibold" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    className="font-semibold"
                    color="success"
                    isDisabled={isLoading}
                    onPress={async () => {
                      setIsLoading(true);
                      const { data, error } = await addCreditsFromDashboard(
                        infoToAddCredits
                      );

                      if (data) {
                        toast.success(
                          'Se han agregado los créditos al usuario.'
                        );
                        onClose();
                        setIsLoading(false);
                      }
                      if (error) {
                        toast.error(error);
                        onClose();
                        setIsLoading(false);
                      }
                    }}
                  >
                    {!isLoading ? (
                      <>
                        <BsDatabaseFillAdd className="text-xl" /> Agregar
                        créditos
                      </>
                    ) : (
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    )}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      }
      <Table
        topContent={topContent}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="warning"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        isHeaderSticky
        className="w-[95%] max-w-[50rem] min-h-[26rem] h-[70vh]"
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
            <div className="columnName">
              <BsFillTelephoneFill className="text-xl" />
              <span>CELULAR</span>
            </div>
          </TableColumn>

          <TableColumn>
            <div className="columnName text-center">
              <FaCoins className="text-xl" />
              <span>CRÉDITOS</span>
            </div>
          </TableColumn>

          <TableColumn>
            <div className="columnName text-center">
              <BsFillPersonCheckFill className="text-xl" />
              <span>HABILITADO</span>
            </div>
          </TableColumn>

          <TableColumn>
            <div className=" columnName justify-center text-center">
              <AiFillSetting className="text-xl" />
              <span>ACCIONES</span>
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          loadingContent={<Spinner />}
          emptyContent={'No hay usuarios registrados.'}
        >
          {items?.map((user, i) => {
            return (
              <TableRow key={i}>
                <TableCell key={1} className="capitalize">
                  {user.name} {user.lastname}
                </TableCell>

                <TableCell key={2}>{user.email}</TableCell>

                <TableCell key={3} className="text-center">
                  {user.phone}
                </TableCell>

                <TableCell key={4} className="text-center">
                  {user.remaining_classes}
                </TableCell>

                {user.active === ActiveAccount.ACTIVE ? (
                  <TableCell
                    key={5}
                    className="text-3xl  text-green-600 font-semibold "
                  >
                    <AiOutlineCheckCircle />
                  </TableCell>
                ) : (
                  <TableCell
                    key={5}
                    className="text-red-600  text-3xl font-semibold rounded-lg text-center"
                  >
                    <AiOutlineCloseCircle />
                  </TableCell>
                )}

                <TableCell
                  key={6}
                  className="text-center flex gap-2 transition-all"
                >
                  {user.active === ActiveAccount.INACTIVE ? (
                    <Button
                      size="sm"
                      isDisabled={isLoading}
                      onPress={() => {
                        enableOrDisable(user.id, EnableOrDisableEnum.ENABLE);
                      }}
                      className="h-7 rounded-full bg-green-200 font-semibold"
                      startContent={<GrInsecure className="text-xl" />}
                    ></Button>
                  ) : (
                    <Button
                      size="sm"
                      isDisabled={isLoading}
                      onPress={() => {
                        enableOrDisable(user.id, EnableOrDisableEnum.DISABLE);
                      }}
                      className="h-7 w-7 rounded-full bg-red-200 font-semibold"
                      startContent={<GrSecure className="text-xl" />}
                    ></Button>
                  )}
                  <Button
                    size="sm"
                    isDisabled={user.remaining_classes ? true : false}
                    onPress={() => {
                      setInfoToAddCredits({
                        ...infoToAddCredits,
                        userId: user.id,
                        name: user.name + ' ' + user.lastname,
                      });
                      onOpen();
                    }}
                    className=" h-7 rounded-full bg-green-200 font-semibold "
                    startContent={<BsDatabaseFillAdd className="text-xl" />}
                  ></Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
