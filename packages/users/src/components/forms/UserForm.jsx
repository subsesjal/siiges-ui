import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import router from 'next/router';
import {
  Input, ButtonsForm, Select, Context,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import {
  getFormData,
  getFormSelectData,
} from '@siiges-ui/shared/src/utils/forms/getFormData';

export default function UserForm({ user }) {
  const { persona, rol } = user.data;
  const { session } = useContext(Context);
  const [userRol, setUserrol] = useState([]);

  function submit() {
    const dataInputs = getFormData('MuiOutlinedInput-input');
    const dataSelects = getFormSelectData('MuiSelect-nativeInput');
    const data = {
      ...dataInputs,
      ...dataSelects,
    };

    fetch(`http://localhost:3000/api/v1/usuarios/${session.id}`, {
      method: 'PATCH',
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

  const Sexo = [
    {
      id: 'male',
      name: 'Masculino',
    },
    {
      id: 'female',
      name: 'Femenino',
    },
  ];

  return (
    <Grid item xs={8}>
      <Typography variant="h5" gutterBottom component="div">
        Información Personal
      </Typography>
      <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input
            label="Nombre(s)"
            id="nombre"
            name="nombre"
            auto="nombre"
            value={persona.nombre}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Primer Apellido"
            id="apellido_paterno"
            name="apellido_paterno"
            auto="apellido_paterno"
            value={persona.apellidoPaterno}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Segundo Apellido"
            id="apellido_materno"
            name="apellido_materno"
            auto="apellido_materno"
            value={persona.apellidoMaterno}
            class="data"
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <Input
            label="Cargo"
            id="titulo_cargo"
            name="titulo_cargo"
            auto="titulo_cargo"
            value={persona.titulo_cargo}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Select title="Rol" options={userRol} value={rol.id} name="rol_id" />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input
            label="Correo Electronico"
            id="correo"
            name="correo"
            auto="correo"
            value={user.data.correo}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Nacionalidad"
            id="nacionalidad"
            name="nacionalidad"
            auto="nacionalidad"
            value={persona.nacionalidad}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Sexo"
            options={Sexo}
            name="sexo"
            value="male"
            class="data"
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input
            label="INE"
            id="ine"
            name="ine"
            auto="ine"
            value={persona.ine}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Curp"
            id="curp"
            name="curp"
            auto="curp"
            value={persona.curp}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="RFC"
            id="rfc"
            name="rfc"
            auto="rfc"
            value={persona.rfc}
            class="data"
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input
            label="Telefono"
            id="telefono"
            name="telefono"
            auto="telefono"
            value={persona.telefono}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Celular"
            id="celular"
            name="celular"
            auto="celular"
            value={persona.celular}
            class="data"
          />
        </Grid>
      </Grid>
      <ButtonsForm cancel={() => router.back()} confirm={() => submit()} />
    </Grid>
  );
}

UserForm.propTypes = {
  user: PropTypes.objectOf.isRequired,
};
