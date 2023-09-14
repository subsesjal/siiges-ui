import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import getSolicitudesInspecciones from '../../utils/getSolicitudesInspeccion';
import columns from '../Mocks/Inspecciones';

export default function InspeccionesTable() {
  const { solicitudesInspecciones, loading } = getSolicitudesInspecciones();
  const [inspecciones, setInspecciones] = useState([]);

  const mapSolicitudesToRows = (solicitudes) => solicitudes.map((solicitud) => ({
    id: solicitud.id,
    folio: solicitud.folio,
    planEstudios: solicitud.programa.nombre,
    status: solicitud.estatusSolicitud.nombre,
    plantel: `${solicitud.programa.plantel.domicilio.calle} #${solicitud.programa.plantel.domicilio.numeroExterior}`,
    instituciones: solicitud.programa.plantel.institucion.nombre,
  }));

  useEffect(() => {
    if (!loading && solicitudesInspecciones) {
      const formattedRows = mapSolicitudesToRows(solicitudesInspecciones);
      setInspecciones(formattedRows);
    }
  }, [loading, solicitudesInspecciones]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Inspecciones</Typography>
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <DataTable
            title="Solicitudes"
            rows={inspecciones}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        )}
      </Grid>
    </Grid>
  );
}
