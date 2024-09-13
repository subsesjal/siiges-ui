import {
  Grid, Typography, Tabs, Tab, Box, IconButton,
} from '@mui/material';
import {
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
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import ButtonsFolios from '../ButtonsFolios';
import ModalCertificado from './Modal/certificados';

const columns = (handleEdit) => [
  {
    field: 'id',
    headerName: 'ID',
    hide: true,
  },
  { field: 'name', headerName: 'Nombre', width: 250 },
  {
    field: 'fechaTermino',
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
      <IconButton onClick={() => handleEdit(params.row.id)}>
        <EditIcon />
      </IconButton>
    ),
  },
];

export default function FoliosData({ type }) {
  const { setNoti, setLoading } = useContext(Context);
  const [url, setUrl] = useState(null);
  const [id, setId] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [alumnoType, setAlumnoType] = useState('create');
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
    tipoDocumento, tipoSolicitud, programa, id: editId, status,
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
            estatusSolicitudFolioId: data.estatusSolicitudFolioI,
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
    if (id) {
      setLoading(true);
      getData({ endpoint: `/solicitudesFolios/${id}/alumnos` })
        .then((response) => {
          if (response.data) {
            const mappedRows = response.data.map((alumnos) => ({
              id: alumnos.id,
              name: `${alumnos.alumno.persona.nombre} ${alumnos.alumno.persona.apellidoPaterno} ${alumnos.alumno.persona.apellidoMaterno}`,
              fechaTermino: dayjs(alumnos.fechaTermino).format('DD/MM/YYYY'),
              fechaElaboracion: dayjs(alumnos.fechaElaboracion).format(
                'DD/MM/YYYY',
              ),
            }));
            setRows(mappedRows);
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
  }, [id]);

  const handleEdit = (value) => {
    const data = rows.find((row) => row.id === value);
    setAlumnoType('edit');
    setRowData(data);
    setOpen(true);
  };

  const handleAddAlumno = () => {
    setAlumnoType('create');
    setOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = type === 'edit'
        ? await updateRecord({
          data: formData,
          endpoint: `/solicitudesFolios/${id}`,
        })
        : await createRecord({
          data: formData,
          endpoint: '/solicitudesFolios',
        });

      if (response.statusCode === 200 || response.statusCode === 201) {
        setId(response.data.id);
        setNoti({
          open: true,
          message:
            type === 'edit'
              ? 'Éxito al actualizar la solicitud'
              : 'Éxito al crear la solicitud, ya puede agregar alumnos',
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
      return response;
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al procesar la solicitud!: ${error.message}`,
        type: 'error',
      });
      return { statusCode: 500, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      estatusSolicitudFolioId: 2,
    }));

    await handleConfirm();
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
              disabled={status === 'consult'}
            />
          </Grid>
        </Grid>
      )}
      {tabIndex === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataTable
              buttonAdd
              buttonClick={handleAddAlumno}
              buttonText="Agregar Alumnos"
              rows={rows}
              columns={columns(handleEdit)}
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <ButtonsFolios
            confirm={handleConfirm}
            cancel={() => router.push('/serviciosEscolares/solicitudesFolios')}
            send={handleSend}
            disabled={status === 'consult'}
          />
        </Grid>
      </Grid>
      <ModalCertificado
        open={open}
        setOpen={setOpen}
        type={alumnoType}
        id={id}
        programaId={programa}
        setRows={setRows}
        rowData={rowData}
        title="Agregar Alumno"
      />
    </Box>
  );
}

FoliosData.propTypes = {
  type: PropTypes.string.isRequired,
};
