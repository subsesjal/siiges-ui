import {
  useAuth, DataTable, Layout, useApi, useUI,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { MisInspeccionesColumns } from '@siiges-ui/inspecciones';

const INSPECCIONES_ESTATUS = [
  { id: 1, descripcion: 'Inspección asignada' },
  { id: 2, descripcion: 'Inspección en proceso' },
  { id: 3, descripcion: 'Inspección completa' },
  { id: 4, descripcion: 'Inspección terminada, pero por atender observaciones' },
  { id: 5, descripcion: 'Acta de cierre expedida' },
];

export default function MisInspecciones() {
  const { session } = useAuth();
  const { setLoading, setNoti } = useUI();
  const { id: userId } = session;
  const [inspecciones, setInspecciones] = useState([]);
  const { data, loading, error } = useApi({ endpoint: `api/v1/inspecciones/inspectores-programas/${userId}` });

  useEffect(() => {
    setLoading(loading);
    if (data) {
      setInspecciones(data.map((row) => ({
        ...row,
        status: INSPECCIONES_ESTATUS.find(
          (estatus) => estatus.id === row.estatusInspeccionId,
        )?.descripcion,
        folioInspeccion: row.programa.solicitud.folio,
        planEstudios: row.programa.nombre,
        fechaAsignada: new Date(row.fechaAsignada).toISOString().split('T')[0],
      })));
    }
    if (error && userId) {
      setNoti({
        open: true,
        message: `¡Ocurrió un error al cargar las inspecciones!: ${error}`,
        type: 'error',
      });
    }
  }, [data, loading, error]);

  return (
    <Layout title="Mis inspecciones">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DataTable
            title="Lista de inspecciones"
            rows={inspecciones}
            columns={MisInspeccionesColumns}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
