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

  const [state, setState] = useState({
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
  });

  const [fetchGruposTrigger, setFetchGruposTrigger] = useState(false);

  const resetDependentFields = (fieldsToReset) => {
    setState((prevState) => ({ ...prevState, ...fieldsToReset }));
  };

  // Fetch Functions
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

  const fetchCiclosEscolares = async (programaId) => {
    try {
      const { ciclosEscolares } = await getCiclosEscolares(programaId);
      setState((prevState) => ({ ...prevState, ciclosEscolares }));
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al obtener ciclos escolares!: ${error.message}`,
        type: 'error',
      });
    }
  };

  const fetchGrados = async () => {
    try {
      const { grados } = await getGrados(state.selectedPrograma);
      const filteredGrados = grados.filter((grado) => {
        const nombre = grado.nombre.toLowerCase();
        return nombre !== 'optativa' && nombre !== 'optativas';
      });
      setState((prevState) => ({ ...prevState, grados: filteredGrados }));
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al obtener grados!: ${error.message}`,
        type: 'error',
      });
    }
  };

  const fetchGrupos = async (gradoId) => {
    try {
      const { grupos } = await getGrupos(gradoId, state.selectedCicloEscolar);
      const transformedGrupos = grupos.map((grupo) => ({
        id: grupo.id,
        nombre: grupo.descripcion,
        turnoId: grupo.turnoId,
      }));
      setState((prevState) => ({ ...prevState, grupos: transformedGrupos }));
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al obtener grupos!: ${error.message}`,
        type: 'error',
      });
    }
  };

  const fetchAsignaturas = async (gradoId) => {
    try {
      const { asignaturas } = await getAsignaturas(gradoId, state.selectedPrograma);
      setAsignaturas(asignaturas);
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al obtener asignaturas!: ${error.message}`,
        type: 'error',
      });
      setAsignaturas([]);
    }
  };

  // Event Handlers
  const handleInstitucionChange = async (institucionId) => {
    resetDependentFields({
      selectedInstitucion: institucionId,
      selectedPlantel: '',
      programas: [],
      selectedPrograma: '',
      ciclosEscolares: [],
      selectedCicloEscolar: '',
      grados: [],
      selectedGrado: '',
      grupos: [],
      selectedGrupo: '',
    });
    if (institucionId) await fetchPlanteles(institucionId);
  };

  const handlePlantelChange = async (plantelId) => {
    resetDependentFields({
      selectedPlantel: plantelId,
      selectedPrograma: '',
      ciclosEscolares: [],
      selectedCicloEscolar: '',
      grados: [],
      selectedGrado: '',
      grupos: [],
      selectedGrupo: '',
    });
    if (plantelId) await fetchProgramas(plantelId);
  };

  const handleProgramaChange = async (programaId) => {
    const selectedProgramaObj = state.programas.find((programa) => programa.id === programaId);
    resetDependentFields({
      selectedPrograma: programaId,
      labelPrograma: selectedProgramaObj ? selectedProgramaObj.nombre : '',
      ciclosEscolares: [],
      selectedCicloEscolar: '',
      grados: [],
      selectedGrado: '',
      grupos: [],
      selectedGrupo: '',
    });
    if (programaId) {
      await fetchCiclosEscolares(programaId);
      setProgramaId(programaId);
    }
  };

  const handleCicloEscolarChange = async (cicloEscolarId) => {
    const selectedCicloObj = state.ciclosEscolares.find((ciclo) => ciclo.id === cicloEscolarId);
    resetDependentFields({
      selectedCicloEscolar: cicloEscolarId,
      labelCicloEscolar: selectedCicloObj ? selectedCicloObj.nombre : '',
      grados: [],
      selectedGrado: '',
      grupos: [],
      selectedGrupo: '',
    });
    if (cicloEscolarId) await fetchGrados();
  };

  const handleGradoChange = async (gradoId) => {
    const selectedGradoObj = state.grados.find((grado) => grado.id === gradoId);
    resetDependentFields({
      selectedGrado: gradoId,
      labelGrado: selectedGradoObj ? selectedGradoObj.nombre : '',
      grupos: [],
      selectedGrupo: '',
    });
    if (gradoId) {
      await fetchGrupos(gradoId);
      await fetchAsignaturas(gradoId);
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

  // useEffect for automatic institution selection if representative
  useEffect(() => {
    if (isRepresentante && instituciones?.length) {
      const institution = instituciones.find(({ usuarioId }) => usuarioId === session.id);
      if (institution) handleInstitucionChange(institution.id);
    }
  }, [isRepresentante, instituciones]);

  // useEffect for fetching groups when triggered
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
            onChange={handlePlantelChange}
            disabled={!state.selectedInstitucion}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            title="Programas"
            name="programas"
            value={state.selectedPrograma}
            options={state.programas || []}
            onChange={handleProgramaChange}
            disabled={!state.selectedPlantel}
          />
        </Grid>
        <Grid item xs={4}>
          <SelectAdd
            title="Ciclos Escolares"
            name="ciclosEscolares"
            value={state.selectedCicloEscolar}
            options={state.ciclosEscolares || []}
            onChange={handleCicloEscolarChange}
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
            onChange={handleGradoChange}
            disabled={!state.selectedCicloEscolar}
          />
        </Grid>
        <Grid item xs={4}>
          <SelectAdd
            title="Grupos"
            name="Grupos"
            value={state.selectedGrupo}
            options={state.grupos || []}
            onChange={handleGrupoChange}
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
