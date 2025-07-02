import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  Select, Context, Input, ButtonFile, GetFile,
} from '@siiges-ui/shared';
import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { fetchCiclosData } from '../../../utils';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function DatosSolicitud({
  programa, setReqData, formData, disabled,
}) {
  const { setNoti, setLoading } = useContext(Context);
  const [ciclos, setCiclos] = useState([]);
  const [fileUrls, setFileUrls] = useState({
    reporteBecas: null,
  });

  const fileConfigs = {
    reporteBecas: {
      tipoEntidad: 'SOLICITUD_BECA',
      tipoDocumento: 'REPORTE_BECAS',
      showCondition: formData.estatusSolicitudBecaId === 3,
    },
  };

  useEffect(() => {
    fetchCiclosData(setNoti, setLoading, setCiclos, programa.id);
  }, [programa.id, setNoti, setLoading]);

  const fetchFile = useCallback(async (config, fileKey) => {
    if (!formData.id || !config.showCondition) return;

    try {
      const fileData = {
        entidadId: formData.id,
        tipoEntidad: config.tipoEntidad,
        tipoDocumento: config.tipoDocumento,
      };

      const result = await new Promise((resolve) => {
        GetFile(fileData, (fileUrl, fileError) => resolve({
          url: fileUrl,
          error: fileError,
        }));
      });

      const { url, error } = result;

      if (error) throw error;

      setFileUrls((prev) => ({
        ...prev,
        [fileKey]: url ? `${baseUrl}${url}` : null,
      }));
    } catch (error) {
      setNoti({
        open: true,
        message: `¡Error al obtener el archivo ${config.tipoDocumento}!`,
        type: 'error',
      });
      console.error(error);
    }
  }, [formData.id, setNoti]);

  useEffect(() => {
    Object.entries(fileConfigs).forEach(([key, config]) => {
      fetchFile(config, key);
    });
  }, [formData.estatusSolicitudBecaId, formData.id, fetchFile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReqData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mt: 5 }}>
          Datos de la Solicitud
        </Typography>
      </Grid>

      <Grid item xs={4}>
        <Select
          title="Ciclos Escolares"
          name="cicloEscolarId"
          value={formData?.cicloEscolarId || ''}
          options={ciclos}
          onChange={handleChange}
          disabled={disabled}
          fullWidth
        />
      </Grid>

      <Grid item xs={3.7} />

      {fileConfigs.reporteBecas.showCondition && (
        <Grid item xs={4} sx={{ mt: 2 }}>
          <ButtonFile url={fileUrls.reporteBecas}>
            Archivo de resolución de Becas
          </ButtonFile>
        </Grid>
      )}

      {formData.observaciones && (
        <Grid item xs={12} sx={{ mr: 3 }}>
          <Input
            id="observaciones"
            label="Observaciones"
            name="observaciones"
            value={formData.observaciones}
            multiline
            rows={4}
            disabled
            fullWidth
          />
        </Grid>
      )}
    </Grid>
  );
}

DatosSolicitud.defaultProps = {
  formData: {},
};

DatosSolicitud.propTypes = {
  setReqData: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  programa: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  formData: PropTypes.shape({
    id: PropTypes.number,
    estatusSolicitudBecaId: PropTypes.number,
    cicloEscolarId: PropTypes.number,
    observaciones: PropTypes.string,
  }),
};
