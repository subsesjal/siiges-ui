import React, { useState, useEffect, useContext } from 'react';
import { Context, DataTable } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  handleCreateClick, fetchSolicitudesData,
} from '../utils';
import SolicitudesBecasTableButtons from '../utils/SolicitudesBecasTableButtons';

export default function SolicitudesBecasTable({ programa, institucion }) {
  const {
    loading, setLoading, setNoti, session,
  } = useContext(Context);
  const [data, setData] = useState([]);
  const router = useRouter();
  const isBecasSicyt = session.rol === 'becas_sicyt';

  useEffect(() => {
    setLoading(true);
    fetchSolicitudesData(setNoti, setLoading, (fetchedData) => {
      setData(fetchedData);

      if (isBecasSicyt) {
        const filtered = fetchedData.filter(
          (item) => item.estatusSolicitudBecaId !== 'EN CAPTURA',
        );
        setData(filtered);
      } else {
        setData(fetchedData);
      }
    });
  }, [session.rol]);

  const columns = [
    { field: 'folioSolicitud', headerName: 'Folio de solicitud', width: 200 },
    { field: 'programa', headerName: 'Programa', width: 200 },
    { field: 'cicloEscolarId', headerName: 'Ciclo Escolar', width: 150 },
    { field: 'estatusSolicitudBecaId', headerName: 'Estatus', width: 250 },
    { field: 'createdAt', headerName: 'Fecha de solicitud', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <SolicitudesBecasTableButtons
          id={params.row.id}
          programa={programa}
          institucion={institucion}
          estatusSolicitudBecaId={params.row.estatusSolicitudBecaId}
          router={router}
          isBecasSicyt={isBecasSicyt}
        />
      ),
    },
  ];

  return (
    <div>
      <DataTable
        title="Lista de Solicitudes de Becas"
        rows={data || []}
        columns={columns}
        loading={loading}
        buttonAdd={!isBecasSicyt}
        buttonText="Agregar Solicitud"
        buttonClick={() => handleCreateClick({ programa, institucion }, router)}
      />
    </div>
  );
}

SolicitudesBecasTable.propTypes = {
  programa: PropTypes.number.isRequired,
  institucion: PropTypes.number.isRequired,
};
