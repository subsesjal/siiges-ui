import { Layout } from '@siiges-ui/shared';
import {
  BusquedaAlumnosForm,
  BusquedaAlumnosTable,
} from '@siiges-ui/serviciosescolares';
import { Divider, Grid } from '@mui/material';
import React from 'react';

const alumnosMock = [
  {
    id: 1,
    nombreCompleto: 'Nombre Apellido1 Apellido2',
    curp: 'CURPXXXXXXXX01',
    claveTrabajo: 'TSU2026HOY',
    programa: 'Diseño de interiores en Teotihuacan',
    matricula: '20260001',
  },
  {
    id: 2,
    nombreCompleto: 'Nombre Apellido1 Apellido2',
    curp: 'CURPXXXXXXXX02',
    claveTrabajo: 'TSU2026HOY',
    programa: 'Psicologia',
    matricula: '20260002',
  },
  {
    id: 3,
    nombreCompleto: 'Nombre Apellido1 Apellido2',
    curp: 'CURPXXXXXXXX03',
    claveTrabajo: 'TSU2026HOY',
    programa: 'Psicologia',
    matricula: '20260003',
  },
  {
    id: 4,
    nombreCompleto: 'Nombre Apellido1 Apellido2',
    curp: 'CURPXXXXXXXX04',
    claveTrabajo: 'TSU2026HOY',
    programa: 'Psicologia',
    matricula: '20260004',
  },
];

export default function BusquedaAlumnos() {
  return (
    <Layout title="Busqueda de Alumnos">
      <Grid container>
        <Grid item xs={12}>
          <BusquedaAlumnosForm />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <BusquedaAlumnosTable alumnos={alumnosMock} />
        </Grid>
      </Grid>
    </Layout>
  );
}
