import {
  ButtonSimple, Context, DataTable, fileToFormData, SubmitDocument,
} from '@siiges-ui/shared';
import React, { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { DropzoneDialog } from 'mui-file-dropzone';
import catalogoTitulos from '../../Tables/catalogoTitulosTable';

export default function TitulosTable({ titulos }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const { setNoti } = useContext(Context);

  const handleClose = () => setOpen(false);

  const handleFileSave = async () => {
    try {
      if (files.length === 0) {
        throw new Error('¡Debe seleccionar un archivo XML!');
      }

      const formData = await fileToFormData(files[0]);
      formData.append('tipoEntidad', 'TITULO_ELECTRONICO');
      formData.append('tipoDocumento', 'TITULO_ELECTRONICO_XML');
      formData.append('entidadId', 0);

      await SubmitDocument(formData);

      setNoti({
        open: true,
        message: '¡XML cargado con éxito!',
        type: 'success',
      });
    } catch (error) {
      setNoti({
        open: true,
        message: error.message || 'Error al cargar el XML',
        type: 'error',
      });
    } finally {
      setOpen(false);
      setFiles([]);
    }
  };
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid item xs={12}>
        <ButtonSimple
          align="right"
          text="Cargar XML"
          design="enviar"
          onClick={() => {
            setOpen(true);
          }}
        />
      </Grid>
      <DataTable
        rows={titulos}
        columns={catalogoTitulos}
        title="Tabla de alumnos"
      />
      <DropzoneDialog
        open={open}
        dropzoneText={(
          <div style={{ textAlign: 'center' }}>
            <div>Arrastre un archivo aquí, o haga clic</div>
            <div style={{ fontSize: '1.2rem', marginTop: '8px', color: '#666' }}>
              Formatos aceptados: XML (Max. 5MB)
            </div>
          </div>
        )}
        dialogTitle="Carga de XML de titulación"
        submitButtonText="Aceptar"
        cancelButtonText="Cancelar"
        filesLimit={1}
        showPreviews
        onChange={(newFiles) => setFiles(newFiles)}
        onSave={handleFileSave}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </Grid>
  );
}

TitulosTable.propTypes = {
  titulos: PropTypes.arrayOf(PropTypes.string).isRequired,
};
