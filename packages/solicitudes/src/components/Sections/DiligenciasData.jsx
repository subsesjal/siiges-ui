import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import columns from './Mocks/Diligencias';
import DatosGeneralesContext from '../utils/Context/datosGeneralesContext';
import DiligenciasCreateModal from '../utils/Components/DiligenciasModales/DiligenciasCreateModal';

function DiligenciasData({ disabled, id }) {
  const [modal, setModal] = useState(false);
  const [rows, setRows] = useState([]);

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

  useEffect(() => {
    const diligenciasRows = diligencias.map((item) => ({
      id: item.id,
      nombre: item.persona.nombre,
      tituloCargo: item.persona.tituloCargo,
      telefono: item.persona.telefono,
      celular: item.persona.celular,
      correo_primario: item.persona.correo_primario,
      schedule: `${item.horaInicio.toLocaleTimeString()} - ${item.horaFin.toLocaleTimeString()}`,
    }));
    setRows(diligenciasRows);
  }, [diligencias]);

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
            rows={rows}
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
