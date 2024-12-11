import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Typography, Grid, Tab, Tabs, Box,
} from '@mui/material';
import { LabelData, Layout, Loading } from '@siiges-ui/shared';
import getAsignaturaById from '../../utils/getAsignaturaById';
import getGrupoById from '../../utils/getGrupoById';
import getAlumnosAcreditacion from '../../utils/getAlumnosAcreditacion';
import Calificaciones from '../Calificaciones';

export default function DetallesAsignatura({ type }) {
  const disabled = type !== 'editar';
  const router = useRouter();
  const { asignaturaId, grupoId } = router.query;
  const [asignatura, setAsignatura] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [labelPrograma, setLabelPrograma] = useState();
  const [labelGrado, setLabelGrado] = useState();
  const [labelGrupo, setLabelGrupo] = useState();
  const [labelTurno, setLabelTurno] = useState();
  const [labelCiclo, setLabelCiclo] = useState();
  const [labelAsignatura, setLabelAsignatura] = useState();
  const [programaId, setProgramaId] = useState(0);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (asignaturaId) {
          const asignaturaData = await getAsignaturaById(asignaturaId);
          setAsignatura(asignaturaData);
          setLabelAsignatura(asignaturaData.nombre);
        }
        if (grupoId) {
          const grupoData = await getGrupoById(grupoId);
          setLabelGrupo(grupoData.descripcion);
          setLabelGrado(grupoData.grado.nombre);
          setLabelTurno(grupoData.turno.nombre);
          setLabelCiclo(grupoData.cicloEscolar.nombre);
          setLabelPrograma(grupoData.cicloEscolar.programa.nombre);
          setProgramaId(grupoData.cicloEscolar.programaId);
        }
        if (asignaturaId && grupoId) {
          const alumnosAcreditacion = await getAlumnosAcreditacion(
            asignaturaId,
            grupoId,
          );
          setAlumnos(alumnosAcreditacion);
        }
      } catch (error) {
        console.error('¡Error al obtener detalles!', error);
      }
    };

    if (asignaturaId && grupoId) {
      fetchDetails();
    }
  }, [asignaturaId, grupoId]);

  return (
    <Layout title="Acreditación">
      {!asignatura ? (
        <Loading />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">{labelPrograma}</Typography>
            </Grid>
            <Grid item xs={3}>
              <LabelData title="Ciclo" subtitle={labelCiclo} />
            </Grid>
            <Grid item xs={3}>
              <LabelData title="Grado" subtitle={labelGrado} />
            </Grid>
            <Grid item xs={3}>
              <LabelData title="Grupo" subtitle={labelGrupo} />
            </Grid>
            <Grid item xs={3}>
              <LabelData title="Turno" subtitle={labelTurno} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Asignaturas tabs"
                >
                  <Tab label="Calificaciones Ordinarias" />
                  <Tab label="Calificaciones Extraordinarios" />
                </Tabs>
              </Box>
            </Grid>
          </Grid>
          {value === 0 && (
            <Calificaciones
              mode="Ordinarias"
              disabled={disabled}
              labelAsignatura={labelAsignatura}
              alumnos={alumnos}
              asignaturaId={asignaturaId}
              grupoId={grupoId}
              programaId={programaId}
              setAlumnos={setAlumnos}
            />
          )}
          {value === 1 && (
            <Calificaciones
              mode="Extraodinarias"
              disabled={disabled}
              labelAsignatura={labelAsignatura}
              alumnos={alumnos}
              asignaturaId={asignaturaId}
              grupoId={grupoId}
              programaId={programaId}
              setAlumnos={setAlumnos}
            />
          )}
        </>
      )}
    </Layout>
  );
}

DetallesAsignatura.propTypes = {
  type: PropTypes.string.isRequired,
};
