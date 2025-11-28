import { Grid } from '@mui/material';
import {
  Context, GetFile, InputFile, fileToFormData,
} from '@siiges-ui/shared';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function CargaMaterias({
  form, filesData, setFilesData, setNextDisabled, edit,
}) {
  const { setNoti } = useContext(Context);
  console.log(edit);
  GetFile();

  const handleFileChange = async (files, name) => {
    try {
      const formData = await fileToFormData(files[0]);
      setFilesData((prevFilesData) => ({
        ...prevFilesData,
        [name]: { formData, url: URL.createObjectURL(files[0]) },
      }));
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al procesar el archivo!: ${error}`,
        type: 'warning',
      });
    }
  };

  const formatUrl = (fileKey) => {
    const fileUrl = filesData[fileKey]?.url || '';
    return fileUrl.startsWith('blob:') ? `${fileUrl.replace('blob:', '')}` : fileUrl;
  };

  const isFileUploaded = (fileKey) => !!filesData[fileKey]?.formData;

  useEffect(() => {
    const requiredFiles = [
      'ARCHIVO_CURP',
      'IDENTIFICACION_OFICIAL',
      'ARCHIVO_NACIMIENTO',
      'COMPROBANTE_PAGO_TRAMITE',
    ];

    if (form.tipoTramiteId === 5) {
      requiredFiles.push('RESOLUCION');
    } else {
      requiredFiles.push(
        'ARCHIVO_CERTIFICADO',
        'ANTECEDENTE_ACADEMICO',
        'PROGRAMA_AUTORIZADO',
        'PROPUESTA',
      );
    }

    const allUploaded = requiredFiles.every((key) => isFileUploaded(key));

    setNextDisabled(!allUploaded);
  }, [filesData, form.tipoTramiteId]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <InputFile
          label="CURP"
          id="curp"
          tipoDocumento="ARCHIVO_CURP"
          tipoEntidad="SOLICITUD_REV_EQUIV"
          url={formatUrl('ARCHIVO_CURP')}
          onChange={(files) => handleFileChange(files, 'ARCHIVO_CURP')}
          isUploaded={isFileUploaded('ARCHIVO_CURP')}
          fileType={['application/pdf']}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Identificación Oficial"
          id="identificacionOficial"
          tipoDocumento="IDENTIFICACION_OFICIAL"
          tipoEntidad="SOLICITUD_REV_EQUIV"
          url={formatUrl('IDENTIFICACION_OFICIAL')}
          onChange={(files) => handleFileChange(files, 'IDENTIFICACION_OFICIAL')}
          isUploaded={isFileUploaded('IDENTIFICACION_OFICIAL')}
          fileType={['application/pdf']}
        />
      </Grid>
      <Grid item xs={6}>
        <InputFile
          label="Acta de Nacimiento"
          id="actaNacimiento"
          tipoDocumento="ARCHIVO_NACIMIENTO"
          tipoEntidad="SOLICITUD_REV_EQUIV"
          url={formatUrl('ARCHIVO_NACIMIENTO')}
          onChange={(files) => handleFileChange(files, 'ARCHIVO_NACIMIENTO')}
          isUploaded={isFileUploaded('ARCHIVO_NACIMIENTO')}
          fileType={['application/pdf']}
        />
      </Grid>
      {form.tipoTramiteId === 5 && (
      <Grid item xs={6}>
        <InputFile
          label="Copia de Resolución"
          id="copiaResolucion"
          tipoDocumento="RESOLUCION"
          tipoEntidad="SOLICITUD_REV_EQUIV"
          url={formatUrl('RESOLUCION')}
          onChange={(files) => handleFileChange(files, 'RESOLUCION')}
          isUploaded={isFileUploaded('RESOLUCION')}
          fileType={['application/pdf']}
        />
      </Grid>
      )}
      {form.tipoTramiteId !== 5 && (
      <>
        <Grid item xs={6}>
          <InputFile
            label="Certificado Parcial/Total"
            id="certificadoParcialTotal"
            tipoDocumento="ARCHIVO_CERTIFICADO"
            tipoEntidad="SOLICITUD_REV_EQUIV"
            url={formatUrl('ARCHIVO_CERTIFICADO')}
            onChange={(files) => handleFileChange(files, 'ARCHIVO_CERTIFICADO')}
            isUploaded={isFileUploaded('ARCHIVO_CERTIFICADO')}
            fileType={['application/pdf']}
          />
        </Grid>
        <Grid item xs={6}>
          <InputFile
            label="Antecedente Académico"
            id="antecedenteAcademico"
            tipoDocumento="ANTECEDENTE_ACADEMICO"
            tipoEntidad="SOLICITUD_REV_EQUIV"
            url={formatUrl('ANTECEDENTE_ACADEMICO')}
            onChange={(files) => handleFileChange(files, 'ANTECEDENTE_ACADEMICO')}
            isUploaded={isFileUploaded('ANTECEDENTE_ACADEMICO')}
            fileType={['application/pdf']}
          />
        </Grid>
        <Grid item xs={6}>
          <InputFile
            label="Programa de Estudio Autorizado"
            id="programaEstudioAutorizado"
            tipoDocumento="PROGRAMA_AUTORIZADO"
            tipoEntidad="SOLICITUD_REV_EQUIV"
            url={formatUrl('PROGRAMA_AUTORIZADO')}
            onChange={(files) => handleFileChange(files, 'PROGRAMA_AUTORIZADO')}
            isUploaded={isFileUploaded('PROGRAMA_AUTORIZADO')}
            fileType={['application/pdf']}
          />
        </Grid>
        <Grid item xs={6}>
          <InputFile
            label="Opinión Técnica"
            id="propuestaEquivalencia"
            tipoDocumento="PROPUESTA"
            tipoEntidad="SOLICITUD_REV_EQUIV"
            url={formatUrl('PROPUESTA')}
            onChange={(files) => handleFileChange(files, 'PROPUESTA')}
            isUploaded={isFileUploaded('PROPUESTA')}
            fileType={['application/pdf']}
          />
        </Grid>
      </>
      )}
      <Grid item xs={6}>
        <InputFile
          label="Pago de Equivalencia"
          id="pagoEquivalencia"
          tipoDocumento="COMPROBANTE_PAGO_TRAMITE"
          tipoEntidad="SOLICITUD_REV_EQUIV"
          url={formatUrl('COMPROBANTE_PAGO_TRAMITE')}
          onChange={(files) => handleFileChange(files, 'COMPROBANTE_PAGO_TRAMITE')}
          isUploaded={isFileUploaded('COMPROBANTE_PAGO_TRAMITE')}
          fileType={['application/pdf']}
        />
      </Grid>
    </Grid>
  );
}

CargaMaterias.defaultProps = {
  setNextDisabled: () => {},
  edit: false,
};

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
  setNextDisabled: PropTypes.func,
  form: PropTypes.shape({ tipoTramiteId: PropTypes.number }).isRequired,
  edit: PropTypes.bool,
};
