import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import {
  Input, ButtonsForm, Select, Context,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';

export default function UserForm({ user }) {
  const { persona } = user.data;
  const { session } = useContext(Context);
  const [rol, setRol] = useState([]);

  useEffect(() => {
    if (session.rol === 'representante') {
      setRol([
        {
          id: 'gestor',
          name: 'Gestor',
        },
        {
          id: 'control_escolar',
          name: 'Control escolar IES',
        },
      ]);
    }

    if (session.rol === 'admin') {
      setRol([
        {
          id: 'new',
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
          id: 'revision_documentos',
          name: 'Revisión de documentos',
        },
        {
          id: 'sicyt_consulta',
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
          id: 'jefe_inspectores',
          name: 'Jefe de inspectores',
        },
        {
          id: 'control_escolar_ies',
          name: 'Control escolar IES',
        },
        {
          id: 'control_escolar_sicyt',
          name: 'Control escolar SICYT',
        },
        {
          id: 'equivalencias_sicyt',
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
            id="name"
            name="name"
            auto="name"
            value={persona.nombre}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Primer Apellido"
            id="lastname1"
            name="lastname1"
            auto="lastname1"
            value={persona.apellidoPaterno}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Segundo Apellido"
            id="lastname2"
            name="lastname2"
            auto="lastname2"
            value={persona.apellidoMaterno}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <Input
            label="Cargo"
            id="cargo"
            name="cargo"
            auto="cargo"
            value={persona.titulo_cargo}
          />
        </Grid>
        <Grid item xs={4}>
          <Select title="Rol" options={rol} />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input
            label="Correo Electronico"
            id="email"
            name="email"
            auto="email"
            value={user.data.correo}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Nacionalidad"
            id="nationality"
            name="nationality"
            auto="nationality"
            value={persona.nacionalidad}
          />
        </Grid>
        <Grid item xs={4}>
          <Select title="Sexo" options={Sexo} />
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
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Curp"
            id="curp"
            name="curp"
            auto="curp"
            value={persona.curp}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="RFC"
            id="rfc"
            name="rfc"
            auto="rfc"
            value={persona.rfc}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Input
            label="Telefono"
            id="phone"
            name="phone"
            auto="phone"
            value={persona.telefono}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Celular"
            id="cellphone"
            name="cellphone"
            auto="cellphone"
            value={persona.celular}
          />
        </Grid>
      </Grid>
      <ButtonsForm />
    </Grid>
  );
}

UserForm.propTypes = {
  user: PropTypes.objectOf.isRequired,
};
