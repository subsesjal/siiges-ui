import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import {
  ButtonSimple, Select, useApi, Context,
} from '@siiges-ui/shared';

function Refrendo() {
  const { setNoti, session: { id } } = useContext(Context);
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');
  const [url, setUrl] = useState('');
  const [dataBody, setDataBody] = useState('');
  const [method, setMethod] = useState('GET');

  const { data } = useApi({
    endpoint: url || `api/v1/solicitudes?estatusSolicitudId=11&usuarioId=${id}`,
    dataBody,
    method,
  });

  const showCrearSolicitud = process.env.NEXT_PUBLIC_SHOW_CREAR_SOLICITUD !== 'false';

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const newData = data.map((item) => ({
        id: item.id,
        nombre: `${item.programa.plantel.institucion.nombre} ${item.programa.nombre} ${item.folio}`,
      }));
      setOptions(newData);
    }
    if (typeof data === 'object' && method === 'POST' && data) {
      setNoti({
        open: true,
        message: '¡Registro Exitoso!',
        type: 'success',
      });
      router.push({
        pathname: `/solicitudes/detallesSolicitudes/${data.id}/editarSolicitud`,
        query: { solicitudType: 'Refrendo' },
      }, `/solicitudes/detallesSolicitudes/${data.id}/editarSolicitud`);
    }
  }, [data]);

  const handleOnChange = (e) => {
    setOption(e.target.value);
  };

  const handleOnClick = () => {
    if (option) {
      setMethod('POST');
      setDataBody({ tipoSolicitudId: 2 });
      setUrl(`api/v1/solicitudes/?solicitudId=${option}`);
    }
  };

  return (
    <Grid item>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Select
            title="Seleccione una opcion"
            name="options"
            options={options}
            value={option}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={2} sx={{ mt: 2, mb: 1 }}>
          <ButtonSimple text="Crear" onClick={() => handleOnClick()} disabled={!showCrearSolicitud} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Refrendo;
