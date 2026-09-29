import { Grid, TextField } from '@mui/material';
import {
  DefaultModal, ButtonsForm, createRecord, useUI,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function ModalCatalogoCicloEscolar({ open, setOpen, onSuccess }) {
  const { setNoti } = useUI();
  const [form, setForm] = useState({ nombre: '', descripcion: '' });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nombre') {
      setForm({ ...form, nombre: value.toUpperCase() });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleConfirm = async () => {
    if (!form.nombre) {
      setNoti({
        open: true,
        message: 'El nombre es obligatorio',
        type: 'error',
      });
      return;
    }

    const { statusCode, errorMessage } = await createRecord({
      endpoint: '/ciclosEscolares/catalogo',
      data: form,
    });

    if (statusCode !== 201) {
      setNoti({
        open: true,
        message: errorMessage || 'Error al crear el ciclo escolar',
        type: 'error',
      });
      return;
    }

    setNoti({ open: true, message: 'Ciclo escolar creado exitosamente.', type: 'success' });
    setForm({ nombre: '', descripcion: '' });
    setOpen(false);
    onSuccess();
  };

  return (
    <DefaultModal open={open} setOpen={setOpen} title="Agregar Ciclo Escolar">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleOnChange}
            inputProps={{ maxLength: 5, style: { textTransform: 'uppercase' } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <ButtonsForm
            confirm={handleConfirm}
            cancel={() => setOpen(false)}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

ModalCatalogoCicloEscolar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
