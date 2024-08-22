import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import {
  ButtonStyled, Select, useApi, Context,
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        message: 'Registro Exitoso',
=======
        message: '¡Refrendo creado correctamente!',
>>>>>>> 6b947f4 (correcciones)
=======
        message: '¡Refrendo creado correctamente!',
>>>>>>> f13bead (correcciones)
=======
        message: '¡Refrendo creado correctamente!',
>>>>>>> 2d98c139b85e06c536a0986516579483abb5ae6d
        type: 'success',
      });
      router.push({
        pathname: `/solicitudes/detallesSolicitudes/${data.id}/editarSolicitud`,
      });
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
            onchange={handleOnChange}
          />
        </Grid>
        <Grid item xs={2} sx={{ mt: 2, mb: 1 }}>
          <ButtonStyled text="Crear" onclick={() => handleOnClick()} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Refrendo;
