import { Grid, Typography } from '@mui/material';
import {
  ButtonSimple,
  Context,
  createRecord,
  GetFile,
  Input,
  InputDate,
  InputFile,
  updateRecord,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function ExpedienteAlumno({ alumno, setAlumno, type }) {
  const { id, equivalencia } = alumno || {};
  const { setNoti, setLoading } = useContext(Context);
  const router = useRouter();

  const [certificadoFile, setCertificadoFile] = useState(null);
  const [resolucionFile, setResolucionFile] = useState(null);
  const [expedienteInfo, setExpedienteInfo] = useState({
    numeroExpediente: '',
    folioResolucionParcial: '',
    fechaResolucionParcial: '',
  });

  // Cargar archivos y valores iniciales
  useEffect(() => {
    if (type === 'edit' && id) {
      const filesToLoad = [
        { tipoDocumento: 'CERTIFICADO_PARCIAL', setter: setCertificadoFile },
        { tipoDocumento: 'RESOLUCION_PARCIAL', setter: setResolucionFile },
      ];

      filesToLoad.forEach(({ tipoDocumento, setter }) => {
        GetFile(
          { tipoEntidad: 'ALUMNO', entidadId: id, tipoDocumento },
          (url, error) => {
            if (!error) setter(url);
          },
        );
      });
    }

    if (equivalencia) {
      setExpedienteInfo({
        numeroExpediente: equivalencia.folioExpediente || '',
        folioResolucionParcial: equivalencia.folioResolucion || '',
        fechaResolucionParcial: equivalencia.fechaResolucion || '',
      });
    }
  }, [id, type, equivalencia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpedienteInfo((prev) => ({ ...prev, [name]: value }));
  };

  const saveButtonAction = async () => {
    setLoading(true);
    try {
      const payload = {
        alumnoId: id,
        folioExpediente: expedienteInfo.numeroExpediente,
        folioResolucion: expedienteInfo.folioResolucionParcial,
        fechaResolucion: expedienteInfo.fechaResolucionParcial,
      };

      let response;
      if (equivalencia?.id) {
        // Actualizar
        response = await updateRecord({
          endpoint: `/equivalenciasInternas/${equivalencia.id}`,
          data: payload,
        });
      } else {
        // Crear
        response = await createRecord({
          endpoint: '/equivalenciasInternas',
          data: payload,
        });
      }

      if (response.statusCode === 200 || response.statusCode === 201) {
        // 🔹 Actualizar alumno en estado padre
        setAlumno((prev) => ({
          ...prev,
          equivalencia: {
            ...(prev?.equivalencia || {}),
            id: response.data?.id || equivalencia?.id,
            folioExpediente: expedienteInfo.numeroExpediente,
            folioResolucion: expedienteInfo.folioResolucionParcial,
            fechaResolucion: expedienteInfo.fechaResolucionParcial,
          },
        }));

        setNoti({
          open: true,
          message: 'Expediente guardado con éxito',
          type: 'success',
        });
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || 'Error al guardar el expediente',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: 'Ocurrió un error inesperado',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
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
        <Grid item xs={4}>
          <Input
            id="numeroExpediente"
            name="numeroExpediente"
            label="No. de Expediente"
            value={expedienteInfo.numeroExpediente}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            id="folioResolucionParcial"
            name="folioResolucionParcial"
            label="Folio de Resolución Parcial"
            value={expedienteInfo.folioResolucionParcial}
            onChange={handleChange}
          />
        </Grid>

        {/* Campo de fecha */}
        <Grid item xs={4}>
          <InputDate
            id="fechaResolucionParcial"
            name="fechaResolucionParcial"
            label="Fecha de Resolución Parcial"
            value={expedienteInfo.fechaResolucionParcial}
            onChange={handleChange}
          />
        </Grid>

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

        {/* Botones */}
        <Grid item xs={9} />
        <Grid item>
          <ButtonSimple
            text="Regresar"
            design="enviar"
            align="right"
            onClick={() => {
              router.back();
            }}
          />
        </Grid>
        <Grid item>
          <ButtonSimple onClick={saveButtonAction} text="Guardar" />
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
    equivalencia: PropTypes.shape({
      id: PropTypes.number,
      folioExpediente: PropTypes.string,
      folioResolucion: PropTypes.string,
      fechaResolucion: PropTypes.string,
    }),
  }),
  type: PropTypes.string,
  setAlumno: PropTypes.func.isRequired,
};
