import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  Select, Context, Input, ButtonFile,
  GetFile,
} from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import { fetchCiclosData } from '../../../utils';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function DatosSolicitud({
  programa, setReqData, formData, disabled,
}) {
  const { setNoti, setLoading } = useContext(Context);
  const [ciclos, setCiclos] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const fileData = {
    entidadId: formData.id,
    tipoEntidad: 'SOLICITUD_BECA',
    tipoDocumento: 'REPORTE_BECAS',
  };

  useEffect(() => {
    fetchCiclosData(setNoti, setLoading, setCiclos, programa.id);
  }, [programa.id, setNoti, setLoading]);

  useEffect(() => {
    if (formData.estatusSolicitudBecaId === 3) {
      GetFile(fileData, (url, error) => {
        if (error) {
          setNoti({
            open: true,
            message: '¡Error al obtener el archivo!',
            type: 'error',
          });
          console.error(error);
        } else {
          setFileUrl(`${baseUrl}${url}`);
        }
      });
    }
  }, [formData.estatusSolicitudBecaId]);

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
        />
      </Grid>
      <Grid item xs={3.7} />
      {formData.estatusSolicitudBecaId === 3 && (
      <Grid item xs={4} sx={{ mt: 2 }}>
        <ButtonFile url={fileUrl}>Archivo de resolución de Becas</ButtonFile>
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
    id: PropTypes.number,
  }).isRequired,
  formData: PropTypes.shape({
    estatusSolicitudBecaId: PropTypes.number,
    id: PropTypes.number,
    cicloEscolarId: PropTypes.number,
    observaciones: PropTypes.string,
  }),
};
