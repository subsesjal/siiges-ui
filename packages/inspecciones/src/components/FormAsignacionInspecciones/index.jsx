import { Grid, Typography, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  ButtonStyled,
  Input,
  ButtonsForm,
  DefaultModal,
} from '@siiges-ui/shared';
import React, { useState } from 'react';
import { rows, columns } from '../Mocks/inspectores';

export default function FormAsignacionInspecciones() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Programa de estudios</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input id="nivel" label="Nivel" name="nivel" auto="nivel" />
        </Grid>
        <Grid item xs={9}>
          <Input id="name" label="Nombre" name="name" auto="name" />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="modalidad"
            label="Modalidad"
            name="modalidad"
            auto="modalidad"
          />
        </Grid>
        <Grid item xs={3}>
          <Input id="periodo" label="Periodo" name="periodo" auto="periodo" />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="institucion"
            label="Institucion"
            name="institucion"
            auto="institucion"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="domicilio"
            label="Domicilio"
            name="domicilio"
            auto="domicilio"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Inspectores</Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 266, width: '100%', marginTop: 15 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'right', margin: 2 }}>
          <ButtonStyled text="Terminar" alt="Confirmar" onclick={handleOpen} />
        </Grid>
      </Grid>
      <DefaultModal open={open} setOpen={setOpen}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                textAlign: 'center',
                backgroundColor: 'rgb(71, 127, 158, 0.53)',
                margin: 3,
                padding: 3,
              }}
            >
              Esta por asignar Maestria Psicologia Juridica Criminologia y
              Ciencias Forenses a Inspector p/migrar RVOES SICYT para que
              realice la visita de inspeccion. ¿Esta usted seguro?
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Input
              id="fechaInspeccion"
              label="Fecha de inspeccion"
              name="fechaInspeccion"
              auto="fechaInspeccion"
            />
          </Grid>
          <Grid item xs={6}>
            <Input id="folio" label="Folio" name="folio" auto="folio" />
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm />
          </Grid>
        </Grid>
      </DefaultModal>
    </>
  );
}
