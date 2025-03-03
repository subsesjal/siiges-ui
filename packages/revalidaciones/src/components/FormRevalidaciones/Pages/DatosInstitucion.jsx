import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function DatosInstitucion({ form, handleOnChange, paises }) {
  const [tipoInstituciones, setTipoInstituciones] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [grados, setGrados] = useState([]);
  const [tipoInstitucionId, setTipoInstitucionId] = useState(
    form.institucionDestino?.tipoInstitucionId || '',
  );

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

  const handleTipoInstitucionChange = (event) => {
    const selectedTipoInstitucionId = event.target.value;
    setTipoInstitucionId(selectedTipoInstitucionId);
    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  const handleRvoeOnBlur = (event) => {
    const acuerdoRvoe = event.target.value;
    if (tipoInstitucionId === 1) {
      fetchData(
        `${domain}/api/v1/public/programas?acuerdoRvoe=${acuerdoRvoe}`,
        setProgramas,
      );
    }
    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  const renderInstitucionField = useMemo(() => {
    if (tipoInstitucionId === 1) {
      return (
        <Select
          title="Instituciones"
          options={instituciones}
          name="institucionId"
          value={form.institucionDestino?.institucionId || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
        />
      );
    }
    return (
      <Input
        id="institucionNombre"
        label="Instituciones de Educación Superior"
        name="nombre"
        value={form.institucionDestino?.nombre || ''}
        onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
      />
    );
  }, [
    tipoInstitucionId,
    instituciones,
    form.institucionDestino,
    handleOnChange,
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de procedencia xddddxdxdxdxd</Subtitle>
      </Grid>
      {[
        {
          id: 'nombreInstitucion',
          label: 'Nombre de la Institución',
          name: 'nombre',
          value: form.institucionProcedencia?.nombre,
        },
        {
          id: 'nombreCarrera',
          label: 'Nombre de la Carrera',
          name: 'nombreCarrera',
          value: form.institucionProcedencia?.nombreCarrera,
        },
      ].map((field) => (
        <Grid item xs={6} key={field.id}>
          <Input
            id={field.id}
            label={field.label}
            name={field.name}
            value={field.value || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
          />
        </Grid>
      ))}

      <Grid item xs={4}>
        <Select
          title="Nivel Académico Procedente"
          options={grados}
          name="nivelAcademicoProcedente"
          value={form.institucionProcedencia?.nivelAcademicoProcedente || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          id="anoFinalizacionCarrera"
          label="Año de Finalización de la Carrera"
          name="anoFinalizacionCarrera"
          value={form.institucionProcedencia?.anoFinalizacionCarrera || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          id="anoInicioCarrera"
          label="Año de Inicio de Realización de Estudios"
          name="anoInicioCarrera"
          value={form.institucionProcedencia?.anoInicioCarrera || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="País"
          options={paises}
          name="paisId"
          value={form.institucionProcedencia?.paisId || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
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
        />
      </Grid>
      <Grid item xs={8}>
        {renderInstitucionField}
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Nivel Académico Destino"
          options={grados}
          name="nivelAcademicoDestino"
          value={form.institucionDestino?.nivelAcademicoDestino || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
        />
      </Grid>
      {tipoInstitucionId !== 1 && (
        <Grid item xs={9}>
          <Input
            id="nombreCarrera"
            label="Plan de Estudios"
            name="nombreCarrera"
            value={form.institucionDestino?.nombreCarrera || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
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
            value={form.institucionDestino?.acuerdoRvoe || ''}
            onBlur={handleRvoeOnBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nombreCarreraDestino"
            label="Nombre de la Carrera (Destino)"
            name="programaId"
            value={programas.nombre || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
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
    institucionProcedencia: PropTypes.shape({
      nombre: PropTypes.string,
      paisId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nombreCarrera: PropTypes.string,
      nivelAcademicoProcedente: PropTypes.string,
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
      nivelAcademicoDestino: PropTypes.string,
      planEstudios: PropTypes.string,
    }),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  paises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
