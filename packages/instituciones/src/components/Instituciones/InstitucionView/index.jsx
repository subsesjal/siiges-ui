import {
  Box, Divider, Grid, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ButtonStyled, SnackAlert, SubmitDocument, fileToFormData, ListSubtitle, ListTitle, formattedDate,
} from '@siiges-ui/shared';
import { DropzoneDialog } from 'mui-file-dropzone';

export default function InstitucionView({ institucion, session }) {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    if (files.length > 0) {
      try {
        const formData = await fileToFormData(files[0]);
        formData.append('tipoEntidad', 'INSTITUCION');
        formData.append('entidadId', router.query.institucionId);
        formData.append('tipoDocumento', 'ACTA_CONSTITUTIVA');
        SubmitDocument(formData);
      } catch (error) {
        setNoti({
          open: true,
          message: '¡Algo salió mal, revise su documento!',
          type: 'error',
        });
      }
    } else {
      setNoti({
        open: true,
        message: '¡Algo salió mal, ingrese un documento!',
        type: 'error',
      });
    }
    setOpen(false);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4} sx={{ textAlign: 'center', marginTop: 10 }}>
          <Image
            alt="logoschool"
            src="/logoschool.png"
            quality={100}
            width="300px"
            height="300px"
            style={{
              zIndex: 1,
              overflow: 'hidden',
            }}
          />
          <br />
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <ButtonStyled onclick={handleOpen} text="Acta constitutiva" alt="Consultar acta" />
          </Box>
        </Grid>
        <Grid item xs={8} sx={{ marginTop: 3 }}>
          <Typography variant="h5" gutterBottom component="div">
            Información general
          </Typography>
          <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
          <Grid container>
            <Grid item xs={4}>
              <List>
                <ListItem disablePadding>
                  <ListItemText primary="Nombre de institución" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Razón social" />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
            <Grid item xs={2}>
              <List>
                <ListItem disablePadding>
                  <ListItemText secondary={institucion.nombre} sx={{ mt: 1 }} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText secondary={institucion.razonSocial} sx={{ mt: 1 }} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Historia
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 10 }}>
            <Typography variant="p">{institucion.historia}</Typography>
          </div>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Visión
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 10 }}>
            <Typography variant="p">{institucion.vision}</Typography>
          </div>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Misión
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 10 }}>
            <Typography variant="p">{institucion.mision}</Typography>
          </div>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Valores institucionales
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 20 }}>
            <Typography variant="p">{institucion.valoresInstitucionales}</Typography>
          </div>

          <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
            Información del rector
          </Typography>
          <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid container xs={6}>
              <Grid item xs>
                <List>
                  <ListTitle text="Nombre(s)" />
                  <ListTitle text="Apellidos" />
                  <ListTitle text="Celular" />
                  <ListTitle text="Teléfono" />
                </List>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
              <Grid item xs>
                <List>
                  <ListSubtitle text={institucion?.rector?.persona?.nombre} />
                  <ListSubtitle text={`
                  ${institucion?.rector?.persona?.apellidoPaterno}
                  ${institucion?.rector?.persona?.apellidoMaterno}
                  `}
                  />
                  <ListSubtitle text={institucion?.rector?.persona?.celular} />
                  <ListSubtitle text={institucion?.rector?.persona?.telefono} />
                </List>
              </Grid>
            </Grid>
            <Grid container xs={6}>
              <Grid item xs>
                <List>
                  <ListTitle text="Correo electrónico" />
                  <ListTitle text="CURP" />
                </List>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
              <Grid item xs>
                <List>
                  <ListSubtitle text={institucion?.rector?.persona?.correoPrimario} />
                  <ListSubtitle text={institucion?.rector?.persona?.curp} />
                </List>
              </Grid>
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
            Ratificación de nombre
          </Typography>
          <Divider sx={{ bgcolor: 'orange', marginBottom: 5 }} />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {
              institucion.ratificacionesNombre[0]?.esNombreAutorizado
                ? (
                  <Grid container xs={10}>
                    <Grid item xs>
                      <List>
                        <ListTitle text="Nombre autorizado" />
                        <ListTitle text="Autoridad que autoriza" />
                        <ListTitle text="Fecha de autorización" />
                      </List>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                    <Grid item xs>
                      <List>
                        <ListSubtitle text={
                          institucion?.ratificacionesNombre[0]?.nombreAutorizado
                          }
                        />
                        <ListSubtitle text={
                          institucion?.ratificacionesNombre[0]?.autoridad
                          }
                        />
                        <ListSubtitle text={
                          formattedDate(institucion?.ratificacionesNombre[0]?.fechaAutorizacion)
                          }
                        />
                      </List>
                    </Grid>
                  </Grid>
                )
                : (
                  <Grid container xs={10}>
                    <Grid item xs>
                      <List>
                        <ListTitle text="Nombre propuesto 1" />
                        <ListTitle text="Nombre propuesto 2" />
                        <ListTitle text="Nombre propuesto 3" />
                      </List>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                    <Grid item xs>
                      <List>
                        <ListSubtitle text={
                          institucion?.ratificacionesNombre[0]?.nombrePropuesto1
                          }
                        />
                        <ListSubtitle text={
                          institucion?.ratificacionesNombre[0]?.nombrePropuesto2
                          }
                        />
                        <ListSubtitle text={
                          institucion?.ratificacionesNombre[0]?.nombrePropuesto3
                          }
                        />
                      </List>
                    </Grid>
                  </Grid>
                )
            }
          </Grid>
          {
              session.rol === 'representante' && !institucion.ratificacionesNombre[0]?.esNombreAutorizado
          && (
          <Grid item xs={12} sx={{ textAlign: 'right', mt: 6 }}>
            <ButtonUnstyled
              className="buttonAdd guardar"
              onClick={() => {
                router.push(`/instituciones/editar/${institucion.id}`);
              }}
            >
              <Typography variant="body1">Editar</Typography>
            </ButtonUnstyled>
          </Grid>
          )
            }
        </Grid>
      </Grid>
      <DropzoneDialog
        open={open}
        dropzoneText="Arrastre un archivo aquí, o haga click"
        dialogTitle="Subir archivo"
        submitButtonText="Aceptar"
        cancelButtonText="Cancelar"
        filesLimit={1}
        showPreviews
        onChange={(newFiles) => setFiles(newFiles)}
        onSave={handleSave}
        maxFileSize={5000000}
        onClose={handleClose}
      />
      <SnackAlert
        open={noti.open}
        close={() => {
          setNoti(false);
        }}
        type={noti.type}
        mensaje={noti.message}
      />
    </>
  );
}

InstitucionView.propTypes = {
  institucion: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
    valoresInstitucionales: PropTypes.string,
    rector: PropTypes.shape({
      persona: PropTypes.shape({
        nombre: PropTypes.string,
        apellidoPaterno: PropTypes.string,
        apellidoMaterno: PropTypes.string,
        celular: PropTypes.string,
        telefono: PropTypes.string,
        curp: PropTypes.string,
        correoPrimario: PropTypes.string,
      }),
    }),
    ratificacionesNombre: PropTypes.arrayOf(
      PropTypes.shape({
        nombrePropuesto1: PropTypes.string,
        nombrePropuesto2: PropTypes.string,
        nombrePropuesto3: PropTypes.string,
        nombreAutorizado: PropTypes.string,
        fechaAutorizacion: PropTypes.string,
        autoridad: PropTypes.string,
        esNombreAutorizado: PropTypes.bool,
      }),
    ),
  }).isRequired,
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
};
