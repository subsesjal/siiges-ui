import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Inputs/InputFile.css';
import {
  Button, ButtonGroup, Grid, Typography,
} from '@mui/material';
import { DropzoneDialog } from 'mui-file-dropzone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import fileToFormData from '../Submit/FileToFormData';
import SubmitDocument from '../Submit/SubmitDocument';
import { Context } from '../../utils/handlers/context';

export default function InputFile({
  label,
  id,
  tipoEntidad,
  tipoDocumento,
  url,
  setUrl,
  disabled,
}) {
  const [files, setFiles] = useState([]);
  const { setNoti } = useContext(Context);
  const [open, setOpen] = useState(false);
  const mainUrl = process.env.NEXT_PUBLIC_URL;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    try {
      if (files.length === 0) {
        throw new Error('Algo salió mal, ingrese un documento');
      }

      const formData = await fileToFormData(files[0]);
      formData.append('tipoEntidad', tipoEntidad);
      formData.append('entidadId', id);
      formData.append('tipoDocumento', tipoDocumento);

      await SubmitDocument(formData, setUrl, setNoti);

      setNoti({
        open: true,
        message: 'Documento cargado con éxito',
        type: 'success',
      });
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Algo salió mal, revise su documento',
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
          <ButtonGroup
            variant="text"
            aria-label="text button group"
            style={buttonGroupStyle}
          >
            <Button onClick={handleOpen} disabled={disabled}>
              <AttachFileIcon />
            </Button>
            {url && (
              <a
                href={`${mainUrl}${url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button disabled={disabled}>
                  <FileOpenIcon />
                </Button>
              </a>
            )}
          </ButtonGroup>
        </Grid>
      </Grid>
      <DropzoneDialog
        open={open}
        dropzoneText="Arrastre un archivo aquí, o haga clic"
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
    </>
  );
}

InputFile.defaultProps = {
  url: '',
};

InputFile.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tipoDocumento: PropTypes.string.isRequired,
  tipoEntidad: PropTypes.string.isRequired,
  url: PropTypes.string,
  setUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
