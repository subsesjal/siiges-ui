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
  const [params, setParams] = useState({
    cicloEscolarId: null,
    gradoNombre: null,
    gradoId: null,
  });
  const [labelPrograma, setLabelPrograma] = useState('');
  const [labelGrado, setLabelGrado] = useState('');
  const [labelGrupo, setLabelGrupo] = useState('');
  const [labelTurno, setLabelTurno] = useState('');
  const [labelCicloEscolar, setLabelCicloEscolar] = useState('');
  const [formCicloEscolar, setFormCicloEscolar] = useState();
  const isRepresentante = session.rol === 'representante';

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
        setNoti({
          open: true,
          message: `¡Error al obtener programas!: ${error.message}`,
          type: 'error',
        });
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
        setNoti({
          open: true,
          message: `¡Error al obtener ciclosEscolares!: ${error.message}`,
          type: 'error',
        });
        setCiclosEscolares([]);
      } else {
        setCiclosEscolares(data.ciclosEscolares);
      }
    });
  };

  const fetchGrados = () => {
    getGrados(selectedPrograma, (error, data) => {
      if (error) {
        setNoti({
          open: true,
          message: `¡Error al obtener grados!: ${error.message}`,
          type: 'error',
        });
        setGrados([]);
      } else {
        const gradosFiltrados = data.grados.filter((grado) => {
          const nombre = grado.nombre.toLowerCase();
          return nombre !== 'optativa' && nombre !== 'optativas';
        });
        setGrados(gradosFiltrados);
      }
    });
  };

  const fetchGrupos = (gradoId) => {
    getGrupos(gradoId, selectedCicloEscolar, (error, data) => {
      if (error) {
        setGrupos([]);
      } else {
        const transformedGrupos = data.grupos.map((programa) => ({
          id: programa.id,
          nombre: programa.descripcion,
          turnoId: programa.turnoId,
        }));
        setGrupos(transformedGrupos);
      }
    });
  };

  const fetchAsignaturas = (gradoId) => {
    getAsignaturas(gradoId, selectedPrograma, (error, data) => {
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

  const handleInstitucionChange = (event) => {
    const institucionId = event;
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

  useEffect(() => {
    if (isRepresentante && instituciones?.length) {
      const findIndexIntitucion = instituciones.findIndex(
        ({ usuarioId }) => usuarioId === session.id,
      );
      handleInstitucionChange(instituciones[findIndexIntitucion].id);
    }
  }, [isRepresentante, instituciones]);

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
    setLabelPrograma(selectedProgramaObj ? selectedProgramaObj.nombre : '');

    setCiclosEscolares([]);
    setSelectedCicloEscolar('');
    setGrados([]);
    setSelectedGrado('');
    setGrupos([]);
    setSelectedGrupo('');
    setFormCicloEscolar({ programaId });

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
    setParams((prevForm) => ({
      ...prevForm,
      cicloEscolarId,
    }));

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
    setParams((prevForm) => ({
      ...prevForm,
      gradoNombre: selectedGradoObj ? selectedGradoObj.nombre : '',
      gradoId,
    }));

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

    const turno = getTurnoById(selectedGrupoObj.turnoId, 'nombre');

    setSelectedGrupo(grupoId);
    setGrupoId(grupoId);
    setLabelTurno(turno);
    setLabelGrupo(selectedGrupoObj ? selectedGrupoObj.nombre : '');
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
            onchange={(event) => handleInstitucionChange(event.target.value)}
            disabled={isRepresentante}
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
          <SelectAdd
            title="Ciclos Escolares"
            name="ciclosEscolares"
            value={selectedCicloEscolar}
            options={ciclosEscolares || []}
            onchange={handleCicloEscolarChange}
            disabled={!selectedPrograma}
            onAddClick={() => {
              setOpen(true);
            }}
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
          <SelectAdd
            title="Grupos"
            name="Grupos"
            value={selectedGrupo}
            options={grupos || []}
            onchange={handleGrupoChange}
            disabled={!selectedGrado}
            onAddClick={() => {
              setOpenGrupos(true);
            }}
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
      <CicloEscolarModal
        open={open}
        setOpen={setOpen}
        formCicloEscolar={formCicloEscolar}
        setFormCicloEscolar={setFormCicloEscolar}
        fetchCiclosEscolares={fetchCiclosEscolares}
      />
      <GruposModal
        open={openGrupos}
        setOpen={setOpenGrupos}
        type="new"
        params={params}
        fetchGrupos={fetchGrupos}
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
