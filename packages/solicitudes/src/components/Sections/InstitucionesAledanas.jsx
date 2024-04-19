import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import columns from './Mocks/InstitucionesAledanas';
import PlantelContext from '../utils/Context/plantelContext';
import InstitucionesAledanasCreateModal from '../utils/Components/InstitucionesAledanas/InstitucionesAledanasCreateModal';

export default function InstitucionesAledanas({ disabled, programaId }) {
  const [modal, setModal] = useState(false);
  const [rows, setRows] = useState([]);
  const { institucionesAledanas, setInstitucionesAledanas } = useContext(PlantelContext);
  const tableColumns = columns(setInstitucionesAledanas, institucionesAledanas);

  useEffect(() => {
    const institucionesAledanasRows = institucionesAledanas.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      tiempo: item.tiempo,
    }));
    setRows(institucionesAledanasRows);
  }, [institucionesAledanas]);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Infraestructura</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          buttonAdd={!disabled}
          buttonText="Agregar"
          buttonClick={showModal}
          rows={rows}
          columns={tableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
      <InstitucionesAledanasCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Crear Instituciones Aledañas"
        programaId={programaId}
      />
    </Grid>
  );
}

InstitucionesAledanas.propTypes = {
  disabled: PropTypes.bool.isRequired,
  programaId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]).isRequired,
};
