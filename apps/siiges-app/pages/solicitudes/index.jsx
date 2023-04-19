import React, { useEffect, useState } from 'react';
import {
  NewRequest,
  ChangeAddress,
  Refrendo,
  getSolicitudes,
} from '@siiges-ui/solicitudes';
import { Layout, Select, DataTable } from '@siiges-ui/shared';
import { Divider } from '@mui/material';

const columns = [
  { field: 'folio', headerName: 'Folio', width: 100 },
  { field: 'studyPlan', headerName: 'Plan de estudios', width: 350 },
  { field: 'estatusSolicitudId', headerName: 'Estatus', width: 120 },
  { field: 'plantel', headerName: 'Plantel', width: 370 },
  { field: 'actions', headerName: 'Acciones', width: 150 },
];

export default function Solicitudes() {
  const [option, setOption] = useState();
  const [NewRequestContentVisible, setNewRequestContentVisible] = useState(false);
  const [ChangeAddressContentVisible, setChangeAddressContentVisible] = useState(false);
  const [RefrendoContentVisible, setRefrendoContentVisible] = useState(false);
  const [rows, setRows] = useState({});
  const { solicitudes, loading } = getSolicitudes();

  useEffect(() => {
    if (loading !== false) {
      setRows(solicitudes);
    }
  }, [loading]);

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
      nombre: 'Nueva Solicitud',
    },
    {
      id: 'refrendo',
      nombre: 'Refrendo de plan de estudios',
    },
    {
      id: 'address',
      nombre: 'Cambio de domicilio',
    },
  ];

  return (
    <Layout title="Solicitudes">
      <Select
        title="Seleccione una opcion"
        options={options}
        value={option}
        onchange={handleOnChange}
      />
      <Divider sx={{ mt: 2 }} />
      {NewRequestContentVisible && <NewRequest />}
      {ChangeAddressContentVisible && <ChangeAddress />}
      {RefrendoContentVisible && <Refrendo />}
      <DataTable title="Tipo de solicitud" rows={rows} columns={columns} />
    </Layout>
  );
}
