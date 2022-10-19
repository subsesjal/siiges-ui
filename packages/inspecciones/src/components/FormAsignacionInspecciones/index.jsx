import {
  Grid, Typography, Modal, Box, Card,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  ButtonStyled, Input, Title, ButtonsForm,
} from '@siiges-ui/shared';
import React from 'react';
import { rows, columns } from '../Mocks/inspectores';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FormAsignacionInspecciones() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Title title="Confirmacion" />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
