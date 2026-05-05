import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  ButtonsForm, Input, useUI,
} from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import { useRouter } from 'next/router';
import getMunicipios from '../../utils/getMunicipios';
import submitNewPlantel from '../../utils/submitNewPlantel';
import plantelErrors from '../../utils/plantelErrors';
import formPlantel from '../../utils/formPlantel';
import submitEditPlantel from '../../utils/submitEditPlantel';

export default function PlantelNewForm({ plantel }) {
  const router = useRouter();
  const { setNoti, setLoading } = useUI();
  const [form, setForm] = useState({
    domicilio: { estadoId: 14 },
    director: { persona: {} },
  });
  const [error, setError] = useState({});
  const { municipios } = getMunicipios();
  const [confirmDisabled, setConfirmDisabled] = useState(false);

  const errors = plantelErrors(form, setError);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    formPlantel(name, form, setForm, value);

    if (errors[name]) {
      errors[name](value);
    }
  };

  const inmuebles = [
    { id: 1, nombre: 'Construido' },
    { id: 2, nombre: 'Adaptado' },
    { id: 3, nombre: 'Mixto' },
  ];

  const sexo = [
    { id: 'masculino', nombre: 'Masculino' },
    { id: 'femenino', nombre: 'Femenino' },
    { id: 'prefiero no decirlo', nombre: 'Prefiero no decirlo' },
  ];

  const handleSubmit = async () => {
    try {
      setConfirmDisabled(true);

      if (plantel) {
        await submitEditPlantel({
          form,
          setNoti,
          setLoading,
        });
      } else {
        await submitNewPlantel({
          errors,
          form,
          setNoti,
          setLoading,
        });
      }
    } finally {
      setConfirmDisabled(false);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Domicilio
      </Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              label="Calle"
              id="calle"
              name="calle"
              auto="calle"
              value={plantel
                ? plantel.domicilio.calle
                : ''}
              onChange={handleOnChange}
              errorMessage={error.calle}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Número exterior"
              id="numeroExterior"
              name="numeroExterior"
              auto="numeroExterior"
              value={plantel
                ? plantel.domicilio.numeroExterior
                : ''}
              onChange={handleOnChange}
              errorMessage={error.numeroExterior}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Número interior"
              id="numeroInterior"
              name="numeroInterior"
              auto="numeroInterior"
              value={plantel
                ? plantel.domicilio.numeroInterior
                : ''}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Colonia"
              id="colonia"
              name="colonia"
              auto="colonia"
              value={plantel
                ? plantel.domicilio.colonia
                : ''}
              onChange={handleOnChange}
              errorMessage={error.colonia}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Código Postal"
              id="codigoPostal"
              name="codigoPostal"
              auto="codigoPostal"
              value={plantel
                ? plantel.domicilio.codigoPostal
                : ''}
              onChange={handleOnChange}
              errorMessage={error.codigoPostal}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <BasicSelect
              title="Municipio"
              name="municipioId"
              value={plantel
                ? plantel.domicilio.municipioId
                : ''}
              options={municipios}
              onChange={handleOnChange}
              errorMessage={error.municipioId}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <BasicSelect
              title="Tipo de inmueble"
              name="tipoInmuebleId"
              value={plantel
                ? plantel.tipoInmuebleId
                : ''}
              options={inmuebles}
              onChange={handleOnChange}
              errorMessage={error.tipoInmuebleId}
              required
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Datos Generales</Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Correo institucional"
              id="correo1"
              name="correo1"
              auto="correo1"
              value={plantel
                ? plantel.correo1
                : ''}
              onChange={handleOnChange}
              errorMessage={error.correo1}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo de contacto"
              id="correo2"
              name="correo2"
              auto="correo2"
              value={plantel
                ? plantel.correo2
                : ''}
              onChange={handleOnChange}
              errorMessage={error.correo2}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Correo secundario"
              id="correo3"
              name="correo3"
              auto="correo3"
              value={plantel
                ? plantel.correo3
                : ''}
              onChange={handleOnChange}
              errorMessage={error.correo3}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Teléfono 1"
              id="telefono1"
              name="telefono1"
              auto="telefono1"
              value={plantel
                ? plantel.telefono1
                : ''}
              onChange={handleOnChange}
              errorMessage={error.telefono1}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Teléfono 2"
              id="telefono2"
              name="telefono2"
              auto="telefono2"
              value={plantel
                ? plantel.telefono2
                : ''}
              onChange={handleOnChange}
              errorMessage={error.telefono2}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Teléfono 3"
              id="telefono3"
              name="telefono3"
              auto="telefono3"
              value={plantel
                ? plantel.telefono3
                : ''}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input
              label="Clave de centro de trabajo"
              id="claveCentroTrabajo"
              name="claveCentroTrabajo"
              auto="claveCentroTrabajo"
              value={plantel
                ? plantel.claveCentroTrabajo
                : ''}
              onChange={handleOnChange}
              errorMessage={error.claveCentroTrabajo}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Página Web"
              id="paginaWeb"
              name="paginaWeb"
              auto="paginaWeb"
              value={plantel
                ? plantel.paginaWeb
                : ''}
              onChange={handleOnChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Redes sociales"
              id="redeSociales"
              name="redesSociales"
              auto="redesSociales"
              value={plantel
                ? plantel.redesSociales
                : ''}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6">Datos director</Typography>
      <Grid item sx={{ ml: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              label="Nombre(s)"
              id="nombre"
              name="nombre"
              auto="nombre"
              value={plantel
                ? plantel.directores[0]?.persona.nombre
                : ''}
              onChange={handleOnChange}
              errorMessage={error.nombre}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Primer Apellido"
              id="apellidoPaterno"
              name="apellidoPaterno"
              auto="apellidoPaterno"
              value={plantel
                ? plantel.directores[0]?.persona.apellidoPaterno
                : ''}
              onChange={handleOnChange}
              errorMessage={error.apellidoPaterno}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Segundo Apellido"
              id="apellidoMaterno"
              name="apellidoMaterno"
              auto="apellidoMaterno"
              value={plantel
                ? plantel.directores[0]?.persona.apellidoMaterno
                : ''}
              onChange={handleOnChange}
              errorMessage={error.apellidoMaterno}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="Nacionalidad"
              id="nacionalidad"
              name="nacionalidad"
              auto="nacionalidad"
              value={plantel
                ? plantel.directores[0]?.persona.nacionalidad
                : ''}
              onChange={handleOnChange}
              errorMessage={error.nacionalidad}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              label="CURP"
              id="curp"
              name="curp"
              auto="curp"
              value={plantel
                ? plantel.directores[0]?.persona.curp
                : ''}
              onChange={handleOnChange}
              errorMessage={error.curp}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <BasicSelect
              title="Género"
              name="sexo"
              value={plantel
                ? plantel.directores[0]?.persona.sexo
                : ''}
              options={sexo}
              onChange={handleOnChange}
              errorMessage={error.sexo}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label="Correo electrónico"
              id="correoPrimario"
              name="correoPrimario"
              auto="correoPrimario"
              value={plantel
                ? plantel.directores[0]?.persona.correoPrimario
                : ''}
              onChange={handleOnChange}
              errorMessage={error.correoPrimario}
              required
            />
          </Grid>
        </Grid>
        <ButtonsForm
          cancel={router.back}
          confirm={handleSubmit}
          confirmDisabled={confirmDisabled}
        />
      </Grid>
    </>
  );
}

PlantelNewForm.defaultProps = {
  plantel: null,
};

PlantelNewForm.propTypes = {
  plantel: PropTypes.shape({
    domicilio: PropTypes.shape({
      id: PropTypes.number,
      calle: PropTypes.string,
      numeroExterior: PropTypes.string,
      numeroInterior: PropTypes.string,
      colonia: PropTypes.string,
      codigoPostal: PropTypes.number,
      municipioId: PropTypes.number,
      tipoInmuebleId: PropTypes.number,
    }),
    institucionId: PropTypes.number,
    id: PropTypes.number,
    tipoInmuebleId: PropTypes.number,
    correo1: PropTypes.string,
    correo2: PropTypes.string,
    correo3: PropTypes.string,
    telefono1: PropTypes.string,
    telefono2: PropTypes.string,
    telefono3: PropTypes.string,
    paginaWeb: PropTypes.string,
    redesSociales: PropTypes.string,
    claveCentroTrabajo: PropTypes.string,
    directores: PropTypes.arrayOf(
      PropTypes.shape({
        persona: PropTypes.shape({
          id: PropTypes.number,
          nombre: PropTypes.string,
          curp: PropTypes.string,
          apellidoPaterno: PropTypes.string,
          apellidoMaterno: PropTypes.string,
          sexo: PropTypes.string,
          nacionalidad: PropTypes.string,
          correoPrimario: PropTypes.string,
        }),
      }),
    ),
  }),
};
