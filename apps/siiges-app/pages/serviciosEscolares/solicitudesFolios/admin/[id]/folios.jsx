import {
  Grid, Typography, Tabs, Tab,
} from '@mui/material';
import {
  Context,
  DataTable,
  getData,
  Input,
  LabelData,
  Layout,
  updateRecord,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ButtonsFoliosAdmin } from '@siiges-ui/serviciosescolares';

export default function Folios() {
  const { setNoti, setLoading } = useContext(Context);
  const [etiquetas, setEtiquetas] = useState({
    tipoDocumento: '',
    tipoSolicitudFolio: '',
    acuerdoRvoe: '',
    planEstudios: '',
    gradoAcademico: '',
    nombreAlumno: '',
    matriculaAlumno: '',
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [observaciones, setObservaciones] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getData({
            endpoint: `/solicitudesFolios/${id}`,
          });
          const { data } = response;
          setEtiquetas({
            tipoDocumento: data.tipoDocumento.nombre,
            tipoSolicitudFolio: data.tipoSolicitudFolio.nombre,
            acuerdoRvoe: data.programa.acuerdoRvoe,
            planEstudios: data.programa.nombre,
            gradoAcademico: data.programa.nivelId,
            nombreAlumno: data.alumno ? data.alumno.nombre : '',
            matriculaAlumno: data.alumno ? data.alumno.matricula : '',
          });
        } catch (error) {
          setNoti({
            open: true,
            message: `Error al cargar la solicitud: ${error.message}`,
            type: 'error',
          });
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleObservacionesChange = (event) => {
    setObservaciones(event.target.value);
  };

  const handleObservacionesSubmit = async () => {
    if (id && observaciones) {
      setLoading(true);
      try {
        const response = await updateRecord({
          data: { observaciones },
          endpoint: `/solicitudesFolios/${id}/observaciones`,
        });

        if (response.statusCode === 200) {
          setNoti({
            open: true,
            message: 'Observaciones actualizadas con éxito',
            type: 'success',
          });
        } else {
          throw new Error(response.message || 'Error al actualizar las observaciones');
        }
      } catch (error) {
        setNoti({
          open: true,
          message: `Error al actualizar las observaciones: ${error.message}`,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFoliosSubmit = () => {
    console.log('Folios Generados');
  };

  return (
    <Layout title="Consultar solicitud">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="Tabs for Instituciones and Alumnos"
            >
              <Tab label="Instituciones" />
              <Tab label="Alumnos" />
            </Tabs>
          </Grid>
        </Grid>

        {tabIndex === 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Datos de la institución</Typography>
            </Grid>
            <Grid item xs={8}>
              <LabelData
                title="Institución"
                subtitle="Universidad Enrique Diáz de León"
              />
            </Grid>
            <Grid item xs={4}>
              <LabelData title="RVOE" subtitle={etiquetas.acuerdoRvoe} />
            </Grid>
            <Grid item xs={8}>
              <LabelData
                title="Grado Académico"
                subtitle={etiquetas.gradoAcademico}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelData
                title="Plan de Estudios"
                subtitle={etiquetas.planEstudios}
              />
            </Grid>
            <Grid item xs={8}>
              <LabelData
                title="Clave de centro de trabajo"
                subtitle="1234567"
              />
            </Grid>
            <Grid item xs={4}>
              <LabelData
                title="Tipo de Documento"
                subtitle={etiquetas.tipoDocumento}
              />
            </Grid>
            <Grid item xs={12}>
              <LabelData
                title="Tipo de Solicitud"
                subtitle={etiquetas.tipoSolicitudFolio}
              />
            </Grid>
          </>
        )}

        {tabIndex === 1 && (
          <Grid item xs={12}>
            <DataTable title="Alumnos" rows={[]} columns={[]} />
          </Grid>
        )}

        <Grid item xs={12}>
          <Input
            id="observaciones"
            name="observaciones"
            label="Observaciones"
            multiline
            rows={4}
            value={observaciones}
            onChange={handleObservacionesChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsFoliosAdmin
            observaciones={handleObservacionesSubmit}
            folios={handleFoliosSubmit}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
