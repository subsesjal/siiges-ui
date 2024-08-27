import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import { InputNumber, getData } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlantelContext from '../utils/Context/plantelContext';

export default function DescripcionPlantel({ plantelesData, disabled }) {
  const {
    setForm,
    selectedCheckboxes,
    setSelectedCheckboxes,
    seguridad,
    setSeguridad,
  } = useContext(PlantelContext);

  useEffect(() => {
    const fetchData = async () => {
      if (plantelesData?.id) {
        try {
          const [nivelesResponse, seguridadResponse] = await Promise.all([
            getData({ endpoint: `/planteles/${plantelesData.id}/niveles`, query: '' }),
            getData({ endpoint: `/planteles/${plantelesData.id}/seguridad`, query: '' }),
          ]);
          if (nivelesResponse && nivelesResponse.data) {
            const nivelIds = nivelesResponse.data.map((nivel) => nivel.edificioNivelId);
            setSelectedCheckboxes(nivelIds.map((edificioNivelId) => ({ edificioNivelId })));
          }
          if (seguridadResponse && seguridadResponse.data && seguridadResponse.data.length > 0) {
            const seguridadData = seguridadResponse.data.map((sec, index) => ({
              plantelId: plantelesData.id,
              seguridadSistemaId: index + 1,
              cantidad: sec.cantidad || 0,
            }));
            setSeguridad(seguridadData);
          }
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
    };
    fetchData();
  }, [plantelesData]);

  const options = [
    { id: 1, nombre: 'Construido para escuela' },
    { id: 2, nombre: 'Adaptado' },
    { id: 3, nombre: 'Mixto' },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (
        prevSelectedCheckboxes.some(
          (checkbox) => checkbox.edificioNivelId === id,
        )
      ) {
        return prevSelectedCheckboxes.filter(
          (checkbox) => checkbox.edificioNivelId !== id,
        );
      }
      return [...prevSelectedCheckboxes, { edificioNivelId: id }];
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      2: {
        ...prevForm[2],
        [name]: value,
      },
    }));
  };

  const handleOnChangeSeguridad = (e, index) => {
    const { value } = e.target;

    setSeguridad((prevForm) => prevForm.map((item, i) => (i === index
      ? {
        ...item,
        seguridadSistemaId: i + 1,
        cantidad: parseInt(value, 10),
      }
      : item)));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Descripción del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <BasicSelect
            title="Características del inmueble"
            name="tipoInmuebleId"
            options={options}
            value={plantelesData?.tipoInmuebleId}
            onchange={handleOnChange}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <InputNumber
            id="dimensiones"
            label="Dimensiones del Plantel"
            name="dimensiones"
            auto="dimensiones"
            value={plantelesData?.dimensiones}
            onchange={handleOnChange}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Edificios y/o niveles</Typography>
          <FormGroup>
            {[
              { id: 10, label: 'Sótano' },
              { id: 20, label: 'Planta baja' },
              { id: 1, label: 'Primer piso' },
              { id: 2, label: 'Segundo piso' },
              { id: 3, label: 'Tercer piso' },
              { id: 4, label: 'Cuarto piso' },
            ].map((checkbox) => (
              <FormControlLabel
                key={checkbox.id}
                control={(
                  <Checkbox
                    checked={selectedCheckboxes.some(
                      (c) => c.edificioNivelId === checkbox.id,
                    )}
                    onChange={() => handleCheckboxChange(checkbox.id)}
                  />
                )}
                disabled={disabled}
                label={checkbox.label}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">Sistemas de seguridad</Typography>
          <InputNumber
            id="recubrimientosPlasticos"
            label="Recubrimientos plásticos en pisos y escalones"
            name="recubrimientosPlasticos"
            auto="recubrimientosPlasticos"
            value={seguridad[0]?.cantidad}
            onchange={(e) => handleOnChangeSeguridad(e, 0)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="alarmaIncendiosTerremotos"
            label="Alarma contra incendios y/o terremotos"
            name="alarmaIncendiosTerremotos"
            auto="alarmaIncendiosTerremotos"
            value={seguridad[1]?.cantidad}
            onchange={(e) => handleOnChangeSeguridad(e, 1)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="senalamientosEvacuacion"
            label="Señalamientos de evacuación"
            name="senalamientosEvacuacion"
            auto="senalamientosEvacuacion"
            value={seguridad[2]?.cantidad}
            onchange={(e) => handleOnChangeSeguridad(e, 2)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="botiquin"
            label="Botiquín"
            name="botiquin"
            auto="botiquin"
            value={seguridad[3]?.cantidad}
            onchange={(e) => handleOnChangeSeguridad(e, 3)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="escalerasEmergencia"
            label="Escaleras de emergencia"
            name="escalerasEmergencia"
            auto="escalerasEmergencia"
            value={seguridad[4]?.cantidad}
            onchange={(e) => handleOnChangeSeguridad(e, 4)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="areaSeguridad"
            label="Área de seguridad"
            name="areaSeguridad"
            auto="areaSeguridad"
            value={seguridad[5]?.cantidad}
            onchange={(e) => handleOnChangeSeguridad(e, 5)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="extintores"
            label="Extintores"
            name="extintores"
            auto="extintores"
            value={seguridad[6]?.cantidad}
            onchange={(e) => handleOnChangeSeguridad(e, 6)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="puntosReunionEvacuacion"
            label="Puntos de reunión para evacuación"
            name="puntosReunionEvacuacion"
            auto="puntosReunionEvacuacion"
            value={seguridad[7]?.cantidad}
            onchange={(e) => handleOnChangeSeguridad(e, 7)}
            required
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

DescripcionPlantel.propTypes = {
  disabled: PropTypes.bool.isRequired,
  plantelesData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tipoInmuebleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dimensiones: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};
