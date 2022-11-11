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

    fetch('http://localhost:3000/api/v1/usuarios/', {
      method: 'POST',
      body: { ...data },
    });
  }

  useEffect(() => {
    if (session.rol === 'representante') {
      setUserrol([
        {
          id: 'gestor',
          name: 'Gestor',
        },
        {
          id: 'ce_ies',
          name: 'Control escolar IES',
        },
      ]);
    }

    if (session.rol === 'admin') {
      setUserrol([
        {
          id: 'nuevo',
          name: 'Usuario Nuevo',
        },
        {
          id: 'admin',
          name: 'Administrador',
        },
        {
          id: 'representante',
          name: 'Representante Legal',
        },
        {
          id: 'gestor',
          name: 'Gestor',
        },
        {
          id: 'evaluador',
          name: 'Evaluador',
        },
        {
          id: 'inspector',
          name: 'Inspector',
        },
        {
          id: 'control_documental',
          name: 'Revisión de documentos',
        },
        {
          id: 'sicyt_lectura',
          name: 'Sicyt de consulta',
        },
        {
          id: 'sicyt_editar',
          name: 'Sicyt de editar',
        },
        {
          id: 'comite_evaluacion',
          name: 'Comite de evaluación',
        },
        {
          id: 'jefe_inspector',
          name: 'Jefe de inspectores',
        },
        {
          id: 'ce_ies',
          name: 'Control escolar IES',
        },
        {
          id: 'ce_sicyt',
          name: 'Control escolar SICYT',
        },
        {
          id: 'equiv_sicyt',
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
          <Select title="Tipo de usuario" options={userRol} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input label="Cargo" id="cargo" name="cargo" auto="cargo" />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Correo Electronico"
            id="email"
            name="email"
            auto="email"
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
