import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Grid, Typography,
} from '@mui/material';
import { DropzoneDialog } from 'mui-file-dropzone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { fileToFormData, SubmitDocument, Context } from '@siiges-ui/shared';

export default function EvidenciaFotografica({
  label,
  id,
  url,
  setUrl,
  disabled,
}) {
  const [files, setFiles] = useState([]);
  const { setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    try {
      if (files.length === 0) {
        throw new Error('¡Algo salió mal, ingrese un documento!');
      }

      const uploadPromises = files.map((file, index) => fileToFormData(file).then((formData) => {
        formData.append('tipoEntidad', 'FORTALECIMIENTO');
        formData.append('entidadId', id);
        formData.append('tipoDocumento', `evidencia_${index + 1}`);
        return SubmitDocument(formData, setUrl, setNoti);
      }));

      await Promise.all(uploadPromises);

      setNoti({
        open: true,
        message: '¡Documento(s) cargado(s) con éxito!',
        type: 'success',
      });
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || '¡Algo salió mal, revise su documento!',
        type: 'error',
      });
    } finally {
      setOpen(false);
    }
  };

  const gridStyle = {
    border: '1px solid #0072ce',
    borderRadius: '3px',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  return (
    <>
      <Grid container style={gridStyle}>
        <Grid item xs={6}>
          <Typography>{label}</Typography>
        </Grid>
        <Grid item xs={3}>
          <ButtonGroup aria-label="text button group" style={buttonGroupStyle}>
            <Button onClick={handleOpen} disabled={disabled} variant="text">
              <AttachFileIcon />
            </Button>
            {url && (
              <a
                href={`https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button disabled={disabled} variant="text">
                  <FileOpenIcon />
                </Button>
              </a>
            )}
          </ButtonGroup>
        </Grid>
      </Grid>
      <DropzoneDialog
        open={open}
        dropzoneText="Arrastre la evidencia fotográfica aquí, o haga click"
        dialogTitle="Subir evidencia fotográfica"
        submitButtonText="Aceptar"
        cancelButtonText="Cancelar"
        filesLimit={5}
        showPreviews
        onChange={(newFiles) => setFiles(newFiles)}
        onSave={handleSave}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </>
  );
}

EvidenciaFotografica.defaultProps = {
  url: '',
};

EvidenciaFotografica.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string,
  setUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
