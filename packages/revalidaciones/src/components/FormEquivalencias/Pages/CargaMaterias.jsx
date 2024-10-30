import { Grid } from '@mui/material';
import { InputFile, fileToFormData } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function CargaMaterias({ setFilesData }) {
  const handleFileChange = async (files, name) => {
    try {
      const formData = await fileToFormData(files[0]);
      setFilesData((prevFilesData) => ({
        ...prevFilesData,
        [name]: formData,
      }));
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <InputFile
          label="CURP"
          id="curp"
          tipoDocumento="CURP"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'CURP')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Identificación Oficial"
          id="identificacionOficial"
          tipoDocumento="IDENTIFICACION_OFICIAL"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'IDENTIFICACION_OFICIAL')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Acta de Nacimiento"
          id="actaNacimiento"
          tipoDocumento="ACTA_NACIMIENTO"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'ACTA_NACIMIENTO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Copia de Resolución"
          id="copiaResolucion"
          tipoDocumento="COPIA_RESOLUCION"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'COPIA_RESOLUCION')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Certificado Parcial/Total"
          id="certificadoParcialTotal"
          tipoDocumento="CERTIFICADO_PARCIAL_TOTAL"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'CERTIFICADO_PARCIAL_TOTAL')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Antecedente Académico"
          id="antecedenteAcademico"
          tipoDocumento="ANTECEDENTE_ACADEMICO"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'ANTECEDENTE_ACADEMICO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Programa de Estudio Autorizado"
          id="programaEstudioAutorizado"
          tipoDocumento="PROGRAMA_ESTUDIO_AUTORIZADO"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'PROGRAMA_ESTUDIO_AUTORIZADO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Propuesta de Equivalencia"
          id="propuestaEquivalencia"
          tipoDocumento="PROPUESTA_EQUIVALENCIA"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'PROPUESTA_EQUIVALENCIA')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Pago de Equivalencia"
          id="pagoEquivalencia"
          tipoDocumento="PAGO_EQUIVALENCIA"
          tipoEntidad="EQUIVALENCIAS"
          onChange={(files) => handleFileChange(files, 'PAGO_EQUIVALENCIA')}
        />
      </Grid>
    </Grid>
  );
}

CargaMaterias.propTypes = {
  setFilesData: PropTypes.func.isRequired,
};
