import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function DatosInstitucion({
  form, handleOnChange, paises, setNextDisabled, validateFields,
}) {
  const [tipoInstituciones, setTipoInstituciones] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [grados, setGrados] = useState([]);
  const [tipoInstitucionId, setTipoInstitucionId] = useState(
    form.interesado?.institucionDestino?.tipoInstitucionId || '',
  );
  const [touched, setTouched] = useState({});

  const fetchData = async (url, setState, mapper = null, filterFirst = false) => {
    try {
      const response = await fetch(url, {
        headers: {
          api_key: apiKey,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      let transformedData = data.data;

      if (filterFirst) {
        transformedData = transformedData.slice(1);
      }

      if (mapper) {
        transformedData = transformedData.map(mapper);
      }

      setState(transformedData);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  const mapNivelesData = (item) => ({
    id: item.id,
    nombre: item.descripcion,
  });

  useEffect(() => {
    fetchData(
      `${domain}/api/v1/public/instituciones/tipoInstituciones`,
      setTipoInstituciones,
    );
    fetchData(
      `${domain}/api/v1/public/niveles/`,
      setGrados,
      mapNivelesData,
      true,
    );
  }, []);

  useEffect(() => {
    if (tipoInstitucionId) {
      fetchData(
        `${domain}/api/v1/public/instituciones?tipoInstitucionId=${tipoInstitucionId}`,
        setInstituciones,
      );
    }
  }, [tipoInstitucionId]);

  const handleChange = (e, path) => {
    const { name } = e.target;
    handleOnChange(e, path);

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleTipoInstitucionChange = (event) => {
    const selectedTipoInstitucionId = event.target.value;
    setTipoInstitucionId(selectedTipoInstitucionId);
    handleChange(event, ['interesado', 'institucionDestino']);
  };

  const handleRvoeOnBlur = (event) => {
    const acuerdoRvoe = event.target.value;
    if (tipoInstitucionId === 1) {
      fetchData(
        `${domain}/api/v1/public/programas?acuerdoRvoe=${acuerdoRvoe}`,
        setProgramas,
      );
    }
    handleChange(event, ['interesado', 'institucionDestino']);
  };

  const validateField = (value, required, fieldName) => (
    touched[fieldName] && required && !value ? 'Este campo es requerido' : ''
  );

  useEffect(() => {
    if (validateFields) {
      // List of all required fields and their paths in the form object
      const requiredFields = [
        { path: ['interesado', 'institucionProcedencia', 'nombre'], value: form.interesado?.institucionProcedencia?.nombre },
        { path: ['interesado', 'institucionProcedencia', 'nombreCarrera'], value: form.interesado?.institucionProcedencia?.nombreCarrera },
        { path: ['interesado', 'institucionProcedencia', 'nivelId'], value: form.interesado?.institucionProcedencia?.nivelId },
        { path: ['interesado', 'institucionProcedencia', 'paisId'], value: form.interesado?.institucionProcedencia?.paisId },
        { path: ['interesado', 'institucionDestino', 'tipoInstitucionId'], value: tipoInstitucionId },
        { path: ['interesado', 'institucionDestino', 'nivelId'], value: form.interesado?.institucionDestino?.nivelId },
      ];

      // Check if any required field is empty
      const isAnyFieldEmpty = requiredFields.some((field) => {
        if (Array.isArray(field.value)) {
          return field.value.length === 0;
        }
        return !field.value;
      });

      // Disable or enable the "Next" button based on validation
      setNextDisabled(isAnyFieldEmpty);

      // Mark all fields as touched to show validation messages
      if (isAnyFieldEmpty) {
        const newTouched = {};
        requiredFields.forEach((field) => {
          newTouched[field.path[field.path.length - 1]] = true;
        });
        setTouched(newTouched);
      }
    }
  }, [validateFields, form, tipoInstitucionId, setNextDisabled]);

  const renderInstitucionField = useMemo(() => {
    if (tipoInstitucionId === 1) {
      return (
        <Select
          title="Instituciones"
          options={instituciones}
          name="institucionId"
          value={form.interesado?.institucionDestino?.institucionId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'institucionDestino'])}
        />
      );
    }
    return (
      <Input
        id="institucionNombre"
        label="Instituciones de Educación Superior"
        name="nombre"
        value={form.interesado?.institucionDestino?.nombre || ''}
        onChange={(e) => handleChange(e, ['interesado', 'institucionDestino'])}
      />
    );
  }, [
    tipoInstitucionId,
    instituciones,
    form.interesado.institucionDestino,
    handleOnChange,
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de procedencia</Subtitle>
      </Grid>
      {[
        {
          id: 'nombreInstitucion',
          label: 'Nombre de la Institución',
          name: 'nombre',
          value: form.interesado?.institucionProcedencia?.nombre,
        },
        {
          id: 'nombreCarrera',
          label: 'Nombre de la Carrera',
          name: 'nombreCarrera',
          value: form.interesado?.institucionProcedencia?.nombreCarrera,
        },
      ].map((field) => (
        <Grid item xs={6} key={field.id}>
          <Input
            id={field.id}
            label={field.label}
            name={field.name}
            value={field.value || ''}
            onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
            required
            errorMessage={validateField(field.value, true, field.name)}
          />
        </Grid>
      ))}

      <Grid item xs={4}>
        <Select
          title="Nivel Académico Procedente"
          options={grados}
          name="nivelId"
          value={form.interesado?.institucionProcedencia?.nivelId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
          required
          errorMessage={validateField(form.interesado?.institucionProcedencia?.nivelId, true, 'nivelId')}
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          id="anoFinalizacionCarrera"
          label="Año de Finalización de la Carrera"
          name="anoFinalizacionCarrera"
          value={form.interesado?.institucionProcedencia?.anoFinalizacionCarrera || ''}
          onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          id="anoInicioCarrera"
          label="Año de Inicio de Realización de Estudios"
          name="anoInicioCarrera"
          value={form.interesado?.institucionProcedencia?.anoInicioCarrera || ''}
          onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="País"
          options={paises}
          name="paisId"
          value={form.interesado?.institucionProcedencia?.paisId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'institucionProcedencia'])}
          required
          errorMessage={validateField(form.interesado?.institucionProcedencia?.paisId, true, 'paisId')}
        />
      </Grid>

      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de destino</Subtitle>
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Tipo de Institución"
          name="tipoInstitucionId"
          options={tipoInstituciones}
          value={tipoInstitucionId}
          onChange={handleTipoInstitucionChange}
          required
          errorMessage={validateField(tipoInstitucionId, true, 'tipoInstitucionId')}
        />
      </Grid>
      <Grid item xs={8}>
        {renderInstitucionField}
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Nivel Académico Destino"
          options={grados}
          name="nivelId"
          value={form.interesado?.institucionDestino?.nivelId || ''}
          onChange={(e) => handleChange(e, ['interesado', 'institucionDestino'])}
          required
          errorMessage={validateField(form.interesado?.institucionDestino?.nivelId, true, 'nivelId')}
        />
      </Grid>
      {tipoInstitucionId !== 1 && (
        <Grid item xs={9}>
          <Input
            id="nombreCarrera"
            label="Plan de Estudios"
            name="nombreCarrera"
            value={form.interesado?.institucionDestino?.nombreCarrera || ''}
            onChange={(e) => handleChange(e, ['interesado', 'institucionDestino'])}
          />
        </Grid>
      )}
      {tipoInstitucionId === 1 && (
      <>
        <Grid item xs={3}>
          <Input
            id="rvoe"
            label="RVOE"
            name="acuerdoRvoe"
            value={form.interesado?.institucionDestino?.acuerdoRvoe || ''}
            onBlur={handleRvoeOnBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nombreCarreraDestino"
            label="Nombre de la Carrera (Destino)"
            name="programaId"
            value={programas.nombre || ''}
            onChange={(e) => handleChange(e, ['interesado', 'institucionDestino'])}
            disabled={tipoInstitucionId === 1}
          />
        </Grid>
      </>
      )}
    </Grid>
  );
}

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
        tipoInstitucionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        institucionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        programaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombre: PropTypes.string,
        acuerdoRvoe: PropTypes.string,
        nombreCarrera: PropTypes.string,
        nivelId: PropTypes.number,
        planEstudios: PropTypes.string,
      }),
    }),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  paises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setNextDisabled: PropTypes.func.isRequired,
  validateFields: PropTypes.bool.isRequired,
};
