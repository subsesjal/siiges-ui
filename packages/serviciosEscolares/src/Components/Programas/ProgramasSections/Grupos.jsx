import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { ButtonAdd, DataTable } from '@siiges-ui/shared';
import GruposForm from '../../utils/GruposForm';
import columnsGrupos from '../../../Tables/gruposTable';
import GruposModal from '../../utils/GruposModal';

export default function Grupos() {
  const [open, setOpen] = useState(false);

  const grupos = [
    {
      id: 1,
      grado: 'Primero',
      grupo: 'A',
      turno: 'Matutino',
      generacion: '2022-2023',
    },
    {
      id: 2,
      grado: 'Primero',
      grupo: 'B',
      turno: 'Vespertino',
      generacion: '2022-2023',
    },
    {
      id: 3,
      grado: 'Segundo',
      grupo: 'A',
      turno: 'Matutino',
      generacion: '2021-2022',
    },
    {
      id: 4,
      grado: 'Segundo',
      grupo: 'B',
      turno: 'Vespertino',
      generacion: '2021-2022',
    },
    {
      id: 5,
      grado: 'Tercero',
      grupo: 'A',
      turno: 'Matutino',
      generacion: '2020-2021',
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GruposForm />
      </Grid>
      <Grid item xs={12}>
        <ButtonAdd
          text="Agregar Grupo"
          type="add"
          onClick={() => setOpen(true)}
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          rows={grupos}
          columns={columnsGrupos}
          title="Tabla de Grupos"
        />
      </Grid>
      <GruposModal open={open} setOpen={setOpen} type="new" />
    </Grid>
  );
}
