import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { getData, Context, DataTable } from '@siiges-ui/shared';
import useAsignaturas from '@siiges-ui/solicitudes/src/components/utils/getAsignaturas';
import { grados } from '@siiges-ui/solicitudes/src/components/utils/Mocks/mockAsignaturas';
import columns from './Mocks/index';

export default function Asignaturas() {
  const router = useRouter();
  const { id: programaId } = router.query;
  const { setLoading, session, setNoti } = useContext(Context);

  const [asignaturasList, setAsignaturasList] = useState([]);
  const [programaData, setProgramaData] = useState({});
  const [localLoading, setLocalLoading] = useState(false);

  const { asignaturasTotal: asignaturas, loading: asignaturasLoading } = useAsignaturas(programaId);

  useEffect(() => {
    const fetchProgramaData = async () => {
      setLoading(true);
      setLocalLoading(true);
      const response = await getData({ endpoint: `/programas/${programaId}` });
      if (response && response.data) {
        setProgramaData(response.data);
      }
      setLoading(false);
      setLocalLoading(false);
    };

    if (programaId) {
      fetchProgramaData();
    }
  }, [programaId]);

  useEffect(() => {
    if (!asignaturasLoading) {
      setAsignaturasList(asignaturas);
    }
  }, [asignaturasLoading, asignaturas]);

  const tableColumns = useMemo(
    () => columns(
      grados,
      programaId,
      asignaturasList,
      setAsignaturasList,
      programaData.cicloId,
      setLoading,
      setNoti,
      session.rol,
    ),
    [
      grados,
      programaId,
      asignaturasList,
      setAsignaturasList,
      programaData.cicloId,
      setLoading,
      setNoti,
      session.rol,
    ],
  );

  if (localLoading || asignaturasLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ width: '100%', marginTop: 15 }}>
          <DataTable
            title="Tabla de asignaturas"
            rows={asignaturasList}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={asignaturasLoading || localLoading}
          />
        </div>
      </Grid>
    </Grid>
  );
}
