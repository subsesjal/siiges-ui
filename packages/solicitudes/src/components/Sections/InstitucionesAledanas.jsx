import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { DataTable, getData } from '@siiges-ui/shared';
import columns from './Mocks/InstitucionesAledanas';
import PlantelContext from '../utils/Context/plantelContext';
import InstitucionesAledanasCreateModal from '../utils/Components/InstitucionesAledanas/InstitucionesAledanasCreateModal';

export default function InstitucionesAledanas({ disabled, programaId }) {
  const [modal, setModal] = useState(false);
  const [rows, setRows] = useState([]);
  const { institucionesAledanas, setInstitucionesAledanas, plantelId } = useContext(PlantelContext);
  const tableColumns = columns(setInstitucionesAledanas, institucionesAledanas);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (plantelId) {
      getData({ endpoint: `/planteles/${plantelId}/saludInstituciones` })
        .then((data) => {
          if (data && data.data.length > 0) {
            setInstitucionesAledanas(data.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al cargar los datos de las instituciones aledañas:', error);
          setLoading(false);
        });
    }
  }, [plantelId]);

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
        <Typography variant="h6">Instituciones Aledañas</Typography>
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
          loading={loading}
        />
      </Grid>
      <InstitucionesAledanasCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Agregar Instituciones Aledañas"
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
