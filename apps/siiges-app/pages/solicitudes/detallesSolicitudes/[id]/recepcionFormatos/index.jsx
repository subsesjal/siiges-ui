import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  ButtonsForm,
  Context,
  DefaultModal,
  GetFile,
  Input,
  InputDate,
  Layout,
  ListSubtitle,
  ListTitle,
  updateRecord,
} from '@siiges-ui/shared';
import { getSolicitudDetalles } from '@siiges-ui/solicitudes';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

const initialCheckboxes = {
  fda01: false,
  fda02: false,
  fda03: false,
  fda04: false,
  fda05: false,
  fda06: false,
};

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function RecepcionFormatos() {
  const { session, setNoti, setLoading } = useContext(Context);
  const router = useRouter();
  const { query } = router;
  const [form, setForm] = useState({ estatusSolicitudId: 6 });
  const [errors, setErrors] = useState({});
  const [solicitud, setSolicitud] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [checkboxes, setCheckboxes] = useState({ ...initialCheckboxes });

  useEffect(() => {
    const fetchSolicitud = async () => {
      if (query.id !== undefined) {
        try {
          const solicitudData = await getSolicitudDetalles(
            query.id,
            session,
            setNoti,
          );
          setSolicitud(solicitudData.data);
        } catch (error) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            solicitudError: `Error fetching solicitud: ${error}`,
          }));
        }
      }
    };

    fetchSolicitud();
  }, [query, session, setNoti]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : '¡Este campo es obligatorio!',
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevForm) => ({
      ...prevForm,
      [name]: checked,
    }));
  };

  const allChecked = Object.values(checkboxes).every((value) => value);

  const handleDownload = (tipoDocumento) => {
    let tipoEntidad = 'SOLICITUD';
    let finalEntidadId = solicitud.id;
    let typeDocument = tipoDocumento;

    if (['FDA05', 'FDP01', 'FDP03', 'FDP04'].includes(tipoDocumento)) {
      tipoEntidad = 'PROGRAMA';
      finalEntidadId = solicitud.programa?.id;
    }

    if (tipoDocumento === 'FDP01') {
      typeDocument = 'FORMATO_PEDAGOGICO_01';
    }
    if (tipoDocumento === 'FDP03') {
      typeDocument = 'ASIGNATURAS_DETALLE';
    }
    if (tipoDocumento === 'FDP04') {
      typeDocument = 'PROPUESTA_HEMEROGRAFICA';
    }

    setLoading(true);
    GetFile(
      {
        entidadId: finalEntidadId,
        tipoDocumento: typeDocument,
        tipoEntidad,
      },
      (result, error) => {
        if (error) {
          setNoti({
            open: true,
            message: `¡No se encontró el archivo!: ${error}`,
            type: 'error',
          });
        } else {
          const fileUrl = `${baseUrl}${result}`;
          window.open(fileUrl, '_blank');
        }
        setLoading(false);
      },
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newErrors = {};
    if (!form.fechaRecepcion) {
      newErrors.fechaRecepcion = '¡Este campo es obligatorio!';
    }
    if (!form.oficioAdmisorio) {
      newErrors.oficioAdmisorio = '¡Este campo es obligatorio!';
    }

    if (Object.keys(newErrors).length === 0) {
      setOpenModal(false);
      try {
        const result = await updateRecord({
          data: form,
          endpoint: `/solicitudes/${query.id}`,
        });
        if (result.statusCode === 200) {
          setLoading(false);
          setNoti({
            open: true,
            message: '¡Éxito al actualizar la solicitud!',
            type: 'success',
          });
          handleDownload('OFICIO_ADMISORIO');
          router.back();
        } else {
          setLoading(false);
          setNoti({
            open: true,
            message: `¡Error al actualizar la solicitud!: ${result.message}`,
            type: 'error',
          });
        }
      } catch (error) {
        setLoading(false);
        setNoti({
          open: true,
          message: ` ${error.message}`,
          type: 'error',
        });
      }
    } else {
      setErrors(newErrors);
      setLoading(false);
      setNoti({
        open: true,
        message: '¡Algo salió mal, revise que los campos estén correctos!',
        type: 'error',
      });
    }
  };

  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  };

  const fechaAlta = new Date(solicitud.programa?.plantel?.institucion?.createdAt)
    .toLocaleDateString('es', opciones);

  const TURNOS = {
    1: 'Matutino',
    2: 'Vespertino',
    3: 'Nocturno',
    4: 'Mixto',
  };

  const PERIODOS = {
    1: 'Semestral',
    2: 'Cuatrimestral',
    3: 'Anual',
    4: 'Semestral curriculum flexible',
    5: 'Cuatrimestral curriculum flexible',
  };

  const formatTurnos = (turnosArray) => {
    if (!turnosArray || !Array.isArray(turnosArray)) return '';
    return turnosArray
      .map((programaTurno) => TURNOS[programaTurno?.turnoId])
      .filter(Boolean)
      .join(', ');
  };

  return (
    <Layout title="Recepción de formatos Administrativos">
      <Typography variant="h6" gutterBottom component="div" sx={{ mt: 3 }}>
        Información del Programa
      </Typography>
      <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListTitle text="Tipo de trámite" />
              <ListTitle text="Folio de solicitud" />
              <ListTitle text="Acuerdo de RVOE" />
              <ListTitle text="Nivel" />
              <ListTitle text="Nombre del Programa" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={solicitud?.tipoSolicitud?.nombre || 'N/A'} />
              <ListSubtitle text={solicitud?.folio || 'N/A'} />
              <ListSubtitle text={solicitud?.programa?.acuerdoRvoe || 'N/A'} />
              <ListSubtitle text={solicitud?.programa?.nivel?.descripcion || 'N/A'} />
              <ListSubtitle text={solicitud?.programa?.nombre || 'N/A'} />
            </List>
          </Grid>
        </Grid>
        <Grid container xs={5}>
          <Grid item xs>
            <List>
              <ListTitle text="Modalidad" />
              <ListTitle text="Periodo" />
              <ListTitle text="Turnos" />
              <ListTitle text="Fecha recepción" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs={{ mx: 3 }}>
            <List>
              <ListSubtitle text={solicitud?.programa?.modalidad?.nombre || 'N/A'} />
              <ListSubtitle text={PERIODOS[solicitud.programa?.cicloId] || 'N/A'} />
              <ListSubtitle text={formatTurnos(solicitud.programa?.programaTurnos) || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.creditos || 'N/A'} />
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom component="div" sx={{ mt: 3 }}>
        Información del Plantel
      </Typography>
      <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid container xs={6}>
          <Grid item xs>
            <List>
              <ListTitle text="Institución" />
              <ListTitle text="CCT" />
              <ListTitle text="Fecha de alta" />
              <ListTitle text="Representante Legal" />
              <ListTitle text="Email" />
              <ListTitle text="Celular" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs>
            <List>
              <ListSubtitle text={solicitud.programa?.plantel?.institucion?.nombre || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.plantel?.claveCentroTrabajo || 'N/A'} />
              <ListSubtitle text={fechaAlta || 'N/A'} />
              <ListSubtitle text={solicitud.usuario?.nombre || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.plantel?.correo1 || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.plantel?.telefono1 || 'N/A'} />
            </List>
          </Grid>
        </Grid>
        <Grid container xs={5}>
          <Grid item xs>
            <List>
              <ListTitle text="Calle" />
              <ListTitle text="No. Exterior" />
              <ListTitle text="No. Interior" />
              <ListTitle text="Colonia" />
              <ListTitle text="CP" />
              <ListTitle text="Municipio" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs={{ mx: 3 }}>
            <List>
              <ListSubtitle text={solicitud.programa?.plantel?.domicilio?.calle || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.plantel?.domicilio?.numeroExterior || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.plantel?.domicilio?.numeroInterior || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.plantel?.domicilio?.colonia || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.plantel?.domicilio?.codigoPostal || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.plantel?.domicilio?.municipio?.nombre || 'N/A'} />
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom component="div" sx={{ mt: 3 }}>
          Recepción de formatos Administrativos
        </Typography>
        <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={3} sx={{ mr: 15, ml: 5 }}>
          <FormGroup>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={1}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda01}
                      onChange={handleCheckboxChange}
                      name="fda01"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <ListItem button onClick={() => handleDownload('FDA01')}>
                  <ListItemText>
                    FDA 01
                  </ListItemText>
                </ListItem>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={1}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda03}
                      onChange={handleCheckboxChange}
                      name="fda03"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <ListItem button onClick={() => handleDownload('FDA03')}>
                  <ListItemText>
                    FDA 03
                  </ListItemText>
                </ListItem>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={1}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda05}
                      onChange={handleCheckboxChange}
                      name="fda05"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <ListItem button onClick={() => handleDownload('FDA05')}>
                  <ListItemText>
                    FDA 05
                  </ListItemText>
                </ListItem>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={1}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda02}
                      onChange={handleCheckboxChange}
                      name="fda02"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <ListItem button onClick={() => handleDownload('FDA02')}>
                  <ListItemText>
                    FDA 02
                  </ListItemText>
                </ListItem>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={1}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda04}
                      onChange={handleCheckboxChange}
                      name="fda04"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <ListItem button onClick={() => handleDownload('FDA04')}>
                  <ListItemText>
                    FDA 04
                  </ListItemText>
                </ListItem>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={1}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={checkboxes.fda06}
                      onChange={handleCheckboxChange}
                      name="fda06"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <ListItem button onClick={() => handleDownload('FDA06')}>
                  <ListItemText>
                    FDA 06
                  </ListItemText>
                </ListItem>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm
            cancel={() => {
              router.back();
            }}
            confirm={() => {
              setOpenModal(true);
            }}
            confirmDisabled={!allChecked}
          />
        </Grid>
      </Grid>
      <DefaultModal
        open={openModal}
        setOpen={setOpenModal}
        title="Recepción de documentos"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputDate
              name="fechaRecepcion"
              label="Fecha de recepción de la solicitud"
              value=""
              type="datetime"
              onChange={handleInputChange}
              onblur={handleOnBlur}
              errorMessage={errors.fechaRecepcion}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="oficioAdmisorio"
              id="oficioAdmisorio"
              label="Número de oficio admisorio"
              value=""
              onChange={handleInputChange}
              onblur={handleOnBlur}
              errorMessage={errors.oficioAdmisorio}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm
              cancel={() => {
                setOpenModal(false);
              }}
              confirm={handleSubmit}
            />
          </Grid>
        </Grid>
      </DefaultModal>
    </Layout>
  );
}
