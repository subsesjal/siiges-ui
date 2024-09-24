import {
  List, ListItem, ListItemText, Grid, Typography,
} from '@mui/material';
import {
  Layout, Title, useApi, Context, getData,
} from '@siiges-ui/shared';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

const url = process.env.NEXT_PUBLIC_URL;
export default function detallesSolicitudes() {
  const { session } = useContext(Context);
  const [isOficioModalOpen, setIsOficioModalOpen] = useState(false);
  const [setError] = useState();
  const showOficioModal = () => setIsOficioModalOpen(true);
  const hideOficioModal = () => setIsOficioModalOpen(false);
  const router = useRouter();
  const { query } = router;
  const [solicitud, setSolicitud] = useState({});
  const { data } = useApi({ endpoint: `api/v1/solicitudes/${query.id}/detalles` });
  useEffect(() => {
    if (data) {
      setSolicitud(data);
    }
  }, [data]);

  const downloadFile = async (type) => {
    const solicitudId = solicitud?.id;
    const response = await getData({ endpoint: `/files/?tipoEntidad=SOLICITUD&entidadId=${solicitudId}&tipoDocumento=${type}` });
    if (response && response.data) {
      const { ubicacion } = response.data;
      const finalUrl = url + ubicacion;
      window.open(finalUrl, '_blank');
    } else {
      setError('Error getting file');
    }
  };

  return (
    <Layout>
      <Title title="Detalles de la solicitud" />
      <Typography sx={{ mt: 5 }} variant="h6">Descarga de documentos</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Formatos Administrativos
          </Typography>
          <List component="nav">
            <ListItem button onClick={() => downloadFile('FDA01')}>
              <ListItemText primary="FDA 01" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDA02')}>
              <ListItemText primary="FDA 02" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDA03')}>
              <ListItemText primary="FDA 03" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDA04')}>
              <ListItemText primary="FDA 04" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDA05')}>
              <ListItemText primary="FDA 05" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDA06')}>
              <ListItemText primary="FDA 06" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Formatos Pedagógicos
          </Typography>
          <List component="nav">
            <ListItem button onClick={() => downloadFile('FDP01')}>
              <ListItemText primary="FDP 01" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDP02')}>
              <ListItemText primary="FDP 02" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDP03')}>
              <ListItemText primary="FDP 03" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDP04')}>
              <ListItemText primary="FDP 04" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDP05')}>
              <ListItemText primary="FDP 05" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('FDP06')}>
              <ListItemText primary="FDP 06" />
            </ListItem>
          </List>
        </Grid>
        {(solicitud.estatusSolicitudId >= 8
          || (solicitud.estatusSolicitudId === 8 && session.rol === 'sicyt_editar')) && (
            <Grid item xs={4}>
              <Typography variant="subtitle1" color="textSecondary">
                RVOE
              </Typography>
              <List component="nav">
                {solicitud.estatusSolicitudId === 8 && session.rol === 'sicyt_editar' ? (
                  <ListItem button onClick={showOficioModal}>
                    <ListItemText primary="Acuerdo RVOE" />
                  </ListItem>
                ) : (
                  <ListItem button onClick={() => downloadFile('ACUERDO_RVOE')}>
                    <ListItemText primary="RVOE" />
                  </ListItem>
                )}
              </List>
            </Grid>
        )}
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Inspección
          </Typography>
          <List component="nav">
            <ListItem button onClick={() => downloadFile('OrdenInspeccion')}>
              <ListItemText primary="Orden de Inspección" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('ActaInspeccion')}>
              <ListItemText primary="Acta de Inspección" />
            </ListItem>
            <ListItem button onClick={() => downloadFile('ActaCierre')}>
              <ListItemText primary="Acta de Cierre" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" color="textSecondary">
            Otros
          </Typography>
          <List component="nav">
            {solicitud.fechaRecepcion && (
              <ListItem button onClick={() => downloadFile('OFICIO_ADMISORIO')}>
                <ListItemText primary="Oficio Admisorio" />
              </ListItem>
            )}
            <ListItem button onClick={() => downloadFile('Desistimiento')}>
              <ListItemText primary="Desistimiento" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      {solicitud?.id && (
        <oficioModal
          open={isOficioModalOpen}
          hideModal={hideOficioModal}
          downloadFile={downloadFile}
          solicitudId={solicitud.id}
        />
      )}
    </Layout>
  );
}
