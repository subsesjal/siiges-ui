import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Select } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import {
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import getAlumnosByPrograma from '@siiges-ui/instituciones/src/utils/getAlumnosByPrograma';

export default function AlumnosForm({ setAlumnos }) {
  const { instituciones = [] } = getInstituciones();

  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [planteles, setPlanteles] = useState([]);
  const [selectedPlantel, setSelectedPlantel] = useState('');
  const [programas, setProgramas] = useState([]);
  const [selectedPrograma, setSelectedPrograma] = useState('');

  const fetchAlumnos = (programaId) => {
    getAlumnosByPrograma(programaId, (error, data) => {
      if (error) {
        console.error('Failed to fetch alumnos:', error);
        setAlumnos([]);
      } else {
        const transformedAlumnos = data.alumnos.map((alumno) => ({
          id: alumno.id,
          matricula: alumno.matricula,
          apellidoPaterno: alumno.persona.apellidoPaterno,
          apellidoMaterno: alumno.persona.apellidoMaterno,
          nombre: alumno.persona.nombre,
          situacion: alumno.situacion.nombre,
        }));
        setAlumnos(transformedAlumnos);
      }
    });
  };

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    setSelectedPrograma(programaId);
    if (programaId) {
      fetchAlumnos(programaId);
    } else {
      setAlumnos([]);
    }
  };

  const fetchProgramas = (plantelId) => {
    getProgramas(plantelId, (error, data) => {
      if (error) {
        console.error('Failed to fetch programas:', error);
        setProgramas([]);
      } else {
        const transformedProgramas = data.programas.map((programa) => ({
          id: programa.id,
          nombre: programa.nombre,
        }));
        setProgramas(transformedProgramas);
      }
    });
  };

  const handlePlantelChange = (event) => {
    const plantelId = event.target.value;
    setSelectedPlantel(plantelId);
    if (plantelId) {
      fetchProgramas(plantelId);
    } else {
      setProgramas([]);
    }
  };

  const fetchPlanteles = (institucionId) => {
    getPlantelesByInstitucion(institucionId, (error, data) => {
      if (error) {
        console.error('Failed to fetch planteles:', error);
        setPlanteles([]);
      } else {
        const transformedPlanteles = data.planteles.map((plantel) => ({
          id: plantel.id,
          nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior}`,
        }));
        setPlanteles(transformedPlanteles);
      }
    });
  };

  const handleInstitucionChange = (event) => {
    const institucionId = event.target.value;
    setSelectedInstitucion(institucionId);
    if (institucionId) {
      fetchPlanteles(institucionId);
    } else {
      setPlanteles([]);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={instituciones || []}
          onchange={handleInstitucionChange}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Planteles"
          name="planteles"
          value={selectedPlantel}
          options={planteles || []}
          onchange={handlePlantelChange}
          disabled={!selectedInstitucion}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Programas"
          name="programas"
          value={selectedPrograma}
          options={programas || []}
          onchange={handleProgramaChange}
        />
      </Grid>
    </Grid>
  );
}

AlumnosForm.propTypes = {
  setAlumnos: PropTypes.func.isRequired,
};
