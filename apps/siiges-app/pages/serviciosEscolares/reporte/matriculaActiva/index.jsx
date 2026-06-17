import React, { useState } from 'react';
import { Layout, useUI, getData } from '@siiges-ui/shared';
import { Divider, Grid } from '@mui/material';
import {
  MatriculaActivaForm,
  MatriculaActivaTable,
} from '@siiges-ui/serviciosescolares';

export default function MatriculaActiva() {
  const { setNoti, setLoading, loading } = useUI();
  const [formData, setFormData] = useState({});
  const [busquedaGeneral, setBusquedaGeneral] = useState(true);
  const [matriculasActivas, setMatriculasActivas] = useState([]);
  const [totalGeneral, setTotalGeneral] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (formData.institucion) params.append('institucionId', formData.institucion);
    if (formData.plantel) params.append('plantelId', formData.plantel);
    if (formData.programa) params.append('programaId', formData.programa);
    const qs = params.toString();
    return qs ? `?${qs}` : '';
  };

  const handleSearch = async () => {
    if (!formData.institucion) {
      setNoti({
        message: 'Selecciona una institución para realizar la búsqueda',
        severity: 'warning',
      });
      return;
    }

    setLoading(true);
    const { data, errorMessage } = await getData({
      endpoint: '/alumnos/matricula-activa/count',
      query: buildQuery(),
    });
    setLoading(false);

    if (errorMessage) {
      setNoti({ message: errorMessage, severity: 'error' });
      setMatriculasActivas([]);
      return;
    }

    setMatriculasActivas(data?.programas || []);
    setTotalGeneral(data?.totalGeneral ?? null); //
    setNoti({ message: 'Búsqueda completada', severity: 'success' });
  };

  return (
    <Layout title="Busqueda de Matrícula Activa">
      <Grid container>
        <Grid item xs={12}>
          <MatriculaActivaForm
            formData={formData}
            setFormData={setFormData}
            onChange={handleChange}
            onSearch={handleSearch}
            setBusquedaGeneral={setBusquedaGeneral}
            busquedaGeneral={busquedaGeneral}
            setLoading={setLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <MatriculaActivaTable
            matriculasActivas={loading ? [] : matriculasActivas}
            busquedaGeneral={busquedaGeneral}
            totalGeneral={totalGeneral}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
