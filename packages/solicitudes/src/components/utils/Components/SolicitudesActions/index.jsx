import { Grid, IconButton, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonsForm, Context, DefaultModal } from '@siiges-ui/shared';

function SolicitudesActions({ id, estatus }) {
  const { session, setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (session.rol === 'representante') {
      if (estatus === 1 || estatus === 200) {
        setShowButtons(true);
      }
    } else {
      setShowButtons(true);
    }
  }, [session.rol]);

  const handleDelete = () => {
    setOpen(false);
    setNoti({
      open: true,
      message: `Funcionalidad pendiente, intento eliminar solicitud: ${id}`,
      type: 'error',
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Link href={`/solicitudes/detallesSolicitudes/${id}`}>
            <IconButton aria-label="consultar">
              <ListAltIcon />
            </IconButton>
          </Link>
        </Grid>
        {showButtons && (
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
              <IconButton
                aria-label="eliminar"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
      <DefaultModal title="Eliminar solicitud" open={open} setOpen={setOpen}>
        <Typography>
          ¿Esta seguro que quiere eliminar esta solicitud?
        </Typography>
        <ButtonsForm
          cancel={() => {
            setOpen(false);
          }}
          confirm={handleDelete}
        />
      </DefaultModal>
    </>
  );
}

SolicitudesActions.propTypes = {
  id: PropTypes.number.isRequired,
  estatus: PropTypes.number.isRequired,
};

export default SolicitudesActions;
