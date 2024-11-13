import { Grid } from '@mui/material';
import { InputFile, fileToFormData } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

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

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <InputFile
          label="CURP"
          id="curp"
          tipoDocumento="ARCHIVO_CURP"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('ARCHIVO_CURP')}
          onChange={(files) => handleFileChange(files, 'ARCHIVO_CURP')}
          isUploaded={isFileUploaded('ARCHIVO_CURP')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Identificación Oficial"
          id="identificacionOficial"
          tipoDocumento="IDENTIFICACION_OFICIAL"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('IDENTIFICACION_OFICIAL')}
          onChange={(files) => handleFileChange(files, 'IDENTIFICACION_OFICIAL')}
          isUploaded={isFileUploaded('IDENTIFICACION_OFICIAL')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Acta de Nacimiento"
          id="actaNacimiento"
          tipoDocumento="ARCHIVO_NACIMIENTO"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('ARCHIVO_NACIMIENTO')}
          onChange={(files) => handleFileChange(files, 'ARCHIVO_NACIMIENTO')}
          isUploaded={isFileUploaded('ARCHIVO_NACIMIENTO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Copia de Resolución"
          id="copiaResolucion"
          tipoDocumento="RESOLUCION"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('RESOLUCION')}
          onChange={(files) => handleFileChange(files, 'RESOLUCION')}
          isUploaded={isFileUploaded('RESOLUCION')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Certificado Parcial/Total"
          id="certificadoParcialTotal"
          tipoDocumento="ARCHIVO_CERTIFICADO"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('ARCHIVO_CERTIFICADO')}
          onChange={(files) => handleFileChange(files, 'ARCHIVO_CERTIFICADO')}
          isUploaded={isFileUploaded('ARCHIVO_CERTIFICADO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Antecedente Académico"
          id="antecedenteAcademico"
          tipoDocumento="ANTECEDENTE_ACADEMICO"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('ANTECEDENTE_ACADEMICO')}
          onChange={(files) => handleFileChange(files, 'ANTECEDENTE_ACADEMICO')}
          isUploaded={isFileUploaded('ANTECEDENTE_ACADEMICO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Programa de Estudio Autorizado"
          id="programaEstudioAutorizado"
          tipoDocumento="PROGRAMA_AUTORIZADO"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('PROGRAMA_AUTORIZADO')}
          onChange={(files) => handleFileChange(files, 'PROGRAMA_AUTORIZADO')}
          isUploaded={isFileUploaded('PROGRAMA_AUTORIZADO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Propuesta de Equivalencia"
          id="propuestaEquivalencia"
          tipoDocumento="PROPUESTA"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('PROPUESTA')}
          onChange={(files) => handleFileChange(files, 'PROPUESTA')}
          isUploaded={isFileUploaded('PROPUESTA')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Pago de Equivalencia"
          id="pagoEquivalencia"
          tipoDocumento="COMPROBANTE_PAGO_TRAMITE"
          tipoEntidad="EQUIVALENCIAS"
          url={formatUrl('COMPROBANTE_PAGO_TRAMITE')}
          onChange={(files) => handleFileChange(files, 'COMPROBANTE_PAGO_TRAMITE')}
          isUploaded={isFileUploaded('COMPROBANTE_PAGO_TRAMITE')}
        />
      </Grid>
    </Grid>
  );
}

CargaMaterias.propTypes = {
  filesData: PropTypes.shape({
    CURP: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
    IDENTIFICACION_OFICIAL: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
    ACTA_NACIMIENTO: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
    COPIA_RESOLUCION: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
    CERTIFICADO_PARCIAL_TOTAL: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
    ANTECEDENTE_ACADEMICO: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
    PROGRAMA_ESTUDIO_AUTORIZADO: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
    PROPUESTA_EQUIVALENCIA: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
    PAGO_EQUIVALENCIA: PropTypes.shape({
      formData: PropTypes.instanceOf(FormData),
      url: PropTypes.string,
    }),
  }).isRequired,
  setFilesData: PropTypes.func.isRequired,
};
