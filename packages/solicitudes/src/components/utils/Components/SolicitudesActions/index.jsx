import { Grid, IconButton } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SolicitudesActions({ id, estatus }) {
  const showEditDeleteButtons = estatus === 1 || estatus === 200;
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Link href={`/solicitudes/detallesSolicitudes/${id}`}>
          <IconButton aria-label="consultar">
            <ListAltIcon />
          </IconButton>
        </Link>
      </Grid>
      {showEditDeleteButtons && (
        <>
          <Grid item xs={4}>
            <Link
              href={`/solicitudes/detallesSolicitudes/${id}/editarSolicitud`}
            >
              <IconButton aria-label="editar">
                <EditIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <IconButton aria-label="eliminar">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  );
}

SolicitudesActions.propTypes = {
  id: PropTypes.number.isRequired,
  estatus: PropTypes.number.isRequired,
};

export default SolicitudesActions;
