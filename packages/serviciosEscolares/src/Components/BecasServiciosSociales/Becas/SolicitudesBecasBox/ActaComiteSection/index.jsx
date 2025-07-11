import { Context, GetFile, InputFile } from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function ActaComiteSection({ formData, solicitudId, disabled }) {
  const { setNoti } = useContext(Context);
  const [fileUrls, setFileUrls] = useState({
    actaComite: null,
  });
  const fileConfigs = {
    actaComite: {
      tipoEntidad: 'SOLICITUD_BECA',
      tipoDocumento: 'ACTA_COMITE_BECAS',
      showCondition: !!solicitudId,
    },
  };

  const fetchFile = useCallback(
    async (config, fileKey) => {
      if (!solicitudId || !config.showCondition) return;

      try {
        const fileData = {
          entidadId: solicitudId,
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
    [solicitudId, setNoti],
  );

  useEffect(() => {
    Object.entries(fileConfigs).forEach(([key, config]) => {
      fetchFile(config, key);
    });
  }, [formData.estatusSolicitudBecaId, solicitudId, fetchFile]);
  return (
    <Grid container>
      <Grid item xs={11} sx={{ mt: 2 }}>
        <InputFile
          url={fileUrls.actaComite}
          setUrl={(url) => setFileUrls((prev) => ({ ...prev, actaComite: url }))}
          id={solicitudId}
          tipoDocumento={fileConfigs.actaComite.tipoDocumento}
          tipoEntidad={fileConfigs.actaComite.tipoEntidad}
          label="Acta de comité"
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}

ActaComiteSection.defaultProps = {
  formData: {},
};

ActaComiteSection.propTypes = {
  disabled: PropTypes.bool.isRequired,
  solicitudId: PropTypes.number.isRequired,
  formData: PropTypes.shape({
    id: PropTypes.number,
    estatusSolicitudBecaId: PropTypes.number,
    cicloEscolarId: PropTypes.number,
    observaciones: PropTypes.string,
  }),
};
