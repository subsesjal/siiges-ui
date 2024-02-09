import { Grid, Typography } from '@mui/material';
import { ButtonsForm, DataTable, Input } from '@siiges-ui/shared';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EvidenciaFotografica from './EvidenciaFotografica';
import Columns from './Tables/Columns';
import rows from './Tables/Columns/MockRows';

export default function PlanMaestro() {
  const [fileURLs, setFileURLs] = useState([]);
  const router = useRouter();

  const handleFileLoaded = (index, url) => {
    setFileURLs((prevURLs) => [
      ...prevURLs.slice(0, index),
      url,
      ...prevURLs.slice(index + 1),
    ]);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Responsable de planeación</Typography>
      </Grid>
      <Grid item xs={6}>
        <Input id="nombre" label="Nombre" name="nombre" auto="nombre" />
      </Grid>
      <Grid item xs={6}>
        <Input id="cargo" label="Cargo" name="cargo" auto="cargo" />
      </Grid>
      <Grid item xs={6}>
        <Input id="correo" label="Correo" name="correo" auto="correo" />
      </Grid>
      <Grid item xs={3}>
        <Input id="telefono" label="Telefono" name="telefono" auto="telefono" />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="extension"
          label="Extensión"
          name="extension"
          auto="extension"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Responsable de Obra y mantenimiento
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Input id="nombre" label="Nombre" name="nombre" auto="nombre" />
      </Grid>
      <Grid item xs={6}>
        <Input id="cargo" label="Cargo" name="cargo" auto="cargo" />
      </Grid>
      <Grid item xs={6}>
        <Input id="correo" label="Correo" name="correo" auto="correo" />
      </Grid>
      <Grid item xs={3}>
        <Input id="telefono" label="Telefono" name="telefono" auto="telefono" />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="extension"
          label="Extensión"
          name="extension"
          auto="extension"
        />
      </Grid>
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonText="Agregar datos del proyecto"
          buttonClick={() => {}}
          rows={rows}
          columns={Columns}
        />
      </Grid>
      <Grid item xs={12}>
        <EvidenciaFotografica
          id={1}
          label="Evidencia Fotografica (.jpg)"
          url={fileURLs[0]}
          setUrl={(url) => handleFileLoaded(1, url)}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonsForm cancel={() => router.back()} />
      </Grid>
    </Grid>
  );
}
