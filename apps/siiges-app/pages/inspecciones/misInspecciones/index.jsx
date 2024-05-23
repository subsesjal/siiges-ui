import {
  Context, DataTable, Layout, getData,
} from '@siiges-ui/shared';
import { Grid } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { MisInspeccionesColumns } from '@siiges-ui/inspecciones';

export default function MisInspecciones() {
  const { setLoading, setNoti, session } = useContext(Context);
  const [inspecciones, setInspecciones] = useState([]);
  const [inspectorId, setInspectorId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getData({
          endpoint: `/inspecciones/inspectores-programas/${inspectorId}`,
          query: '',
        });
        if (response && response.statusCode === 200) {
          setInspecciones(response.data);
        } else {
          setNoti({
            open: true,
            message: 'No se encontraron inspecciones asignadas',
            type: 'warning',
          });
        }
      } catch (err) {
        setNoti({
          open: true,
          message: `Ocurrio un error al cargar las inspecciones: ${err}`,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    if (session.id) {
      fetchData();
    }
  }, [session]);

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
