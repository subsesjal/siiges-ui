import { Grid, Typography } from '@mui/material';
import { Select, Input, ButtonsForm } from '@siiges-ui/shared';
import React from 'react';
import { useRouter } from 'next/router';

export default function FormAlumno({ type, alumno }) {
  const router = useRouter();
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="body1">
        ¡Nota importante! El nombre del alumno se debe registrar tal y como
        aparece en el acta de nacimiento, en mayúsculas y en caso de tener
        acentos, omitirlos.
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Input
            id="nombre"
            label="Nombre"
            name="nombre"
            auto="nombre"
            onchange={() => {}}
            value={alumno?.nombre}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="apellidoPaterno"
            label="Apellido Paterno"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            onchange={() => {}}
            value={alumno?.apellidoPaterno}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="apellidoMaterno"
            label="Apellido Materno"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            onchange={() => {}}
            value={alumno?.apellidoMaterno}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="fechaNacimiento"
            label="Fecha de nacimiento"
            name="fechaNacimiento"
            auto="fechaNacimiento"
            onchange={() => {}}
            value={alumno?.fechaNacimiento}
            type="date"
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Sexo"
            name="sexo"
            value={alumno?.sexo}
            options={[]}
            onchange={() => {}}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Nacionalidad"
            name="nacionalidad"
            value={alumno?.nacionalidad}
            options={[]}
            onchange={() => {}}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="correo"
            label="Correo"
            name="correo"
            auto="correo"
            onchange={() => {}}
            value={alumno?.correo}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="telefono"
            label="Telefono"
            name="telefono"
            auto="telefono"
            onchange={() => {}}
            value={alumno?.telefono}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="celular"
            label="Celular"
            name="celular"
            auto="celular"
            onchange={() => {}}
            value={alumno?.celular}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="curp"
            label="CURP"
            name="curp"
            auto="curp"
            onchange={() => {}}
            value={alumno?.curp}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="matricula"
            label="Matricula"
            name="matricula"
            auto="matricula"
            onchange={() => {}}
            value={alumno?.matriculo}
          />
        </Grid>
        {type === 'edit' && (
          <Grid item xs={4}>
            <Input
              id="fechaRegistro"
              label="Fecha de registro"
              name="fechaRegistro"
              autoComplete="fechaRegistro"
              onChange={() => {}}
              value={alumno?.fechaRegistro}
              type="date"
              disabled
            />
          </Grid>
        )}
        <Grid item xs={4}>
          <Select
            title="Situación"
            name="situacion"
            value={alumno?.situacion}
            options={[]}
            onchange={() => {}}
          />
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={3}>
          <ButtonsForm confirm={() => {}} cancel={() => {router.back()}} />
        </Grid>
      </Grid>
    </div>
  );
}
