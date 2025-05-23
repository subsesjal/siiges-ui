import { Grid } from '@mui/material'; // Changed from @mui/system to @mui/material
import { ConsultRevalidacion } from '@siiges-ui/revalidaciones';
import {
  ButtonSimple,
  Layout,
  updateRecord,
  Context,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function ProcesarRevalidacion() {
  const router = useRouter();
  const { query } = router;
  const { setNoti } = useContext(Context);

  const handleSubmit = async () => {
    try {
      const response = await updateRecord({
        endpoint: `/solicitudesRevEquiv/${query.id}`,
        data: { estatusSolicitudRevEquivId: 4 },
      });

      if (response.statusCode === 201) {
        setNoti({
          open: true,
          message: '¡Solicitud procesada exitosamente!',
          type: 'success',
        });
        router.back();
      } else {
        setNoti({
          open: true,
          message: response.errorMessage || '¡Error al actualizar la solicitud!',
          type: 'error',
        });
      }
    } catch (error) {
      setNoti({
        open: true,
        message: '¡Error al procesar la solicitud!',
        type: 'error',
      });
    }
  };

  return (
    <Layout title="Procesar Solicitud de Revalidacion">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ConsultRevalidacion />
        </Grid>
        <Grid item xs={6}>
          <ButtonSimple
            text="Regresar"
            onClick={() => router.back()}
            design="warning"
          />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonSimple
            text="Procesar Solicitud"
            onClick={handleSubmit}
            align="right"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
