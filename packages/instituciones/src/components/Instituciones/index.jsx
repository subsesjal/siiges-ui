import {
  Box, Divider, Grid, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ButtonStyled, SnackAlert, SubmitDocument, fileToFormData,
} from '@siiges-ui/shared';
import { DropzoneDialog } from 'mui-file-dropzone';

export default function Institucion({ data }) {
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
          message: 'Algo salio mal, revise su documento',
          type: 'error',
        });
      }
    } else {
      setNoti({
        open: true,
        message: 'Algo salio mal, ingrese un documento',
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
          <Grid container>
            <Grid item xs={4}>
              <List>
                <ListItem disablePadding>
                  <ListItemText primary="Nombre de institución" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Razon social" />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
            <Grid item xs={2}>
              <List>
                <ListItem disablePadding>
                  <ListItemText secondary={data.nombre} sx={{ mt: 1 }} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText secondary={data.razonSocial} sx={{ mt: 1 }} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Historia de la institución
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 15 }}>
            <Typography variant="p">{data.historia}</Typography>
          </div>
          <Divider />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Visión
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15, marginBottom: 15 }}>
            <Typography variant="p">{data.vision}</Typography>
          </div>
          <Divider />
          <Typography variant="p" sx={{ fontWeight: 'medium' }}>
            Misión
          </Typography>
          <br />
          <div style={{ marginLeft: 100, marginTop: 15 }}>
            <Typography variant="p">{data.mision}</Typography>
          </div>
          <Grid item xs={12} sx={{ textAlign: 'right', mt: 6 }}>
            <ButtonStyled
              text="Editar institución"
              alt="Editar institución"
              onclick={() => {
                router.push(`/institucion/${data.id}/editarInstitucion`);
              }}
            />
          </Grid>
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

Institucion.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    razonSocial: PropTypes.string,
    historia: PropTypes.string,
    vision: PropTypes.string,
    mision: PropTypes.string,
  }).isRequired,
};
