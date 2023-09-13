import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Inputs/InputFile.css';
import { Button } from '@mui/material';
import { DropzoneDialog } from 'mui-file-dropzone';
import fileToFormData from '../Submit/FileToFormData';
import SubmitDocument from '../Submit/SubmitDocument';
import { Context } from '../../utils/handlers/context';

export default function InputFile({
  label,
  id,
  tipoEntidad,
  tipoDocumento,
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
        throw new Error('Algo salió mal, ingrese un documento');
      }

      const formData = await fileToFormData(files[0]);
      formData.append('tipoEntidad', tipoEntidad);
      formData.append('entidadId', id);
      formData.append('tipoDocumento', tipoDocumento);

      await SubmitDocument(formData, setUrl);

      setNoti({
        open: true,
        message: 'Documento subido con éxito',
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

  return (
    <>
      <Button onClick={handleOpen} variant="contained" disabled={disabled}>
        {label}
      </Button>
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

InputFile.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tipoDocumento: PropTypes.string.isRequired,
  tipoEntidad: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
