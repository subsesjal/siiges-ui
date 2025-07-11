import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonsForm, Context, createRecord, DefaultModal, Input,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';

export default function CreateModal({ open, setOpen, onSuccess }) {
  const [form, setForm] = useState({
    titulo: '',
    urlNoticia: '',
    urlImagen: '',
  });

  const { setNoti, setLoading } = useContext(Context);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await createRecord({
      endpoint: '/noticias',
      data: form,
    });
    setLoading(false);

    if (response.statusCode === 200 || response.statusCode === 201) {
      setNoti({ open: true, message: 'Noticia creada con éxito', type: 'success' });
      onSuccess();
      setOpen(false);
      setForm({ titulo: '', urlNoticia: '', urlImagen: '' });
    } else {
      setNoti({ open: true, message: response.errorMessage || 'Error al crear noticia', type: 'error' });
    }
  };

  return (
    <DefaultModal open={open} setOpen={setOpen} title="Crear noticia">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            label="Título de la Noticia"
            id="titulo"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label="Enlace de la Noticia"
            id="urlNoticia"
            name="urlNoticia"
            value={form.urlNoticia}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label="Enlace de la Imagen"
            id="urlImagen"
            name="urlImagen"
            value={form.urlImagen}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm cancel={() => setOpen(false)} confirm={handleSubmit} />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

CreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
