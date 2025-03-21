import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Select, Context, getData } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';

export default function SolicitudServSocFilter({
  setSolicitudes,
  setPrograma,
  setInstitucion,
  setTableEnabled,
}) {
  const { setNoti, session, setLoading } = useContext(Context);
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });

  const [selectedInstitucion, setSelectedInstitucion] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('servicio_social_selectedInstitucion') || '' : ''));

  const [selectedPlantel, setSelectedPlantel] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('servicio_social_selectedPlantel') || '' : ''));

  const [selectedPrograma, setSelectedPrograma] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('servicio_social_selectedPrograma') || '' : ''));

  const [planteles, setPlanteles] = useState([]);
  const [programas, setProgramas] = useState([]);
  const isRepresentante = session.rol === 'admin';

  const fetchPlanteles = (institucionId) => {
    setLoading(true);
    getPlantelesByInstitucion(institucionId, (error, data) => {
      if (error) {
        setNoti({ open: true, message: `¡Error al obtener planteles!: ${error.message}`, type: 'error' });
        setPlanteles([]);
      } else {
        const transformedPlanteles = data.planteles
          .map((plantel) => ({ id: plantel.id, nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior} | CCT: ${plantel.claveCentroTrabajo}` }))
          .sort((a, b) => a.nombre.localeCompare(b.nombre));
        setInstitucion(institucionId);
        setPlanteles(transformedPlanteles);
      }
      setLoading(false);
    });
  };

  const fetchProgramas = (plantelId) => {
    setLoading(true);
    getProgramas(plantelId, (error, data) => {
      if (error) {
        setNoti({ open: true, message: `¡Error al obtener programas!: ${error.message}`, type: 'error' });
        setProgramas([]);
      } else {
        setProgramas(data.programas || []);
      }
      setLoading(false);
    });
  };

  const fetchSolicitudes = async () => {
    setLoading(true);
    try {
      const { data } = await getData({ endpoint: '/solicitudesServicioSocial' });
      if (data?.length > 0) {
        const solicitudesMapeadas = data.map((solicitud) => ({
          id: solicitud.id,
          folioSolicitud: solicitud.folioSolicitud,
          programa: solicitud.cicloEscolar.nombre,
          estatusSolicitudServicioSocial: solicitud.estatusSolicitudServicioSocial.nombre,
          createdAt: dayjs(solicitud.createdAt).format('DD/MM/YYYY'),
          domicilio: solicitud.domicilio,
        }));
        setSolicitudes(solicitudesMapeadas);
        setTableEnabled(true);
      } else {
        setSolicitudes([]);
        setTableEnabled(false);
      }
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al obtener solicitudes de servicio social!: ${error.message}`,
        type: 'error',
      });
      setSolicitudes([]);
      setTableEnabled(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedInstitucion) fetchPlanteles(selectedInstitucion);
  }, [selectedInstitucion]);

  useEffect(() => {
    if (selectedPlantel) fetchProgramas(selectedPlantel);
  }, [selectedPlantel]);

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    setPrograma(programaId);
    setSelectedPrograma(programaId);
    if (programaId) fetchSolicitudes();
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={instituciones?.sort((a, b) => a.nombre.localeCompare(b.nombre)) || []}
          onChange={(event) => setSelectedInstitucion(event.target.value)}
          disabled={!isRepresentante}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Planteles"
          name="planteles"
          value={selectedPlantel}
          options={planteles || []}
          onChange={(event) => setSelectedPlantel(event.target.value)}
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

SolicitudServSocFilter.propTypes = {
  setSolicitudes: PropTypes.func.isRequired,
  setPrograma: PropTypes.func.isRequired,
  setInstitucion: PropTypes.func.isRequired,
  setTableEnabled: PropTypes.func.isRequired,
};
