import { DataTable } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import columnsAsignaturas from '../../../Tables/acreditacionTable';

export default function AcreditacionAsignaturas({ asignaturas, grupoId }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DataTable
          rows={asignaturas}
          columns={columnsAsignaturas(grupoId)}
          title="Tabla de asignaturas"
        />
      </Grid>
    </Grid>
  );
}

AcreditacionAsignaturas.defaultProps = {
  asignaturas: [],
};

AcreditacionAsignaturas.propTypes = {
  asignaturas: PropTypes.arrayOf(PropTypes.string),
  grupoId: PropTypes.number.isRequired,
};
