import { Grid } from '@mui/material';
import { ButtonAdd, DataTable } from '@siiges-ui/shared';
import React, { useState } from 'react';
import columnsCiclosEscolares from '../../../Tables/ciclosEscolaresTable';
import CiclosEscolaresModal from '../../utils/CiclosEscolaresModal';

export default function CiclosEscolares() {
  const [open, setOpen] = useState(false);

  const ciclosEscolares = [
    {
      id: 1,
      nombre: 'Ciclo 2023',
      descripcion: 'Descripción del Ciclo 2023',
    },
    {
      id: 2,
      nombre: 'Ciclo 2022',
      descripcion: 'Descripción del Ciclo 2022',
    },
    {
      id: 3,
      nombre: 'Ciclo 2021',
      descripcion: 'Descripción del Ciclo 2021',
    },
  ];

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
          rows={ciclosEscolares}
          columns={columnsCiclosEscolares}
          title="Tabla de Ciclos escolares"
        />
      </Grid>
      <CiclosEscolaresModal open={open} setOpen={setOpen} type="new" />
    </Grid>
  );
}
