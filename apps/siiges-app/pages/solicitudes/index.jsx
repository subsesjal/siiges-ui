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
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Divider, IconButton } from '@mui/material';
import Link from 'next/link';

const columns = [
  { field: 'folio', headerName: 'Folio', width: 125 },
  { field: 'studyPlan', headerName: 'Plan de estudios', width: 180 },
  { field: 'estatusSolicitudId', headerName: 'Estatus', width: 200 },
  { field: 'plantel', headerName: 'Plantel', width: 450 },
  {
    field: 'actions',
    headerName: 'Acciones',
    renderCell: (params) => (
      <Link href={`/solicitudes/detallesSolicitudes/${params.id}`}>
        <IconButton aria-label="consultar">
          <ListAltIcon />
        </IconButton>
      </Link>
    ),
  },
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
      const formattedRows = solicitudes.map((solicitud) => ({
        id: solicitud.id,
        folio: solicitud.folio,
        studyPlan: solicitud.programa.nombre,
        estatusSolicitudId: solicitud.estatusSolicitud.nombre,
        plantel: `${solicitud.programa.plantel.domicilio.calle} #${solicitud.programa.plantel.domicilio.numeroExterior}`,
        actions: 'Actions Placeholder',
      }));

      setRows(formattedRows);
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
      {newSolicitud && (
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
