import { Grid, Typography } from '@mui/material';
import {
  ButtonSimple, GetFile, Input, InputFile,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function ExpedienteAlumno({ id, type }) {
  const [certificadoFile, setCertificadoFile] = useState(null);
  const [resolucionFile, setResolucionFile] = useState(null);

  const [expedienteInfo, setExpedienteInfo] = useState({
    numeroExpediente: '',
    folioResolucionParcial: '',
    fechaResolucionParcial: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (type === 'edit' && id) {
      GetFile({ tipoEntidad: 'ALUMNO', entidadId: id, tipoDocumento: 'CERTIFICADO_PARCIAL' }, (url, error) => {
        if (!error) setCertificadoFile(url);
      });
      GetFile({ tipoEntidad: 'ALUMNO', entidadId: id, tipoDocumento: 'RESOLUCION_PARCIAL' }, (url, error) => {
        if (!error) setResolucionFile(url);
      });
    }
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
        {/* Campos de texto */}
        <Grid item xs={6}>
          <Input
            id="numeroExpediente"
            name="numeroExpediente"
            label="No. de Expediente"
            value={expedienteInfo.numeroExpediente}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="folioResolucionParcial"
            name="folioResolucionParcial"
            label="Folio de Resolución Parcial"
            value={expedienteInfo.folioResolucionParcial}
            onChange={handleChange}
          />
        </Grid>

        {/* Campo de fecha */}
        <Grid item xs={6}>
          <Input
            id="fechaResolucionParcial"
            name="fechaResolucionParcial"
            label="Fecha de Resolución Parcial"
            type="date"
            value={expedienteInfo.fechaResolucionParcial}
            onChange={handleChange}
          />
        </Grid>

        {/* Archivos adicionales */}
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="ALUMNO"
            tipoDocumento="CERTIFICADO_PARCIAL"
            id={id}
            label="Certificado Parcial o Total (PDF)"
            url={certificadoFile}
            setUrl={setCertificadoFile}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            tipoEntidad="ALUMNO"
            tipoDocumento="RESOLUCION_PARCIAL"
            id={id}
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
  id: null,
  type: null,
};

ExpedienteAlumno.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
};
