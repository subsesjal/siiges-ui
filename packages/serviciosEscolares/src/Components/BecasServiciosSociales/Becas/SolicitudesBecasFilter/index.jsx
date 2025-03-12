import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Select, Context } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import {
  getInstituciones,
  // getInstitucionUsuario,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import getBecasByPrograma from '@siiges-ui/instituciones/src/utils/getProgramas';

export default function SolicitudesBecasFilter({ setBecas, setPrograma, setInstitucion }) {
  const { setNoti, session, setLoading } = useContext(Context);
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });

  const [selectedInstitucion, setSelectedInstitucion] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('solicitudesBecas_selectedInstitucion')
    ? localStorage.getItem('becas_selectedInstitucion')
    : ''));

  const [selectedPlantel, setSelectedPlantel] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('solicitudesBecas_selectedPlantel')
    ? localStorage.getItem('becas_selectedPlantel')
    : ''));

  const [selectedPrograma, setSelectedPrograma] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('solicitudesBecas_selectedPrograma')
    ? localStorage.getItem('becas_selectedPrograma')
    : ''));

  const [planteles, setPlanteles] = useState([]);
  const [programas, setProgramas] = useState([]);
  const isIes = session.rol === 'becas_ies';

  const fetchSolicitudesBecas = (programaId) => {
    getBecasByPrograma(programaId, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `¡Error al obtener Solicitud de beca!: ${error.message}`,
          type: 'error',
        });
        setBecas([]);
      } else if (data && Array.isArray(data.becas)) {
        const transformedSolicitudesBecas = data.becas.map((alumno) => ({
          id: alumno.id,
          matricula: alumno.matricula,
          apellidoPaterno: alumno.persona.apellidoPaterno,
          apellidoMaterno: alumno.persona.apellidoMaterno,
          nombre: alumno.persona.nombre,
          situacion: alumno.situacion.nombre,
        }));
        setBecas(transformedSolicitudesBecas);
      } else {
        setBecas([]);
      }
    });
  };
  useEffect(() => {
    if (isIes && instituciones?.length) {
      const findIndexInstitucion = instituciones.findIndex(
        ({ usuarioId }) => usuarioId === session.id,
      );
      setSelectedInstitucion(instituciones[findIndexInstitucion]?.id || '');
    }
  }, [isIes, instituciones]);

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    setPrograma(programaId);
    setSelectedPrograma(programaId);
    if (programaId) {
      fetchSolicitudesBecas(programaId);
    } else {
      setBecas([]);
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
        setInstitucion(institucionId);
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
  // const fetchInstitucionByUsuario = (usuarioId) => {
  //   getInstitucionUsuario(usuarioId, (error) => {
  //     if (error) {
  //       setNoti({
  //         open: true,
  //         message: `¡Error al obtener usuario de beca!: ${error.message}`,
  //         type: 'error',
  //       });
  //     } else {}
  //   });
  // };
  // useEffect(() => {
  //   fetchInstitucionByUsuario(session.id);
  // }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('becas_selectedInstitucion', selectedInstitucion);
      localStorage.setItem('becas_selectedPlantel', selectedPlantel);
      localStorage.setItem('becas_selectedPrograma', selectedPrograma);
    }
  }, [selectedInstitucion, selectedPlantel, selectedPrograma]);

  useEffect(() => {
    if (selectedPlantel) {
      fetchProgramas(selectedPlantel);
    }
  }, [selectedPlantel]);

  useEffect(() => {
    if (selectedPrograma) {
      fetchSolicitudesBecas(selectedPrograma);
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

SolicitudesBecasFilter.propTypes = {
  setBecas: PropTypes.func.isRequired,
  setPrograma: PropTypes.func.isRequired,
  setInstitucion: PropTypes.func.isRequired,
};
