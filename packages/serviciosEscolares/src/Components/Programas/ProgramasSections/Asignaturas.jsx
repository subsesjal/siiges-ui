import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import usePrograma from '../../utils/getPrograma';
import useAsignaturas from '@siiges-ui/solicitudes/src/components/utils/getAsignaturas';
import { grados } from '@siiges-ui/solicitudes/src/components/utils/Mocks/mockAsignaturas';
import columns from './Mocks/index';

export default function Asignaturas() {
  const router = useRouter();
  const { id: programaId } = router.query;

  const [asignaturasList, setAsignaturasList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noti, setNoti] = useState(null);

  const { asignaturas, loading: asignaturasLoading } = useAsignaturas(programaId);
  const { programaData, loading: programaLoading, rol } = usePrograma(programaId);

  useEffect(() => {
    if (!asignaturasLoading) {
      setAsignaturasList(asignaturas);
      console.log(rol);
    }
  }, [asignaturasLoading, asignaturas]);

  const tableColumns = useMemo(
    () => columns(grados, programaId, asignaturasList, setAsignaturasList, programaData.cicloId, setLoading, setNoti, rol),
    [grados, programaId, asignaturasList, setAsignaturasList, programaData.cicloId, setLoading, setNoti, rol],
  );

  if (programaLoading || asignaturasLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas</Typography>
      </Grid>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%', marginTop: 15 }}>
          <DataGrid
            rows={asignaturasList}
            columns={tableColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={asignaturasLoading}
          />
        </div>
      </Grid>
    </Grid>
  );
}

Asignaturas.propTypes = {
  type: PropTypes.string,
};
