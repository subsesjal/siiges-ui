import React, { useState, useEffect } from 'react';
import { Card, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  ButtonsForm, DefaultModal, Input, getToken,
} from '@siiges-ui/shared';

const apikey = process.env.NEXT_PUBLIC_API_KEY;
const url = process.env.NEXT_PUBLIC_URL;

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
      const [form, setForm] = useState({ undefined });

      const openModal = () => {
        setOpen(true);
      };

      const handleCancel = () => {
        setOpen(false);
        setForm({});
      };

      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm((prevValues) => ({ ...prevValues, [name]: value }));
      };

      const checkDate = () => {
        if (form.fechaInspeccion === undefined) {
          alert('fecha nula');
          return null;
        }
        const date = new Date(form.fechaInspeccion).toISOString();
        if (date < new Date().toISOString()) {
          alert('fecha incorrecta');
          return null;
        }
        return date;
      };

      const fetchData = async ({ path, dataBody }) => {
        const token = getToken();
        const response = await fetch(`${url}/api/v1/${path}`, {
          method: 'POST',
          headers: {
            api_key: apikey,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: dataBody,
          redirect: 'follow',
        });
        const { data } = await response.json();

        return data;
      };

      const createInspection = async () => {
        const dateInspection = checkDate();
        if (dateInspection !== null) {
          const dataParams = params.row;
          dataParams.fechaInspeccion = dateInspection;

          const inspeccionData = JSON.stringify({
            programaId: dataParams.programaId,
            estatusInspeccionId: 1,
            folio: dataParams.folio,
            fecha: new Date().toISOString(),
            fechaAsignada: dateInspection,
          });

          const inspeccion = await fetchData({
            path: 'inspecciones/',
            token: dataParams.token,
            dataBody: inspeccionData,
          });

          const dataInspectoresProgramas = JSON.stringify({
            programaId: dataParams.programaId,
            inspectorId: dataParams.id,
            inspeccionId: inspeccion.id,
          });

          await fetchData({
            path: 'inspecciones/inspectores-programas',
            token: dataParams.token,
            dataBody: dataInspectoresProgramas,
          });
        }
      };

      useEffect(() => {
        async function fetchInspector() {
          try {
            setInspector(params.row);
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
                    p/migrar
                    RVOES SICYT para que realice la visita de inspeccion. ¿Esta
                    usted seguro?
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Input
                    id="fechaInspeccion"
                    label="Fecha de inspeccion"
                    name="fechaInspeccion"
                    auto="fechaInspeccion"
                    type="date"
                    onchange={handleOnChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    id="folio"
                    label="Folio"
                    name="folio"
                    auto="folio"
                    onchange={handleOnChange}
                    value={inspector.folio}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <ButtonsForm
                    confirm={() => {
                      createInspection();
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
