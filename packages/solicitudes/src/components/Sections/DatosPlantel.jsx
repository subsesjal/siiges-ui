import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Typography } from '@mui/material';
import { Input } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import getPlantelesUsuario from '../utils/getPlantelesUsuario';
import PlantelContext from '../utils/Context/plantelContext';
import formPrograma from '../utils/sections/forms/formPrograma';

export default function DatosPlantel({
  disabled,
  plantelesData,
  setPlantelesData,
}) {
  const { planteles } = getPlantelesUsuario();
  const { setForm, plantelId } = useContext(PlantelContext);
  const [plantelesSelect, setPlantelesSelect] = useState([]);

  useEffect(() => {
    if (planteles) {
      const mappedPlanteles = planteles.map(({ id, domicilio }) => ({
        id,
        nombre: `${domicilio.calle} ${domicilio.numeroExterior}`,
      }));
      setPlantelesSelect(mappedPlanteles);
    }
  }, [planteles]);

  useEffect(() => {
    if (plantelId !== null && planteles) {
      const selectedPlantel = planteles.find(
        (plantel) => plantel.id === plantelId,
      );
      if (selectedPlantel) {
        setPlantelesData((prevData) => ({
          ...prevData,
          ...selectedPlantel,
          plantelId: plantelId.toString(),
        }));
      }
    }
  }, [plantelId, planteles]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    formPrograma(name, value, setForm, 1);
    if (value) {
      const selectedPlantel = planteles.find(
        (plantel) => plantel.id === Number(value),
      );
      setPlantelesData((prevData) => ({
        ...prevData,
        plantelId: value,
        ...selectedPlantel,
      }));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Datos del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={9}>
          <BasicSelect
            title="Plantel"
            name="plantelId"
            options={plantelesSelect}
            value={plantelId || ''}
            onchange={handleOnChange}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="cct"
            label="Clave de centro de trabajo"
            name="cct"
            auto="cct"
            value={plantelesData?.claveCentroTrebajo}
            disabled
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            id="phone1"
            label="Teléfono 1"
            name="phone1"
            auto="phone1"
            value={plantelesData?.telefono1}
            disabled
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            id="phone2"
            label="Teléfono 2"
            name="phone2"
            auto="phone2"
            value={plantelesData?.telefono2}
            disabled
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            id="phone3"
            label="Teléfono 3"
            name="phone3"
            auto="phone3"
            value={plantelesData?.telefono3}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="institutionEmail"
            label="Correo electrónico institucional"
            name="institutionEmail"
            auto="institutionEmail"
            value={plantelesData?.correo1}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="website"
            label="Página web"
            name="website"
            auto="website"
            value={plantelesData?.paginaWeb}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="email1"
            label="Correo electrónico sin dominio 1"
            name="email1"
            auto="email1"
            value={plantelesData?.correo2}
            disabled
          />
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <TextField
            id="socialNetwork"
            label="Redes sociales"
            rows={3}
            multiline
            sx={{ width: '100%' }}
            value={plantelesData?.redesSociales}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="email2"
            label="Correo electrónico sin dominio 2"
            name="email2"
            auto="email2"
            value={plantelesData?.correo3}
            disabled
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Ubicación del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input
            id="street"
            label="Calle"
            name="street"
            auto="street"
            value={plantelesData?.domicilio?.calle}
            disabled
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="numExt"
            label="Número exterior"
            name="numExt"
            auto="numExt"
            value={plantelesData?.domicilio?.numeroExterior}
            disabled
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="numInt"
            label="Número interor"
            name="numInt"
            auto="numInt"
            value={plantelesData?.domicilio?.numeroInterior}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="colony"
            label="Colonia"
            name="colony"
            auto="colony"
            value={plantelesData?.domicilio?.colonia}
            disabled
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="CP"
            label="Código Postal"
            name="CP"
            auto="CP"
            value={plantelesData?.domicilio?.codigoPostal}
            disabled
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="municipio"
            label="Municipio"
            name="municipio"
            auto="municipio"
            value={plantelesData?.domicilio?.municipio?.nombre}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="coordinates"
            label="Coordenadas"
            name="coordinates"
            auto="coordinates"
            value={`${plantelesData?.domicilio?.latitud}, ${plantelesData?.domicilio?.longitud}`}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="especifications"
            label="Especificaciones"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            disabled
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

DatosPlantel.propTypes = {
  disabled: PropTypes.bool.isRequired,
  plantelesData: PropTypes.shape({
    claveCentroTrebajo: PropTypes.string,
    telefono1: PropTypes.string,
    telefono2: PropTypes.string,
    telefono3: PropTypes.string,
    correo1: PropTypes.string,
    paginaWeb: PropTypes.string,
    correo2: PropTypes.string,
    redesSociales: PropTypes.string,
    correo3: PropTypes.string,
    domicilio: PropTypes.shape({
      calle: PropTypes.string,
      numeroExterior: PropTypes.string,
      numeroInterior: PropTypes.string,
      colonia: PropTypes.string,
      codigoPostal: PropTypes.number,
      municipio: PropTypes.shape({
        nombre: PropTypes.string,
      }),
      latitud: PropTypes.string,
      longitud: PropTypes.string,
    }),
  }).isRequired,
  setPlantelesData: PropTypes.func.isRequired,
};
