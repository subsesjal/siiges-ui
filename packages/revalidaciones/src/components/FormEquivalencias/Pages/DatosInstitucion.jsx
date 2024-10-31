import { Grid } from '@mui/material';
import { Input, Select, Subtitle } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function DatosInstitucion({ form, handleOnChange, estados }) {
  const [tipoInstituciones, setTipoInstituciones] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [tipoInstitucionId, setTipoInstitucionId] = useState(form.institucionDestino?.tipoInstitucionId || '');

  useEffect(() => {
    const fetchTipoInstituciones = async () => {
      try {
        const response = await fetch(`${domain}/api/v1/public/instituciones/tipoInstituciones`, {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setTipoInstituciones(data.data);
      } catch (error) {
        console.error('Error fetching tipo de instituciones:', error);
      }
    };

    fetchTipoInstituciones();
  }, []);

  const fetchInstituciones = async () => {
    try {
      const response = await fetch(
        `${domain}/api/v1/public/instituciones?tipoInstitucionId=${tipoInstitucionId}`,
        {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setInstituciones(data.data);
    } catch (error) {
      console.error('Error fetching instituciones:', error);
    }
  };

  const fetchProgramas = async (acuerdoRvoe) => {
    try {
      const response = await fetch(
        `${domain}/api/v1/public/programas?acuerdoRvoe=${acuerdoRvoe}`,
        {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setProgramas(data.data);
    } catch (error) {
      console.error('Error fetching Programas:', error);
    }
  };

  useEffect(() => {
    if (tipoInstitucionId === 1) {
      fetchInstituciones();
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
      fetchProgramas(acuerdoRvoe);
    }
    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de procedencia</Subtitle>
      </Grid>
      <Grid item xs={9}>
        <Input
          id="nombreInstitucion"
          label="Nombre de la Institución"
          name="nombre"
          value={form.institucionProcedencia?.nombre || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Estado"
          options={estados}
          name="estadoId"
          value={form.institucionProcedencia?.estadoId || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="nombreCarrera"
          label="Nombre de la Carrera"
          name="nombreCarrera"
          value={form.institucionProcedencia?.nombreCarrera || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
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
        />
      </Grid>
      <Grid item xs={9}>
        {tipoInstitucionId === 1 ? (
          <Select
            title="Instituciones"
            options={instituciones}
            name="programaId"
            value={form.institucionDestino?.programaId || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
          />
        ) : (
          <Input
            id="institucionNombre"
            label="Instituciones de Educación Superior"
            name="nombre"
            value={form.institucionDestino?.nombre || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        <Input
          id="rvoe"
          label="RVOE"
          name="acuerdoRvoe"
          value={form.institucionDestino?.acuerdoRvoe || ''}
          onBlur={handleRvoeOnBlur}
        />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="nombreCarreraDestino"
          label="Nombre de la Carrera (Destino)"
          name="nombreCarrera"
          value={programas.nombre || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
        />
      </Grid>
    </Grid>
  );
}

DatosInstitucion.propTypes = {
  form: PropTypes.shape({
    institucionProcedencia: PropTypes.shape({
      nombre: PropTypes.string,
      estadoId: PropTypes.string,
      nombreCarrera: PropTypes.string,
    }),
    institucionDestino: PropTypes.shape({
      tipoInstitucionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      programaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nombre: PropTypes.string,
      acuerdoRvoe: PropTypes.string,
      nombreCarrera: PropTypes.string,
    }),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  estados: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
