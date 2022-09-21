import { Grid, TextField, Typography } from '@mui/material';
import { InputFile } from '@siiges-ui/shared';
import React from 'react';

export default function TrayectoriaEducativa() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Trayectoria educativa</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            id="programaSeguimiento"
            label="Programa de seguimiento"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="funcionTutorial"
            label="Funcion tutorial"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tipoTutoria"
            label="tipo de tutoria"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="tipoEgreso"
            label="Tipo de egreso"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="estadisticasTitulacion"
            label="Estadisticas de titulacion"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="modalidadesTitulacion"
            label="Modalidades de titulacion"
            rows={4}
            multiline
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Informe de resultados" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Instrumentos o formatos utilizados para dar seguimiento al programa de trayectoria y tutoría académica" />
        </Grid>
        <Grid item xs={12}>
          <InputFile label="Trayectoria educativa y tutoría de los estudiantes (opcional)" />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            1. Incluir el acta de creación del comité tutorial
            <br />
            2. En caso de que los campos programa seguimiento, función tutorial,
            tipo tutoría, tasa egreso, estadísticas de titulación y modalidades
            de titulación incluyan cualquier tipo de ilustración o el texto sea
            demasiado incluya un resumen en los campos y suba su archivo
            completo tomando como referencia (Descargar plantilla).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
