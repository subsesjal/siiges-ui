import { Grid } from '@mui/material';
import { Input, Select, Subtitle } from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function DatosInstitucion() {
  const [tipoInstituciones, setTipoInstituciones] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [tipoInstitucionId, setTipoInstitucionId] = useState(null);
  const [instituciones, setInstituciones] = useState([]);

  useEffect(() => {
    const fetchTipoInstituciones = async () => {
      try {
        const response = await fetch(
          `${domain}/api/v1/public/instituciones/tipoInstituciones`,
          {
            headers: {
              api_key: apiKey,
              'Content-Type': 'application/json',
            },
          },
        );
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
    setTipoInstitucionId(event.target.value);
  };

  const handleRvoeOnBlur = (event) => {
    if (tipoInstitucionId === 1) {
      const acuerdoRvoe = event.target.value;
      fetchProgramas(acuerdoRvoe);
    }
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
          name="nombreInstitucion"
        />
      </Grid>
      <Grid item xs={3}>
        <Select title="Estado" options={[]} name="estado" />
      </Grid>
      <Grid item xs={9}>
        <Input
          id="nombreCarrera"
          label="Nombre de la Carrera"
          name="nombreCarrera"
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
          onChange={handleTipoInstitucionChange}
        />
      </Grid>
      <Grid item xs={9}>
        {tipoInstitucionId === 1 ? (
          <Select
            title="Instituciones"
            options={instituciones}
            name="instituciones"
          />
        ) : (
          <Input
            id="instituciones"
            label="Instituciones de Educación Superior"
            name="instituciones"
          />
        )}
      </Grid>
      <Grid item xs={3}>
        <Input
          id="rvoe"
          label="RVOE"
          name="acuerdoRvoe"
          onblur={handleRvoeOnBlur}
        />
      </Grid>
      <Grid item xs={9}>
        <Input id="planEstudios" label="Plan de Estudios" name="planEstudios" value={programas.nombre} />
      </Grid>
    </Grid>
  );
}
