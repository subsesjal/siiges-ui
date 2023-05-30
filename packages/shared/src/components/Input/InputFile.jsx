import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Inputs/InputFile.css';
import { Button } from '@mui/material';
import { DropzoneDialog } from 'mui-file-dropzone';
import fileToFormData from '../Submit/FileToFormData';
import SnackAlert from '../Alert';
import SubmitDocument from '../Submit/SubmitDocument';

export default function InputFile({
  label, id, tipoEntidad, tipoDocumento, setLoaded, setUrl, disabled,
}) {
  const [files, setFiles] = useState([]);
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    if (files.length > 0) {
      try {
        const formData = await fileToFormData(files[0]);
        formData.append('tipoEntidad', tipoEntidad);
        formData.append('entidadId', id);
        formData.append('tipoDocumento', tipoDocumento);
        SubmitDocument(formData, setLoaded, setUrl);
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
      <Button onClick={handleOpen} variant="contained" disabled={disabled}>
        {label}
      </Button>
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

InputFile.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tipoDocumento: PropTypes.string.isRequired,
  tipoEntidad: PropTypes.string.isRequired,
  setLoaded: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
