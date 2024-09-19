import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GradingIcon from '@mui/icons-material/Grading';
import {
  ButtonsForm,
  Context,
  DefaultModal,
  Input,
  updateRecord,
} from '@siiges-ui/shared';
import Link from 'next/link';

export default function BotonesInpeccion({ id, solicitudId }) {
  const { setLoading, setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    const endpoint = `/solicitudes/${solicitudId}`;
    const data = {
      estatusSolicitudId: 8,
    };
    try {
      const result = await updateRecord({ data, endpoint });
      if (result?.statusCode === 200) {
        setNoti({
          open: true,
          message: '¡Se completó la inspección exitosamente!',
          type: 'success',
        });
        setLoading(false);
        setOpen(false);
      } else {
        throw new Error('Error al completar la inspección');
      }
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || '¡Hubo un error al completar la inspección!',
        type: 'error',
      });
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <IconButton
            aria-label="Acta de cierre"
            onClick={() => {
              setOpen(true);
            }}
          >
            <PostAddIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <Link href={`/inspecciones/misInspecciones/${id}/nuevaInspeccion`}>
            <IconButton aria-label="Acta de cierre">
              <GradingIcon />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
      <DefaultModal title="Acta de cierre" open={open} setOpen={setOpen}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              id="observaciones"
              label="Observaciones"
              name="observaciones"
              multiline
              rows={4}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm
              cancel={() => {
                setOpen(false);
              }}
              confirm={handleSubmit}
            />
          </Grid>
        </Grid>
      </DefaultModal>
    </>
  );
}

BotonesInpeccion.propTypes = {
  id: PropTypes.number.isRequired,
  solicitudId: PropTypes.number.isRequired,
};
