import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Grid, Tab, Tabs,
} from '@mui/material';
import InstitucionView from '../InstitucionView';
import PlantelesTable from '../../Planteles/PlantelesTable';

export default function InstitucionBox({ institucion }) {
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
        institucion={institucion.id}
        data={institucion.planteles}
      />
      )}
    </Grid>
  );
}

InstitucionBox.propTypes = {
  institucion: PropTypes.shape({
    id: PropTypes.number,
    planteles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
