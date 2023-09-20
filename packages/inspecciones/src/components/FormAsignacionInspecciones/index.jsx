import { Grid, Typography } from '@mui/material';
import { ButtonStyled, Input, DataTable } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React from 'react';
import { rows, columns } from '../Mocks/inspectores';

export default function FormAsignacionInspecciones({ solicitud }) {
  // Solicitud no esta trayendo los datos correctos
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Programa de estudios</Typography>
      </Grid>
      <Grid item xs={3}>
        <Input
          id="nivel"
          label="Nivel"
          name="nivel"
          auto="nivel"
          value={solicitud.nivel}
          disabled
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="name"
          label="Nombre"
          name="nombre"
          auto="nombre"
          value={solicitud.nombre}
          disabled
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="modalidad"
          label="Modalidad"
          name="modalidad"
          auto="modalidad"
          value={solicitud.modalidad}
          disabled
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="periodo"
          label="Periodo"
          name="periodo"
          auto="periodo"
          value={solicitud.periodo}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="institucion"
          label="Institucion"
          name="institucion"
          auto="institucion"
          value={solicitud.institucion}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          id="domicilio"
          label="Domicilio"
          name="domicilio"
          auto="domicilio"
          value={solicitud.domicilio}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          title="Inspectores"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'right', margin: 2 }}>
        <ButtonStyled text="Terminar" alt="Confirmar" />
      </Grid>
    </Grid>
  );
}

FormAsignacionInspecciones.propTypes = {
  solicitud: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    nivel: PropTypes.string,
    modalidad: PropTypes.string,
    periodo: PropTypes.string,
    institucion: PropTypes.string,
    domicilio: PropTypes.string,
  }).isRequired,
};
