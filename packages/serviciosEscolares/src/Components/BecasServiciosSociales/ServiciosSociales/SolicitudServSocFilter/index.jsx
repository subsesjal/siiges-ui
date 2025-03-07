import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Select, Context } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import {
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import { getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';

export default function SolicitudServSocFilter({ setSolicitudes, setLoading, setTableEnabled }) {
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });
  const { setNoti, session } = useContext(Context);

  const [selectedInstitucion, setSelectedInstitucion] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('servicio_social_selectedInstitucion')
    ? localStorage.getItem('servicio_social_selectedInstitucion')
    : ''));

  const [selectedPlantel, setSelectedPlantel] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('servicio_social_selectedPlantel')
    ? localStorage.getItem('servicio_social_selectedPlantel')
    : ''));

  const [selectedPrograma, setSelectedPrograma] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('servicio_social_selectedPrograma')
    ? localStorage.getItem('servicio_social_selectedPrograma')
    : ''));

  const [planteles, setPlanteles] = useState([]);
  const [programas, setProgramas] = useState([]);
  const isAdmin = session.rol === 'admin';

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
        setProgramas(data.programas || []);
      }
    });
  };

  const fetchSolicitudes = () => {
    setLoading(true);
    getData({ endpoint: '/solicitudesServicioSocial' })
      .then((response) => {
        if (response.data) {
          setSolicitudes(response.data || []);
          setTableEnabled(true);
        }
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `¡Error al obtener solicitudes de servicio social!: ${error.message}`,
          type: 'error',
        });
        setSolicitudes([]);
        setTableEnabled(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedInstitucion) {
      fetchPlanteles(selectedInstitucion);
    }
  }, [selectedInstitucion]);

  useEffect(() => {
    if (selectedPlantel) {
      fetchProgramas(selectedPlantel);
    }
  }, [selectedPlantel]);

  useEffect(() => {
    if (selectedPrograma) {
      fetchSolicitudes(selectedPrograma);
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
          disabled={!isAdmin}
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
          onChange={(event) => setSelectedPrograma(event.target.value)}
          disabled={!selectedPlantel}
        />
      </Grid>
    </Grid>
  );
}

SolicitudServSocFilter.propTypes = {
  setSolicitudes: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setTableEnabled: PropTypes.func.isRequired,
};
