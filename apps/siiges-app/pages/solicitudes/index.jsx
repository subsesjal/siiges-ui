import React, { useContext, useEffect, useState } from 'react';
import {
  NewRequest,
  ChangeAddress,
  Refrendo,
  getSolicitudes,
} from '@siiges-ui/solicitudes';
import {
  Layout, Select, DataTable, Context,
} from '@siiges-ui/shared';
import { Divider } from '@mui/material';

const columns = [
  { field: 'folio', headerName: 'Folio', width: 125 },
  { field: 'studyPlan', headerName: 'Plan de estudios', width: 350 },
  { field: 'estatusSolicitudId', headerName: 'Estatus', width: 120 },
  { field: 'plantel', headerName: 'Plantel', width: 345 },
  { field: 'actions', headerName: 'Acciones', width: 150 },
];

export default function Solicitudes() {
  const { session } = useContext(Context);
  const [newSolicitud, setNewSolicitud] = useState(false);
  const [option, setOption] = useState();
  const [NewRequestContentVisible, setNewRequestContentVisible] = useState(false);
  const [ChangeAddressContentVisible, setChangeAddressContentVisible] = useState(false);
  const [RefrendoContentVisible, setRefrendoContentVisible] = useState(false);
  const [rows, setRows] = useState([]);
  const { solicitudes } = getSolicitudes();

  useEffect(() => {
    if (solicitudes !== undefined && solicitudes !== null) {
      setRows(solicitudes);
    }
  }, [solicitudes]);

  useEffect(() => {
    if (session.rol !== 'admin') {
      setNewSolicitud(true);
    }
  }, [session]);

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
      {newSolicitud
        && (
        <Select
          title="Seleccione una opcion"
          name="options"
          options={options}
          value=""
          onchange={handleOnChange}
        />
        )}
      <Divider sx={{ mt: 2 }} />
      {NewRequestContentVisible && <NewRequest />}
      {ChangeAddressContentVisible && <ChangeAddress />}
      {RefrendoContentVisible && <Refrendo />}
      <DataTable title="Tipo de solicitud" rows={rows} columns={columns} />
    </Layout>
  );
}
