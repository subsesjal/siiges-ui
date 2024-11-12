import { Grid, IconButton } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    hide: true,
  },
  { field: 'folioSolicitud', headerName: 'Folio de captura', width: 150 },
  { field: 'programaNombre', headerName: 'Plan de estudios', width: 250 },
  { field: 'estatusSolicitudFolioNombre', headerName: 'Estatus', width: 250 },
  { field: 'plantelNombre', headerName: 'Plantel', width: 300 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => {
      const router = useRouter();

      const handleAddClick = () => {
        router.push(
          `/serviciosEscolares/solicitudesFolios/admin/${params.id}/folios`,
        );
      };

      let IconComponent = ArticleIcon;
      if (params.row.estatusSolicitudFolioId === 2) {
        IconComponent = HourglassEmptyIcon;
      } else if (params.row.estatusSolicitudFolioId === 3) {
        IconComponent = CheckCircleIcon;
      }

      return (
        <IconButton onClick={handleAddClick}>
          <IconComponent />
        </IconButton>
      );
    },
  },
];

export default function AdminTable({
  tipoDocumento,
  tipoSolicitud,
  estatus,
  programa,
  plantel,
  solicitudes,
}) {
  const mappedSolicitudes = solicitudes
    .filter((solicitud) => solicitud.estatusSolicitudFolioId !== 1)
    .map((solicitud) => ({
      id: solicitud.id,
      folioSolicitud: solicitud.folioSolicitud,
      programaId: solicitud.programa.id,
      tipoDocumentoId: solicitud.tipoDocumentoId,
      tipoSolicitudFolioId: solicitud.tipoSolicitudFolioId,
      estatusSolicitudFolioId: solicitud.estatusSolicitudFolioId,
      programaNombre: solicitud.programa ? solicitud.programa.nombre : '',
      estatusSolicitudFolioNombre: solicitud.estatusSolicitudFolio
        ? solicitud.estatusSolicitudFolio.nombre
        : '',
      plantelNombre: solicitud.programa.plantel
        ? `${solicitud.programa.plantel.domicilio.calle} ${solicitud.programa.plantel.domicilio.numeroExterior}`
        : '',
    }));

  const filteredSolicitudes = mappedSolicitudes.filter((solicitud) => {
    const matchesTipoDocumento = !tipoDocumento || solicitud.tipoDocumentoId === tipoDocumento;
    const matchesTipoSolicitud = !tipoSolicitud || solicitud.tipoSolicitudFolioId === tipoSolicitud;
    const matchesEstatus = !estatus.length || estatus.includes(solicitud.estatusSolicitudFolioId);
    const matchesPrograma = !programa || solicitud.programaId === programa;
    const matchesPlantel = !plantel || solicitud.plantelNombre === plantel;

    return (
      matchesTipoDocumento
      && matchesTipoSolicitud
      && matchesEstatus
      && matchesPrograma
      && matchesPlantel
    );
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          title="Solicitudes de Folios"
          rows={filteredSolicitudes}
          columns={columns}
        />
      </Grid>
    </Grid>
  );
}

AdminTable.propTypes = {
  tipoDocumento: PropTypes.string,
  tipoSolicitud: PropTypes.string,
  estatus: PropTypes.arrayOf(PropTypes.string),
  programa: PropTypes.string,
  plantel: PropTypes.string,
  solicitudes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      folioSolicitud: PropTypes.string,
      programaNombre: PropTypes.string,
      estatusSolicitudFolioNombre: PropTypes.string,
      plantelNombre: PropTypes.string,
    }),
  ).isRequired,
};

AdminTable.defaultProps = {
  tipoDocumento: null,
  tipoSolicitud: null,
  estatus: [],
  programa: null,
  plantel: null,
};
