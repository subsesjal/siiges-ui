import {
  Box, Divider, Grid, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ButtonStyled, SubmitDocument } from '@siiges-ui/shared';
import { DropzoneDialog } from 'mui-file-dropzone';

export default function Institucion({ data }) {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const formData = new FormData();
  formData.append('tipoEntidad', 'INSTITUCION');
  formData.append('entidadId', data.id);
  formData.append('tipoDocumento', 'ACTA_CONSTITUTIVA');
  formData.append('institucionId', router.query.institucionId);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    if (files.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event) => {
        const fileContent = event.target.result;
        const fileName = files[0].name;
        const fileBlob = new Blob([fileContent], { type: files[0].type });
        formData.append('archivoAdjunto', fileBlob, fileName);
        SubmitDocument(formData);
        console.log('FormData:', formData);
      };
    } else {
      console.log('No file submitted.');
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
      <DropzoneDialog open={open} dropzoneText="Arrastre un archivo aquí, o haga click" dialogTitle="Subir archivo" submitButtonText="Aceptar" cancelButtonText="Cancelar" filesLimit={1} showPreviews onChange={(newFiles) => setFiles(newFiles)} onSave={handleSave} maxFileSize={5000000} onClose={handleClose} />
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
