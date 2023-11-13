import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import columns from './Mocks/Asignaturas';
import AsignaturasModal from '../utils/Components/AsignaturasModales/AsignaturasCreateModal';
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';

export default function Asignaturas({ disabled }) {
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const {
    asignaturasList,
    setAsignaturasList,
  } = useContext(TablesPlanEstudiosContext);

  console.log(asignaturasList);

  const tableColumns = columns(setAsignaturasList, asignaturasList);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas</Typography>
      </Grid>
      <Grid item xs={3}>
        {!disabled && <ButtonAdd onClick={showModal} text="agregar" />}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={asignaturasList}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
      <AsignaturasModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Crear Asignatura"
      />
    </Grid>
  );
}

Asignaturas.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
