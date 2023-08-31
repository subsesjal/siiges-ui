import { Grid, Typography } from '@mui/material';
import { InputNumber } from '@siiges-ui/shared';
import React, { useContext } from 'react';
import PlantelContext from '../utils/Context/plantelContext';
import formPrograma from '../utils/sections/forms/formPrograma';

export default function HigienePlantel() {
  const { form, setForm } = useContext(PlantelContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPrograma(name, value, setForm, 3);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Higiene del Plantel</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Sanitarios en todo el plantel para alumnos
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputNumber
            id="hombresAlumnos"
            label="Hombres"
            name="hombresAlumnos"
            auto="hombresAlumnos"
            value={form[3].hombresAlumnos || ''}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="mujeresAlumnos"
            label="Mujeres"
            name="mujeresAlumnos"
            auto="mujeresAlumnos"
            value={form[3].mujeresAlumnos || ''}
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          Sanitarios en todo el plantel para docentes y administrativos
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputNumber
            id="hombresDocentes"
            label="Hombres"
            name="hombresDocentes"
            auto="hombresDocentes"
            value={form[3].hombresDocentes || ''}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="mujeresDocentes"
            label="Mujeres"
            name="mujeresDocentes"
            auto="mujeresDocentes"
            value={form[3].mujeresDocentes || ''}
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Limpieza del plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputNumber
            id="personasLimpieza"
            label="Personas encargadas de la limpieza"
            name="personasLimpieza"
            auto="personasLimpieza"
            value={form[3].personasLimpieza || ''}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="cestosBasura"
            label="Cestos de basura"
            name="cestosBasura"
            auto="cestosBasura"
            value={form[3].cestosBasura || ''}
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Aulas</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputNumber
            id="numeroAulas"
            label="Numero de aulas"
            name="numeroAulas"
            auto="numeroAulas"
            value={form[3].numeroAulas || ''}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="butacasAula"
            label="Butacas por aula"
            name="butacasAula"
            auto="butacasAula"
            value={form[3].butacasAula || ''}
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Ventilacion</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputNumber
            id="ventanasAbrenPorAula"
            label="Ventanas que pueden abrirse por aula"
            name="ventanasAbrenPorAula"
            auto="ventanasAbrenPorAula"
            value={form[3].ventanasAbrenPorAula || ''}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="ventiladores"
            label="Ventiladores"
            name="ventiladores"
            auto="ventiladores"
            value={form[3].ventiladores || ''}
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="aireAcondicionado"
            label="Aire acondicionado"
            name="aireAcondicionado"
            auto="aireAcondicionado"
            value={form[3].aireAcondicionado || ''}
            onchange={handleOnChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
