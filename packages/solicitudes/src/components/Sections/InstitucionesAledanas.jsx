import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import { DataTable, getData } from '@siiges-ui/shared';
import columns from './Mocks/InstitucionesAledanas';
import PlantelContext from '../utils/Context/plantelContext';
import InstitucionesAledanasCreateModal from '../utils/Components/InstitucionesAledanas/InstitucionesAledanasCreateModal';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function InstitucionesAledanas({ disabled, programaId, type }) {
  const [modal, setModal] = useState(false);
  const [rows, setRows] = useState([]);
  const { institucionesAledanas, setInstitucionesAledanas, plantelId } = useContext(PlantelContext);
  const [loading, setLoading] = useState(true);

  const isSectionDisabled = useSectionDisabled(17);

  const isDisabled = disabled || isSectionDisabled;

  const tableColumns = columns(type, isDisabled);

  useEffect(() => {
    if (plantelId) {
      getData({ endpoint: `/planteles/${plantelId}/saludInstituciones` })
        .then((data) => {
          if (data && data.data.length > 0) {
            setInstitucionesAledanas(data.data);
          }
          setLoading(false);
        })
        .catch(() => {
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
          buttonDisabled={isDisabled}
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
  type: PropTypes.string.isRequired,
  programaId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]).isRequired,
};
