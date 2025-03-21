import dayjs from 'dayjs';
import { getData, createRecord, updateRecord } from '@siiges-ui/shared';

const fetchSolicitudesData = (setNoti, setLoading, setData) => {
  getData({ endpoint: '/solicitudesServicioSocial' })
    .then((response) => {
      if (response.data) {
        const mappedRows = response.data.map((servicio) => ({
          id: servicio.id,
          folioSolicitud: servicio.folioSolicitud,
          programaId: servicio.cicloEscolar.nombre,
          estatus: servicio.estatusSolicitudServicioSocial.nombre,
          fechaSolicitud: dayjs(servicio.createdAt).format('DD/MM/YYYY'),
        }));
        setData(mappedRows);
      }
    })
    .catch((error) => {
      setNoti({
        open: true,
        message: `¡Ocurrió un error inesperado!: ${error.message}`,
        type: 'error',
      });
    })
    .finally(() => {
      setLoading(false);
    });
};

const fetchProgramaPlantelData = async (setNoti, setLoading, setData, programa, institucion) => {
  try {
    const { data } = await getData({ endpoint: `/programas/${programa}` });
    const responsePlantel = await getData({ endpoint: `/instituciones/${institucion}/planteles/${data.plantelId}` });

    setData({
      programa: data,
      plantel: responsePlantel.data,
    });
  } catch (error) {
    setNoti({
      open: true,
      message: `¡Error al cargar la solicitud!: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
};

const fetchPlantelData = async (setNoti, setLoading, setData, institucionId, plantelId) => {
  try {
    const responsePlantel = await getData({ endpoint: `/instituciones/${institucionId}/planteles/${plantelId}` });

    setData({
      plantel: responsePlantel.data,
    });
  } catch (error) {
    setNoti({
      open: true,
      message: `¡Error al cargar la solicitud!: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
};

const fetchCiclosData = async (setNoti, setLoading, setCiclos, programaId) => {
  try {
    const { data } = await getData({ endpoint: `/ciclosEscolares/programas/${programaId}` });

    setCiclos(data);
  } catch (error) {
    setNoti({
      open: true,
      message: `¡Error al cargar los ciclos!: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
};

const fetchSolicitudData = async (setNoti, setLoading, setFormData, solicitudId) => {
  try {
    const { data } = await getData({ endpoint: `/solicitudesServicioSocial/${solicitudId}` });
    setFormData(data);
  } catch (error) {
    setNoti({
      open: true,
      message: `¡Error al cargar los ciclos!: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
};

const navigateTo = (id, type, dataQuery, router) => {
  const path = type === 'crear' ? `/serviciosEscolares/servicioSocial/${type}` : `/serviciosEscolares/servicioSocial/${type}/${id}`;

  router.push({
    pathname: path,
    query: {
      ...dataQuery, type,
    },
  }, path);
};

const handleSaveSolicitud = async (
  setNoti,
  setLoading,
  setSolicitudId,
  requestData,
  setTabIndex,
) => {
  setLoading(true);
  try {
    const ALUMNOS_SECTION = 1;

    const response = await createRecord({
      data: requestData,
      endpoint: '/solicitudesServicioSocial',
    });

    if (response.statusCode === 200 || response.statusCode === 201) {
      setSolicitudId(response.data.id);
      setTabIndex(ALUMNOS_SECTION);
      setNoti({
        open: true,
        message: '¡Éxito al crear la solicitud!, ya puede agregar alumnos',
        type: 'success',
      });
    } else {
      setNoti({
        open: true,
        message:
          response.message
          || '¡Error al procesar la solicitud, revise que los campos estén correctos!',
        type: 'error',
      });
    }
  } catch (error) {
    setNoti({
      open: true,
      message: `¡Error al procesar la solicitud!: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
};

const handleUpdateSolicitud = async (
  setNoti,
  setLoading,
  reqData,
  solicitudId,
) => {
  setLoading(true);
  try {
    if (!solicitudId) {
      return;
    }
    const response = await updateRecord({
      data: reqData,
      endpoint: `/solicitudesServicioSocial/${solicitudId}`,
    });

    if (response.statusCode === 200 || response.statusCode === 201) {
      setNoti({
        open: true,
        message: '¡Éxito al actualizar la solicitud!',
        type: 'success',
      });
    } else {
      setNoti({
        open: true,
        message:
          response.message
          || '¡Error al procesar la solicitud, revise que los campos estén correctos!',
        type: 'error',
      });
    }
  } catch (error) {
    setNoti({
      open: true,
      message: `¡Error al procesar la solicitud!: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
};

const handleSendSolicitud = async (
  setNoti,
  setLoading,
  reqData,
  router,
  solicitudId,
) => async (estatusSolicitudBecaId, setOpen) => {
  setLoading(true);
  try {
    const updatedFormData = {
      ...reqData,
      estatusSolicitudBecaId,
    };

    const response = await updateRecord({
      data: updatedFormData,
      endpoint: `/solicitudesServicioSocial/${solicitudId}`,
    });
    if (response.statusCode === 200 || response.statusCode === 201) {
      router.back();
      setNoti({
        open: true,
        message: '¡Éxito al actualizar la solicitud!',
        type: 'success',
      });
      setOpen(false);
    }
  } catch (error) {
    setOpen(false);
    setNoti({
      open: true,
      message: `¡Error al enviar la solicitud!: ${error}`,
      type: 'error',
    });
  }
};

const handleEditClick = (id, query, router) => navigateTo(id, 'editar', query, router);
const handleViewClick = (id, query, router) => navigateTo(id, 'consultar', query, router);
const handleCreateClick = (query, router) => navigateTo(null, 'crear', query, router);

export {
  updateRecord,
  handleViewClick,
  handleEditClick,
  handleCreateClick,
  handleSaveSolicitud,
  handleUpdateSolicitud,
  handleSendSolicitud,
  fetchSolicitudesData,
  fetchProgramaPlantelData,
  fetchPlantelData,
  fetchCiclosData,
  fetchSolicitudData,
};
