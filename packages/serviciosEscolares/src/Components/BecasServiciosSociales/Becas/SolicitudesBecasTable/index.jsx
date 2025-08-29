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
  const isBecasSicyt = session.rol === 'becas_sicyt' || session.rol === 'admin';

  const fetchData = async () => {
    setLoading(true);
    fetchSolicitudesData(setNoti, setLoading, (fetchedData) => {
      const fetchedDataFiltered = fetchedData.filter((beca) => beca.programaId === programa);
      if (isBecasSicyt) {
        const filtered = fetchedDataFiltered.filter(
          (item) => item.estatusSolicitudBecaId !== 'EN CAPTURA',
        );
        setData(filtered);
      } else {
        setData(fetchedDataFiltered);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [session.rol]);

  const onDeleteSuccess = () => {
    fetchData();
  };

  const columns = [
    { field: 'folioSolicitud', headerName: 'Folio de solicitud', width: 180 },
    { field: 'programa', headerName: 'Programa', width: 260 },
    { field: 'cicloEscolarId', headerName: 'Ciclo Escolar', width: 120 },
    { field: 'estatusSolicitudBecaId', headerName: 'Estatus', width: 150 },
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
          onDeleteSuccess={onDeleteSuccess}
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
