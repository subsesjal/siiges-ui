import { Grid, Typography } from '@mui/material';
import {
  ButtonSimple, GetFile, Input, InputFile,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function ExpedienteAlumno({ alumno, type }) {
  const { id, equivalencia = {} } = alumno || {};
  const router = useRouter();

  const [certificadoFile, setCertificadoFile] = useState(null);
  const [resolucionFile, setResolucionFile] = useState(null);
  const [expedienteInfo, setExpedienteInfo] = useState({
    folioExpediente: equivalencia.folioExpediente || '',
    folioResolucion: equivalencia.folioResolucion || '',
    fechaResolucion: equivalencia.fechaResolucion || '',
  });

  // Carga de archivos
  useEffect(() => {
    if (type !== 'edit' || !id) return;

    const filesToLoad = [
      { tipoDocumento: 'CERTIFICADO_PARCIAL', setter: setCertificadoFile },
      { tipoDocumento: 'RESOLUCION_PARCIAL', setter: setResolucionFile },
    ];

    filesToLoad.forEach(({ tipoDocumento, setter }) => {
      GetFile({ tipoEntidad: 'ALUMNO', entidadId: id, tipoDocumento }, (url, error) => {
        if (!error) setter(url);
      });
    });
  }, [id, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpedienteInfo((prev) => ({ ...prev, [name]: value }));
  };

  if (!id) return <div>Cargando expediente...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="body1" gutterBottom>
        Asegúrese de subir un archivo legible.
      </Typography>
      <br />

      <Grid container spacing={2}>
        {[
          { id: 'folioExpediente', label: 'No. de Expediente' },
          { id: 'folioResolucion', label: 'Folio de Resolución Parcial' },
          { id: 'fechaResolucion', label: 'Fecha de Resolución Parcial', type: 'date' },
        ].map(({ id: fieldId, label, type: inputType }) => (
          <Grid item xs={6} key={fieldId}>
            <Input
              id={fieldId}
              name={fieldId}
              label={label}
              type={inputType || 'text'}
              value={expedienteInfo[fieldId]}
              onChange={handleChange}
              disabled
            />
          </Grid>
        ))}

        {/* Archivos adicionales */}
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="ALUMNO"
            tipoDocumento="CERTIFICADO_PARCIAL"
            id={alumno?.id}
            label="Certificado Parcial o Total (PDF)"
            url={certificadoFile}
            setUrl={setCertificadoFile}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="ALUMNO"
            tipoDocumento="RESOLUCION_PARCIAL"
            id={alumno?.id}
            label="Resolución Parcial (PDF)"
            url={resolucionFile}
            setUrl={setResolucionFile}
          />
        </Grid>

        {/* Botón de regreso */}
        <Grid item xs={12} style={{ textAlign: 'right' }}>
          <ButtonSimple
            text="Regresar"
            design="enviar"
            align="right"
            onClick={() => router.back()}
          />
        </Grid>
      </Grid>
    </div>
  );
}

ExpedienteAlumno.defaultProps = {
  alumno: null,
  type: null,
};

ExpedienteAlumno.propTypes = {
  alumno: PropTypes.shape({
    id: PropTypes.number,
  }),
  type: PropTypes.string,
};
