import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Select, Context } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import {
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import getAlumnosByPrograma from '@siiges-ui/instituciones/src/utils/getAlumnosByPrograma';

export default function AlumnosForm({ setAlumnos, setPrograma, setLoading }) {
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });
  const { setNoti, session } = useContext(Context);

  const [selectedInstitucion, setSelectedInstitucion] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('alumnos_selectedInstitucion')
    ? localStorage.getItem('alumnos_selectedInstitucion')
    : ''));

  const [selectedPlantel, setSelectedPlantel] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('alumnos_selectedPlantel')
    ? localStorage.getItem('alumnos_selectedPlantel')
    : ''));

  const [selectedPrograma, setSelectedPrograma] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('alumnos_selectedPrograma')
    ? localStorage.getItem('alumnos_selectedPrograma')
    : ''));

  const [planteles, setPlanteles] = useState([]);
  const [programas, setProgramas] = useState([]);
  const isRepresentante = session.rol === 'representante';

  const fetchAlumnos = (programaId) => {
    getAlumnosByPrograma(programaId, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `¡Error al obtener alumnos!: ${error.message}`,
          type: 'error',
        });
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

  useEffect(() => {
    if (isRepresentante && instituciones?.length) {
      const findIndexInstitucion = instituciones.findIndex(
        ({ usuarioId }) => usuarioId === session.id,
      );
      setSelectedInstitucion(instituciones[findIndexInstitucion]?.id || '');
    }
  }, [isRepresentante, instituciones]);

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    setPrograma(programaId);
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
        setNoti({
          open: true,
          message: `¡Error al obtener programas!: ${error.message}`,
          type: 'error',
        });
        setProgramas([]);
      } else {
        const transformedProgramas = data.programas
          .map((programa) => ({
            id: programa.id,
            nombre: `${programa.nombre} ${programa.acuerdoRvoe}`,
          }))
          .sort((a, b) => a.nombre.localeCompare(b.nombre));

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
        setNoti({
          open: true,
          message: `¡Error al obtener planteles!: ${error.message}`,
          type: 'error',
        });
        setPlanteles([]);
      } else {
        const transformedPlanteles = data.planteles
          .map((plantel) => ({
            id: plantel.id,
            nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior} | CCT: ${plantel.claveCentroTrabajo}`,
          }))
          .sort((a, b) => a.nombre.localeCompare(b.nombre));

        setPlanteles(transformedPlanteles);
      }
    });
  };

  useEffect(() => {
    if (selectedInstitucion) {
      fetchPlanteles(selectedInstitucion);
    } else {
      setPlanteles([]);
    }
  }, [selectedInstitucion]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('alumnos_selectedInstitucion', selectedInstitucion);
      localStorage.setItem('alumnos_selectedPlantel', selectedPlantel);
      localStorage.setItem('alumnos_selectedPrograma', selectedPrograma);
    }
  }, [selectedInstitucion, selectedPlantel, selectedPrograma]);

  useEffect(() => {
    if (selectedPlantel) {
      fetchProgramas(selectedPlantel);
    }
  }, [selectedPlantel]);

  useEffect(() => {
    if (selectedPrograma) {
      fetchAlumnos(selectedPrograma);
    }
  }, [selectedPrograma]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={instituciones?.slice().sort((a, b) => a.nombre.localeCompare(b.nombre)) || []}
          onChange={(event) => setSelectedInstitucion(event.target.value)}
          disabled={isRepresentante}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Planteles"
          name="planteles"
          value={selectedPlantel}
          options={planteles || []}
          onChange={handlePlantelChange}
          disabled={!selectedInstitucion}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Programas"
          name="programas"
          value={selectedPrograma}
          options={programas || []}
          onChange={handleProgramaChange}
          disabled={!selectedPlantel}
        />
      </Grid>
    </Grid>
  );
}

AlumnosForm.propTypes = {
  setAlumnos: PropTypes.func.isRequired,
  setPrograma: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
