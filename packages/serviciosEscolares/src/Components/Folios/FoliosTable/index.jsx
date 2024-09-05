import { Grid, IconButton } from '@mui/material';
import { Context, DataTable } from '@siiges-ui/shared';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import PropTypes from 'prop-types';

const columns = (handleEdit, handleConsultar) => [
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
    renderCell: (params) => (
      <>
        <IconButton onClick={() => handleConsultar(params.row.id)}>
          <ArticleIcon />
        </IconButton>
        {params.row.estatusSolicitudFolioNombre !== 'REVISION' && (
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
        )}
      </>
    ),
  },
];

function FoliosTable({
  tipoDocumento,
  tipoSolicitud,
  programa,
  plantel,
  solicitudes,
}) {
  const router = useRouter();
  const { setNoti } = useContext(Context);

  const navigateTo = (id, status) => {
    const routeBase = tipoDocumento === 1 ? 'titulos' : 'certificados';

    if (tipoDocumento === 1 || tipoDocumento === 2) {
      router.push({
        pathname: `/serviciosEscolares/solicitudesFolios/${id}/${routeBase}`,
        query: {
          tipoDocumento, tipoSolicitud, programa, status,
        },
      }, `/serviciosEscolares/solicitudesFolios/${id}/${routeBase}`);
    } else {
      setNoti({
        open: true,
        message: '¡Error, revise que todos los campos estén seleccionados correctamente!',
        type: 'error',
      });
    }
  };

  const handleEdit = (id) => navigateTo(id, 'edit');
  const handleConsultar = (id) => navigateTo(id, 'consult');

  const formattedSolicitudes = solicitudes.map((solicitud) => ({
    ...solicitud,
    programaNombre: solicitud.programa.nombre,
    estatusSolicitudFolioNombre: solicitud.estatusSolicitudFolio.nombre,
    plantel,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonClick={() => navigateTo(null, 'create')}
          buttonText="Agregar Solicitud"
          title="Solicitudes de Títulos"
          rows={formattedSolicitudes}
          columns={columns(handleEdit, handleConsultar)}
        />
      </Grid>
    </Grid>
  );
}

FoliosTable.propTypes = {
  tipoDocumento: PropTypes.number.isRequired,
  tipoSolicitud: PropTypes.string.isRequired,
  programa: PropTypes.string.isRequired,
  plantel: PropTypes.string.isRequired,
  solicitudes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      folioSolicitud: PropTypes.string.isRequired,
      programa: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
      }).isRequired,
      estatusSolicitudFolio: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default FoliosTable;
