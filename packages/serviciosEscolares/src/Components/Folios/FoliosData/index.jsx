import Tooltip from '@mui/material/Tooltip';
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  IconButton,
  List,
  Divider,
} from '@mui/material';
import {
  ButtonSimple,
  Context,
  createRecord,
  DataTable,
  getData,
  GetFile,
  Input,
  InputFile,
  ListTitle,
  ListSubtitle,
  updateRecord,
  deleteRecord,
  DefaultModal,
  ButtonsForm,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import {
  ModalCertificado,
  ModalTitulo,
  ModalFirmaElectronica,
  ButtonsFolios,
} from '@siiges-ui/serviciosescolares';

const fundamentoLegal = [
  { id: 1, nombre: 'ART. 52 LRART. 5 CONST' },
  { id: 2, nombre: 'ART. 55 LRART. 5 CONST' },
  { id: 3, nombre: 'ART. 91 LRART. 5 CONST' },
  {
    id: 4,
    nombre: 'ART. 10 REGLAMENTO PARA LA PRESTACIÓN DEL SERVICIO SOCIAL DE LOS ESTUDIANTES DE LAS INSTITUCIONES DE EDUCACIÓN SUPERIOR EN LA REPÚBLICA MEXICANA',
  },
  { id: 5, nombre: 'NO APLICA' },
];

const modalidadTitulacion = [
  { id: 1, nombre: 'Por Tesis' },
  { id: 2, nombre: 'Por Promedio' },
  { id: 3, nombre: 'Por Estudios de Posgrados' },
  { id: 4, nombre: 'Por Experiencia Laboral' },
  { id: 5, nombre: 'Por Ceneval' },
  { id: 6, nombre: 'Otro' },
];

const PERIODOS = {
  1: 'Semestral',
  2: 'Cuatrimestral',
  3: 'Anual',
  4: 'Semestral curriculum flexible',
  5: 'Cuatrimestral curriculum flexible',
};

const MODALIDADES = {
  1: 'Escolarizada',
  2: 'No Escolarizada',
  3: 'Mixta',
  4: 'Dual',
};

const NIVEL = {
  1: 'Bachillerato',
  2: 'Licenciatura',
  3: 'Técnico Superior Universitario',
  4: 'Especialidad',
  5: 'Maestría ',
  6: 'Doctorado',
  7: 'Profesional Asociado',
  8: 'Educación Continua',
};

const tipoSolicitudFolioOptions = [
  { id: 1, label: 'Duplicado' },
  { id: 2, label: 'Parcial' },
  { id: 3, label: 'Total' },
];

export default function FoliosData({ type }) {
  const { setNoti, loading, setLoading } = useContext(Context);
  const [url, setUrl] = useState(null);
  const [id, setId] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFirmaModal, setOpenFirmaModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rowData, setRowData] = useState({});
  const [alumnoType, setAlumnoType] = useState('create');
  const [alumnosData, setAlumnosData] = useState([]);
  const [solicitudData, setSolicitudData] = useState(null);
  const [alumnoResponse, setAlumnoResponse] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [alumnoToDelete, setAlumnoToDelete] = useState(null);
  const [estatus, setEstatus] = useState(null);
  const [etiquetas, setEtiquetas] = useState({
    tipoDocumento: '',
    tipoSolicitudFolio: '',
    acuerdoRvoe: '',
    planEstudios: '',
    gradoAcademico: '',
    modalidades: '',
    periodos: '',
    institucion: '',
    claveCentroTrabajo: '',
  });
  const [formData, setFormData] = useState({
    folioPago: '',
    claveInstitucionDGP: '',
    claveCarreraDGP: '',
    tipoDocumentoId: '',
    tipoSolicitudFolioId: '',
    estatusSolicitudFolioId: 1,
    programaId: '',
    fecha: dayjs(),
  });

  const selectedAlumno = rows.find((row) => row.id === alumnoToDelete);

  const router = useRouter();
  const {
    tipoDocumento,
    tipoSolicitud,
    programa,
    id: editId,
    status,
  } = router.query;

  const esCertificado = etiquetas.tipoDocumento === 'Certificado';

  const accion = status || (
    typeof window !== 'undefined'
      ? sessionStorage.getItem('foliosAccion')
      : null
  );

  let title = '';
  if (estatus === 2) {
    title = accion === 'revisar' ? 'Revisar Solicitud' : 'Consultar Solicitud';
  } else if (estatus === 3) {
    title = accion === 'envio'
      ? `Envío de Solicitud a ${etiquetas.tipoDocumento}`
      : 'Consultar Envio de Solicitud a Titulación';
  } else if (estatus === 4) {
    title = 'Atender Observaciones de Solicitud';
  } else if (estatus === 8 || estatus === 9) {
    title = 'Firma de Certificados IES';
  } else if (estatus === 10 || estatus === 11) {
    title = 'Firma de Certificados SICYT';
  }

  useEffect(() => {
    if (type === 'edit') {
      setIsSaved(true);
    }
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (type === 'edit' && editId) {
          response = await getData({ endpoint: `/solicitudesFolios/${editId}` });
        } else {
          response = await getData({ endpoint: `/programas/${programa}` });
        }
        const { data } = response;
        if (type === 'edit') {
          setSolicitudData(data);
          setEstatus(data.estatusSolicitudFolioId);
          setFormData({
            folioPago: data.folioPago,
            claveInstitucionDGP: data.claveInstitucionDGP,
            claveCarreraDGP: data.claveCarreraDGP,
            tipoDocumentoId: data.tipoDocumentoId,
            tipoSolicitudFolioId: data.tipoSolicitudFolioId,
            estatusSolicitudFolioId: data.estatusSolicitudFolioId,
            programaId: data.programaId,
            fecha: dayjs(data.createdAt),
          });
          setEtiquetas({
            tipoDocumento: data.tipoDocumento?.nombre,
            tipoSolicitudFolio: data.tipoSolicitudFolio?.nombre,
            acuerdoRvoe: data.programa?.acuerdoRvoe || '',
            planEstudios: data.programa?.nombre || '',
            gradoAcademico: data.programa?.nivelId || '',
            institucion: data.programa?.plantel?.institucion?.nombre || '',
            claveCentroTrabajo: data.programa?.plantel?.claveCentroTrabajo || '',
            modalidades: data.programa?.modalidadId,
            periodos: data.programa?.cicloId,
          });
          setIsSaved(true);
          setId(editId);
          GetFile(
            {
              entidadId: editId,
              tipoEntidad: 'SOLICITUD_FOLIO',
              tipoDocumento: 'COMPROBANTE_PAGO_FOLIOS',
            },
            setUrl,
          );
        } else {
          setFormData({
            tipoDocumentoId: Number(tipoDocumento),
            tipoSolicitudFolioId: Number(tipoSolicitud),
            estatusSolicitudFolioId: 1,
            programaId: data.id,
            fecha: dayjs(data.fecha),
          });
          setEtiquetas({
            institucion: data.plantel?.institucion?.nombre,
            claveCentroTrabajo: data.plantel?.claveCentroTrabajo,
            tipoDocumento: tipoDocumento === '1' ? 'Título' : 'Certificado',
            tipoSolicitudFolio: tipoSolicitudFolioOptions.find(
              (o) => o.id === Number(tipoSolicitud),
            )?.label,
            acuerdoRvoe: data.acuerdoRvoe,
            planEstudios: data.nombre,
            gradoAcademico: data.nivelId,
            modalidades: data.modalidadId,
            periodos: data.cicloId,
          });
        }
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
    fetchData();
  }, [type, editId]);

  useEffect(() => {
    if (id && alumnoResponse) {
      setLoading(true);
      getData({ endpoint: `/solicitudesFolios/${id}/alumnos` })
        .then((response) => {
          if (response.data) {
            const mappedRows = response.data.map((alumno) => {
              const fundamentoObj = fundamentoLegal.find(
                (f) => f.id === alumno.fundamentoServicioSocialId,
              );
              const titulacionObj = modalidadTitulacion.find(
                (t) => t.id === alumno.modalidadTitulacionId,
              );
              return {
                id: alumno.id,
                consecutivo: alumno.consecutivo,
                name: `${alumno.alumno.persona.nombre} ${alumno.alumno.persona.apellidoPaterno} ${alumno.alumno.persona.apellidoMaterno}`,
                numeroFolioActa: alumno.folioActa || '',
                matricula: alumno.alumno.matricula,
                fechaTerminacion: dayjs(alumno.fechaTerminacion).format('DD/MM/YYYY'),
                fechaExpedicion: dayjs(alumno.fechaExpedicion).format('DD/MM/YYYY'),
                fechaInicio: dayjs(alumno.fechaInicio).format('DD/MM/YYYY'),
                fundamento: fundamentoObj ? fundamentoObj.nombre : 'Desconocido',
                folio: alumno.folioDocumentoAlumno?.folioDocumento,
                foja: alumno.folioDocumentoAlumno?.foja?.nombre,
                libro: alumno.folioDocumentoAlumno?.libro?.nombre,
                titulacion: titulacionObj ? titulacionObj.nombre : 'Desconocido',
                estatusFirmado: alumno.folioDocumentoAlumno?.estatusFirmado || null,
              };
            });
            setRows(mappedRows);
            setAlumnosData(response.data);
            setAlumnoResponse(false);
          }
        })
        .catch((error) => {
          setNoti({
            open: true,
            message: `¡Ocurrió un error inesperado!: ${error}`,
            type: 'error',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, alumnoResponse]);

  const handleEdit = async (value) => {
    try {
      setAlumnoType('edit');
      const alumno = alumnosData.find((row) => row.id === value);
      setRowData(alumno);
      setDisabled(false);
      setOpen(true);
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al cargar los datos!: ${error.message}`,
        type: 'error',
      });
    }
  };

  const handleConsult = async (value) => {
    try {
      setAlumnoType('consult');
      const alumno = alumnosData.find((row) => row.id === value);
      setRowData(alumno);
      setDisabled(true);
      setOpen(true);
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al cargar los datos!: ${error.message}`,
        type: 'error',
      });
    }
  };

  const handleDeleteAlumno = (alumnoId) => {
    setAlumnoToDelete(alumnoId);
    setOpenDeleteModal(true);
  };

  const confirmDeleteAlumno = async () => {
    if (!alumnoToDelete) return;
    setLoading(true);
    try {
      const response = await deleteRecord({
        endpoint: `/solicitudesFolios/solicitudesFoliosAlumnos/${alumnoToDelete}`,
      });
      if (response.statusCode === 200) {
        setNoti({
          open: true,
          message: 'Alumno eliminado correctamente',
          type: 'success',
        });
        setAlumnoResponse(true);
      }
    } catch (error) {
      setNoti({
        open: true,
        message: 'Error al eliminar el alumno',
        type: 'error',
      });
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
      setAlumnoToDelete(null);
    }
  };

  const handleAddAlumno = () => {
    setAlumnoType('create');
    setDisabled(false);
    setOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleGenerarPDF = async (alumnoId) => {
    setLoading(true);
    try {
      const response = await getData({
        endpoint: `/files?tipoEntidad=FOLIO_DOCUMENTO_ALUMNO&entidadId=${alumnoId}&tipoDocumento=CERTIFICADO_ELECTRONICO_PDF`,
      });
      if (response.errorMessage) {
        setNoti({ open: true, message: response.errorMessage, type: 'error' });
        return;
      }
      if (response.data?.url) {
        window.open(response.data.url, '_blank');
      } else if (typeof response.data === 'string') {
        window.open(response.data, '_blank');
      } else {
        setNoti({ open: true, message: 'No se pudo obtener el PDF', type: 'error' });
      }
    } catch (error) {
      setNoti({ open: true, message: error.message || 'Error al generar el PDF', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFirmaSuccess = async (documentosPayload) => {
    try {
      const response = await createRecord({
        endpoint: '/solicitudesFolios/firmaDocumento',
        data: documentosPayload,
      });

      if (response.errorMessage) {
        setNoti({ open: true, message: response.errorMessage, type: 'error' });
        return [];
      }

      const resultados = response.data || [];
      const exitosos = resultados.filter((r) => r.estatusFirmado === 'exitoso').length;
      const rechazados = resultados.filter((r) => r.estatusFirmado === 'rechazado').length;

      if (exitosos > 0 && rechazados === 0) {
        setNoti({
          open: true,
          message: `¡${exitosos} documento(s) firmado(s) exitosamente!`,
          type: 'success',
        });
      } else if (exitosos > 0 && rechazados > 0) {
        setNoti({
          open: true,
          message: `${exitosos} firmado(s), ${rechazados} rechazado(s)`,
          type: 'warning',
        });
      } else {
        setNoti({ open: true, message: 'No se pudo firmar ningún documento', type: 'error' });
      }

      setAlumnoResponse(true);
      return resultados;
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al firmar los documentos',
        type: 'error',
      });
      return [];
    }
  };

  const handleConfirm = async (data = formData) => {
    if (loading) return;
    setLoading(true);
    try {
      const requestData = isSaved ? data : formData;
      const response = isSaved
        ? await updateRecord({ data: requestData, endpoint: `/solicitudesFolios/${id}` })
        : await createRecord({ data: requestData, endpoint: '/solicitudesFolios' });

      if (response.statusCode === 200 || response.statusCode === 201) {
        setId(response.data.id);
        setIsSaved(true);
        setNoti({
          open: true,
          message: type === 'edit'
            ? '¡Éxito al actualizar la solicitud!'
            : '¡Éxito al crear la solicitud!, ya puede agregar alumnos',
          type: 'success',
        });
      } else {
        setNoti({
          open: true,
          message: response.message || '¡Error al procesar la solicitud, revise que los campos estén correctos!',
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

  const handleSend = async () => {
    try {
      const updatedFormData = { ...formData, estatusSolicitudFolioId: 2 };
      await handleConfirm(updatedFormData);
      router.back();
      setOpen(false);
    } catch (error) {
      setOpen(false);
      setNoti({
        open: true,
        message: `¡Error al enviar la solicitud!: ${error}`,
        type: 'error',
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const columnsTitulo = (handleEditFn, handleConsultFn, handleDeleteFn) => [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'consecutivo', headerName: 'Consecutivo', width: 150 },
    { field: 'name', headerName: 'Nombre', width: 250 },
    { field: 'numeroFolioActa', headerName: 'Folio Acta', width: 150 },
    { field: 'matricula', headerName: 'Matrícula', width: 250 },
    { field: 'fechaTerminacion', headerName: 'Terminación de plan de estudios', width: 250 },
    { field: 'fechaInicio', headerName: 'Inicio de Plan de Estudios', width: 250 },
    { field: 'fundamento', headerName: 'Fundamento S.S.', width: 250 },
    { field: 'folio', headerName: 'Folio', width: 250 },
    { field: 'foja', headerName: 'Foja', width: 250 },
    { field: 'libro', headerName: 'Libro', width: 250 },
    { field: 'titulacion', headerName: 'Titulacion', width: 250 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <div>
          <Tooltip title="Consultar" placement="top">
            <IconButton onClick={() => handleConsultFn(params.row.id)}>
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
          {status !== 'consult' && (
            <Tooltip title="Editar" placement="top">
              <IconButton onClick={() => handleEditFn(params.row.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {status !== 'consult' && (
            <Tooltip title="Eliminar alumno" placement="top">
              <IconButton onClick={() => handleDeleteFn(params.row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const columnsCertificado = (handleEditFn, handleConsultFn, handleDeleteFn) => [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'consecutivo', headerName: 'Consecutivo', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 250 },
    { field: 'matricula', headerName: 'Matrícula', width: 250 },
    { field: 'fechaTerminacion', headerName: 'Fecha de Terminación', width: 250 },
    { field: 'fechaExpedicion', headerName: 'Fecha de Elaboración', width: 250 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => {
        const firmadoExitoso = params.row.estatusFirmado === 'exitoso';
        return (
          <div>
            <Tooltip title="Consultar" placement="top">
              <IconButton onClick={() => handleConsultFn(params.row.id)}>
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
            {status !== 'consult' && estatus !== 8 && estatus !== 9
              && estatus !== 10 && estatus !== 11 && (
                <Tooltip title="Editar" placement="top">
                  <IconButton onClick={() => handleEditFn(params.row.id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
            )}
            {status !== 'consult' && estatus !== 8 && estatus !== 9
              && estatus !== 10 && estatus !== 11 && (
                <Tooltip title="Eliminar alumno" placement="top">
                  <IconButton onClick={() => handleDeleteFn(params.row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
            )}
            {esCertificado && estatus === 11 && (
              <Tooltip
                title={firmadoExitoso ? 'Generar PDF' : 'Debe firmar primero'}
                placement="top"
              >
                <span>
                  <IconButton
                    onClick={() => handleGenerarPDF(params.row.id)}
                    disabled={!firmadoExitoso}
                    color={firmadoExitoso ? 'primary' : 'default'}
                  >
                    <PictureAsPdfIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  const debesMostrarFirma = esCertificado && (
    estatus === 3 || estatus === 8 || estatus === 9
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h5">{title}</Typography>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Datos de la Solicitud" />
          <Tab label="Alumnos" disabled={!id} />
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Datos de la institución</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid container xs={6}>
                <Grid item xs>
                  <List>
                    <ListTitle text="Institucion" />
                    <ListTitle text="CCT" />
                    <ListTitle text="Acuerdo RVOE" />
                    <ListTitle text="Nivel" />
                    <ListTitle text="Nombre del Programa" />
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Grid item xs>
                  <List>
                    <ListSubtitle text={etiquetas.institucion || 'N/A'} />
                    <ListSubtitle text={etiquetas.claveCentroTrabajo || 'N/A'} />
                    <ListSubtitle text={etiquetas.acuerdoRvoe || 'N/A'} />
                    <ListSubtitle text={NIVEL[etiquetas.gradoAcademico] || 'N/A'} />
                    <ListSubtitle text={etiquetas.planEstudios || 'N/A'} />
                  </List>
                </Grid>
              </Grid>
              <Grid container xs={5}>
                <Grid item xs>
                  <List>
                    <ListTitle text="Modalidad" />
                    <ListTitle text="Periodo" />
                    <ListTitle text="Tipo de Documento" />
                    <ListTitle text="Tipo de Solicitud" />
                    <ListTitle text="Alumnos" />
                  </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Grid item xs>
                  <List>
                    <ListSubtitle text={MODALIDADES[etiquetas.modalidades] || 'N/A'} />
                    <ListSubtitle text={PERIODOS[etiquetas.periodos] || 'N/A'} />
                    <ListSubtitle text={etiquetas.tipoDocumento || 'N/A'} />
                    <ListSubtitle text={etiquetas.tipoSolicitudFolio || 'N/A'} />
                    <ListSubtitle text={Array.isArray(alumnosData) ? alumnosData.length : 0} />
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Input
              label="Número de recibo de pago oficial"
              id="folioPago"
              name="folioPago"
              value={formData.folioPago}
              onChange={handleChange}
              disabled={status === 'consult'}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              label="Clave de institución"
              id="claveInstitucionDGP"
              name="claveInstitucionDGP"
              value={formData.claveInstitucionDGP}
              onChange={handleChange}
              disabled={status === 'consult'}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              label="Clave de carrera"
              id="claveCarreraDGP"
              name="claveCarreraDGP"
              value={formData.claveCarreraDGP}
              onChange={handleChange}
              disabled={status === 'consult'}
            />
          </Grid>
          <Grid item xs={12}>
            <InputFile
              label="Recibo de Pago"
              id={id}
              tipoDocumento="COMPROBANTE_PAGO_FOLIOS"
              tipoEntidad="SOLICITUD_FOLIO"
              url={url}
              setUrl={setUrl}
              disabled={!isSaved || status === 'consult'}
            />
          </Grid>
        </Grid>
      )}

      {tabIndex === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataTable
              buttonAdd={status !== 'consult' && estatus !== 8 && estatus !== 9
                && estatus !== 10 && estatus !== 11}
              buttonClick={handleAddAlumno}
              buttonText="Agregar Alumnos"
              title="Alumnos"
              rows={rows}
              columns={formData.tipoDocumentoId === 1
                ? columnsTitulo(handleEdit, handleConsult, handleDeleteAlumno)
                : columnsCertificado(handleEdit, handleConsult, handleDeleteAlumno)}
              initialState={{
                sorting: { sortModel: [{ field: 'consecutivo', sort: 'asc' }] },
              }}
            />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          {formData.estatusSolicitudFolioId === 2 ? (
            <ButtonSimple
              design="error"
              text="Regresar"
              onClick={() => router.back()}
            />
          ) : (
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <ButtonSimple
                  text="Regresar"
                  design="enviar"
                  onClick={() => router.back()}
                />
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  {debesMostrarFirma && (
                    <Grid item>
                      <ButtonSimple
                        text="Firmar Solicitud"
                        onClick={() => setOpenFirmaModal(true)}
                      />
                    </Grid>
                  )}
                  {!debesMostrarFirma && (
                    <ButtonsFolios
                      save={handleConfirm}
                      cancel={() => router.push('/serviciosEscolares/solicitudesFolios')}
                      send={handleSend}
                      disabled={status === 'consult'}
                      saved={isSaved}
                      alumnos={alumnosData}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      {formData.tipoDocumentoId === 1 ? (
        <ModalTitulo
          open={open}
          setOpen={setOpen}
          type={alumnoType}
          id={id}
          rowData={rowData}
          programaId={formData.programaId}
          setAlumnoResponse={setAlumnoResponse}
          disabled={disabled}
          alumnosAgregados={alumnosData}
        />
      ) : (
        <ModalCertificado
          open={open}
          setOpen={setOpen}
          type={alumnoType}
          id={id}
          programaId={formData.programaId}
          rowData={rowData}
          setAlumnoResponse={setAlumnoResponse}
          disabled={disabled}
          alumnosAgregados={alumnosData}
        />
      )}

      <ModalFirmaElectronica
        open={openFirmaModal}
        onClose={() => setOpenFirmaModal(false)}
        onConfirm={async (documentosPayload) => {
          const resultados = await handleFirmaSuccess(documentosPayload);
          setOpenFirmaModal(false);
          return resultados;
        }}
        title="Firmar Certificados"
        alumnosData={alumnosData}
        solicitudData={solicitudData}
      />

      <DefaultModal
        title="Eliminar alumno"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      >
        <Typography>
          Está a punto de eliminar al alumno con matrícula:
          {' '}
          <strong>{selectedAlumno?.matricula}</strong>
          {' '}
          de esta solicitud.
          <br />
          Esta acción no se puede deshacer.
          <br />
          ¿Desea continuar?
        </Typography>
        <ButtonsForm
          cancel={() => setOpenDeleteModal(false)}
          confirm={confirmDeleteAlumno}
          confirmText="Confirmar"
        />
      </DefaultModal>
    </Box>
  );
}

FoliosData.defaultProps = {
  type: null,
};

FoliosData.propTypes = {
  type: PropTypes.string,
};
