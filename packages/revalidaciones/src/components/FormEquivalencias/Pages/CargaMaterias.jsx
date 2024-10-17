import { Grid } from '@mui/material';
import { InputFile, fileToFormData } from '@siiges-ui/shared';
import React from 'react';
import PropTypes from 'prop-types';

export default function CargaMaterias({ form, handleOnChange, setFilesData }) {
  const handleFileChange = async (files, name) => {
    try {
      const formData = await fileToFormData(files[0]);
      setFilesData((prevFilesData) => ({
        ...prevFilesData,
        [name]: formData,
      }));

      const fileData = {
        nombre: name,
        archivo: files[0],
      };

      handleOnChange({
        target: {
          name: 'data',
          value: fileData,
        },
      });
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <InputFile
          label="CURP"
          id={1}
          tipoDocumento="CURP"
          tipoEntidad="EQUIVALENCIAS"
          url={form.CURP || ''}
          onChange={(files) => handleFileChange(files, 'CURP')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Identificación Oficial"
          id={1}
          tipoDocumento="IDENTIFICACION_OFICIAL"
          tipoEntidad="EQUIVALENCIAS"
          url={form.IDENTIFICACION_OFICIAL || ''}
          onChange={(files) => handleFileChange(files, 'IDENTIFICACION_OFICIAL')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Acta de Nacimiento"
          id={1}
          tipoDocumento="ACTA_NACIMIENTO"
          tipoEntidad="EQUIVALENCIAS"
          url={form.ACTA_NACIMIENTO || ''}
          onChange={(files) => handleFileChange(files, 'ACTA_NACIMIENTO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Copia de Resolución"
          id={1}
          tipoDocumento="COPIA_RESOLUCION"
          tipoEntidad="EQUIVALENCIAS"
          url={form.COPIA_RESOLUCION || ''}
          onChange={(files) => handleFileChange(files, 'COPIA_RESOLUCION')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Certificado Parcial/Total"
          id={1}
          tipoDocumento="CERTIFICADO_PARCIAL_TOTAL"
          tipoEntidad="EQUIVALENCIAS"
          url={form.CERTIFICADO_PARCIAL_TOTAL || ''}
          onChange={(files) => handleFileChange(files, 'CERTIFICADO_PARCIAL_TOTAL')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Antecedente Académico"
          id={1}
          tipoDocumento="ANTECEDENTE_ACADEMICO"
          tipoEntidad="EQUIVALENCIAS"
          url={form.ANTECEDENTE_ACADEMICO || ''}
          onChange={(files) => handleFileChange(files, 'ANTECEDENTE_ACADEMICO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Programa de Estudio Autorizado"
          id={1}
          tipoDocumento="PROGRAMA_ESTUDIO_AUTORIZADO"
          tipoEntidad="EQUIVALENCIAS"
          url={form.PROGRAMA_ESTUDIO_AUTORIZADO || ''}
          onChange={(files) => handleFileChange(files, 'PROGRAMA_ESTUDIO_AUTORIZADO')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Propuesta de Equivalencia"
          id={1}
          tipoDocumento="PROPUESTA_EQUIVALENCIA"
          tipoEntidad="EQUIVALENCIAS"
          url={form.PROPUESTA_EQUIVALENCIA || ''}
          onChange={(files) => handleFileChange(files, 'PROPUESTA_EQUIVALENCIA')}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Pago de Equivalencia"
          id={1}
          tipoDocumento="PAGO_EQUIVALENCIA"
          tipoEntidad="EQUIVALENCIAS"
          url={form.PAGO_EQUIVALENCIA || ''}
          onChange={(files) => handleFileChange(files, 'PAGO_EQUIVALENCIA')}
        />
      </Grid>
    </Grid>
  );
}

CargaMaterias.propTypes = {
  form: PropTypes.shape({
    CURP: PropTypes.string,
    IDENTIFICACION_OFICIAL: PropTypes.string,
    ACTA_NACIMIENTO: PropTypes.string,
    COPIA_RESOLUCION: PropTypes.string,
    CERTIFICADO_PARCIAL_TOTAL: PropTypes.string,
    ANTECEDENTE_ACADEMICO: PropTypes.string,
    PROGRAMA_ESTUDIO_AUTORIZADO: PropTypes.string,
    PROPUESTA_EQUIVALENCIA: PropTypes.string,
    PAGO_EQUIVALENCIA: PropTypes.string,
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  setFilesData: PropTypes.func.isRequired,
};
