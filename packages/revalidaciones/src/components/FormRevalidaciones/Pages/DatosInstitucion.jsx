import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, {
  useEffect, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../../utils/FetchData';

const domain = process.env.NEXT_PUBLIC_URL;

const PROCEEDING_INSTITUTION_FIELDS = [
  {
    id: 'nombreInstitucion',
    label: 'Nombre de la Institución',
    name: 'nombre',
    path: ['interesado', 'institucionProcedencia'],
    xs: 6,
    required: true,
  },
  {
    id: 'nombreCarrera',
    label: 'Nombre de la Carrera',
    name: 'nombreCarrera',
    path: ['interesado', 'institucionProcedencia'],
    xs: 6,
    required: true,
  },
  {
    id: 'telefono',
    label: 'Teléfono',
    name: 'telefono',
    path: ['interesado', 'institucionProcedencia'],
    xs: 4,
    required: false,
  },
  {
    id: 'paginaWeb',
    label: 'Página web',
    name: 'paginaWeb',
    path: ['interesado', 'institucionProcedencia'],
    xs: 4,
    required: false,
  },
  {
    id: 'correo',
    label: 'Correo electrónico',
    name: 'correo',
    path: ['interesado', 'institucionProcedencia'],
    xs: 4,
    required: false,
  },
];

const PROCEEDING_INSTITUTION_SELECTS = [
  {
    title: 'Nivel Académico Procedente',
    name: 'nivelId',
    path: ['interesado', 'institucionProcedencia'],
    xs: 4,
    required: true,
    optionsKey: 'grados',
  },
  {
    title: 'País',
    name: 'paisId',
    path: ['interesado', 'institucionProcedencia'],
    xs: 3,
    required: true,
    optionsKey: 'paises',
  },
];

const DESTINATION_INSTITUTION_FIELDS = [
  {
    id: 'fechaInicio',
    label: 'Año de Inicio de Realización de Estudios',
    name: 'fechaInicio',
    path: ['interesado', 'institucionProcedencia'],
    xs: 5,
    component: InputDate,
    required: false,
  },
  {
    id: 'fechaFin',
    label: 'Año de Finalización de la Carrera',
    name: 'fechaFin',
    path: ['interesado', 'institucionProcedencia'],
    xs: 4,
    component: InputDate,
    required: false,
  },
];

const REQUIRED_FIELDS = [
  {
    path: ['interesado', 'institucionProcedencia', 'nombre'],
    name: 'nombre',
  },
  {
    path: ['interesado', 'institucionProcedencia', 'nombreCarrera'],
    name: 'nombreCarrera',
  },
  {
    path: ['interesado', 'institucionProcedencia', 'nivelId'],
    name: 'nivelId',
  },
  {
    path: ['interesado', 'institucionProcedencia', 'paisId'],
    name: 'paisId',
  },
  {
    path: ['interesado', 'institucionDestino', 'nivel'],
    name: 'nivel',
  },
];

const getActiveRequiredFields = (form, tipoInstitucionId) => REQUIRED_FIELDS.filter((field) => {
  if (field.condition) {
    return field.condition(tipoInstitucionId);
  }
  return true;
});

export default function DatosInstitucion({
  form,
  handleOnChange,
  paises,
  setNextDisabled,
  validateFields,
  disabled,
}) {
  const [grados, setGrados] = useState([]);
  const [touched, setTouched] = useState({});

  const tipoInstitucionId = form.interesado?.institucionDestino?.tipoInstitucionId || '';

  const isValidEmail = (email) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const mapNivelesData = useCallback(
    (item) => ({
      id: item.id,
      nombre: item.descripcion,
    }),
    [],
  );

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData(
        `${domain}/api/v1/public/niveles/`,
        setGrados,
        mapNivelesData,
        true,
      );
    };
    fetchInitialData();
  }, [mapNivelesData]);

  const handleChange = useCallback(
    (e, path) => {
      const { name } = e.target;
      handleOnChange(e, path);
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    [handleOnChange],
  );

  const validateField = useCallback(
    (value, required, fieldName) => {
      if (!touched[fieldName]) return '';

      if (required && !value) {
        return '¡Este campo es requerido!';
      }

      if (fieldName === 'correo' && value && !isValidEmail(value)) {
        return 'Correo electrónico inválido';
      }

      return '';
    },
    [touched],
  );

  // Validate fields when validateFields changes
  useEffect(() => {
    if (validateFields) {
      const activeRequiredFields = getActiveRequiredFields(
        form,
        tipoInstitucionId,
      );
      const emptyFields = [];

      const isAnyFieldEmpty = activeRequiredFields.some(({ path, name }) => {
        const value = path.reduce((obj, key) => obj?.[key], form);
        const isEmpty = Array.isArray(value) ? value.length === 0 : !value;

        if (isEmpty) {
          emptyFields.push({ name, path });
        }

        return isEmpty;
      });

      setNextDisabled(isAnyFieldEmpty);

      if (isAnyFieldEmpty) {
        const newTouched = activeRequiredFields.reduce((acc, { name }) => {
          acc[name] = true;
          return acc;
        }, {});
        setTouched(newTouched);
      }
    }
  }, [validateFields, form, setNextDisabled, tipoInstitucionId]);

  const getFormValue = (path) => path.reduce((obj, key) => obj?.[key], form) || '';

  const renderSelectField = ({
    title,
    name,
    path,
    xs,
    required,
    optionsKey,
  }) => (
    <Grid item xs={xs} key={name}>
      <Select
        title={title}
        name={name}
        options={optionsKey === 'grados' ? grados : paises}
        value={getFormValue([...path, name])}
        onChange={(e) => handleChange(e, path)}
        required={required}
        errorMessage={validateField(
          getFormValue([...path, name]),
          required,
          name,
        )}
        disabled={disabled}
      />
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Subtitle>Datos de institución de procedencia en el extranjero</Subtitle>
      </Grid>

      {PROCEEDING_INSTITUTION_FIELDS.map(
        ({
          id, label, name, path, xs, required,
        }) => (
          <Grid item xs={xs} key={id}>
            <Input
              id={id}
              label={label}
              name={name}
              value={getFormValue([...path, name])}
              onChange={(e) => handleChange(e, path)}
              required={required}
              errorMessage={validateField(
                getFormValue([...path, name]),
                required,
                name,
              )}
              disabled={disabled}
            />
          </Grid>
        ),
      )}

      {PROCEEDING_INSTITUTION_SELECTS.map(renderSelectField)}

      {DESTINATION_INSTITUTION_FIELDS.map(
        ({
          id, label, name, path, xs, component: Component,
        }) => (
          <Grid item xs={xs} key={id}>
            <Component
              id={id}
              label={label}
              name={name}
              value={getFormValue([...path, name])}
              onChange={(e) => handleChange(e, path)}
              disabled={disabled}
            />
          </Grid>
        ),
      )}

      <Grid item xs={12}>
        <Subtitle>Deseo revalidar mis estudios como</Subtitle>
      </Grid>

      {form.tipoTramiteId === 3 && (
      <Grid item xs={9}>
        <Input
          id="institucionNombre"
          label="Instituciones de Educación Superior"
          name="nombre"
          value={getFormValue(['interesado', 'institucionDestino', 'nombre'])}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
          disabled={disabled}
        />
      </Grid>
      )}
      <Grid item xs={3}>
        <Select
          title="Nivel Académico Destino"
          options={grados}
          name="nivel"
          value={getFormValue([
            'interesado',
            'institucionDestino',
            'nivel',
          ])}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
          required
          errorMessage={validateField(
            getFormValue(['interesado', 'institucionDestino', 'nivel']),
            tipoInstitucionId !== 1,
            'nivel',
          )}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="nombreCarreraDestino"
          label="Nombre de la Carrera (Destino)"
          name="nombreCarrera"
          value={getFormValue([
            'interesado',
            'institucionDestino',
            'programa',
            'nombreCarrera',
          ])}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}

DatosInstitucion.defaultProps = {
  handleOnChange: () => {},
  setNextDisabled: () => {},
  disabled: false,
  validateFields: false,
};

DatosInstitucion.propTypes = {
  form: PropTypes.shape({
    tipoTramiteId: PropTypes.number.isRequired,
    interesado: PropTypes.shape({
      institucionProcedencia: PropTypes.shape({
        nombre: PropTypes.string,
        paisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombreCarrera: PropTypes.string,
        nivelId: PropTypes.number,
        anoFinalizacionCarrera: PropTypes.string,
        anoInicioCarrera: PropTypes.string,
        telefonoInstitucion: PropTypes.string,
        paginaWebInstitucion: PropTypes.string,
        correoInstitucion: PropTypes.string,
      }),
      institucionDestino: PropTypes.shape({
        institucionDestinoPrograma: PropTypes.shape({
          institucionDestinoId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
          programaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          programa: PropTypes.shape({
            nombre: PropTypes.string,
            acuerdoRvoe: PropTypes.string,
            plantel: PropTypes.shape({
              institucionId: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
              ]),
            }),
          }),
        }),
        id: PropTypes.number,
        tipoInstitucionId: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        institucionId: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        programaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombre: PropTypes.string,
        acuerdoRvoe: PropTypes.string,
        nombreCarrera: PropTypes.string,
        nivel: PropTypes.string,
        planEstudios: PropTypes.string,
      }),
    }),
  }).isRequired,
  handleOnChange: PropTypes.func,
  paises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setNextDisabled: PropTypes.func,
  validateFields: PropTypes.bool,
  disabled: PropTypes.bool,
};
