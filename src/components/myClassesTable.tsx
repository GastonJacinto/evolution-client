/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from '@nextui-org/react';
import { getAllClasses } from '@/app/api/actions/getClasses';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';

type LoadingState =
  | 'loading'
  | 'sorting'
  | 'loadingMore'
  | 'error'
  | 'idle'
  | 'filtering';

const MyClassesTable = () => {
  //!-----------HOOKS-------------
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.myProfileSlice.myProfile);
  const [isLoading, setIsLoading] = React.useState(false);

  //!-----------FUNCTIONS-----------
  //!--------------VARIABLES----------------
  const fechaActual = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };
  const columns = [
    {
      key: 'name',
      label: 'CLASE',
    },
    {
      key: 'date',
      label: 'FECHA Y HORA',
    },

    {
      key: 'instructor',
      label: 'INSTRUCTOR/A',
    },
    { key: 'actions', label: 'ACCIONES' },
  ];
  return (
    <Table
      isStriped
      aria-label="table-classes"
      className="w-[95%] max-w-[50rem]"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody
        items={userProfile.classes}
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando..." />}
        emptyContent={'No hay clases registradas.'}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MyClassesTable;
