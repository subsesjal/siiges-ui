import {
  Context, DataTable, Layout, useApi,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { MisInspeccionesColumns } from '@siiges-ui/inspecciones';

export default function MisInspecciones() {
  const { setLoading, setNoti, session } = useContext(Context);
  const { id: userId } = session;
  const [inspecciones, setInspecciones] = useState([]);

  const inspeccionesEstatus = [
    { id: 1, descripcion: 'Inspeccion asignada' },
    { id: 2, descripcion: 'Inspeccion en proceso' },
    { id: 3, descripcion: 'Inspeccion completa' },
    { id: 4, descripcion: 'Inspección terminada pero por atender observaciones' },
    { id: 5, descripcion: 'Acta de cierre expedida' },
  ];

  const getEstatus = (id) => inspeccionesEstatus.find((estatus) => estatus.id === id).descripcion;
  const { data, loading, error } = useApi({ endpoint: `api/v1/inspecciones/inspectores-programas/${userId}` });

  useEffect(() => {
    setLoading(loading);
    if (data) {
      setInspecciones(data.map((row) => ({
        ...row,
        status: getEstatus(row.estatusInspeccionId),
        folioInspeccion: row.programa.solicitud.folio,
        planEstudios: row.programa.nombre,
        fechaAsignada: new Date(row.fechaAsignada).toISOString().split('T')[0],
      })));
    }
    if (error && userId) {
      setNoti({
        open: true,
<<<<<<< HEAD
        message: `¡Ocurrió un error al cargar las inspecciones!: ${error}`,
=======
        message: `¡Ocurrio un error al cargar las inspecciones!: ${error}`,
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
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
