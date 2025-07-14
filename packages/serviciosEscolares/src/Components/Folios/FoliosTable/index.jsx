import Tooltip from '@mui/material/Tooltip';
import { Grid, IconButton } from '@mui/material';
import { Context, DataTable } from '@siiges-ui/shared';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
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
        <Tooltip title="Consultar" placement="top">
          <IconButton onClick={() => handleConsultar(params.row.id)}>
            <VisibilityOutlinedIcon />
          </IconButton>
        </Tooltip>
        {(params.row.estatusSolicitudFolioNombre === 'EN CAPTURA'
          || params.row.estatusSolicitudFolioNombre === 'ATENDER OBSERVACIONES') && (
            <Tooltip title="Editar" placement="top">
              <IconButton onClick={() => handleEdit(params.row.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
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

  const showCrearFolio = process.env.NEXT_PUBLIC_SHOW_CREAR_FOLIO !== 'false';

  const navigateTo = (id, status) => {
    const routeBase = tipoDocumento === 1 ? 'titulos' : 'certificados';
    const path = status === 'create' ? `/serviciosEscolares/solicitudesFolios/createFolio/${routeBase}` : `/serviciosEscolares/solicitudesFolios/${id}/${routeBase}`;

    if (tipoDocumento === 1 || tipoDocumento === 2) {
      router.push({
        pathname: path,
        query: {
          tipoDocumento, tipoSolicitud, programa, status,
        },
      }, path);
    } else {
      setNoti({
        open: true,
        message:
          '¡Error, revise que todos los campos estén seleccionados correctamente!',
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
          buttonAdd={showCrearFolio}
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
  tipoSolicitud: PropTypes.number.isRequired,
  programa: PropTypes.number.isRequired,
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
