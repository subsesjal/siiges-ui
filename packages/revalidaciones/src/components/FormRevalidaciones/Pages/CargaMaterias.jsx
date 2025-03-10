import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { fileToFormData, InputFile } from '@siiges-ui/shared';

export default function CargaMaterias({ filesData, setFilesData }) {
  const handleFileChange = async (files, name) => {
    try {
      const formData = await fileToFormData(files[0]);
      setFilesData((prevFilesData) => ({
        ...prevFilesData,
        [name]: { formData, url: URL.createObjectURL(files[0]) },
      }));
    } catch (error) {
      console.error('¡Error al procesar el archivo!:', error);
    }
  };

  const formatUrl = (fileKey) => {
    const fileUrl = filesData[fileKey]?.url || '';
    return fileUrl.startsWith('blob:') ? `${fileUrl.replace('blob:', '')}` : fileUrl;
  };

  const isFileUploaded = (fileKey) => !!filesData[fileKey]?.formData;

  const documents = [
    { label: 'Acta de Nacimiento', key: 'ACTA_NACIMIENTO' },
    { label: 'Identificación Oficial', key: 'IDENTIFICACION_OFICIAL' },
    { label: 'Titulo, diploma o grado académico', key: 'TITULO_DIPLOMA_GRADOACADEMICO' },
    { label: 'Certificado / Notas', key: 'CERTIFICADO_NOTAS' },
    { label: 'Plan y programa de estudio/Pensum', key: 'PLAN_PROGRAMAESTUDIO_PENSUM' },
    { label: 'Cédula profesional', key: 'CEDULA_PROFESIONAL' },
    { label: 'Antecedente académico revalidado', key: 'ANTECEDENTE_ACADEMICO_REVALIDADO' },
    { label: 'Comprobante de pago', key: 'COMPROBANTE_PAGO' },
    { label: 'Traducción al español', key: 'TRADUCCION_ESPANOL' },
    { label: 'Folio de pago', key: 'FOLIO_PAGO' },
  ];

  return (
    <Grid container spacing={1}>
      {documents.map((doc, index) => (
        <Grid item xs={6} key={doc.key}>
          <InputFile
            label={doc.label}
            id={`file-input-${index}`}
            tipoDocumento={doc.key}
            tipoEntidad="REVALIDACIONES"
            url={formatUrl(doc.key)}
            onChange={(files) => handleFileChange(files, doc.key)}
            isUploaded={isFileUploaded(doc.key)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

CargaMaterias.propTypes = {
  filesData: PropTypes.objectOf(
    PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
  ).isRequired,
  setFilesData: PropTypes.func.isRequired,
};
