import React, {
  useState,
  useContext,
  useEffect, useCallback,
} from 'react';
import { Grid } from '@mui/material';
import { Select, Context } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import {
  getInstituciones,
  getPlantelesByInstitucion,
  getProgramas,
} from '@siiges-ui/instituciones';
import getInstitucionIdFromSession from '../../utils/getInstitucionId';

const LOCAL_STORAGE_KEY = 'foliosFormState';

export default function FoliosForm({
  setTipoSolicitud,
  setTipoDocumento,
  setEstatus,
  setPrograma,
  setPlantel,
  setLoading,
  setAgregarEnabled,
}) {
  const { instituciones } = getInstituciones({
    esNombreAutorizado: true,
    tipoInstitucionId: 1,
    setLoading,
  });

  const { setNoti, session } = useContext(Context);

  const isRepresentante = session?.rol === 'representante' || session?.rol === 'ce_ies';
  const isAdmin = session?.rol === 'admin' || session?.rol === 'ce_sicyt';

  const initialState = typeof window !== 'undefined' && localStorage.getItem(LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    : {
      selectedInstitucion: '',
      selectedPlantel: '',
      selectedPrograma: '',
      selectedDocumento: '',
      selectedSolicitud: '',
    };

  const [state, setState] = useState(initialState);
  const [arrays, setArrays] = useState({
    planteles: [],
    programas: [],
  });

  useEffect(() => {
    const resetState = {
      selectedInstitucion: '',
      selectedPlantel: '',
      selectedPrograma: '',
      selectedDocumento: '',
      selectedSolicitud: '',
    };
    setState(resetState);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  useEffect(() => {
    const asignarInstitucionDesdeSesion = async () => {
      if (isAdmin) return;

      if (!instituciones || instituciones.length === 0 || !session) return;

      const institucionId = await getInstitucionIdFromSession({ instituciones, session });

      if (institucionId) {
        setState((prev) => ({
          ...prev,
          selectedInstitucion: institucionId,
        }));
      } else if (isRepresentante) {
        setNoti({
          open: true,
          message: '¡No se encontró una institución con nombre autorizado asociada al usuario!',
          type: 'error',
        });
      }
    };
    asignarInstitucionDesdeSesion();
  }, [instituciones, session]);
  const fetchPlanteles = useCallback((institucionId) => {
    getPlantelesByInstitucion(institucionId, (error, data) => {
      if (error) {
        setNoti({ open: true, message: `¡Error al obtener planteles!: ${error.message}`, type: 'error' });
        setArrays((prev) => ({ ...prev, planteles: [] }));
      } else {
        const transformed = data?.planteles?.map((p) => ({
          id: p.id,
          nombre: `${p.domicilio.calle} ${p.domicilio.numeroExterior} | CCT: ${p.claveCentroTrabajo}`,
        })) || [];
        setArrays((prev) => ({ ...prev, planteles: transformed }));
      }
    });
  }, [setNoti]);

  const fetchProgramas = useCallback((plantelId) => {
    getProgramas(plantelId, (error, data) => {
      if (error) {
        setNoti({ open: true, message: `¡Error al obtener programas!: ${error.message}`, type: 'error' });
        setArrays((prev) => ({ ...prev, programas: [] }));
      } else {
        const transformed = data?.programas?.map((p) => ({
          id: p.id,
          nombre: `${p.nombre || ''} ${p.acuerdoRvoe || ''}`.trim(),
        })) || [];
        setArrays((prev) => ({ ...prev, programas: transformed }));
      }
    });
  }, [setNoti]);

  const handleInstitucionChange = (event) => {
    const selectedInstitucion = event.target.value;
    setState({
      selectedInstitucion,
      selectedPlantel: '',
      selectedPrograma: '',
      selectedDocumento: '',
      selectedSolicitud: '',
    });
    setPlantel('');
    setPrograma('');
    setTipoDocumento('');
    setTipoSolicitud('');
  };

  const handlePlantelChange = (event) => {
    const plantelId = event.target.value;
    setState((prev) => ({
      ...prev,
      selectedPlantel: plantelId,
      selectedPrograma: '',
      selectedDocumento: '',
      selectedSolicitud: '',
    }));
    const plantelObj = arrays.planteles.find((p) => p.id === plantelId);
    setPlantel(plantelObj?.nombre || '');
    setPrograma('');
    setTipoDocumento('');
    setTipoSolicitud('');
    if (plantelId) fetchProgramas(plantelId);
    else setArrays((prev) => ({ ...prev, programas: [] }));
  };

  const handleProgramaChange = (event) => {
    const programaId = event.target.value;
    setState((prev) => ({
      ...prev,
      selectedPrograma: programaId,
      selectedDocumento: '',
      selectedSolicitud: '',
    }));
    setPrograma(programaId);
    setTipoDocumento('');
    setTipoSolicitud('');
  };

  const handleDocumentoChange = (event) => {
    const tipoDoc = event.target.value;
    setState((prev) => ({
      ...prev,
      selectedDocumento: tipoDoc,
      selectedSolicitud: '',
    }));
    setTipoDocumento(tipoDoc);
    setTipoSolicitud('');
  };

  const handleSolicitudChange = (event) => {
    const tipoSol = event.target.value;
    setState((prev) => ({ ...prev, selectedSolicitud: tipoSol }));
    setTipoSolicitud(tipoSol);
  };

  const documentos = [
    { id: 1, nombre: 'Títulos' },
    { id: 2, nombre: 'Certificados' },
  ];

  const solicitudesTitulos = [
    { id: 1, nombre: 'Total' },
    { id: 3, nombre: 'Duplicado' },
  ];

  const solicitudesCertificados = [
    { id: 1, nombre: 'Total' },
    { id: 2, nombre: 'Parcial' },
    { id: 3, nombre: 'Duplicado' },
  ];

  const getSolicitudesOptions = () => {
    if (state.selectedDocumento === 1) return solicitudesTitulos;
    if (state.selectedDocumento === 2) return solicitudesCertificados;
    return [];
  };

  const estatusOptions = [
    { id: 1, nombre: 'Enviado' },
    { id: 2, nombre: 'En revisión' },
    { id: 3, nombre: 'Asignado' },
    { id: 4, nombre: 'Cancelado' },
  ];

  useEffect(() => {
    if (setAgregarEnabled) {
      setAgregarEnabled(!!state.selectedDocumento);
    }
  }, [state.selectedDocumento]);
  useEffect(() => {
    if (state.selectedInstitucion) fetchPlanteles(state.selectedInstitucion);
    else setArrays((prev) => ({ ...prev, planteles: [] }));
  }, [state.selectedInstitucion, fetchPlanteles]);

  useEffect(() => {
    if (state.selectedPlantel) fetchProgramas(state.selectedPlantel);
    else setArrays((prev) => ({ ...prev, programas: [] }));
  }, [state.selectedPlantel, fetchProgramas]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={state.selectedInstitucion}
          options={instituciones || []}
          onChange={handleInstitucionChange}
          disabled={!isAdmin && isRepresentante}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Planteles"
          name="planteles"
          value={state.selectedPlantel}
          options={arrays.planteles || []}
          onChange={handlePlantelChange}
          disabled={!state.selectedInstitucion}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Programas"
          name="programas"
          value={state.selectedPrograma}
          options={arrays.programas || []}
          onChange={handleProgramaChange}
          disabled={!state.selectedPlantel}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Tipo de documento"
          name="documento"
          value={state.selectedDocumento}
          options={documentos || []}
          onChange={handleDocumentoChange}
          disabled={!state.selectedPrograma}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Tipo de solicitud"
          name="solicitud"
          value={state.selectedSolicitud}
          options={getSolicitudesOptions() || []}
          onChange={handleSolicitudChange}
          disabled={!state.selectedDocumento}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Estatus"
          name="estatus"
          multiple
          options={estatusOptions || []}
          onChange={(event) => setEstatus(event.target.value)}
        />
      </Grid>
    </Grid>
  );
}

FoliosForm.propTypes = {
  setTipoSolicitud: PropTypes.func.isRequired,
  setTipoDocumento: PropTypes.func.isRequired,
  setPrograma: PropTypes.func.isRequired,
  setPlantel: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setEstatus: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  setAgregarEnabled: PropTypes.func,
};
