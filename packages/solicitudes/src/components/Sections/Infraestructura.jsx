import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonAdd } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import columns from './Mocks/Infraestructura';
import PlantelContext from '../utils/Context/plantelContext';
import InfraestructuraCreateModal from '../utils/Components/InfraestructuraModales/InfraestructuraCreateModal';

export default function Infraestructura({ disabled }) {
  const [modal, setModal] = useState(false);
  const [rows, setRows] = useState([]);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const {
    infraestructuras,
    setInfraestructuras,
  } = useContext(PlantelContext);

  useEffect(() => {
    const infraestructurasRows = infraestructuras.map((item) => ({
      id: item.id,
      nombre: item.persona.nombre,
      tituloCargo: item.persona.tituloCargo,
      telefono: item.persona.telefono,
      celular: item.persona.celular,
      correo_primario: item.persona.correo_primario,
      schedule: `${item.horaInicio.toLocaleTimeString()} - ${item.horaFin.toLocaleTimeString()}`,
    }));
    setRows(infraestructurasRows);
  }, [infraestructuras]);

  const tableColumns = columns(setInfraestructuras, infraestructuras);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Infraestructura</Typography>
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
      <InfraestructuraCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Crear Asignatura"
      />
    </Grid>
  );
}

Infraestructura.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
