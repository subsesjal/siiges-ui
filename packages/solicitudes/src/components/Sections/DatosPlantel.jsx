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
  type,
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
            id="claveCentroTrabajo"
            label="Clave de centro de trabajo"
            name="claveCentroTrabajo"
            auto="claveCentroTrabajo"
            value={plantelesData?.claveCentroTrabajo}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            id="telefono1"
            label="Teléfono 1"
            name="telefono1"
            auto="telefono1"
            value={plantelesData?.telefono1}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            id="telefono2"
            label="Teléfono 2"
            name="telefono2"
            auto="telefono2"
            value={plantelesData?.telefono2}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={2}>
          <Input
            id="telefono3"
            label="Teléfono 3"
            name="telefono3"
            auto="telefono3"
            value={plantelesData?.telefono3}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="correo1"
            label="Correo Electrónico Institucional"
            name="correo1"
            auto="correo1"
            value={plantelesData?.correo1}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="paginaWeb"
            label="Página web"
            name="paginaWeb"
            auto="paginaWeb"
            value={plantelesData?.paginaWeb}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="correo2"
            label="Correo electrónico sin dominio 1"
            name="correo2"
            auto="correo2"
            value={plantelesData?.correo2}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
          <Input
            id="redesSociales"
            label="Redes sociales"
            name="redesSociales"
            auto="redesSociales"
            rows={3}
            multiline
            sx={{ width: '100%' }}
            value={plantelesData?.redesSociales}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="correo3"
            label="Correo electrónico sin dominio 2"
            name="correo3"
            auto="correo3"
            value={plantelesData?.correo3}
            disabled={disabled}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Ubicación del Plantel</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ ml: 15, width: '100%' }}>
        <Grid item xs={6}>
          <Input
            id="calle"
            label="Calle"
            name="calle"
            auto="calle"
            value={plantelesData?.domicilio?.calle}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="numeroExterior"
            label="Número exterior"
            name="numeroExterior"
            auto="numeroExterior"
            value={plantelesData?.domicilio?.numeroExterior}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="numeroInterior"
            label="Número interor"
            name="numeroInterior"
            auto="numeroInterior"
            value={plantelesData?.domicilio?.numeroInterior}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="colonia"
            label="Colonia"
            name="colonia"
            auto="colonia"
            value={plantelesData?.domicilio?.colonia}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="codigoPostal"
            label="Código Postal"
            name="codigoPostal"
            auto="codigoPostal"
            value={plantelesData?.domicilio?.codigoPostal}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="nombre"
            label="Municipio"
            name="municipio"
            auto="municipio"
            value={plantelesData?.domicilio?.municipio?.nombre}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="longitud"
            label="Coordenadas"
            name="longitud"
            auto="longitud"
            value={`${plantelesData?.domicilio?.latitud}, ${plantelesData?.domicilio?.longitud}`}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="especificaciones"
            label="Especificaciones"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

DatosPlantel.propTypes = {
  disabled: PropTypes.bool.isRequired,
  plantelesData: PropTypes.shape({
    claveCentroTrabajo: PropTypes.string,
    telefono1: PropTypes.string,
    telefono2: PropTypes.string,
    telefono3: PropTypes.string,
    correo1: PropTypes.string,
    paginaWeb: PropTypes.string,
    correo2: PropTypes.string,
    redesSociales: PropTypes.string,
    type: PropTypes.string,
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
