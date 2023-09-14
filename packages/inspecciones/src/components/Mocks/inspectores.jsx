import React, { useState, useEffect } from 'react';
import { Card, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ButtonsForm, DefaultModal, Input } from '@siiges-ui/shared';
import getInspector from '../../utils/getInspector';

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 660 },
  { field: 'activas', headerName: 'Inspecciones activas', width: 170 },
  { field: 'realizadas', headerName: 'Inspecciones realizadas', width: 170 },
  {
    field: 'actions',
    headerName: 'Acciones',
    renderCell: (params) => {
      const [open, setOpen] = useState(false);
      const [inspector, setInspector] = useState({});
      const [isLoading, setIsLoading] = useState(true);

      const openModal = () => {
        setOpen(true);
      };

      const handleCancel = () => {
        setOpen(false);
      };

      useEffect(() => {
        async function fetchInspector() {
          try {
            const data = await getInspector(params.id); // el getInspector no furula
            setInspector(data.inspector);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching inspector:', error);
            setIsLoading(false);
          }
        }

        if (open) {
          fetchInspector();
        }
      }, [params.id, open]);

      return (
        <>
          <IconButton aria-label="consultar" onClick={openModal}>
            <AddIcon />
          </IconButton>
          <DefaultModal
            open={open}
            setOpen={setOpen}
            title="Confirmar inspector"
          >
            {isLoading ? (
              <p>Loading...</p>
            ) : (
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
                    Ciencias Forenses a Inspector
                    {' '}
                    {inspector.nombre}
                    {' '}
                    p/migrar RVOES SICYT para que
                    realice la visita de inspeccion. ¿Esta usted seguro?
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    id="fechaInspeccion"
                    label="Fecha de inspeccion"
                    name="fechaInspeccion"
                    auto="fechaInspeccion"
                    type="date"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input id="folio" label="Folio" name="folio" auto="folio" />
                </Grid>
                <Grid item xs={12}>
                  <ButtonsForm
                    confirm={() => {
                      console.log(params.id);
                    }}
                    cancel={handleCancel}
                  />
                </Grid>
              </Grid>
            )}
          </DefaultModal>
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    nombre: 'ASIGNACION INSPECCION FISICA',
    activas: '339',
    realizadas: '5',
  },
  {
    id: 2,
    nombre: 'ASIGNACION INSPECCION FISICA',
    activas: '339',
    realizadas: '5',
  },
  {
    id: 3,
    nombre: 'ASIGNACION INSPECCION FISICA',
    activas: '339',
    realizadas: '5',
  },
];

export { rows, columns };
