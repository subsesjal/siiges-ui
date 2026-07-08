import React, { useState } from 'react';
import { Layout, useUI, getData } from '@siiges-ui/shared';
import { Divider, Grid } from '@mui/material';
import {
  AlumnosInactivosForm,
  AlumnosInactivosTable,
} from '@siiges-ui/serviciosescolares';

export default function AlumnosInactivos() {
  const { setNoti, setLoading } = useUI();
  const [formData, setFormData] = useState({
    institucion: '',
    plantel: '',
    programa: '',
    busquedaGeneralTexto: '',
  });
  const [matriculas, setMatriculas] = useState([]);

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (formData.institucion) params.append('institucionId', formData.institucion);
    if (formData.plantel) params.append('plantelId', formData.plantel);
    if (formData.programa) params.append('programaId', formData.programa);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const mapAlumnosToRows = (alumnos) => alumnos.map((alumno) => ({
    id: alumno.id,
    validacionId: alumno.validacion?.id,
    nombre: `${alumno.persona?.nombre} ${alumno.persona?.apellidoPaterno} ${alumno.persona?.apellidoMaterno}`,
    curp: alumno.persona?.curp,
    fechaInicioAntecedentes: formatDate(alumno.validacion?.fechaInicioAntecedente),
    fechaFinAntecedentes: formatDate(alumno.validacion?.fechaFinAntecedente),
    fechaExpedicion: formatDate(alumno.validacion?.fechaExpedicion),
    tipoValidacion: alumno.validacion?.tipo?.nombre || 'Sin validación',
  }));

  const handleSearch = async () => {
    setLoading(true);
    const { statusCode, data, errorMessage } = await getData({
      endpoint: '/alumnos/matricula-inactiva',
      query: buildQuery(),
    });

    if (statusCode !== 200) {
      setNoti({
        open: true,
        message: errorMessage || '¡No se encontraron alumnos inactivos!',
        type: 'warning',
      });
      setMatriculas([]);
    } else {
      const rows = mapAlumnosToRows(data || []);
      setMatriculas(rows);
    }
    setLoading(false);
  };

  return (
    <Layout title="Busqueda de Alumnos Inactivos">
      <Grid container>
        <Grid item xs={12}>
          <AlumnosInactivosForm
            formData={formData}
            setFormData={setFormData}
            onSearch={handleSearch}
            setLoading={setLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ marginTop: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <AlumnosInactivosTable matriculas={matriculas} />
        </Grid>
      </Grid>
    </Layout>
  );
}
