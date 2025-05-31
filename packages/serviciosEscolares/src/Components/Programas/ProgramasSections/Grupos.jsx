import React, { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import { Button, DataTable, Context } from '@siiges-ui/shared';
import GruposForm from '../../utils/GruposForm';
import getColumnsGrupos from '../../../Tables/gruposTable';
import GruposModal from '../../utils/GruposModal';

export default function Grupos() {
  const [open, setOpen] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [parametros, setParametros] = useState([]);
  const [fetchGrupos, setFetchGrupos] = useState(true);
  const { setNoti } = useContext(Context);

  const handleSuccess = () => {
    setOpen(false);
    setFetchGrupos((prev) => !prev); // toggle based on latest value
    setNoti({
      open: true,
      message: 'Grupo guardado exitosamente.',
      type: 'success',
    });
  };

  const columnsGrupos = getColumnsGrupos({ handleSuccess });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GruposForm
          setGrupos={setGrupos}
          setParametros={setParametros}
          fetchGrupos={fetchGrupos}
          setNoti={setNoti}
        />
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
        onSuccess={handleSuccess}
      />
    </Grid>
  );
}
