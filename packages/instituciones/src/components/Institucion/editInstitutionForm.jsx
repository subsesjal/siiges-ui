import { Grid, TextField, Typography } from '@mui/material';
import { Input, InputFile } from '@siiges-ui/shared';

import PropTypes from 'prop-types';
import Image from 'next/image';
import React from 'react';

export default function EditInstitutionForm({ data }) {
  return (
    <Grid container>
      <Grid item xs={4} sx={{ textAlign: 'center', marginTop: 10 }}>
        <Image
          alt="logoschool"
          src="/logoschool.png"
          quality={100}
          width="300px"
          height="300px"
          style={{
            zIndex: 1,
            overflow: 'hidden',
          }}
        />
      </Grid>
      <Grid item xs={8} sx={{ marginTop: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Input
              label="Nombre de institución"
              id="nombreInstitucion"
              name="nombreInstitucion"
              auto="nombreInstitucion"
              required
              class="data"
              value={data.nombre}
            />
          </Grid>
          <Grid item xs={8}>
            <Input
              label="Razón social"
              id="razonSocial"
              name="razonSocial"
              auto="razonSocial"
              required
              class="data"
              value={data.razonSocial}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="historiaInstitucion"
              label="Histroria de la institución"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              value={data.historia}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="vision"
              label="Visión"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              value={data.vision}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mision"
              label="Misión"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              value={data.mision}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="valoresInstitucionales"
              label="Valores Institucionales"
              rows={4}
              multiline
              sx={{ width: '100%' }}
              value={data.valoresInstitucional}
            />
          </Grid>
          <Grid item xs={8}>
            <InputFile label="Acta constitutiva de la institución" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Datos generales del rector</Typography>
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Nombre(s)"
              id="nombre"
              name="nombre"
              auto="nombre"
              required
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Paterno"
              id="apellidoPaterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              required
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Apellido Materno"
              id="apellidoMaterno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              required
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Nacionalidad"
              id="nacionalidad"
              name="nacionalidad"
              auto="nacionalidad"
              required
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="CURP"
              id="curp"
              name="curp"
              auto="curp"
              required
              class="data"
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Genero"
              id="genero"
              name="genero"
              auto="genero"
              required
              class="data"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo electronico"
              id="correo"
              name="correo"
              auto="correo"
              required
              class="data"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

EditInstitutionForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucional: PropTypes.string,
  }).isRequired,
};
