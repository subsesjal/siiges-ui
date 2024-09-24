import { Grid, Typography } from '@mui/material';
import { InputNumber, getData } from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import PlantelContext from '../utils/Context/plantelContext';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function HigienePlantel({ disabled }) {
  const { form, setForm, plantelId } = useContext(PlantelContext);
  const [loading, setLoading] = useState(true);

  const isSectionDisabled = useSectionDisabled(16);

  const isDisabled = disabled || isSectionDisabled;

  useEffect(() => {
    if (plantelId) {
      getData({ endpoint: `/planteles/${plantelId}/higienes` })
        .then((data) => {
          if (data && data.data.length > 0) {
            const sortedData = data.data.sort(
              (a, b) => a.higieneId - b.higieneId,
            );
            const filledData = new Array(11).fill(null).map((_, index) => {
              const item = sortedData[index];
              return {
                higieneId: item ? item.higieneId : index + 1,
                cantidad: item ? item.cantidad : 0,
              };
            });
            setForm((prevForm) => ({
              ...prevForm,
              3: filledData,
            }));
          } else {
            setForm((prevForm) => ({
              ...prevForm,
              3: new Array(11).fill(null).map((_, index) => ({
                higieneId: index + 1,
                cantidad: 0,
              })),
            }));
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching higiene data:', error);
          setLoading(false);
        });
    }
  }, [plantelId]);

  if (loading) {
    return <CircularProgress />;
  }

  const handleOnChange = (e, index) => {
    const { value } = e.target;

    setForm((prevForm) => {
      const updatedForm = { ...prevForm };
      updatedForm[3] = updatedForm[3].map((item, i) => {
        if (i === index) {
          return {
            higieneId: i + 1,
            cantidad: parseInt(value, 10),
          };
        }
        return item;
      });
      return updatedForm;
    });
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
            value={form[3][0]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 0)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="mujeresAlumnos"
            label="Mujeres"
            name="mujeresAlumnos"
            auto="mujeresAlumnos"
            value={form[3][1]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 1)}
            disabled={isDisabled}
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
            value={form[3][2]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 2)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="mujeresDocentes"
            label="Mujeres"
            name="mujeresDocentes"
            auto="mujeresDocentes"
            value={form[3][3]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 3)}
            disabled={isDisabled}
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
            value={form[3][4]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 4)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="cestosBasura"
            label="Cestos de basura"
            name="cestosBasura"
            auto="cestosBasura"
            value={form[3][5]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 5)}
            disabled={isDisabled}
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
            label="Número de aulas"
            name="numeroAulas"
            auto="numeroAulas"
            value={form[3][6]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 6)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="butacasAula"
            label="Butacas por aula"
            name="butacasAula"
            auto="butacasAula"
            value={form[3][7]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 7)}
            disabled={isDisabled}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Ventilación</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={12}>
          <InputNumber
            id="ventanasAbrenPorAula"
            label="Ventanas que pueden abrirse por aula"
            name="ventanasAbrenPorAula"
            auto="ventanasAbrenPorAula"
            value={form[3][8]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 8)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="ventiladores"
            label="Ventiladores"
            name="ventiladores"
            auto="ventiladores"
            value={form[3][9]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 9)}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <InputNumber
            id="aireAcondicionado"
            label="Aire acondicionado"
            name="aireAcondicionado"
            auto="aireAcondicionado"
            value={form[3][10]?.cantidad || ''}
            onchange={(e) => handleOnChange(e, 10)}
            disabled={isDisabled}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

HigienePlantel.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
