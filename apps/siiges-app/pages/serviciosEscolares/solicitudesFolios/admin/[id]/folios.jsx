import {
  Grid, Typography, Tabs, Tab,
  IconButton,
} from '@mui/material';
import {
  Context,
  createRecord,
  DataTable,
  getData,
  Input,
  LabelData,
  Layout,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { ButtonsFoliosAdmin, ModalCertificado, ModalTitulo } from '@siiges-ui/serviciosescolares';
import dayjs from 'dayjs';

export default function Folios() {
  const { setNoti, setLoading } = useContext(Context);
  const [etiquetas, setEtiquetas] = useState({
    tipoDocumento: '',
    tipoSolicitudFolio: '',
    acuerdoRvoe: '',
    planEstudios: '',
    gradoAcademico: '',
    nombreAlumno: '',
    matriculaAlumno: '',
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [observaciones, setObservaciones] = useState('');
  const [estatus, setEstatus] = useState();
  const [alumnosRows, setAlumnosRows] = useState([]);
  const [alumnoData, setAlumnoData] = useState({});
  const [rowData, setRowData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getData({
            endpoint: `/solicitudesFolios/${id}`,
          });
          const { data } = response;
          setEtiquetas({
            tipoDocumento: data.tipoDocumento.nombre,
            tipoSolicitudFolio: data.tipoSolicitudFolio.nombre,
            acuerdoRvoe: data.programa.acuerdoRvoe,
            planEstudios: data.programa.nombre,
            gradoAcademico: data.programa.nivelId,
            nombreAlumno: data.alumno ? data.alumno.nombre : '',
            matriculaAlumno: data.alumno ? data.alumno.matricula : '',
            institucion: data.programa?.plantel?.institucion?.nombre,
            claveCentroTrabajo: data.programa?.plantel?.claveCentroTrabajo,
          });
          setEstatus(data.estatusSolicitudFolioId);
          setTipoDocumento(data.tipoDocumentoId);

          const alumnosResponse = await getData({
            endpoint: `/solicitudesFolios/${id}/alumnos`,
          });

          if (alumnosResponse.data) {
            const mappedAlumnos = alumnosResponse.data.map((res) => ({
              id: res.id,
              nombre: `${res.alumno.persona.nombre} ${res.alumno.persona.apellidoPaterno} ${res.alumno.persona.apellidoMaterno}`,
              matricula: res.alumno.matricula,
              folio: res.folioDocumentoAlumno?.folioDocumento,
              foja: res.folioDocumentoAlumno?.foja?.nombre,
              libro: res.folioDocumentoAlumno?.libro?.nombre,
              envio: res.folioDocumentoAlumno?.envioExitoso ? 'Enviado' : 'Pendiente',
              fechaElaboracion: dayjs(res.fechaElaboracion).format(
                'DD/MM/YYYY',
              ),
              fechaTermino: dayjs(res.fechaTermino).format('DD/MM/YYYY'),
            }));

            setAlumnosRows(mappedAlumnos);
            setAlumnoData(alumnosResponse.data);
          }
        } catch (error) {
          setNoti({
            open: true,
            message: `¡Error al cargar la solicitud!: ${error.message}`,
            type: 'error',
          });
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleObservacionesChange = (event) => {
    setObservaciones(event.target.value);
  };

  const handleObservacionesSubmit = async () => {
    if (id && observaciones) {
      setLoading(true);
      try {
        const response = await createRecord({
          data: { observaciones },
          endpoint: `/solicitudesFolios/${id}/observaciones`,
        });

        if (response.statusCode === 201) {
          setNoti({
            open: true,
            message: '¡Observaciones actualizadas con éxito!',
            type: 'success',
          });
        } else {
          throw new Error(response.message || '¡Error al actualizar las observaciones!');
        }
      } catch (error) {
        setNoti({
          open: true,
          message: `¡Error al actualizar las observaciones!: ${error.message}`,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFoliosSubmit = async () => {
    if (id) {
      setLoading(true);
      try {
        const endpoint = estatus === 3
          ? `/solicitudesFolios/${id}/envioTitulacion`
          : `/solicitudesFolios/${id}/asignacionFolios`;

        const response = await createRecord({
          data: {},
          endpoint,
        });

        if (response.statusCode === 201) {
          setNoti({
            open: true,
            message: '¡Folios asignados con éxito!',
            type: 'success',
          });
          router.back();
        } else {
          throw new Error(response.message || '¡Error al asignar los folios!');
        }
      } catch (error) {
        setNoti({
          open: true,
          message: `¡Error al asignar los folios!: ${error.message}`,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConsult = async (value) => {
    try {
      const alumno = alumnoData.find((row) => row.id === value);
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

  const alumnosColumns = [
    {
      field: 'id', headerName: 'ID', width: 100, hide: true,
    },
    { field: 'nombre', headerName: 'Nombre', width: 320 },
    { field: 'matricula', headerName: 'Matrícula', width: 150 },
    { field: 'folio', headerName: 'Folio', width: 200 },
    { field: 'envio', headerName: 'Estatus de envio', width: 200 },
    { field: 'foja', headerName: 'Foja', width: 200 },
    { field: 'libro', headerName: 'Libro', width: 200 },
    {
      field: 'fechaElaboracion',
      headerName: 'Fecha de Elaboración',
      width: 300,
    },
    { field: 'fechaTermino', headerName: 'Fecha de Término', width: 300 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleConsult(params.row.id)}>
          <VisibilityOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  let title = 'Consultar solicitud';
  if (estatus === 2) {
    title = 'Revisar Solicitud';
  } else if (estatus === 3) {
    title = `Envío de Solicitud a ${etiquetas.tipoDocumento}`;
  } else if (estatus === 4) {
    title = 'Atender Observaciones de Solicitud';
  }

  return (
    <Layout title={title}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="Tabs for Instituciones and Alumnos"
            >
              <Tab label="Instituciones" />
              <Tab label="Alumnos" />
            </Tabs>
          </Grid>
        </Grid>

        {tabIndex === 0 && (
          <>
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
          </>
        )}

        {tabIndex === 1 && (
          <>
            <Grid item xs={12}>
              <DataTable
                title="Alumnos"
                rows={alumnosRows}
                columns={alumnosColumns}
              />
            </Grid>
            {tipoDocumento === 1 ? (
              <ModalTitulo
                open={open}
                setOpen={setOpen}
                type="consult"
                id={id}
                rowData={rowData}
                setAlumnoResponse={() => {}}
                disabled={disabled}
              />
            ) : (
              <ModalCertificado
                open={open}
                setOpen={setOpen}
                type="consult"
                id={id}
                rowData={rowData}
                title="Agregar Alumno"
                setAlumnoResponse={() => {}}
                disabled={disabled}
              />
            )}
          </>
        )}

        {estatus !== 3 && (
        <Grid item xs={12}>
          <Input
            id="observaciones"
            name="observaciones"
            label="Observaciones"
            multiline
            rows={4}
            value={observaciones}
            onChange={handleObservacionesChange}
          />
        </Grid>
        )}
        <Grid item xs={12}>
          <ButtonsFoliosAdmin
            tipoDocumento={etiquetas.tipoDocumento}
            observaciones={handleObservacionesSubmit}
            folios={handleFoliosSubmit}
            estatus={estatus}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
