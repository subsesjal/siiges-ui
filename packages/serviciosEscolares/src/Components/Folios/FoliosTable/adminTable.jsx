import { Grid, IconButton } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
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
  { field: 'programaNombre', headerName: 'Plan de estudios', width: 350 },
  { field: 'estatusSolicitudFolioNombre', headerName: 'Estatus', width: 150 },
  { field: 'plantel', headerName: 'Plantel', width: 300 },
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

      return (
        <>
          <IconButton onClick={handleAddClick}>
            <ArticleIcon />
          </IconButton>
          <IconButton>
            <CancelIcon />
          </IconButton>
          <IconButton>
            <SendIcon />
          </IconButton>
        </>
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
  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    const matchesTipoDocumento = !tipoDocumento || solicitud.tipoDocumentoId === tipoDocumento;
    const matchesTipoSolicitud = !tipoSolicitud || solicitud.tipoSolicitudFolioId === tipoSolicitud;
    const matchesEstatus = !estatus.length
    || estatus.includes(solicitud.estatusSolicitudFolioNombre);
    const matchesPrograma = !programa || solicitud.programaNombre === programa;
    const matchesPlantel = !plantel || solicitud.plantel === plantel;

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
      id: PropTypes.number.isRequired,
      folioSolicitud: PropTypes.string.isRequired,
      programaNombre: PropTypes.string.isRequired,
      estatusSolicitudFolioNombre: PropTypes.string.isRequired,
      plantel: PropTypes.string.isRequired,
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
