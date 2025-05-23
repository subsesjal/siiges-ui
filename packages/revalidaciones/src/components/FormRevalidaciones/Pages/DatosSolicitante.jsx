import { Grid } from '@mui/material';
import { Input, Select, Subtitle } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

const tipoSolicitudes = [
  { id: 3, nombre: 'Parcial' },
  { id: 4, nombre: 'Total' },
  { id: 6, nombre: 'Duplicado' },
];

const sexo = [
  { id: 1, nombre: 'Masculino' },
  { id: 2, nombre: 'Femenino' },
  { id: 3, nombre: 'Otro' },
];

export default function DatosSolicitante({
  form, handleOnChange, estados, setNextDisabled, validateFields, disabled,
}) {
  const [municipios, setMunicipios] = useState([]);
  const [estadoId, setEstadoId] = useState('');
  const [municipiosDisabled, setMunicipiosDisabled] = useState(!estadoId);

  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (form.interesado?.persona?.domicilio?.estadoId) {
      setEstadoId(form.interesado.persona.domicilio.estadoId);
      setMunicipiosDisabled(false);
    }
  }, [form.interesado?.persona?.domicilio?.estadoId]);

  const handleChange = (e, path) => {
    const { name } = e.target;
    handleOnChange(e, path);

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const validateField = (value, required, fieldName) => (
    touched[fieldName] && required && !value ? '¡Este campo es requerido!' : ''
  );

  useEffect(() => {
    const fetchMunicipios = async () => {
      if (estadoId) {
        try {
          const response = await fetch(
            `${domain}/api/v1/public/municipios/?estadoId=${estadoId}`,
            {
              headers: {
                api_key: apiKey,
                'Content-Type': 'application/json',
              },
            },
          );
          const data = await response.json();
          setMunicipios(data.data.filter(
            (municipio) => municipio.estadoId === parseInt(estadoId, 10),
          ));
        } catch (error) {
          console.error('¡Error al buscar municipios!:', error);
        }
      }
    };

    fetchMunicipios();
  }, [estadoId]);

  const handleEstadoChange = (event) => {
    const selectedEstadoId = event.target.value;
    setEstadoId(selectedEstadoId);
    setMunicipiosDisabled(!selectedEstadoId);
    handleChange(event, ['interesado', 'persona', 'domicilio']);
  };

  useEffect(() => {
    if (validateFields) {
      const requiredFields = [
        { path: ['tipoTramiteId'], value: form.tipoTramiteId },
        { path: ['interesado', 'persona', 'curp'], value: form.interesado.persona.curp },
        { path: ['interesado', 'persona', 'nombre'], value: form.interesado.persona.nombre },
        { path: ['interesado', 'persona', 'apellidoPaterno'], value: form.interesado.persona.apellidoPaterno },
        { path: ['interesado', 'persona', 'nacionalidad'], value: form.interesado.persona.nacionalidad },
        { path: ['interesado', 'persona', 'sexo'], value: form.interesado.persona.sexo },
        { path: ['interesado', 'persona', 'domicilio', 'calle'], value: form.interesado.persona.domicilio.calle },
        { path: ['interesado', 'persona', 'domicilio', 'numeroExterior'], value: form.interesado.persona.domicilio.numeroExterior },
        { path: ['interesado', 'persona', 'domicilio', 'colonia'], value: form.interesado.persona.domicilio.colonia },
        { path: ['interesado', 'persona', 'domicilio', 'estadoId'], value: estadoId },
        { path: ['interesado', 'persona', 'domicilio', 'municipioId'], value: form.interesado.persona.domicilio.municipioId },
        { path: ['interesado', 'persona', 'domicilio', 'codigoPostal'], value: form.interesado.persona.domicilio.codigoPostal },
        { path: ['interesado', 'persona', 'correoPrimario'], value: form.interesado.persona.correoPrimario },
        { path: ['interesado', 'persona', 'telefono'], value: form.interesado.persona.telefono },
        { path: ['interesado', 'persona', 'celular'], value: form.interesado.persona.celular },
      ];

      const isAnyFieldEmpty = requiredFields.some((field) => {
        if (Array.isArray(field.value)) {
          return field.value.length === 0;
        }
        return !field.value;
      });

      setNextDisabled(false);

      if (isAnyFieldEmpty) {
        const newTouched = {};
        requiredFields.forEach((field) => {
          newTouched[field.path[field.path.length - 1]] = true;
        });
        setTouched(newTouched);
      }
    }
  }, [validateFields]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>Trámite de Equivalencia</Subtitle>
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Tipo de Solicitud"
          options={tipoSolicitudes}
          name="tipoTramiteId"
          value={form.tipoTramiteId || ''}
          onChange={(e) => handleChange(e, [])}
          required
          errorMessage={validateField(form.tipoTramiteId, true, 'tipoTramiteId')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Datos del Solicitante</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input
          id="curp"
          label="CURP"
          name="curp"
          value={form.interesado?.persona?.curp || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={validateField(form.interesado?.persona?.curp, true, 'curp')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="nombre"
          label="Nombre"
          name="nombre"
          value={form.interesado?.persona?.nombre || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={validateField(form.interesado?.persona?.nombre, true, 'nombre')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="apellidoPaterno"
          label="Primer Apellido"
          name="apellidoPaterno"
          value={form.interesado?.persona?.apellidoPaterno || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={validateField(form.interesado?.persona?.apellidoPaterno, true, 'apellidoPaterno')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="apellidoMaterno"
          label="Segundo Apellido"
          name="apellidoMaterno"
          value={form.interesado?.persona?.apellidoMaterno || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="nacionalidad"
          label="Nacionalidad"
          name="nacionalidad"
          value={form.interesado?.persona?.nacionalidad || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={validateField(form.interesado?.persona?.nacionalidad, true, 'nacionalidad')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          id="sexo"
          title="Sexo"
          options={sexo}
          name="sexo"
          value={form.interesado?.persona?.sexo || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={validateField(form.interesado?.persona?.sexo, true, 'sexo')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Dirección</Subtitle>
      </Grid>
      <Grid item xs={9}>
        <Input
          name="calle"
          id="calle"
          label="Calle"
          value={form.interesado?.persona?.domicilio?.calle || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona', 'domicilio'])}
          required
          errorMessage={validateField(form.interesado?.persona?.domicilio?.calle, true, 'calle')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="numeroExterior"
          id="numeroExterior"
          label="Número Exterior"
          value={form.interesado?.persona?.domicilio?.numeroExterior || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona', 'domicilio'])}
          required
          errorMessage={validateField(form.interesado?.persona?.domicilio?.numeroExterior, true, 'numeroExterior')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="colonia"
          id="colonia"
          label="Colonia"
          value={form.interesado?.persona?.domicilio?.colonia || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona', 'domicilio'])}
          required
          errorMessage={validateField(form.interesado?.persona?.domicilio?.colonia, true, 'colonia')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Estados"
          name="estadoId"
          options={estados}
          value={estadoId}
          onChange={handleEstadoChange}
          required
          errorMessage={validateField(estadoId, true, 'estadoId')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Municipio"
          name="municipioId"
          options={municipios}
          disabled={municipiosDisabled || disabled}
          value={form.interesado?.persona?.domicilio?.municipioId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona', 'domicilio'])}
          required
          errorMessage={validateField(form.interesado?.persona?.domicilio?.municipioId, true, 'municipioId')}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="codigoPostal"
          id="codigoPostal"
          label="Código Postal"
          value={form.interesado?.persona?.domicilio?.codigoPostal || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona', 'domicilio'])}
          required
          errorMessage={validateField(form.interesado?.persona?.domicilio?.codigoPostal, true, 'codigoPostal')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Contacto</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input
          name="correoPrimario"
          id="correoPrimario"
          label="Correo de Contacto"
          value={form.interesado?.persona?.correoPrimario || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={validateField(form.interesado?.persona?.correoPrimario, true, 'correoPrimario')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="telefono"
          id="telefono"
          label="Teléfono de Contacto"
          value={form.interesado?.persona?.telefono || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={validateField(form.interesado?.persona?.telefono, true, 'telefono')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          name="celular"
          id="celular"
          label="Celular"
          value={form.interesado?.persona?.celular || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={validateField(form.interesado?.persona?.celular, true, 'celular')}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}

DatosSolicitante.defaultProps = {
  disabled: false,
  handleOnChange: () => {},
  setNextDisabled: () => {},
  validateFields: false,
};

DatosSolicitante.propTypes = {
  validateFields: PropTypes.bool,
  setNextDisabled: PropTypes.func,
  form: PropTypes.shape({
    tipoTramiteId: PropTypes.number,
    gradoAcademico: PropTypes.number,
    interesado: PropTypes.shape({
      persona: PropTypes.shape({
        curp: PropTypes.string,
        nombre: PropTypes.string,
        nacionalidad: PropTypes.string,
        sexo: PropTypes.number,
        apellidoPaterno: PropTypes.string,
        apellidoMaterno: PropTypes.string,
        fechaNacimiento: PropTypes.string,
        correoPrimario: PropTypes.string,
        telefono: PropTypes.string,
        celular: PropTypes.string,
        domicilio: PropTypes.shape({
          calle: PropTypes.string,
          numeroExterior: PropTypes.string,
          colonia: PropTypes.string,
          estadoId: PropTypes.number,
          municipioId: PropTypes.number,
          codigoPostal: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
  handleOnChange: PropTypes.func,
  estados: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
  disabled: PropTypes.bool,
};
