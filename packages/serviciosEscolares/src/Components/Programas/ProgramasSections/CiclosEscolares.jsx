import { Grid } from '@mui/material';
import { ButtonAdd, DataTable } from '@siiges-ui/shared';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import columnsCiclosEscolares from '../../../Tables/ciclosEscolaresTable';
import CiclosEscolaresModal from '../../utils/CiclosEscolaresModal';

export default function CiclosEscolares({ ciclos }) {
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ButtonAdd
          text="Agregar Ciclo Escolar"
          type="add"
          onClick={() => setOpen(true)}
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          rows={ciclos}
          columns={columnsCiclosEscolares}
          title="Tabla de Ciclos escolares"
        />
      </Grid>
      <CiclosEscolaresModal open={open} setOpen={setOpen} type="new" />
    </Grid>
  );
}

CiclosEscolares.propTypes = {
  ciclos: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
  }).isRequired,
};
