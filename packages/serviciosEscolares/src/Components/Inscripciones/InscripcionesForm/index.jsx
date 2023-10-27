import React, { useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { LabelData, Select } from '@siiges-ui/shared';
import {
  getCiclosEscolares,
  getGrados,
  getGrupos,
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import getAsignaturas from '@siiges-ui/instituciones/src/utils/getAsignaturas';

export default function InscripcionForm({ setAsignaturas, setProgramaId }) {
  const { instituciones } = getInstituciones();
  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [selectedPlantel, setSelectedPlantel] = useState('');
  const [selectedPrograma, setSelectedPrograma] = useState('');
  const [selectedCicloEscolar, setSelectedCicloEscolar] = useState('');
  const [selectedGrado, setSelectedGrado] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [ciclosEscolares, setCiclosEscolares] = useState([]);
  const [planteles, setPlanteles] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [grados, setGrados] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [labelPrograma, setLabelPrograma] = useState('');
  const [labelGrado, setLabelGrado] = useState('');
  const [labelGrupo, setLabelGrupo] = useState('');
  const [labelTurno, setLabelTurno] = useState('');
  const [labelCicloEscolar, setLabelCicloEscolar] = useState('');

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

  const fetchProgramas = (plantelId) => {
    getProgramas(plantelId, (error, data) => {
      if (error) {
        console.error('Failed to fetch programas:', error);
        setProgramas([]);
      } else {
        const transformedProgramas = data.programas.map((programa) => ({
          id: programa.id,
          nombre: programa.nombre,
          turno: programa.turno,
        }));
        setProgramas(transformedProgramas);
      }
    });
  };

  const fetchCiclosEscolares = (programaId) => {
    getCiclosEscolares(programaId, (error, data) => {
      if (error) {
        console.error('Failed to fetch ciclosEscolares:', error);
        setCiclosEscolares([]);
      } else {
        setCiclosEscolares(data.ciclosEscolares);
      }
    });
  };

  const fetchGrados = () => {
    getGrados(selectedPrograma, (error, data) => {
      if (error) {
        console.error('Failed to fetch Grados:', error);
        setGrados([]);
      } else {
        setGrados(data.grados);
      }
    });
  };

  const fetchGrupos = (gradoId) => {
    getGrupos(gradoId, selectedCicloEscolar, (error, data) => {
      if (error) {
        console.error('Failed to fetch grupos:', error);
        setGrupos([]);
      } else {
        const transformedGrupos = data.grupos.map((programa) => ({
          id: programa.id,
          nombre: programa.descripcion,
        }));
        setGrupos(transformedGrupos);
      }
    });
  };

  const fetchAsignaturas = (gradoId) => {
    getAsignaturas(gradoId, selectedPrograma, (error, data) => {
      if (error) {
        console.error('Failed to fetch Grados:', error);
        setAsignaturas([]);
      } else {
        setAsignaturas(data.asignaturas);
      }
    });
  };

  const handleInstitucionChange = (event) => {
    const institucionId = event.target.value;
    setSelectedInstitucion(institucionId);

    setSelectedPlantel('');
    setProgramas([]);
    setSelectedPrograma('');
    setCiclosEscolares([]);
    setSelectedCicloEscolar('');
    setGrados([]);
    setSelectedGrado('');
    setGrupos([]);
    setSelectedGrupo('');

    if (institucionId) {
      fetchPlanteles(institucionId);
    } else {
      setPlanteles([]);
    }
  };

  const handlePlantelChange = (event) => {
    const plantelId = event.target.value;
    setSelectedPlantel(plantelId);

    setSelectedPrograma('');
    setCiclosEscolares([]);
    setSelectedCicloEscolar('');
    setGrados([]);
    setSelectedGrado('');
    setGrupos([]);
    setSelectedGrupo('');

    if (plantelId) {
      fetchProgramas(plantelId);
    } else {
      setProgramas([]);
    }
  };

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    const selectedProgramaObj = programas.find(
      (programa) => programa.id === programaId,
    );

    setSelectedPrograma(programaId);
    setLabelTurno(selectedProgramaObj ? selectedProgramaObj.turno : '');
    setLabelPrograma(selectedProgramaObj ? selectedProgramaObj.nombre : '');

    setCiclosEscolares([]);
    setSelectedCicloEscolar('');
    setGrados([]);
    setSelectedGrado('');
    setGrupos([]);
    setSelectedGrupo('');

    if (programaId) {
      fetchCiclosEscolares(programaId);
      setProgramaId(programaId);
    } else {
      setCiclosEscolares([]);
    }
  };

  const handleCicloEscolarChange = (event) => {
    const cicloEscolarId = event.target.value;
    const selectedCicloObj = ciclosEscolares.find(
      (ciclo) => ciclo.id === cicloEscolarId,
    );

    setSelectedCicloEscolar(cicloEscolarId);
    setLabelCicloEscolar(selectedCicloObj ? selectedCicloObj.nombre : '');

    setGrados([]);
    setSelectedGrado('');
    setGrupos([]);
    setSelectedGrupo('');

    if (cicloEscolarId) {
      fetchGrados();
    } else {
      setGrados([]);
    }
  };

  const handleGradoChange = (event) => {
    const gradoId = event.target.value;
    const selectedGradoObj = grados.find((grado) => grado.id === gradoId);

    setSelectedGrado(gradoId);
    setLabelGrado(selectedGradoObj ? selectedGradoObj.nombre : '');

    setGrupos([]);
    setSelectedGrupo('');

    if (gradoId) {
      fetchGrupos(gradoId);
      fetchAsignaturas(gradoId);
    } else {
      setGrupos([]);
    }
  };

  const handleGrupoChange = (event) => {
    const grupoId = event.target.value;
    const selectedGrupoObj = grupos.find((grupo) => grupo.id === grupoId);

    setSelectedGrupo(grupoId);
    setLabelGrupo(selectedGrupoObj ? selectedGrupoObj.nombre : '');
    if (grupoId) {
      fetchAsignaturas(grupoId);
    } else {
      setAsignaturas([]);
    }
  };

  return (
    <>
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
            disabled={!selectedPlantel}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Ciclos Escolares"
            name="ciclosEscolares"
            value={selectedCicloEscolar}
            options={ciclosEscolares || []}
            onchange={handleCicloEscolarChange}
            disabled={!selectedPrograma}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Grados"
            name="grados"
            value={selectedGrado}
            options={grados || []}
            onchange={handleGradoChange}
            disabled={!selectedCicloEscolar}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Grupos"
            name="Grupos"
            value={selectedGrupo}
            options={grupos || []}
            onchange={handleGrupoChange}
            disabled={!selectedGrado}
          />
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      {selectedGrupo && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle">{labelPrograma}</Typography>
          </Grid>
          <Grid item xs={3}>
            <LabelData title="Grado" subtitle={labelGrado} />
          </Grid>
          <Grid item xs={3}>
            <LabelData title="Grupo" subtitle={labelGrupo} />
          </Grid>
          <Grid item xs={3}>
            <LabelData title="Turno" subtitle={labelTurno} />
          </Grid>
          <Grid item xs={3}>
            <LabelData title="Ciclo" subtitle={labelCicloEscolar} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

InscripcionForm.propTypes = {
  setAsignaturas: PropTypes.func.isRequired,
  setProgramaId: PropTypes.func.isRequired,
};
