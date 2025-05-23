import { Grid } from '@mui/material';
import { Input, Select, Subtitle } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import validateField from '../../../utils/ValidateField';

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
  form,
  handleOnChange,
  estados,
  setNextDisabled,
  validateFields,
  disabled,
}) {
  const [municipios, setMunicipios] = useState([]);
  const [estadoId, setEstadoId] = useState('');
  const [municipiosDisabled, setMunicipiosDisabled] = useState(!estadoId);
  const [errors, setErrors] = useState({});

  const getNestedValue = (obj, path) => path
    .split('.')
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''),
      obj,
    );

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
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
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
          setMunicipios(
            data.data.filter(
              (municipio) => municipio.estadoId === parseInt(estadoId, 10),
            ),
          );
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
      try {
        const newErrors = {};
        let hasErrors = false;

        Object.keys(validationRules).forEach((fieldName) => {
          const value = getNestedValue(form, fieldName);
          const error = validateField(fieldName, value, validationRules);

          if (error) {
            newErrors[fieldName] = error;
            hasErrors = true;
          }
        });

        setErrors(newErrors);
        setNextDisabled(hasErrors);
      } catch (error) {
        console.error('Validation error:', error);
        setNextDisabled(true);
      }
    }
  }, [validateFields, form, setNextDisabled]);

  const getError = (path, name) => {
    try {
      const fieldName = [...path, name].join('.');
      return errors[fieldName] || '';
    } catch (error) {
      console.error('Error getting error message:', error);
      return '';
    }
  };

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
          disabled={municipiosDisabled || disabled}
          value={form.interesado?.persona?.domicilio?.municipioId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'persona', 'domicilio'])}
          required
          errorMessage={getError(
            ['interesado', 'persona', 'domicilio'],
            'municipioId',
          )}
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
