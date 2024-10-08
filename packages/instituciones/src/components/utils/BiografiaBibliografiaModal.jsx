import React, { useState } from 'react';
import { DefaultModal, InputFile, SubmitDocument } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import { DropzoneDialog } from 'mui-file-dropzone';
import { useRouter } from 'next/router';

export default function BiografiaBibliografiaModal({
  open,
  onClose,
  institucionId,
  setNoti,
  setLoading,
}) {
  const [files, setFiles] = useState([]);
  const [openDropzone, setOpenDropzone] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [disableBiografia, setDisableBiografia] = useState(false);
  const [disableBibliografia, setDisableBibliografia] = useState(false);
  const [disableActa, setDisableActa] = useState(false);
  const [biografiaUrl, setBiografiaUrl] = useState('');
  const [bibliografiaUrl, setBibliografiaUrl] = useState('');
  const [actaUrl, setActaUrl] = useState('');

  const router = useRouter();

  const handleOpenDropzone = (type) => {
    setDocumentType(type);
    setOpenDropzone(true);
  };

  const getDialogTitle = () => {
    if (documentType === 'BIOGRAFIA') {
      return 'Biografía';
    }
    if (documentType === 'BIBLIOGRAFIA') {
      return 'Bibliografía';
    }
    return 'Acta Constitutiva';
  };

  const handleSave = async () => {
    if (files.length > 0) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append(
          'tipoEntidad',
          documentType === 'ACTA_CONSTITUTIVA' ? 'INSTITUCION' : 'RATIFICACION',
        );
        formData.append('entidadId', institucionId);
        formData.append('tipoDocumento', documentType);
        formData.append('file', files[0]);

        const { data: url } = await SubmitDocument(formData);

        setNoti({
          open: true,
          message: '¡Documento cargado con éxito!',
          type: 'success',
        });

        if (documentType === 'BIOGRAFIA') {
          setDisableBiografia(true);
          setBiografiaUrl(url);
        } else if (documentType === 'BIBLIOGRAFIA') {
          setDisableBibliografia(true);
          setBibliografiaUrl(url);
        } else if (documentType === 'ACTA_CONSTITUTIVA') {
          setDisableActa(true);
          setActaUrl(url);
        }
      } catch (error) {
        setNoti({
          open: true,
          message: '¡Algo salió mal, revise su documento!',
          type: 'error',
        });
      } finally {
        setLoading(false);
        setOpenDropzone(false);
        setFiles([]);
      }
    } else {
      setNoti({
        open: true,
        message: '¡Ingrese un documento!',
        type: 'error',
      });
    }
  };

  return (
    <DefaultModal open={open} setOpen={onClose} title="Subir Documentos Institucionales" disableBackdropClick>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputFile
            label="Biografía o Fundamento"
            tipoEntidad="RATIFICACION"
            tipoDocumento="BIOGRAFIA"
            id={institucionId}
            url={biografiaUrl}
            setUrl={setBiografiaUrl}
            disabled={disableBiografia}
            onclick={() => handleOpenDropzone('BIOGRAFIA')}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            label="Bibliografía para fuente de consulta"
            tipoEntidad="RATIFICACION"
            tipoDocumento="BIBLIOGRAFIA"
            id={institucionId}
            url={bibliografiaUrl}
            setUrl={setBibliografiaUrl}
            disabled={disableBibliografia}
            onclick={() => handleOpenDropzone('BIBLIOGRAFIA')}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            label="Acta Constitutiva"
            tipoEntidad="INSTITUCION"
            tipoDocumento="ACTA_CONSTITUTIVA"
            id={institucionId}
            url={actaUrl}
            setUrl={setActaUrl}
            disabled={disableActa}
            onclick={() => handleOpenDropzone('ACTA_CONSTITUTIVA')}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Button
              onClick={() => {
                onClose();
                router.reload();
              }}
            >
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <DropzoneDialog
        open={openDropzone}
        dropzoneText="Arrastre un archivo aquí, o haga click"
        dialogTitle={`Subir archivo de ${getDialogTitle()}`}
        submitButtonText="Aceptar"
        cancelButtonText="Cancelar"
        filesLimit={1}
        showPreviews
        onChange={(newFiles) => setFiles(newFiles)}
        onSave={handleSave}
        maxFileSize={5000000}
        onClose={() => setOpenDropzone(false)}
      />
    </DefaultModal>
  );
}

BiografiaBibliografiaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  institucionId: PropTypes.number.isRequired,
  setNoti: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
