import {
  Grid, Typography, Tabs, Tab, Box, IconButton,
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
  LabelData,
  updateRecord,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import ButtonsFolios from '../ButtonsFolios';
import ModalCertificado from './Modal/certificados';
import ModalTitulo from './Modal/titulos';

const columns = (handleEdit, handleConsult, status) => [
  {
    field: 'id',
    headerName: 'ID',
    hide: true,
  },
  { field: 'name', headerName: 'Nombre', width: 250 },
  {
    field: 'fechaTerminacion',
    headerName: 'Fecha de terminación de plan de estudios',
    width: 350,
  },
  {
    field: 'fechaElaboracion',
    headerName: 'Fecha de elaboración de certificado',
    width: 350,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <div>
        <IconButton onClick={() => handleConsult(params.row.id)}>
          <ArticleIcon />
        </IconButton>
        {status !== 'consult' && (
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
        )}
      </div>
    ),
  },
];

export default function FoliosData({ type }) {
  const { setNoti, loading, setLoading } = useContext(Context);
  const [url, setUrl] = useState(null);
  const [id, setId] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rowData, setRowData] = useState({});
  const [alumnoType, setAlumnoType] = useState('create');
  const [alumnosData, setAlumnosData] = useState({});
  const [alumnoResponse, setAlumnoResponse] = useState(true);
  const [formData, setFormData] = useState({
    folioPago: '',
    tipoDocumentoId: '',
    tipoSolicitudFolioId: '',
    estatusSolicitudFolioId: 1,
    programaId: '',
    fecha: dayjs(),
  });
  const [etiquetas, setEtiquetas] = useState({
    tipoDocumento: '',
    tipoSolicitudFolio: '',
    acuerdoRvoe: '',
    planEstudios: '',
    gradoAcademico: '',
  });

  const router = useRouter();
  const {
    tipoDocumento,
    tipoSolicitud,
    programa,
    id: editId,
    status,
  } = router.query;

  const tipoSolicitudFolioOptions = [
    { id: 1, label: 'Total' },
    { id: 2, label: 'Parcial' },
    { id: 3, label: 'Duplicado' },
  ];

  const selectedTipoSolicitudFolio = tipoSolicitudFolioOptions.find(
    (option) => option.id === Number(tipoSolicitud),
  )?.label || 'Desconocido';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (type === 'edit' && editId) {
          response = await getData({
            endpoint: `/solicitudesFolios/${editId}`,
          });
        } else {
          response = await getData({ endpoint: `/programas/${programa}` });
        }
        const { data } = response;

        if (type === 'edit') {
          setFormData({
            folioPago: data.folioPago,
            tipoDocumentoId: data.tipoDocumentoId,
            tipoSolicitudFolioId: data.tipoSolicitudFolioId,
            estatusSolicitudFolioId: data.estatusSolicitudFolioId,
            programaId: data.programaId,
            fecha: dayjs(data.fecha),
          });
          setEtiquetas({
            tipoDocumento: data.tipoDocumento.nombre,
            tipoSolicitudFolio: data.tipoSolicitudFolio.nombre,
            acuerdoRvoe: data.programa.acuerdoRvoe,
            planEstudios: data.programa.nombre,
            gradoAcademico: data.programa.nivelId,
            institucion: data.programa?.plantel?.institucion?.nombre,
            claveCentroTrabajo: data.programa?.plantel?.claveCentroTrabajo,
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
            tipoDocumentoId: tipoDocumento,
            tipoSolicitudFolioId: tipoSolicitud,
            estatusSolicitudFolioId: 1,
            programaId: data.id,
            fecha: dayjs(data.fecha),
          });
          setEtiquetas({
            institucion: data.plantel?.institucion?.nombre,
            claveCentroTrabajo: data.plantel?.claveCentroTrabajo,
            tipoDocumento: tipoDocumento === '1' ? 'Titulo' : 'Certificado',
            tipoSolicitudFolio: selectedTipoSolicitudFolio,
            acuerdoRvoe: data.acuerdoRvoe,
            planEstudios: data.nombre,
            gradoAcademico: data.nivelId,
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
            const mappedRows = response.data.map((alumnos) => ({
              id: alumnos.id,
              name: `${alumnos.alumno.persona.nombre} ${alumnos.alumno.persona.apellidoPaterno} ${alumnos.alumno.persona.apellidoMaterno}`,
              fechaTerminacion: dayjs(alumnos.fechaTerminacion).format('DD/MM/YYYY'),
              fechaElaboracion: dayjs(alumnos.fechaElaboracion).format(
                'DD/MM/YYYY',
              ),
            }));
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
      setAlumnoType('edit');
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

  const handleAddAlumno = () => {
    setAlumnoType('create');
    setOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleConfirm = async (data = formData) => {
    if (loading) return;

    setLoading(true);
    try {
      const requestData = isSaved ? data : formData;

      const response = type === 'edit'
        ? await updateRecord({
          data: requestData,
          endpoint: `/solicitudesFolios/${id}`,
        })
        : await createRecord({
          data: requestData,
          endpoint: '/solicitudesFolios',
        });

      if (response.statusCode === 200 || response.statusCode === 201) {
        setId(response.data.id);
        setIsSaved(true);
        setNoti({
          open: true,
          message:
            type === 'edit'
              ? '¡Éxito al actualizar la solicitud!'
              : '¡Éxito al crear la solicitud!, ya puede agregar alumnos',
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

  const handleSend = async () => {
    try {
      const updatedFormData = {
        ...formData,
        estatusSolicitudFolioId: 2,
      };

      await handleConfirm(updatedFormData);
      router.back();
      setOpen(false);
    } catch (error) {
      setOpen(false);
      setNoti({
        open: true,
        message: `Error al enviar la solicitud: ${error}`,
        type: 'error',
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          <Grid item xs={8}>
            <LabelData title="Institución" subtitle={etiquetas.institucion} />
          </Grid>
          <Grid item xs={4}>
            <LabelData title="RVOE" subtitle={etiquetas.acuerdoRvoe} />
          </Grid>
          <Grid item xs={8}>
            <LabelData
              title="Grado Académico"
              subtitle={etiquetas.gradoAcademico}
            />
          </Grid>
          <Grid item xs={4}>
            <LabelData
              title="Plan de Estudios"
              subtitle={etiquetas.planEstudios}
            />
          </Grid>
          <Grid item xs={8}>
            <LabelData
              title="Clave de centro de trabajo"
              subtitle={etiquetas.claveCentroTrabajo}
            />
          </Grid>
          <Grid item xs={4}>
            <LabelData
              title="Tipo de Documento"
              subtitle={etiquetas.tipoDocumento}
            />
          </Grid>
          <Grid item xs={12}>
            <LabelData
              title="Tipo de Solicitud"
              subtitle={etiquetas.tipoSolicitudFolio}
            />
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
              buttonAdd={status !== 'consult'}
              buttonClick={handleAddAlumno}
              buttonText="Agregar Alumnos"
              title="Alumnos"
              rows={rows}
              columns={columns(handleEdit, handleConsult, status)}
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          {formData.estatusSolicitudFolioId === 2 ? (
            <ButtonSimple design="error" text="Regresar" onClick={() => router.back()} />
          ) : (
            <ButtonsFolios
              save={handleConfirm}
              cancel={() => router.push('/serviciosEscolares/solicitudesFolios')}
              send={handleSend}
              disabled={status === 'consult'}
              saved={isSaved}
            />
          )}
        </Grid>
      </Grid>
      {tipoDocumento === '1' ? (
        <ModalTitulo
          open={open}
          setOpen={setOpen}
          type={alumnoType}
          id={id}
          rowData={rowData}
          programaId={programa}
          setAlumnoResponse={setAlumnoResponse}
          disabled={disabled}
        />
      ) : (
        <ModalCertificado
          open={open}
          setOpen={setOpen}
          type={alumnoType}
          id={id}
          programaId={programa}
          rowData={rowData}
          title="Agregar Alumno"
          setAlumnoResponse={setAlumnoResponse}
          disabled={disabled}
        />
      )}
    </Box>
  );
}

FoliosData.propTypes = {
  type: PropTypes.string.isRequired,
};
