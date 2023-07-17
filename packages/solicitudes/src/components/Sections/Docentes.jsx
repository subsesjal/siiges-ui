import React, { useContext, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import columns from './Mocks/Docentes';
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';
import DocentesCreateModal from '../utils/Components/DocentesModales/DocentesCreateModal';

export default function Docentes({ disabled }) {
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const {
    docentesList,
    setDocentesList,
  } = useContext(TablesPlanEstudiosContext);

  const tableColumns = columns(setDocentesList, docentesList);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Docentes</Typography>
      </Grid>
      <Grid item xs={3}>
        {!disabled && <ButtonAdd onClick={showModal} text="agregar" />}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={docentesList}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
      <DocentesCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Agregar Docente"
      />
    </Grid>
  );
}

Docentes.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
