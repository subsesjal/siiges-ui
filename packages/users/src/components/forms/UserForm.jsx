import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Input, ButtonsForm, Select, Context } from '@siiges-ui/shared';
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
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Primer Apellido"
            id="lastname1"
            name="lastname1"
            auto="lastname1"
            value={persona.apellidoPaterno}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Segundo Apellido"
            id="lastname2"
            name="lastname2"
            auto="lastname2"
            value={persona.apellidoMaterno}
            class="data"
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
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Select title="Rol" options={userRol} value={rol.nombre} name="rol" />
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
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Nacionalidad"
            id="nationality"
            name="nationality"
            auto="nationality"
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
            id="phone"
            name="phone"
            auto="phone"
            value={persona.telefono}
            class="data"
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            label="Celular"
            id="cellphone"
            name="cellphone"
            auto="cellphone"
            value={persona.celular}
            class="data"
          />
        </Grid>
      </Grid>
      <ButtonsForm onconfirm={() => submit()} />
    </Grid>
  );
}

UserForm.propTypes = {
  user: PropTypes.objectOf.isRequired,
};
