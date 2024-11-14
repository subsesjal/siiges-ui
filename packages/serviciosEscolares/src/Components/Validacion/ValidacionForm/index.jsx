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

export default function ValidacionForm({
  setInstitucion, setAlumnos, setPrograma, setLoading,
}) {
  const { instituciones: fetchedInstituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });

  const { setNoti, session } = useContext(Context);
  const [instituciones, setInstituciones] = useState([]);
  const [selectedInstitucion, setSelectedInstitucion] = useState(() => localStorage.getItem('validacion_selectedInstitucion') || '');
  const [planteles, setPlanteles] = useState([]);
  const [selectedPlantel, setSelectedPlantel] = useState(() => localStorage.getItem('validacion_selectedPlantel') || '');
  const [programas, setProgramas] = useState([]);
  const [selectedPrograma, setSelectedPrograma] = useState(() => localStorage.getItem('validacion_selectedPrograma') || '');
  const isRepresentante = session.rol === 'representante';

  useEffect(() => {
    if (fetchedInstituciones?.length) {
      const sortedInstituciones = [...fetchedInstituciones].sort(
        (a, b) => a.nombre.localeCompare(b.nombre),
      );
      setInstituciones(sortedInstituciones);
    }
  }, [fetchedInstituciones]);

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
          estatus: alumno.validacion?.situacionValidacion?.nombre,
        }));
        setAlumnos(transformedAlumnos);
      }
    });
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
        const sortedPlanteles = data.planteles
          .map((plantel) => ({
            id: plantel.id,
            nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior}`,
          }))
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
        setPlanteles(sortedPlanteles);
      }
    });
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
        const sortedProgramas = data.programas
          .map((programa) => ({
            id: programa.id,
            nombre: `${programa.nombre} ${programa.acuerdoRvoe}`,
          }))
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
        setProgramas(sortedProgramas);
      }
    });
  };

  const handleInstitucionChange = (event) => {
    const institucionId = event.target.value;
    setSelectedInstitucion(institucionId);
    setInstitucion(institucionId);
    localStorage.setItem('validacion_selectedInstitucion', institucionId);
    setPlanteles([]);
    setProgramas([]);
    setAlumnos([]);
    fetchPlanteles(institucionId);
  };

  const handlePlantelChange = (event) => {
    const plantelId = event.target.value;
    setSelectedPlantel(plantelId);
    localStorage.setItem('validacion_selectedPlantel', plantelId);
    setProgramas([]);
    setAlumnos([]);
    fetchProgramas(plantelId);
  };

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    setPrograma(programaId);
    setSelectedPrograma(programaId);
    localStorage.setItem('validacion_selectedPrograma', programaId);
    fetchAlumnos(programaId);
  };

  useEffect(() => {
    if (isRepresentante && instituciones?.length) {
      const institucionId = instituciones.find(
        ({ usuarioId }) => usuarioId === session.id,
      )?.id;
      if (institucionId) {
        setSelectedInstitucion(institucionId);
        setInstitucion(institucionId);
        fetchPlanteles(institucionId);
      }
    }
  }, [isRepresentante, instituciones]);

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
          options={instituciones || []}
          onChange={handleInstitucionChange}
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

ValidacionForm.propTypes = {
  setAlumnos: PropTypes.func.isRequired,
  setPrograma: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setInstitucion: PropTypes.func.isRequired,
};
