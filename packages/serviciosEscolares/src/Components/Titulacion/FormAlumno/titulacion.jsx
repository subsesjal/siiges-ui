import {
  Divider, Grid, List, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  getData, InputFile, ListSubtitle, ListTitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';

export default function titulacion({ programaId }) {
  const [programa, setPrograma] = useState({});

  useEffect(() => {
    async function fetchPrograma() {
      const result = await getData({ endpoint: `/programas/${programaId}` });
      if (result.statusCode === 200) {
        setPrograma(result.data);
      }
    }

    if (programaId) {
      fetchPrograma();
    }
  }, [programaId]);

  return (
    <Grid container spacing={2} sx={{ m: 1 }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Datos del Programa
      </Typography>
      <Grid
        container
        rowSpacing={1}
        sx={{ my: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs>
          <List>
            <ListTitle text="Acuerdo de RVOE" />
            <ListTitle text="Nivel" />
            <ListTitle text="Nombre del Programa" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={programa.acuerdoRvoe} />
            <ListSubtitle text={programa?.nivel?.descripcion} />
            <ListSubtitle text={programa.nombre} />
          </List>
        </Grid>
        <Grid item xs>
          <List>
            <ListTitle text="Modalidad" />
            <ListTitle text="Periodo" />
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        <Grid item xs>
          <List>
            <ListSubtitle text={programa?.modalidad?.nombre} />
            <ListSubtitle text={programa?.ciclo?.nombre} />
          </List>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <InputFile label="XML de titulo electronico" tipoDocumento="" tipoEntidad="" />
      </Grid>
    </Grid>
  );
}

titulacion.propTypes = {
  programaId: PropTypes.number.isRequired,
};
