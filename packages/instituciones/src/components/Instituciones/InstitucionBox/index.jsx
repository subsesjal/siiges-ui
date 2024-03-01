import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Grid, Tab, Tabs,
} from '@mui/material';
import InstitucionView from '../InstitucionView';
import PlantelesTable from '../../Planteles/PlantelesTable';

export default function InstitucionBox({ institucion, setLoading, setTitle }) {
  useEffect(() => {
    setTitle('Institución');

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Datos de institución" />
            <Tab label="Planteles" disabled={!institucion} />
          </Tabs>
        </Box>
      </Grid>
      {value === 0 && <InstitucionView data={institucion} />}
      {value === 1 && (
      <PlantelesTable
        institucionId={institucion.id}
        planteles={institucion.planteles}
      />
      )}
    </Grid>
  );
}

InstitucionBox.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  institucion: PropTypes.shape({
    id: PropTypes.number,
    planteles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};
