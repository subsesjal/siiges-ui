import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { ButtonAdd, Input } from '@siiges-ui/shared';
import React, { useContext, useState } from 'react';
import columns from './Mocks/AsignaturasFormacionElectiva';
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';
import AsignaturasFormacionCreateModal from '../utils/Components/AsignaturasFormacionModales/AsignaturasFormacionCreateModal';

export default function AsignaturasFormacionElectiva({ disabled }) {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const {
    asignaturasFormacionList,
    setAsignaturasFormacionList,
  } = useContext(TablesPlanEstudiosContext);

  const tableColumns = columns(setAsignaturasFormacionList, asignaturasFormacionList);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas formación electiva</Typography>
      </Grid>
      <Grid item xs={3}>
        {!disabled && <ButtonAdd onClick={showModal} text="agregar" />}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={asignaturasFormacionList}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
      <Grid item xs={9}>
        <Input
          id="horasMin"
          label="Numero de horas minimas que se deberan acreditar bajo la conduccion de un docente"
          name="horasMin"
          auto="horasMin"
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="credMin"
          label="Numero minimo de creditos que se deberan acreditar"
          name="credMin"
          auto="credMin"
        />
      </Grid>
      <AsignaturasFormacionCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Crear Asignatura"
      />
    </Grid>
  );
}

AsignaturasFormacionElectiva.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
