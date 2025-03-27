import React, { useContext } from 'react';
import { Context, DataTable } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import SolicitudesServSocTableButtons from '../utils/SolicitudesServSocTableButtons';
import { handleCreateClick } from '../utils';

export default function SolicitudServSocTable({
  solicitudes, programa, institucion, setSolicitudes,
}) {
  const { loading, session } = useContext(Context);
  const router = useRouter();
  const isIes = session.rol === 'serv_soc_ies';
  const isAdmin = session.rol === 'admin';

  const onDeleteSuccess = (id) => {
    setSolicitudes((prevSolicitudes) => prevSolicitudes.filter((solicitud) => solicitud.id !== id));
  };

  const columns = [
    { field: 'folioSolicitud', headerName: 'Folio de solicitud', width: 200 },
    { field: 'programa', headerName: 'Programa', width: 200 },
    { field: 'estatusSolicitudServicioSocial', headerName: 'Estatus', width: 250 },
    { field: 'createdAt', headerName: 'Fecha de solicitud', width: 250 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <SolicitudesServSocTableButtons
          id={params.row.id}
          programa={programa}
          institucion={institucion}
          estatusSolicitudId={params.row.estatusSolicitudServicioSocial.nombre}
          router={router}
          isAdmin={isAdmin}
          onDeleteSuccess={onDeleteSuccess}
        />
      ),
    },
  ];

  return (
    <DataTable
      title="Lista de solicitudes de Servicio Social"
      rows={solicitudes || []}
      columns={columns}
      loading={loading}
      buttonAdd={isIes}
      buttonText="Agregar Solicitud"
      buttonClick={() => handleCreateClick({ programa, institucion }, router)}
    />
  );
}

SolicitudServSocTable.propTypes = {
  setSolicitudes: PropTypes.func.isRequired,
  solicitudes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      folioSolicitud: PropTypes.string.isRequired,
      programaId: PropTypes.number.isRequired,
      estatusSolicitudServicioSocial: PropTypes.string.isRequired,
      fechaSolicitud: PropTypes.string.isRequired,
    }),
  ).isRequired,
  programa: PropTypes.number.isRequired,
  institucion: PropTypes.number.isRequired,
};
