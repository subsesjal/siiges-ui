import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import { InputNumber } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import formPrograma from '../utils/sections/forms/formPrograma';
import PlantelContext from '../utils/Context/plantelContext';

export default function DescripcionPlantel({ plantelesData, disabled }) {
  const options = [
    { id: 1, nombre: 'Construido para escuela' },
    { id: 2, nombre: 'Adaptado' },
    { id: 3, nombre: 'Mixto' },
  ];

  const {
    form,
    setForm,
    selectedCheckboxes,
    setSelectedCheckboxes,
    seguridad,
    setSeguridad,
  } = useContext(PlantelContext);
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
    formPrograma(name, value, setForm, 2);
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
            title="Caracteristicas del inmueble"
            name="caracteristicas"
            options={options}
            value={plantelesData?.tipoInmuebleId || ''}
            onchange={handleOnChange}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <InputNumber
            id="dimencionesPlantel"
            label="Dimenciones del Plantel"
            name="dimencionesPlantel"
            auto="dimencionesPlantel"
            value={form[2].dimencionesPlantel || ''}
            onchange={handleOnChange}
            required
            negative
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Edificios y/o niveles</Typography>
          <FormGroup>
            {[
              { id: 10, label: 'Sotano' },
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
            label="Recubrimientos plasticos en pisos y escalones"
            name="recubrimientosPlasticos"
            auto="recubrimientosPlasticos"
            value={seguridad[0].cantidad || ''}
            onchange={(e) => handleOnChangeSeguridad(e, 0)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="alarmaIncendiosTerremotos"
            label="Alarma contra incendios y/o terremotos"
            name="alarmaIncendiosTerremotos"
            auto="alarmaIncendiosTerremotos"
            value={seguridad[1].cantidad || ''}
            onchange={(e) => handleOnChangeSeguridad(e, 1)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="senalamientosEvacuacion"
            label="Señalamientos de evacuacion"
            name="senalamientosEvacuacion"
            auto="senalamientosEvacuacion"
            value={seguridad[2].cantidad || ''}
            onchange={(e) => handleOnChangeSeguridad(e, 2)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="botiquin"
            label="Botiquin"
            name="botiquin"
            auto="botiquin"
            value={seguridad[3].cantidad || ''}
            onchange={(e) => handleOnChangeSeguridad(e, 3)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="escalerasEmergencia"
            label="Escaleras de emergencia"
            name="escalerasEmergencia"
            auto="escalerasEmergencia"
            value={seguridad[4].cantidad || ''}
            onchange={(e) => handleOnChangeSeguridad(e, 4)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="areaSeguridad"
            label="Area de seguridad"
            name="areaSeguridad"
            auto="areaSeguridad"
            value={seguridad[5].cantidad || ''}
            onchange={(e) => handleOnChangeSeguridad(e, 5)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="extintores"
            label="Extintores"
            name="extintores"
            auto="extintores"
            value={seguridad[6].cantidad || ''}
            onchange={(e) => handleOnChangeSeguridad(e, 6)}
            required
            disabled={disabled}
          />
          <InputNumber
            id="puntosReunionEvacuacion"
            label="Puntos de reunion para evacuacion"
            name="puntosReunionEvacuacion"
            auto="puntosReunionEvacuacion"
            value={seguridad[7].cantidad || ''}
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
  plantelesData: PropTypes.objectOf(PropTypes.string).isRequired,
};
