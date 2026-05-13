import { Grid } from '@mui/material';
import { ConsultRevalidacion } from '@siiges-ui/revalidaciones';
import {
  ButtonSimple, Layout, updateRecord, useUI,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import React from 'react';

export default function RevisarRevalidacion() {
  const router = useRouter();
  const { query } = router;
  const { setNoti } = useUI();

  const handleSubmit = async () => {
    try {
      const response = await updateRecord({
        endpoint: `/solicitudesRevEquiv/${query.id}`,
        data: { estatusSolicitudRevEquivId: 3 },
      });

      if (response.statusCode === 201) {
        setNoti({
          open: true,
          message: '¡Solicitud enviada a firma exitosamente!',
          type: 'success',
        });
        router.back();
      } else {
        setNoti({
          open: true,
          message:
            response.errorMessage || '¡Error al actualizar la solicitud!',
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
    <Layout title="Revisión de Solicitud de Revalidación">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ConsultRevalidacion />
        </Grid>
        <Grid item xs={12}>
          <ButtonSimple
            text="Pasar a Firma"
            onClick={handleSubmit}
            align="right"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
