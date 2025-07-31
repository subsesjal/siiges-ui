import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Select, Context, getData } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import {
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import getInstitucionIdFromSession from '../../utils/getInstitucionId';

export default function TitulosForm({ setTitulos, setPrograma, setLoading }) {
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });
  const { setNoti, session } = useContext(Context);

  const [selectedInstitucion, setSelectedInstitucion] = useState(() => (typeof window !== 'undefined'
    && localStorage.getItem('alumnos_selectedInstitucion')
    ? localStorage.getItem('alumnos_selectedInstitucion')
    : ''));

  const [selectedPlantel, setSelectedPlantel] = useState(() => (typeof window !== 'undefined'
    && localStorage.getItem('alumnos_selectedPlantel')
    ? localStorage.getItem('alumnos_selectedPlantel')
    : ''));

  const [selectedPrograma, setSelectedPrograma] = useState(() => (typeof window !== 'undefined'
    && localStorage.getItem('alumnos_selectedPrograma')
    ? localStorage.getItem('alumnos_selectedPrograma')
    : ''));

  const [planteles, setPlanteles] = useState([]);
  const [programas, setProgramas] = useState([]);
  const roles = ['representante', 'ce_ies'];
  const isRepresentante = roles.includes(session.rol);

  const formatFecha = (fechaStr) => {
    const date = new Date(fechaStr);
    if (Number.isNaN(date)) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchTitulos = async (programaId) => {
    const programaSeleccionado = programas.find(
      (programa) => programa.id === Number(programaId),
    );

    if (!programaSeleccionado) {
      setNoti({
        open: true,
        message: 'Programa no encontrado',
        type: 'warning',
      });
      return;
    }

    const { rvoe } = programaSeleccionado;

    if (!rvoe) {
      setNoti({
        open: true,
        message: 'Este programa no tiene acuerdo RVOE',
        type: 'warning',
      });
      return;
    }

    try {
      const response = await getData({
        endpoint: '/titulosElectronicos',
        query: `?numeroRvoe=${rvoe}`,
      });

      if (response.statusCode === 200) {
        const titulosFiltrados = response.data.map((item) => ({
          id: item.id,
          folioControl: item.folioControl,
          nombreCompleto: `${item.nombre} ${item.primerApellido} ${item.segundoApellido}`,
          curp: item.curp,
          nombreCarrera: item.nombreCarrera,
          fechaExpedicion: formatFecha(item.fechaExpedicion),
        }));

        setTitulos(titulosFiltrados);
      } else {
        setNoti({
          open: true,
          message: 'No se encontraron títulos',
          type: 'warning',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: `Error al obtener titulos: ${error}`,
        type: 'error',
      });
    }
  };

  const institucionesOrdenadas = instituciones?.slice().sort(
    (a, b) => a.nombre.localeCompare(b.nombre),
  )
    || [];

  useEffect(() => {
    const asignarInstitucionDesdeSesion = async () => {
      const institucionId = await getInstitucionIdFromSession({
        instituciones: institucionesOrdenadas,
        session,
      });

      if (institucionId) {
        setSelectedInstitucion(institucionId);
      }
    };

    asignarInstitucionDesdeSesion();
  }, [institucionesOrdenadas, session]);

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    setPrograma(programaId);
    setSelectedPrograma(programaId);
    if (programaId) {
      fetchTitulos(programaId);
    } else {
      setTitulos([]);
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
            nombre: `${programa.nombre} | ${programa.acuerdoRvoe}`,
            rvoe: programa.acuerdoRvoe,
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
      fetchTitulos(selectedPrograma);
      setPrograma(selectedPrograma);
    }
  }, [selectedPrograma]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={institucionesOrdenadas}
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

TitulosForm.propTypes = {
  setTitulos: PropTypes.func.isRequired,
  setPrograma: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
