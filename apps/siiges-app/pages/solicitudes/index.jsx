import React, { useEffect, useState } from 'react';
import { NewRequest, ChangeAddress, Refrendo } from '@siiges-ui/solicitudes';
import { Layout, Select, DataTable } from '@siiges-ui/shared';
import { Divider } from '@mui/material';

const columns = [
  { field: 'folio', headerName: 'Folio', width: 100 },
  { field: 'studyPlan', headerName: 'Plan de estudios', width: 350 },
  { field: 'status', headerName: 'Estatus', width: 120 },
  { field: 'plantel', headerName: 'Plantel', width: 370 },
  { field: 'actions', headerName: 'Acciones', width: 150 },
];

const rows = [
  {
    id: 1,
    folio: 100,
    studyPlan: 'juannieves@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
  {
    id: 2,
    folio: 101,
    studyPlan: 'cerseilannister@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
  {
    id: 3,
    folio: 102,
    studyPlan: 'jaimelannister@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
  {
    id: 4,
    folio: 103,
    studyPlan: 'aryastark@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
  {
    id: 5,
    folio: 104,
    studyPlan: 'daenerystargaryen@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
  {
    id: 6,
    folio: 105,
    studyPlan: 'melisandre@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
  {
    id: 7,
    folio: 106,
    studyPlan: 'ferraraclifford@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
  {
    id: 8,
    folio: 107,
    studyPlan: 'rossinifrances@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
  {
    id: 9,
    folio: 108,
    studyPlan: 'harveyroxie@gmail.com',
    status: 'Inactivo',
    plantel: 'Escuela',
    actions: 'iconos',
  },
];

export default function Solicitudes() {
  const [option, setOption] = useState('selectOption');

  const [NewRequestContentVisible, setNewRequestContentVisible] = useState(false);
  const [ChangeAddressContentVisible, setChangeAddressContentVisible] = useState(false);
  const [RefrendoContentVisible, setRefrendoContentVisible] = useState(false);

  useEffect(() => {
    if (option === 'new') setNewRequestContentVisible(true);
    else setNewRequestContentVisible(false);
    if (option === 'address') setChangeAddressContentVisible(true);
    else setChangeAddressContentVisible(false);
    if (option === 'refrendo') setRefrendoContentVisible(true);
    else setRefrendoContentVisible(false);
  }, [option]);

  const handleOnChange = (e) => {
    setOption(e.target.value);
  };

  const options = [
    {
      id: 'new',
      name: 'Nueva Solicitud',
    },
    {
      id: 'refrendo',
      name: 'Refrendo de plan de estudios',
    },
    {
      id: 'address',
      name: 'Cambio de domicilio',
    },
  ];
  return (
    <Layout title="Solicitudes">
      <Select
        title="Seleccione una opcion"
        options={options}
        value={option}
        onChange={handleOnChange}
      />
      {NewRequestContentVisible && (
        <>
          <Divider sx={{ mt: 2 }} />
          <NewRequest />
        </>
      )}
      {ChangeAddressContentVisible && (
        <>
          <Divider sx={{ mt: 2 }} />
          <ChangeAddress />
        </>
      )}
      {RefrendoContentVisible && (
        <>
          <Divider sx={{ mt: 2 }} />
          <Refrendo />
        </>
      )}
      <DataTable title="Tipo de solicitud" rows={rows} columns={columns} />
    </Layout>
  );
}
