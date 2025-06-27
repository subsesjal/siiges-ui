import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import validateField from '../../../utils/ValidateField';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

const tipoSolicitudesRev = [
  { id: 3, nombre: 'Parcial' },
  { id: 4, nombre: 'Total' },
  { id: 6, nombre: 'Duplicado' },
];

const tipoSolicitudesEquiv = [
  { id: 1, nombre: 'Parcial' },
  { id: 2, nombre: 'Total' },
  { id: 5, nombre: 'Duplicado' },
];

const TIPO_SOLICITUDES = {
  revalidacion: tipoSolicitudesRev,
  equivalencia: tipoSolicitudesEquiv,
};

const sexo = [
  { id: 1, nombre: 'Masculino' },
  { id: 2, nombre: 'Femenino' },
  { id: 3, nombre: 'Otro' },
];

// Validation rules configuration
const validationRules = {
  tipoTramiteId: {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.curp': {
    message: 'La CURP debe tener 18 caracteres',
    required: true,
    validate: (value) => value && value.length === 18,
  },
  'interesado.persona.nombre': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.apellidoPaterno': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.apellidoMaterno': {
    message: '',
    required: false,
  },
  'interesado.persona.nacionalidad': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.sexo': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.fechaNacimiento': {
    message: 'La fecha de nacimiento es requerida',
    required: true,
    validate: (value) => value && !Number.isNaN(Date.parse(value)),
  },
  'interesado.persona.domicilio.calle': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.domicilio.numeroExterior': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.domicilio.colonia': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.domicilio.estadoId': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.domicilio.municipioId': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.domicilio.codigoPostal': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.correoPrimario': {
    message: 'Ingrese un correo electrónico válido',
    required: true,
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  'interesado.persona.telefono': {
    message: 'Este campo es requerido',
    required: true,
  },
  'interesado.persona.celular': {
    message: 'Este campo es requerido',
    required: true,
  },
};

export default function DatosSolicitante({
  tipoSolicitud,
  form,
  handleOnChange,
  estados,
  disabled,
  validateFields,
  setNextDisabled,
}) {
  const [municipios, setMunicipios] = useState([]);
  const [estadoId, setEstadoId] = useState('');
  const [municipiosDisabled, setMunicipiosDisabled] = useState(!estadoId);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (form.interesado?.persona?.domicilio?.estadoId) {
      setEstadoId(form.interesado.persona.domicilio.estadoId);
      setMunicipiosDisabled(false);
    }
  }, [form.interesado?.persona?.domicilio?.estadoId]);

  const handleChange = (e, path) => {
    const { name, value } = e.target;
    const fieldName = [...path, name].join('.');

    handleOnChange(e, path);

    const error = validateField(fieldName, value, validationRules);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

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
          setMunicipios(data.data);
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
      const newErrors = {};
      let hasErrors = false;

      Object.keys(validationRules).forEach((fieldName) => {
        const value = fieldName
          .split('.')
          .reduce(
            (obj, key) => (obj && obj[key] !== undefined ? obj[key] : ''),
            form,
          );
        const error = validateField(fieldName, value, validationRules);

        if (error) {
          newErrors[fieldName] = error;
          hasErrors = true;
        }
      });

      setErrors(newErrors);
      setNextDisabled(hasErrors);
    }
  }, [validateFields, form, setNextDisabled]);

  const getError = (path, name) => {
    const fieldName = [...path, name].join('.');
    return errors[fieldName] || '';
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>{tipoSolicitud === 'revalidacion' ? 'Trámite de Revalidación' : 'Trámite de equivalencia'}</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Tipo de Solicitud"
          options={TIPO_SOLICITUDES[tipoSolicitud]}
          name="tipoTramiteId"
          value={form.tipoTramiteId || ''}
          onChange={(e) => handleChange(e, [])}
          required
          errorMessage={getError([], 'tipoTramiteId')}
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
          errorMessage={getError(['interesado', 'persona'], 'curp')}
          disabled={disabled}
          inputProps={{ maxLength: 18 }}
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
          errorMessage={getError(['interesado', 'persona'], 'nombre')}
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
          errorMessage={getError(['interesado', 'persona'], 'apellidoPaterno')}
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
          errorMessage={getError(['interesado', 'persona'], 'nacionalidad')}
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
          errorMessage={getError(['interesado', 'persona'], 'sexo')}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <InputDate
          label="Fecha de Nacimiento"
          name="fechaNacimiento"
          type="datetime"
          value={form.interesado?.persona?.fechaNacimiento || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona'])}
          required
          errorMessage={getError(['interesado', 'persona'], 'fechaNacimiento')}
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
          errorMessage={getError(
            ['interesado', 'persona', 'domicilio'],
            'calle',
          )}
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
          errorMessage={getError(
            ['interesado', 'persona', 'domicilio'],
            'numeroExterior',
          )}
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
          errorMessage={getError(
            ['interesado', 'persona', 'domicilio'],
            'colonia',
          )}
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
          errorMessage={getError(
            ['interesado', 'persona', 'domicilio'],
            'estadoId',
          )}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Municipio"
          name="municipioId"
          options={municipios}
          value={form.interesado?.persona?.domicilio?.municipioId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona', 'domicilio'])}
          required
          errorMessage={getError(
            ['interesado', 'persona', 'domicilio'],
            'municipioId',
          )}
          disabled={disabled || municipiosDisabled}
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
          errorMessage={getError(
            ['interesado', 'persona', 'domicilio'],
            'codigoPostal',
          )}
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
          errorMessage={getError(['interesado', 'persona'], 'correoPrimario')}
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
          errorMessage={getError(['interesado', 'persona'], 'telefono')}
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
          errorMessage={getError(['interesado', 'persona'], 'celular')}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}

DatosSolicitante.defaultProps = {
  handleOnChange: () => { },
  disabled: false,
  setNextDisabled: () => { },
  validateFields: false,
};

DatosSolicitante.propTypes = {
  tipoSolicitud: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  form: PropTypes.shape({
    tipoTramiteId: PropTypes.number,
    gradoAcademico: PropTypes.number,
    interesado: PropTypes.shape({
      persona: PropTypes.shape({
        curp: PropTypes.string,
        nombre: PropTypes.string,
        nacionalidad: PropTypes.string,
        sexo: PropTypes.string,
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
          estadoId: PropTypes.string,
          municipioId: PropTypes.string,
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
  validateFields: PropTypes.bool,
  setNextDisabled: PropTypes.func,
};
