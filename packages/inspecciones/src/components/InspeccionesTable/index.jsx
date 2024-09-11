import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { DataTable } from '@siiges-ui/shared';
import { getData } from '@siiges-ui/shared/src/utils/handlers/apiUtils';
import getSolicitudesInspecciones from '../../utils/getSolicitudesInspeccion';
import getColumns from '../Mocks/Inspecciones';

export default function InspeccionesTable() {
  const { solicitudesInspecciones, loading } = getSolicitudesInspecciones();
  const [inspecciones, setInspecciones] = useState([]);
  const [inspeccionesdata, setInspeccionesData] = useState([]);

  const columns = getColumns();
  const mapSolicitudesToRows = (solicitudes, inspeccionesdata) => solicitudes.map((solicitud) => {
    // Busca la inspección correspondiente en inspeccionesdata basada en programaId
    const inspeccionEncontrada = inspeccionesdata.find(
      (inspeccion) => inspeccion.programaId === solicitud.id,
    );

    // Verifica si la fechaAsignada no es vacía o null para definir isAssigned
    const isAssigned = inspeccionEncontrada && inspeccionEncontrada.fechaAsignada !== '';

    return {
      id: solicitud.id,
      folio: solicitud.folio,
      planEstudios: solicitud.programa.nombre,
      status: solicitud.estatusSolicitud.nombre,
      plantel: `${solicitud.programa.plantel.domicilio.calle} #${solicitud.programa.plantel.domicilio.numeroExterior}`,
      instituciones: solicitud.programa.plantel.institucion.nombre,
      isAssigned,
    };
  });

  const fetchInspecciones = async () => {
    try {
      const endpoint = '/inspecciones';
      const response = await getData({ endpoint });

      if (response.statusCode === 200 && response.data) {
        // const formattedRows = mapSolicitudesToRows(response.data);
        setInspeccionesData(response.data);
      } else {
        setInspeccionesData([]);
      }
    } catch (error) {
      setInspeccionesData([]);
    }
  };

  useEffect(() => {
    if (!loading && solicitudesInspecciones) {
      const formattedRows = mapSolicitudesToRows(solicitudesInspecciones, inspeccionesdata);
      setInspecciones(formattedRows);
    }
    fetchInspecciones();
  }, [loading, solicitudesInspecciones, inspeccionesdata]);

  return (
    <Grid container spacing={2}>
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
