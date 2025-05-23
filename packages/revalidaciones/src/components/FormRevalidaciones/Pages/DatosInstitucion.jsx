import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, {
  useEffect, useState, useCallback, useMemo,
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
    xs: 4,
    required: true,
    optionsKey: 'paises',
  },
];

const DESTINATION_INSTITUTION_FIELDS = [
  {
    id: 'anoFinalizacionCarrera',
    label: 'Año de Finalización de la Carrera',
    name: 'anoFinalizacionCarrera',
    path: ['interesado', 'institucionProcedencia'],
    xs: 4,
    component: InputDate,
    required: false,
  },
  {
    id: 'anoInicioCarrera',
    label: 'Año de Inicio de Realización de Estudios',
    name: 'anoInicioCarrera',
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
    path: ['interesado', 'institucionDestino', 'tipoInstitucionId'],
    name: 'tipoInstitucionId',
  },
  {
    path: ['interesado', 'institucionDestino', 'institucionId'],
    name: 'institucionId',
    condition: (tipoInstitucionId) => tipoInstitucionId === 1,
  },
  {
    path: ['interesado', 'institucionDestino', 'programaId'],
    name: 'programaId',
    condition: (tipoInstitucionId) => tipoInstitucionId === 1,
  },
  {
    path: ['interesado', 'institucionDestino', 'nivel'],
    name: 'nivel',
    condition: (tipoInstitucionId) => tipoInstitucionId !== 1,
  },
  {
    path: ['interesado', 'institucionDestino', 'acuerdoRvoe'],
    name: 'acuerdoRvoe',
    condition: (tipoInstitucionId) => tipoInstitucionId !== 1,
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
  const [tipoInstituciones, setTipoInstituciones] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [grados, setGrados] = useState([]);
  const [rvoes, setRvoes] = useState([]);
  const [rvoeError, setRvoeError] = useState('');
  const [institucionId, setInstitucionId] = useState();

  const [touched, setTouched] = useState({});

  useEffect(() => {
    setInstitucionId(
      form.interesado?.institucionDestino?.id
        || form.interesado?.institucionDestino?.institucionId
        || '',
    );
  }, []);

  const tipoInstitucionId = useMemo(
    () => form.interesado?.institucionDestino?.tipoInstitucionId || '',
    [form.interesado?.institucionDestino?.tipoInstitucionId],
  );

  const rvoesList = useMemo(
    () => rvoes.map(({ id, acuerdoRvoe }) => ({
      id,
      nombre: acuerdoRvoe,
    })),
    [rvoes],
  );

  const selectedRvoe = useMemo(
    () => rvoes.find(
      (rvoe) => rvoe.id === form.interesado?.institucionDestino?.programaId,
    ),
    [rvoes, form.interesado?.institucionDestino?.programaId],
  );

  const carrera = useMemo(() => selectedRvoe?.nombre || '', [selectedRvoe]);

  const mapNivelesData = useCallback(
    (item) => ({
      id: item.id,
      nombre: item.descripcion,
    }),
    [],
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData(
        `${domain}/api/v1/public/instituciones/tipoInstituciones`,
        setTipoInstituciones,
      );
      await fetchData(
        `${domain}/api/v1/public/niveles/`,
        setGrados,
        mapNivelesData,
        true,
      );
    };
    fetchInitialData();
  }, [mapNivelesData]);

  useEffect(() => {
    if (tipoInstitucionId) {
      fetchData(
        `${domain}/api/v1/public/instituciones?tipoInstitucionId=${tipoInstitucionId}`,
        setInstituciones,
      );
    }
  }, [tipoInstitucionId]);

  useEffect(() => {
    if (institucionId) {
      fetchData(
        `${domain}/api/v1/public/programas/instituciones/${institucionId}`,
        setRvoes,
      );
    }
  }, [institucionId]);

  const fetchProgramas = useCallback(async (acuerdoRvoe) => {
    try {
      const response = await fetch(
        `${domain}/api/v1/public/programas?acuerdoRvoe=${acuerdoRvoe}`,
        {
          headers: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setProgramas(data.data);
      setRvoeError(response.ok ? '' : '¡No se encontraron RVOES!');
    } catch (error) {
      console.error('Error fetching Programas:', error);
      setRvoeError('No se encontraron RVOES');
    }
  }, []);

  const handleChange = useCallback(
    (e, path) => {
      const { name } = e.target;
      handleOnChange(e, path);
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    [handleOnChange],
  );

  const handleTipoInstitucionChange = useCallback(
    (e) => {
      handleChange(e, ['interesado', 'institucionDestino']);
    },
    [handleChange],
  );

  const handleRvoeOnBlur = useCallback(
    (e) => {
      const acuerdoRvoe = e.target.value;
      if (tipoInstitucionId !== 1) {
        fetchProgramas(acuerdoRvoe);
      }
      handleOnChange(e, ['interesado', 'institucionDestino']);
    },
    [tipoInstitucionId, fetchProgramas, handleOnChange],
  );

  const handleRvoeChange = useCallback(
    (e) => {
      handleOnChange(e, ['interesado', 'institucionDestino']);
    },
    [handleOnChange],
  );

  const handleInstitucionChange = useCallback(
    (e) => {
      const resetProgramaIdEvent = {
        target: {
          name: 'programaId',
          value: '',
        },
      };

      handleOnChange(e, ['interesado', 'institucionDestino']);

      handleOnChange(resetProgramaIdEvent, [
        'interesado',
        'institucionDestino',
      ]);

      setInstitucionId(e.target.value);
    },
    [handleOnChange],
  );

  const validateField = useCallback(
    (value, required, fieldName) => (touched[fieldName] && required && !value ? '¡Este campo es requerido!' : ''),
    [touched],
  );

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
        <Subtitle>Datos de la Institución de procedencia</Subtitle>
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
        <Subtitle>Datos de la Institución de destino</Subtitle>
      </Grid>

      <Grid item xs={3}>
        <Select
          title="Tipo de Institución"
          name="tipoInstitucionId"
          options={tipoInstituciones}
          value={tipoInstitucionId}
          onChange={handleTipoInstitucionChange}
          required
          errorMessage={validateField(
            tipoInstitucionId,
            true,
            'tipoInstitucionId',
          )}
          disabled={disabled}
        />
      </Grid>

      <Grid item xs={9}>
        {tipoInstitucionId === 1 ? (
          <Select
            title="Instituciones"
            options={instituciones}
            name="institucionId"
            value={institucionId}
            onChange={handleInstitucionChange}
            required={tipoInstitucionId === 1}
            errorMessage={validateField(
              institucionId,
              tipoInstitucionId === 1,
              'institucionId',
            )}
            disabled={disabled}
          />
        ) : (
          <Input
            id="institucionNombre"
            label="Instituciones de Educación Superior"
            name="nombre"
            value={getFormValue(['interesado', 'institucionDestino', 'nombre'])}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
            disabled={disabled}
          />
        )}
      </Grid>

      {tipoInstitucionId !== 1 && (
        <>
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
          <Grid item xs={3}>
            <Input
              id="rvoe"
              label="RVOE"
              name="acuerdoRvoe"
              value={getFormValue([
                'interesado',
                'institucionDestino',
                'acuerdoRvoe',
              ])}
              onBlur={handleRvoeOnBlur}
              onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
              errorMessage={validateField(
                getFormValue([
                  'interesado',
                  'institucionDestino',
                  'acuerdoRvoe',
                ]),
                tipoInstitucionId !== 1,
                'acuerdoRvoe',
              )}
              required
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              id="nombreCarreraDestino"
              label="Nombre de la Carrera (Destino)"
              name="nombreCarrera"
              value={programas?.nombre || ''}
              onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
              disabled={disabled}
            />
          </Grid>
        </>
      )}

      {tipoInstitucionId === 1 && (
        <>
          <Grid item xs={3}>
            <Select
              title="RVOE"
              options={rvoesList}
              name="programaId"
              value={getFormValue([
                'interesado',
                'institucionDestino',
                'programaId',
              ])}
              onChange={handleRvoeChange}
              errorMessage={rvoeError}
              required
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={9}>
            <Input
              id="nombreCarreraDestino"
              label="Nombre de la Carrera (Destino)"
              name="nombreCarrera"
              value={carrera}
              disabled
            />
          </Grid>
        </>
      )}
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
