import { Context, GetFile, InputFile } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function ActaComiteSection({ formData, disabled }) {
  const { setNoti } = useContext(Context);
  const [fileUrls, setFileUrls] = useState({
    actaComite: null,
  });

  const fileConfigs = {
    reporteBecas: {
      tipoEntidad: 'SOLICITUD_BECA',
      tipoDocumento: 'REPORTE_BECAS',
      showCondition: formData.estatusSolicitudBecaId === 3,
    },
    actaComite: {
      tipoEntidad: 'SOLICITUD_BECA',
      tipoDocumento: 'ACTA_COMITE_BECAS',
      showCondition: !!formData.id,
    },
  };

  const fetchFile = useCallback(
    async (config, fileKey) => {
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
    },
    [formData.id, setNoti],
  );

  useEffect(() => {
    Object.entries(fileConfigs).forEach(([key, config]) => {
      fetchFile(config, key);
    });
  }, [formData.estatusSolicitudBecaId, formData.id, fetchFile]);
  return (
    <Grid container>
      {fileConfigs.actaComite.showCondition && (
        <Grid item xs={11} sx={{ mt: 2 }}>
          <InputFile
            url={fileUrls.actaComite}
            setUrl={(url) => setFileUrls((prev) => ({ ...prev, actaComite: url }))}
            id={formData.id}
            tipoDocumento={fileConfigs.actaComite.tipoDocumento}
            tipoEntidad={fileConfigs.actaComite.tipoEntidad}
            label="Acta de comité"
            disabled={disabled}
          />
        </Grid>
      )}
    </Grid>
  );
}

ActaComiteSection.defaultProps = {
  formData: {},
};

ActaComiteSection.propTypes = {
  disabled: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    id: PropTypes.number,
    estatusSolicitudBecaId: PropTypes.number,
    cicloEscolarId: PropTypes.number,
    observaciones: PropTypes.string,
  }),
};
