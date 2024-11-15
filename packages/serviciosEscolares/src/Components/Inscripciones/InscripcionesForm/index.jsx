import React, { useState, useContext, useEffect } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  LabelData,
  Select,
  Context,
  getTurnoById,
  SelectAdd,
} from '@siiges-ui/shared';
import {
  getCiclosEscolares,
  getGrados,
  getGrupos,
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import getAsignaturas from '@siiges-ui/instituciones/src/utils/getAsignaturas';
import CicloEscolarModal from './Modals/CicloEscolarModal';
import GruposModal from '../../utils/GruposModal';

const LOCAL_STORAGE_KEY = 'inscripcionFormState';

export default function InscripcionForm({
  setAsignaturas,
  setProgramaId,
  setGrupoId,
  setLoading,
}) {
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });

  const { setNoti, session } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [openGrupos, setOpenGrupos] = useState(false);

  const isRepresentante = session.rol === 'representante';

  const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {
    selectedInstitucion: '',
    selectedPlantel: '',
    selectedPrograma: '',
    selectedCicloEscolar: '',
    selectedGrado: '',
    selectedGrupo: '',
    ciclosEscolares: [],
    planteles: [],
    programas: [],
    grados: [],
    grupos: [],
    labelPrograma: '',
    labelGrado: '',
    labelGrupo: '',
    labelTurno: '',
    labelCicloEscolar: '',
  };

  const [state, setState] = useState(initialState);

  const [fetchGruposTrigger, setFetchGruposTrigger] = useState(false);

  const fetchPlanteles = (institucionId) => {
    getPlantelesByInstitucion(institucionId, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `¡Error al obtener planteles!: ${error.message}`,
          type: 'error',
        });
        setState((prevState) => ({ ...prevState, planteles: [] }));
      } else {
        const sortedPlanteles = data.planteles
          .map((plantel) => ({
            id: plantel.id,
            nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior}`,
          }))
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
        setState((prevState) => ({ ...prevState, planteles: sortedPlanteles }));
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
        setState((prevState) => ({ ...prevState, programas: [] }));
      } else {
        const sortedProgramas = data.programas
          .map((programa) => ({
            id: programa.id,
            nombre: `${programa.nombre} ${programa.acuerdoRvoe}`,
            turno: programa.turno,
          }))
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
        setState((prevState) => ({ ...prevState, programas: sortedProgramas }));
      }
    });
  };

  const fetchCiclosEscolares = (programaId) => {
    getCiclosEscolares(programaId, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `¡Error al obtener ciclos escolares!: ${error.message}`,
          type: 'error',
        });
        setState((prevState) => ({ ...prevState, ciclosEscolares: [] }));
      } else {
        setState((prevState) => ({ ...prevState, ciclosEscolares: data.ciclosEscolares }));
      }
    });
  };

  const fetchGrados = () => {
    getGrados(state.selectedPrograma, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `¡Error al obtener grados!: ${error.message}`,
          type: 'error',
        });
        setState((prevState) => ({ ...prevState, grados: [] }));
      } else {
        const filteredGrados = data.grados.filter((grado) => {
          const nombre = grado.nombre.toLowerCase();
          return nombre !== 'optativa' && nombre !== 'optativas';
        });
        setState((prevState) => ({ ...prevState, grados: filteredGrados }));
      }
    });
  };

  const fetchGrupos = (gradoId) => {
    getGrupos(gradoId, state.selectedCicloEscolar, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `¡Error al obtener grupos!: ${error.message}`,
          type: 'error',
        });
        setState((prevState) => ({ ...prevState, grupos: [] }));
      } else {
        const transformedGrupos = data.grupos.map((grupo) => ({
          id: grupo.id,
          nombre: grupo.descripcion,
          turnoId: grupo.turnoId,
        }));
        setState((prevState) => ({ ...prevState, grupos: transformedGrupos }));
      }
    });
  };

  const fetchAsignaturas = (gradoId) => {
    getAsignaturas(gradoId, state.selectedPrograma, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `¡Error al obtener asignaturas!: ${error.message}`,
          type: 'error',
        });
        setAsignaturas([]);
      } else {
        setAsignaturas(data.asignaturas);
      }
    });
  };

  const handleInstitucionChange = (institucionId) => {
    setState((prevState) => ({
      ...prevState,
      selectedInstitucion: institucionId,
      selectedPlantel: '',
    }));
    if (institucionId) fetchPlanteles(institucionId);
  };

  const handlePlantelChange = (plantelId) => {
    setState((prevState) => ({
      ...prevState,
      selectedPlantel: plantelId,
      selectedPrograma: '',
    }));
    if (plantelId) fetchProgramas(plantelId);
  };

  const handleProgramaChange = (programaId) => {
    const selectedProgramaObj = state.programas.find((programa) => programa.id === programaId);
    setState((prevState) => ({
      ...prevState,
      selectedPrograma: programaId,
      labelPrograma: selectedProgramaObj ? selectedProgramaObj.nombre : '',
    }));
    if (programaId) {
      fetchCiclosEscolares(programaId);
      setProgramaId(programaId);
    }
  };

  const handleCicloEscolarChange = (cicloEscolarId) => {
    const selectedCicloObj = state.ciclosEscolares.find((ciclo) => ciclo.id === cicloEscolarId);
    setState((prevState) => ({
      ...prevState,
      selectedCicloEscolar: cicloEscolarId,
      labelCicloEscolar: selectedCicloObj ? selectedCicloObj.nombre : '',
    }));
    if (cicloEscolarId) fetchGrados();
  };

  const handleGradoChange = (gradoId) => {
    const selectedGradoObj = state.grados.find((grado) => grado.id === gradoId);
    setState((prevState) => ({
      ...prevState,
      selectedGrado: gradoId,
      labelGrado: selectedGradoObj ? selectedGradoObj.nombre : '',
    }));
    if (gradoId) {
      fetchGrupos(gradoId);
      fetchAsignaturas(gradoId);
    }
  };

  const handleGrupoChange = (grupoId) => {
    const selectedGrupoObj = state.grupos.find((grupo) => grupo.id === grupoId);
    const turno = getTurnoById(selectedGrupoObj.turnoId, 'nombre');
    setState((prevState) => ({
      ...prevState,
      selectedGrupo: grupoId,
      labelTurno: turno,
      labelGrupo: selectedGrupoObj ? selectedGrupoObj.nombre : '',
    }));
    setGrupoId(grupoId);
  };

  useEffect(() => {
    if (isRepresentante && instituciones?.length) {
      const institution = instituciones.find(({ usuarioId }) => usuarioId === session.id);
      if (institution) handleInstitucionChange(institution.id);
    }
  }, [isRepresentante, instituciones]);

  useEffect(() => {
    if (fetchGruposTrigger) {
      fetchGrupos(state.selectedGrado);
      setFetchGruposTrigger(false);
    }
  }, [fetchGruposTrigger, state.selectedGrado]);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Select
            title="Instituciones"
            name="instituciones"
            value={state.selectedInstitucion}
            options={instituciones?.sort((a, b) => a.nombre.localeCompare(b.nombre)) || []}
            onChange={(event) => handleInstitucionChange(event.target.value)}
            disabled={isRepresentante}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Planteles"
            name="planteles"
            value={state.selectedPlantel}
            options={state.planteles || []}
            onChange={(event) => handlePlantelChange(event.target.value)}
            disabled={!state.selectedInstitucion}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Programas"
            name="programas"
            value={state.selectedPrograma}
            options={state.programas || []}
            onChange={(event) => handleProgramaChange(event.target.value)}
            disabled={!state.selectedPlantel}
          />
        </Grid>
        <Grid item xs={4}>
          <SelectAdd
            title="Ciclos Escolares"
            name="ciclosEscolares"
            value={state.selectedCicloEscolar}
            options={state.ciclosEscolares || []}
            onChange={(event) => handleCicloEscolarChange(event.target.value)}
            disabled={!state.selectedPrograma}
            onAddClick={() => {
              setOpen(true);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Grados"
            name="grados"
            value={state.selectedGrado}
            options={state.grados || []}
            onChange={(event) => handleGradoChange(event.target.value)}
            disabled={!state.selectedCicloEscolar}
          />
        </Grid>
        <Grid item xs={4}>
          <SelectAdd
            title="Grupos"
            name="Grupos"
            value={state.selectedGrupo}
            options={state.grupos || []}
            onChange={(event) => handleGrupoChange(event.target.value)}
            disabled={!state.selectedGrado}
            onAddClick={() => {
              setOpenGrupos(true);
            }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      {state.selectedGrupo && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle">{state.labelPrograma}</Typography>
          </Grid>
          <Grid item xs={3}>
            <LabelData title="Grado" subtitle={state.labelGrado} />
          </Grid>
          <Grid item xs={3}>
            <LabelData title="Grupo" subtitle={state.labelGrupo} />
          </Grid>
          <Grid item xs={3}>
            <LabelData title="Turno" subtitle={state.labelTurno} />
          </Grid>
          <Grid item xs={3}>
            <LabelData title="Ciclo" subtitle={state.labelCicloEscolar} />
          </Grid>
        </Grid>
      )}
      <CicloEscolarModal
        open={open}
        setOpen={setOpen}
        formCicloEscolar={{ programaId: state.selectedPrograma }}
        setFormCicloEscolar={(data) => setState((prevState) => ({ ...prevState, ...data }))}
        fetchCiclosEscolares={fetchCiclosEscolares}
      />
      <GruposModal
        open={openGrupos}
        setOpen={setOpenGrupos}
        type="new"
        params={{ cicloEscolarId: state.selectedCicloEscolar, gradoId: state.selectedGrado }}
        setFetchGrupos={setFetchGruposTrigger}
      />
    </>
  );
}

InscripcionForm.propTypes = {
  setAsignaturas: PropTypes.func.isRequired,
  setProgramaId: PropTypes.func.isRequired,
  setGrupoId: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
