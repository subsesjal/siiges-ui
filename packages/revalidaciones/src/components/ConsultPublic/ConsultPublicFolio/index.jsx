import { Grid, List, Divider } from '@mui/material';
import {
  Context, ListSubtitle, ListTitle, Subtitle,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

const tipoSolicitudes = [
  { id: 1, nombre: 'Equivalencia Parcial' },
  { id: 2, nombre: 'Equivalencia Total' },
  { id: 3, nombre: 'Revalidacion Parcial' },
  { id: 4, nombre: 'Revalidacion Total' },
  { id: 5, nombre: 'Equivalencia Duplicado' },
  { id: 6, nombre: 'Revalidacion Duplicado' },
];

const estatusSolicitudes = [
  { id: 1, nombre: 'Recibida' },
  { id: 2, nombre: 'En Revisión' },
  { id: 3, nombre: 'En Firma' },
  { id: 4, nombre: 'Procesada' },
  { id: 5, nombre: 'Atender observaciones' },
  { id: 6, nombre: 'Cancelada' },
];

export default function ConsultPublicFolio() {
  const router = useRouter();
  const { folio } = router.query;

  const [data, setData] = useState(null);
  const { setLoading, loading, setNoti } = useContext(Context);

  useEffect(() => {
    if (!folio) return;

    const fetchFolio = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${domain}/api/v1/public/solicitudesRevEquiv?folioSolicitud=${folio}`,
          {
            method: 'GET',
            headers: {
              api_key: apiKey,
            },
          },
        );

        const result = await response.json();
        setData(result?.data);
      } catch (error) {
        setNoti({
          open: true,
          message: `Error consultando folio: ${error}`,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFolio();
  }, [folio]);

  const getNombreById = (list, id) => list.find((item) => item.id === id)?.nombre || 'N/A';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX');
  };

  if (loading) {
    return <Subtitle>Cargando información...</Subtitle>;
  }

  if (!data) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {/* DATOS DE LA SOLICITUD */}
      <Grid item xs={12} sx={{ mt: 3 }}>
        <Subtitle>Datos de la solicitud</Subtitle>
      </Grid>

      <Grid container xs={12} md={6}>
        <Grid item xs>
          <List>
            <ListTitle text="Tipo de solicitud" />
            <ListTitle text="Folio de la solicitud" />
            <ListTitle text="Estatus de la solicitud" />
            <ListTitle text="Fecha de envío" />
          </List>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />

        <Grid item xs>
          <List>
            <ListSubtitle
              text={getNombreById(tipoSolicitudes, data?.tipoTramiteId)}
            />
            <ListSubtitle text={data?.folioSolicitud || 'N/A'} />
            <ListSubtitle
              text={getNombreById(
                estatusSolicitudes,
                data?.estatusSolicitudRevEquivId,
              )}
            />
            <ListSubtitle text={formatDate(data?.createdAt)} />
          </List>
        </Grid>
      </Grid>

      {/* DATOS DEL INTERESADO */}
      <Grid item xs={12}>
        <Subtitle>Datos del interesado</Subtitle>
      </Grid>

      <Grid container xs={12} md={6}>
        <Grid item xs>
          <List>
            <ListTitle text="Nombre" />
            <ListTitle text="Primer apellido" />
            <ListTitle text="Segundo apellido" />
          </List>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />

        <Grid item xs>
          <List>
            <ListSubtitle text={data?.interesado?.persona?.nombre || 'N/A'} />
            <ListSubtitle
              text={data?.interesado?.persona?.apellidoPaterno || 'N/A'}
            />
            <ListSubtitle
              text={data?.interesado?.persona?.apellidoMaterno || 'N/A'}
            />
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}
