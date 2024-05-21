import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
  ButtonsForm,
  Context,
  DefaultModal,
  Input,
  createRecord,
} from '@siiges-ui/shared';

export default function ActaCierre({ id }) {
  const { setLoading, setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [observaciones, setObservaciones] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    const data = { id, observaciones };
    const endpoint = '/your-endpoint';
    createRecord({ data, endpoint })
      .then((response) => {
        console.log('Record created:', response);
        setNoti({
          open: true,
          message: 'Acta generada con exito',
          type: 'success',
        });
        setOpen(false);
        setLoading(false);
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `Error al generar el acta: ${error}`,
          type: 'error',
        });
        setLoading(false);
      });
  };

  return (
    <>
      <IconButton
        aria-label="Acta de cierre"
        onClick={() => {
          setOpen(true);
        }}
      >
        <PostAddIcon />
      </IconButton>
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

ActaCierre.propTypes = {
  id: PropTypes.number.isRequired,
};
