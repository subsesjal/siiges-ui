import {
  List, ListItem, ListItemText, Grid, Typography, Divider,
} from '@mui/material';
import {
  ButtonSimple, Layout, Title, useApi, Context, getData,
  ListTitle, ListSubtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import OficioModal from '@siiges-ui/solicitudes/src/components/Modal/ModalOficio';

const url = process.env.NEXT_PUBLIC_URL;

export default function detallesSolicitudes() {
  const { session, setNoti } = useContext(Context);
  const [isOficioModalOpen, setIsOficioModalOpen] = useState(false);
  const showOficioModal = () => setIsOficioModalOpen(true);
  const hideOficioModal = () => setIsOficioModalOpen(false);
  const router = useRouter();
  const { query } = router;
  const [solicitud, setSolicitud] = useState({});
  const { data } = useApi({ endpoint: `api/v1/solicitudes/${query.id}/detalles` });

  useEffect(() => {
    if (data) {
      setSolicitud(data);
    }
  }, [data]);

  const downloadFile = async (tipoDocumento) => {
    try {
      let tipoEntidad = 'SOLICITUD';
      let entidadId = solicitud?.id;
      let typeDocument = tipoDocumento;

      if (['FDA05', 'FDP01', 'FDP03', 'FDP04'].includes(tipoDocumento)) {
        tipoEntidad = 'PROGRAMA';
        entidadId = solicitud?.programa?.id;
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

      const response = await getData({
        endpoint: `/files/?tipoEntidad=${tipoEntidad}&entidadId=${entidadId}&tipoDocumento=${typeDocument}`,
      });

      if (response?.statusCode === 404) {
        setNoti({
          open: true,
          message: '¡No se encontró el archivo solicitado!',
          type: 'error',
        });
        return;
      }

      const ubicacion = response?.data?.ubicacion;
      if (ubicacion && typeof ubicacion === 'string') {
        window.open(`${url}${ubicacion}`, '_blank');
      } else {
        setNoti({
          open: true,
          message: '¡Error al descargar el archivo, intente de nuevo!.',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al descargar el archivo!',
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

  const fecha = new Date(solicitud.programa?.plantel?.institucion?.createdAt)
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
    <Layout>
      <Title title="Detalles de la solicitud" />
      <Typography variant="h5" gutterBottom component="div" sx={{ mt: 3 }}>
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
              <ListTitle text="Créditos necesarios" />
              <ListTitle text="Duración del programa" />
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
          <Grid item xs={{ mx: 3 }}>
            <List>
              <ListSubtitle text={solicitud?.programa?.modalidad?.nombre || 'N/A'} />
              <ListSubtitle text={PERIODOS[solicitud.programa?.cicloId] || 'N/A'} />
              <ListSubtitle text={formatTurnos(solicitud.programa?.programaTurnos) || 'N/A'} />
              <ListSubtitle text={solicitud.programa?.creditos || 'N/A'} />
              <ListSubtitle text={`${solicitud.programa?.duracionPeriodos} periodos` || 'N/A'} />
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom component="div" sx={{ mt: 3 }}>
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
              <ListSubtitle text={fecha || 'N/A'} />
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
      <Typography variant="h5" gutterBottom component="div" sx={{ mt: 3 }}>
        Descarga de Documentos
      </Typography>
      <Divider sx={{ bgcolor: 'orange', marginBottom: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Formatos Administrativos
          </Typography>
          <List component="nav">
            {['FDA01', 'FDA02', 'FDA03', 'FDA04', 'FDA05', 'FDA06'].map((doc) => (
              <ListItem key={doc} button onClick={() => downloadFile(doc)}>
                <ListItemText primary={doc.replace(/(\D+)(\d+)/, '$1 $2')} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Formatos Pedagógicos
          </Typography>
          <List component="nav">
            {['FDP01', 'FDP02', 'FDP03', 'FDP04', 'FDP05', 'FDP06'].map((doc) => (
              <ListItem key={doc} button onClick={() => downloadFile(doc)}>
                <ListItemText primary={doc.replace(/(\D+)(\d+)/, '$1 $2')} />
              </ListItem>
            ))}
          </List>
        </Grid>
        {solicitud.programa?.acuerdoRvoe === '' && session.rol === 'sicyt_editar' ? (
          <Grid item xs={4}>
            <Typography variant="subtitle1" color="textSecondary">
              RVOE
            </Typography>
            <List component="nav">
              <ListItem button onClick={showOficioModal}>
                <ListItemText primary="Acuerdo RVOE" />
              </ListItem>
            </List>
          </Grid>
        ) : (
          <Grid item xs={4}>
            <Typography variant="subtitle1" color="textSecondary">
              RVOE
            </Typography>
            <List component="nav">
              <ListItem button onClick={() => downloadFile('ACUERDO_RVOE')}>
                <ListItemText primary="Acuerdo RVOE" />
              </ListItem>
            </List>
          </Grid>
        )}
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Inspección
          </Typography>
          <List component="nav">
            <ListItem button onClick={() => downloadFile('OrdenInspeccion')}>
              <ListItemText primary="Orden de Inspección" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('ActaInspeccion')}>
              <ListItemText primary="Acta de Inspección" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('ActaCierre')}>
              <ListItemText primary="Acta de Cierre" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Otros
          </Typography>
          <List component="nav">
            {solicitud.fechaRecepcion && (
              <ListItem button onClick={() => downloadFile('OFICIO_ADMISORIO')}>
                <ListItemText primary="Oficio Admisorio" />
              </ListItem>
            )}
            <ListItem button onClick={() => downloadFile('Desistimiento')}>
              <ListItemText primary="Desistimiento" />
            </ListItem>
          </List>
        </Grid>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <ButtonSimple onClick={() => router.back()} text="Regresar" design="enviar" />
          </Grid>
        </Grid>
      </Grid>
      <OficioModal
        open={isOficioModalOpen}
        hideModal={hideOficioModal}
        downloadFile={downloadFile}
        solicitudId={solicitud.id}
      />
    </Layout>
  );
}
