import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import columns from './Mocks/Diligencias';
import DatosGeneralesContext from '../utils/Context/datosGeneralesContext';
import DiligenciasCreateModal from '../utils/Components/DiligenciasModales/DiligenciasCreateModal';

function DiligenciasData({ disabled, id }) {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const {
    diligencias,
    setDiligencias,
  } = useContext(DatosGeneralesContext);

  const tableColumns = columns(setDiligencias, diligencias);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Diligencias</Typography>
      </Grid>
      <Grid item xs={3}>
        {!disabled && <ButtonAdd onClick={showModal} text="agregar" />}
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={diligencias}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
      <DiligenciasCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Crear Diligencia"
        id={id}
      />
    </Grid>
  );
}

DiligenciasData.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default DiligenciasData;
