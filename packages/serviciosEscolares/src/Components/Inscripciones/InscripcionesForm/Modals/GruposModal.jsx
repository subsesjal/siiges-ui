import { Grid } from '@mui/material';
import {
  ButtonsForm,
  Context,
  DefaultModal,
  Input,
  Select,
  createRecord,
} from '@siiges-ui/shared';
import React, { useContext } from 'react';

export default function GruposModal({
  openGrupo,
  setOpenGrupo,
  formGrupo,
  setFormGrupo,
  fetchGrupos,
}) {
  const { setNoti } = useContext(Context);
  const turnos = [
    { id: 1, nombre: 'Matutino' },
    { id: 2, nombre: 'Vespertino' },
    { id: 3, nombre: 'Nocturno' },
    { id: 4, nombre: 'Mixto' },
  ];

  const handleFormGrupoOnChange = (event) => {
    const { name, value } = event.target;
    setFormGrupo((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleGrupoSubmit = () => {
    createRecord({
      data: formGrupo,
      endpoint: '/GruposEscolares',
    })
      .then((response) => {
        if (response.statusCode === 201) {
          setNoti({
            open: true,
            message: 'Grupo escolar creado exitosamente',
            type: 'success',
          });
          setFormGrupo({ programaId: formGrupo.programaId });
          fetchGrupos(formGrupo.programaId);
          setOpenGrupo(false);
        } else {
          setNoti({
            open: true,
            message: 'Error al crear Grupo escolar',
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `Error al crear Grupo escolar: ${error.message}`,
          type: 'error',
        });
      });
  };
  return (
    <DefaultModal
      title="Crear ciclo escolar"
      open={openGrupo}
      setOpen={setOpenGrupo}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Input
            id="grupo"
            label="Grupo"
            name="grupo"
            onchange={handleFormGrupoOnChange}
          />
        </Grid>
        <Grid item xs={8}>
          <Select
            title="Turno"
            name="turno"
            options={turnos || []}
            value=""
            textValue
            onchange={handleFormGrupoOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm
            confirm={handleGrupoSubmit}
            cancel={() => {
              setOpenGrupo(false);
            }}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}
