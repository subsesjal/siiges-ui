import { Grid } from '@mui/material';
import { Input, Select, Subtitle } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../../utils/FetchData';

const domain = process.env.NEXT_PUBLIC_URL;

export default function DatosInstitucion({ form, handleOnChange, estados }) {
  const [tipoInstituciones, setTipoInstituciones] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [grados, setGrados] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [institucionId, setInstitucionId] = useState(
    form.interesado?.institucionDestino?.institucionId || '',
  );
  const [rvoes, setRvoes] = useState([]);
  const [rvoesList, setRvoesList] = useState([]);
  const [carrera, setCarrera] = useState([]);
  const [tipoInstitucionId, setTipoInstitucionId] = useState(
    form.interesado?.institucionDestino?.tipoInstitucionId || '',
  );
  const [rvoeError, setRvoeError] = useState('');

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

  const fetchInstituciones = async () => {
    fetchData(
      `${domain}/api/v1/public/instituciones?tipoInstitucionId=${tipoInstitucionId}`,
      setInstituciones,
    );
  };

  const fetchRvoes = async () => {
    fetchData(
      `${domain}/api/v1/public/programas/instituciones/${institucionId}`,
      setRvoes,
    );
  };

  useEffect(() => {
    if (rvoes && rvoes.length > 0) {
      const mappedRvoes = rvoes.map(({ id, acuerdoRvoe }) => ({
        id,
        nombre: acuerdoRvoe,
      }));
      setRvoesList(mappedRvoes);
    } else {
      setRvoesList([]);
    }
  }, [rvoes]);

  const fetchProgramas = async (acuerdoRvoe) => {
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
      setRvoeError('');
      if (!response.ok) {
        setRvoeError('RVOE inválido');
      }
    } catch (error) {
      console.error('Error fetching Programas:', error);
      setRvoeError('RVOE inválido');
    }
  };

  useEffect(() => {
    if (tipoInstitucionId === 1) {
      fetchInstituciones();
    }
  }, [tipoInstitucionId]);

  useEffect(() => {
    if (institucionId) {
      fetchRvoes();
    }
  }, [institucionId]);

  const handleTipoInstitucionChange = (event) => {
    const selectedTipoInstitucionId = event.target.value;
    setTipoInstitucionId(selectedTipoInstitucionId);
    handleOnChange(event, ['interesado', 'institucionDestino']);
  };
  const handleInstitucionChange = (event) => {
    const programaId = event.target.value;
    setInstitucionId(programaId);

    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  const handleRvoeChange = (event) => {
    const selectedId = event.target.value;
    const selectedRvoe = rvoes.find((rvoe) => rvoe.id === selectedId);

    if (selectedRvoe) {
      setCarrera(selectedRvoe.nombre);
    } else {
      setCarrera('');
    }

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
          value={form.interesado?.institucionProcedencia?.nombre || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Estado"
          options={estados}
          name="estadoId"
          value={form.interesado?.institucionProcedencia?.estadoId || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Nivel Académico Procedente"
          options={grados}
          name="nivelId"
          value={form.interesado?.institucionProcedencia?.nivelId || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={8}>
        <Input
          id="nombreCarrera"
          label="Nombre de la Carrera"
          name="nombreCarrera"
          value={form.interesado?.institucionProcedencia?.nombreCarrera || ''}
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
          value={
            form.interesado?.institucionDestino?.tipoInstitucionId
            || tipoInstitucionId
          }
          onChange={handleTipoInstitucionChange}
        />
      </Grid>
      <Grid item xs={9}>
        {tipoInstitucionId === 1 ? (
          <Select
            title="Instituciones"
            options={instituciones}
            name="institucionId"
            value={form.interesado?.institucionDestino?.institucionId || ''}
            onChange={handleInstitucionChange}
          />
        ) : (
          <Input
            id="institucionNombre"
            label="Instituciones de Educación Superior"
            name="nombre"
            value={form.interesado?.institucionDestino?.nombre || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
          />
        )}
      </Grid>
      {tipoInstitucionId !== 1
      && (
      <>
        <Grid item xs={3}>
          <Select
            title="Nivel Académico Destino"
            options={grados}
            name="nivel"
            value={form.interesado?.institucionDestino?.nivel || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="rvoe"
            label="RVOE"
            name="acuerdoRvoe"
            value={form.interesado?.institucionDestino?.acuerdoRvoe || ''}
            onBlur={handleRvoeOnBlur}
            errorMessage={rvoeError}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nombreCarreraDestino"
            label="Nombre de la Carrera (Destino)"
            name="nombreCarrera"
            value={programas?.nombre || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
            disabled={tipoInstitucionId === 1}
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
              value={form.interesado?.institucionDestino?.programaId || ''}
              onChange={handleRvoeChange}
              errorMessage={rvoeError}
            />
          </Grid>
          <Grid item xs={9}>
            <Input
              id="nombreCarreraDestino"
              label="Nombre de la Carrera (Destino)"
              name="nombreCarrera"
              value={carrera || ''}
              disabled
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
        estadoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nivelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombreCarrera: PropTypes.string,
      }),
      institucionDestino: PropTypes.shape({
        tipoInstitucionId: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        institucionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombre: PropTypes.string,
        nivel: PropTypes.string,
        acuerdoRvoe: PropTypes.string,
        programaId: PropTypes.number,
        nombreCarrera: PropTypes.string,
      }),
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
