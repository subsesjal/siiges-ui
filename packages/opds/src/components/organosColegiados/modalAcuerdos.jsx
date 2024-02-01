import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import {
  ButtonsForm, DefaultModal, Input, Select,
} from '@siiges-ui/shared';
import useApi from '@siiges-ui/shared/src/utils/hooks/useApi';
// import findAcuerdoById from '../../utils/organosColegiados/fetchAcuerdoById';

export default function ModalAcuerdos({
  id,
  open,
  setOpen,
  title,
  setReloadData,
}) {
  const [form, setForm] = useState({});
  // Estado para controlar el reenvío de la solicitud
  const [reload, setReload] = useState(false);
  const [path, setPath] = useState('');

  const updateForm = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };
  const statusOptions = [
    { id: 1, nombre: 'En Progreso' },
    { id: 2, nombre: 'Concluido' },
    { id: 3, nombre: 'Pendiente' },
  ];

  useEffect(() => {
    if (open) {
      setForm({
        descripcionAcuerdo: id.descripcion,
        descripcionSeguimiento: id.descripcionSeguimiento,
        numero: id.numero,
        fecha: id.fecha,
        status: statusOptions.find(({ nombre }) => nombre === id.estatus)?.id,
      });
    } else setForm({});
    if (title === 'Capturar Acuerdo') setForm({});
  }, [open]);

  useApi({
    endpoint: path, // Asegúrate de reemplazar esto con tu endpoint
    method: 'POST',
    dataBody: form,
    reload,
  });
  const createAcuerdo = () => {
    setPath(`api/v1/acuerdos/orgColegiados/${id}`);
    setReload(!reload);
    setOpen(false);
    setReloadData(true);
  };

  const isConsultarAcuerdo = title === 'Consultar Acuerdo';

  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="descripcionAcuerdo"
            name="descripcionAcuerdo"
            label="Descripción de acuerdo"
            value={form?.descripcionAcuerdo}
            rows={4}
            onChange={(e) => updateForm('descripcion', e.target.value)}
            multiline
            sx={{ width: '100%' }}
            required
            disabled={isConsultarAcuerdo}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="descripcionSeguimiento"
            name="descripcionSeguimiento"
            label="Descripción de seguimiento"
            value={form?.descripcionSeguimiento}
            rows={4}
            multiline
            onChange={(e) => updateForm('descripcionSeguimiento', e.target.value)}
            sx={{ width: '100%' }}
            required
            disabled={isConsultarAcuerdo}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            title="Estatus"
            name="estatus"
            value={form.status || ''}
            options={statusOptions}
            onchange={(e) => updateForm(
              'estatus',
              statusOptions.find((options) => options.id === e.target.value)
                .nombre,
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="numero"
            label="Numero de folio"
            size="small"
            margin="normal"
            value={form?.numero}
            name="numero"
            onChange={(e) => updateForm('numero', e.target.value)}
            disabled={isConsultarAcuerdo}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="fecha"
            label="Fecha de dictamen"
            name="fecha"
            type="date"
            auto="fecha"
            value={form.fecha}
            onchange={(e) => updateForm(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={5}>
          <ButtonsForm
            cancel={() => {
              setOpen(false);
            }}
            confirmDisabled={Object.entries(form).length < 4}
            confirm={() => createAcuerdo()}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

ModalAcuerdos.defaultProps = {
  id: null,
};

ModalAcuerdos.propTypes = {
  id: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  setReloadData: PropTypes.func,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
