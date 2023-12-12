import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import { ButtonsForm, DefaultModal, Select } from '@siiges-ui/shared';
import findAcuerdoById from '../../utils/organosColegiados/fetchAcuerdoById';

export default function ModalAcuerdos({
  id, open, setOpen, title,
}) {
  const [acuerdoData, setAcuerdoData] = useState({});
  const handleOnChange = (event) => {
    console.log(`${event.target.name}: ${event.target.value}`);
  };

  useEffect(() => {
    if (id && title !== 'Crear Acuerdo') {
      const data = findAcuerdoById(id);
      if (data) {
        setAcuerdoData(data);
      } else {
        console.log('No acuerdo found with id:', id);
      }
    }
  }, [id, title]);

  const isConsultarAcuerdo = title === 'Consultar Acuerdo';

  const statusOptions = [
    { id: 1, nombre: 'En Progreso' },
    { id: 2, nombre: 'Concluido' },
    { id: 3, nombre: 'Pendiente' },
  ];

  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="descripcionAcuerdo"
            name="descripcionAcuerdo"
            label="Descripción de acuerdo"
            value={acuerdoData?.descripcionAcuerdo}
            rows={4}
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
            value={acuerdoData?.descripcionSeguimiento}
            rows={4}
            multiline
            sx={{ width: '100%' }}
            required
            disabled={isConsultarAcuerdo}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            title="Estatus"
            name="estatus"
            value={acuerdoData?.estatusId}
            options={statusOptions}
            onchange={handleOnChange}
            disabled={isConsultarAcuerdo}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            title="Eje Plan Estatal de Desarrollo"
            name="ejeDesarrollo"
            options={[]}
            onchange={handleOnChange}
            disabled={isConsultarAcuerdo}
          />
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={5}>
          <ButtonsForm
            cancel={() => {
              setOpen(false);
            }}
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
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
