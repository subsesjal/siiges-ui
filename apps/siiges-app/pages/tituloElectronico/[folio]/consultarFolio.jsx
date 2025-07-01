import React, { useContext, useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { ButtonSimple, Context, Layout } from '@siiges-ui/shared';
import { useRouter } from 'next/router';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function ConsultarFolio() {
  const router = useRouter();
  const { folio } = router.query;
  const { setLoading, loading, setNoti } = useContext(Context);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!folio) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${domain}/api/v1/public/alumnos/titulos?folioControl=${folio}`,
          {
            method: 'GET',
            headers: {
              api_key: apiKey,
            },
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Error en la consulta');
        }

        setData(result.data);
      } catch (err) {
        setNoti({
          open: true,
          message: err.message || 'Ocurrió un error al consultar el folio.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folio]);

  return (
    <Layout title="Consulta tu Constancia de Título">
      <Grid container spacing={2}>

        <Grid item xs={12}>
          {!loading && data && (
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Folio de Control</strong></TableCell>
                    <TableCell>{data.folioControl}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Nombre(s)</strong></TableCell>
                    <TableCell>{data.nombre}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Primer Apellido</strong></TableCell>
                    <TableCell>{data.primerApellido}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Segundo Apellido</strong></TableCell>
                    <TableCell>{data.segundoApellido}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Institución</strong></TableCell>
                    <TableCell>{data.nombreInstitucion}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Carrera</strong></TableCell>
                    <TableCell>{data.nombreCarrera}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Fecha de Inicio</strong></TableCell>
                    <TableCell>{data.fechaInicio}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Fecha de Terminación</strong></TableCell>
                    <TableCell>{data.fechaTerminacion}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Fecha de expedición</strong></TableCell>
                    <TableCell>{data.fechaExpedicion}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!loading && !data && (
            <Typography color="error">
              No se encontró información para el folio proporcionado.
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <ButtonSimple
            align="right"
            text="Regresar"
            design="cancel"
            onClick={() => router.back()}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
