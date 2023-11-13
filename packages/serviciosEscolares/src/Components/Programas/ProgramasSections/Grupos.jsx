import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Button, DataTable } from '@siiges-ui/shared';
import GruposForm from '../../utils/GruposForm';
import columnsGrupos from '../../../Tables/gruposTable';
import GruposModal from '../../utils/GruposModal';

export default function Grupos() {
  const [open, setOpen] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [parametros, setParametros] = useState([]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GruposForm setGrupos={setGrupos} setParametros={setParametros} />
      </Grid>
      <Grid item xs={12}>
        {parametros.cicloEscolarId && (
          <Button
            text="Agregar Grupo"
            type="add"
            onClick={() => setOpen(true)}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <DataTable
          rows={grupos || []}
          columns={columnsGrupos}
          title="Tabla de Grupos"
        />
      </Grid>
      <GruposModal
        open={open}
        setOpen={setOpen}
        type="new"
        data={grupos}
        params={parametros}
      />
    </Grid>
  );
}
