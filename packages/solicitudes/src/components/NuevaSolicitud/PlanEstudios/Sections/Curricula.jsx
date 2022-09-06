import { Grid, TextField, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React from 'react';

export default function Curricula() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Curricula</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="mapaCurricular"
            label="Mapa curricular"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="flexibilidadCurriular"
            label="Flexibilidad curriular"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="lineasGeneracionConocimiento"
            label="lineas de generacion del conocimiento"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="update"
            label="Actualizacion del plan de estudios"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="vinculation"
            label="Vinculacion con colegios de profesionista, academias profesionales entre otras"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={9}>
          <InputFile label="Mapa curricular" />
        </Grid>
        <Grid item xs={9}>
          <InputFile label="Reglas de operacion de las academias" />
        </Grid>
        <Grid item xs={9}>
          <InputFile label="Asignaturas a detalle" />
        </Grid>
        <Grid item xs={9}>
          <InputFile label="Propuesta hemerobibliografica" />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            1. Archivo que muestre de manera esquemática la distribución de las
            unidades de aprendizaje, secuencias (verticalidad y horizontalidad),
            flexibilidad para seleccionar trayectorias de estudio, número de
            unidades de aprendizaje por periodo lectivo (semestre o
            cuatrimestre), las unidades de aprendizaje obligatorias y optativas
            <br />
            2. Reglamento de academias o documento que contenga las reglas de
            operación de dichos cuerpos colegiados
            <br />
            3. Documento que describa a detalla cada asignatura (Descargar
            plantilla).
            <br />
            4. Documento en donde se especifique la hemerobibliografía por
            asignatura (Descargar plantilla).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
