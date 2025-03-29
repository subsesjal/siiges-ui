import React, { useContext, useEffect, useState } from 'react';
import {
  NewRequest,
  ChangeAddress,
  Refrendo,
  getSolicitudes,
  columnsSolicitudes,
} from '@siiges-ui/solicitudes';
import {
  Layout, Select, DataTable, Context,
} from '@siiges-ui/shared';
import { Divider } from '@mui/material';

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
      let filteredSolicitudes;

      if (session.rol === 'control_documental') {
        filteredSolicitudes = solicitudes.filter(
          (solicitud) => [2, 3].includes(solicitud.estatusSolicitudId),
        );
      } else if (session.rol === 'sicyt_editar') {
        filteredSolicitudes = solicitudes.filter(
          (solicitud) => solicitud.estatusSolicitudId === 8,
        );
      } else {
        filteredSolicitudes = solicitudes;
      }
      const formattedRows = filteredSolicitudes.map((solicitud) => ({
        id: solicitud.id,
        estatus: solicitud.estatusSolicitudId,
        folio: solicitud.folio,
        studyPlan: solicitud.programa?.nombre,
        estatusSolicitudId: solicitud.estatusSolicitud?.nombre,
        plantel: `${solicitud.programa?.plantel?.domicilio?.calle} #${solicitud.programa?.plantel?.domicilio?.numeroExterior}`,
        actions: 'Actions Placeholder',
      }));

      setRows(formattedRows);
    }
  }, [solicitudes, session.rol]);

  useEffect(() => {
    if (session.rol === 'representante') {
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
          title="Seleccione una opción"
          name="options"
          options={options}
          value=""
          onChange={handleOnChange}
        />
      )}
      <Divider sx={{ mt: 2 }} />
      {NewRequestContentVisible && <NewRequest />}
      {ChangeAddressContentVisible && <ChangeAddress />}
      {RefrendoContentVisible && <Refrendo />}
      <DataTable
        title="Tipo de solicitud"
        rows={rows}
        columns={columnsSolicitudes}
      />
    </Layout>
  );
}
