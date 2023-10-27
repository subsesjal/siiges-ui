import { Grid } from '@mui/material';
import {
  Select,
  ButtonStyled,
  DefaultModal,
  Input,
  LabelData,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React from 'react';

export default function CiclosEscolaresModal({ open, setOpen, type }) {
  const title = type === 'new' ? 'Agregar Ciclo Escolar' : 'Editar Ciclo Escolar';
  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <LabelData title="ID" subtitle="288" />
        </Grid>
        <Grid item xs={3}>
          <LabelData title="Programa ID" subtitle="882" />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={4}>
          <Select title="Nombre de ciclo escolar" options={[]} />
        </Grid>
        <Grid item xs={8}>
          <Input
            id="descripcion"
            label="Descripción"
            name="descripcion"
            auto="descripcion"
            onchange={() => {}}
            value=""
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <Grid item xs={2}>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={() => setOpen(false)}
          />
        </Grid>
        <Grid item xs={2}>
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={() => {
              console.log('confirmar');
            }}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

CiclosEscolaresModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
