import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import {
  Select, Context, Input, GetFile, InputFile,
} from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import getMunicipios from '@siiges-ui/instituciones/src/components/utils/getMunicipios';
import { fetchCiclosData } from '../../../utils';

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function DatosSolicitud({
  programa,
  setReqData,
  formData,
  disabled,
}) {
  const { setNoti, setLoading } = useContext(Context);
  const [ciclos, setCiclos] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const fileData = {
    entidadId: formData.id,
    tipoEntidad: 'SOLICITUD_SERV_SOC',
    tipoDocumento: 'ACTA_COMITE_SERV_SOC',
  };

  useEffect(() => {
    if (formData.estatusSolicitudServicioSocialId === 3) {
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
  }, [formData.estatusSolicitudServicioSocialId]);

  const { municipios } = getMunicipios();
  const municipiosOrdenados = municipios
    .map((m) => ({ id: m.id, nombre: m.nombre }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  useEffect(() => {
    fetchCiclosData(setNoti, setLoading, setCiclos, programa.id);
  }, [programa.id, setNoti, setLoading]);

  useEffect(() => {
    setReqData((prevData) => ({
      ...prevData,
      domicilio: {
        ...prevData.domicilio,
        estadoId: 14,
      },
    }));
  }, [setReqData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReqData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDomicilioChange = (event) => {
    const { name, value } = event.target;
    setReqData((prevData) => ({
      ...prevData,
      domicilio: {
        ...prevData.domicilio,
        [name]: value,
      },
    }));
  };

  return (
    <Grid container spacing={2} sx={{ paddingX: 3, paddingY: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mt: 2 }}>
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
      {formData.id && (
        <Grid item xs={12} sx={{ mt: 2 }}>
          <InputFile
            url={fileUrl}
            setUrl={setFileUrl}
            id={formData?.id}
            tipoDocumento={fileData.tipoDocumento}
            tipoEntidad={fileData.tipoEntidad}
            label="Acta de comite"
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mt: 3 }}>
          Datos del Domicilio de la Asamblea
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Municipio"
          name="municipioId"
          value={formData?.domicilio?.municipioId || ''}
          options={municipiosOrdenados}
          onChange={handleDomicilioChange}
          disabled={disabled}
          fullWidth
        />
      </Grid>
      <Grid item xs={8}>
        <Input
          id="calle"
          label="Calle"
          name="calle"
          value={formData?.domicilio?.calle || ''}
          onChange={handleDomicilioChange}
          disabled={disabled}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          id="numeroExterior"
          label="Número Exterior"
          name="numeroExterior"
          value={formData?.domicilio?.numeroExterior || ''}
          onChange={handleDomicilioChange}
          disabled={disabled}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          id="numeroInterior"
          label="Número Interior"
          name="numeroInterior"
          value={formData?.domicilio?.numeroInterior || ''}
          onChange={handleDomicilioChange}
          disabled={disabled}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          id="colonia"
          label="Colonia"
          name="colonia"
          value={formData?.domicilio?.colonia || ''}
          onChange={handleDomicilioChange}
          disabled={disabled}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          id="codigoPostal"
          label="Código Postal"
          name="codigoPostal"
          value={formData?.domicilio?.codigoPostal || ''}
          onChange={handleDomicilioChange}
          disabled={disabled}
          fullWidth
        />
      </Grid>
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
    id: PropTypes.number,
    cicloEscolarId: PropTypes.number,
    estatusSolicitudServicioSocialId: PropTypes.number,
    observaciones: PropTypes.string,
    domicilio: PropTypes.shape({
      municipioId: PropTypes.number,
      calle: PropTypes.string,
      numeroExterior: PropTypes.string,
      numeroInterior: PropTypes.string,
      colonia: PropTypes.string,
      codigoPostal: PropTypes.number,
    }),
  }),
};
