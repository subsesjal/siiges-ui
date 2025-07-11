import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonsForm, Context, DefaultModal, Input, updateRecord,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';

export default function EditModal({
  open, setOpen, data, onSuccess,
}) {
  const [form, setForm] = useState({
    titulo: '',
    urlNoticia: '',
    urlImagen: '',
  });

  const { setNoti, setLoading } = useContext(Context);

  useEffect(() => {
    if (data) {
      setForm({
        titulo: data.titulo || '',
        urlNoticia: data.urlNoticia || '',
        urlImagen: data.urlImagen || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await updateRecord({
      endpoint: `/noticias/${data.id}`,
      data: form,
    });
    setLoading(false);

    if (response.statusCode === 200) {
      setNoti({ open: true, message: 'Noticia actualizada con éxito', type: 'success' });
      onSuccess();
      setOpen(false);
    } else {
      setNoti({ open: true, message: response.errorMessage || 'Error al actualizar noticia', type: 'error' });
    }
  };

  return (
    <DefaultModal open={open} setOpen={setOpen} title="Editar Noticia">
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

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    titulo: PropTypes.string,
    urlNoticia: PropTypes.string,
    urlImagen: PropTypes.string,
  }),
  onSuccess: PropTypes.func.isRequired,
};

EditModal.defaultProps = {
  data: {},
};
