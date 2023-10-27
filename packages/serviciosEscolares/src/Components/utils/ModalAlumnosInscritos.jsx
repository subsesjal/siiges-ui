import {
  ButtonStyled, DataTable, DefaultModal, LabelData,
} from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import columnsAlumnosInscritos from '../../Tables/columnsAlumnosInscritos';

export default function ModalAlumnosInscritos({
  open,
  setOpen,
  asignaturas,
  title,
  handleCheckboxChange,
  checkedIDs,
}) {
  console.log(checkedIDs);
  return (
    <DefaultModal open={open} setOpen={setOpen} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LabelData title="Alumno" subtitle="Pedro Perez" />
        </Grid>
        <Grid item xs={6}>
          <LabelData title="Matricula" subtitle="PSC101" />
        </Grid>
      </Grid>
      <DataTable
        title="Asignaturas"
        rows={asignaturas}
        columns={columnsAlumnosInscritos(handleCheckboxChange)}
      />
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

ModalAlumnosInscritos.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  asignaturas: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkedIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};
