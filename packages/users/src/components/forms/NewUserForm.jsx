import React, { useContext, useEffect, useState } from 'react';
import router from 'next/router';
import { Grid } from '@mui/material';
import {
  ButtonsForm, Context, Input, Select,
} from '@siiges-ui/shared';
import { getFormData, getFormSelectData } from '@siiges-ui/shared/src/utils/forms/getFormData';

export default function NewUserForm() {
  const { session } = useContext(Context);
  const [userRol, setUserrol] = useState([]);

  function submit() {
    const dataInputs = getFormData('MuiOutlinedInput-input');
    const dataSelects = getFormSelectData('MuiSelect-nativeInput');
    const data = {
      ...dataInputs,
      ...dataSelects,
    };

    data.actualizado = 1;

    fetch('http://localhost:3000/api/v1/usuarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  useEffect(() => {
    if (session.rol === 'representante') {
      setUserrol([
        {
          id: '4',
          name: 'Gestor',
        },
        {
          id: '12',
          name: 'Control escolar IES',
        },
      ]);
    }

    if (session.rol === 'admin') {
      setUserrol([
        {
          id: '1',
          name: 'Usuario Nuevo',
        },
        {
          id: '2',
          name: 'Administrador',
        },
        {
          id: '3',
          name: 'Representante Legal',
        },
        {
          id: '4',
          name: 'Gestor',
        },
        {
          id: '5',
          name: 'Evaluador',
        },
        {
          id: '6',
          name: 'Inspector',
        },
        {
          id: '7',
          name: 'Revisión de documentos',
        },
        {
          id: '8',
          name: 'Sicyt de consulta',
        },
        {
          id: '9',
          name: 'Sicyt de editar',
        },
        {
          id: '10',
          name: 'Comite de evaluación',
        },
        {
          id: '11',
          name: 'Jefe de inspectores',
        },
        {
          id: '12',
          name: 'Control escolar IES',
        },
        {
          id: '13',
          name: 'Control escolar SICYT',
        },
        {
          id: '14',
          name: 'Equivalencia SICYT',
        },
      ]);
    }
  }, [session]);

  return (
    <Grid item sx={{ ml: 15 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Input label="Nombre(s)" id="nombre" name="nombre" auto="nombre" />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Primer Apellido"
            id="apellido_paterno"
            name="apellido_paterno"
            auto="apellido_paterno"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Segundo Apellido"
            id="apellido_materno"
            name="apellido_materno"
            auto="apellido_materno"
          />
        </Grid>
        <Grid item xs={3}>
          <Select title="Tipo de usuario" options={userRol} name="rolId" id="rolId" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input label="Cargo" id="cargo" name="cargo" auto="cargo" />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Correo Electronico"
            id="correo"
            name="correo"
            auto="correo"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Input label="Usuario" id="usuario" name="usuario" auto="usuario" />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Contraseña"
            id="contrasena"
            name="contrasena"
            auto="contrasena"
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            label="Repetir contraseña"
            id="repeatContrasena"
            name="repeatContrasena"
            auto="repeatContrasena"
          />
        </Grid>
      </Grid>
      <ButtonsForm cancel={() => router.back()} confirm={() => submit()} />
    </Grid>
  );
}
