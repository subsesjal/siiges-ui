import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Typography, Grid, Tab, Tabs, Box,
} from '@mui/material';
import { LabelData, Layout, Loading } from '@siiges-ui/shared';
import getAsignaturaById from '../../utils/getAsignaturaById';
import CalOrdinarias from '../CalOrdinarias';
import CalExtraordinarias from '../CalExtraordinarias';
import getGrupoById from '../../utils/getGrupoById';
import getAlumnosAcreditacion from '../../utils/getAlumnosAcreditacion';

export default function DetallesAsignatura({ type }) {
  const disabled = type !== 'editar';
  const router = useRouter();
  const { asignaturaId, grupoId } = router.query;
  const [asignatura, setAsignatura] = useState(null);
  const [alumnosOrdinario, setAlumnosOrdinario] = useState([]);
  const [alumnosExtraordinario, setAlumnosExtraordinario] = useState([]);
  const [labelPrograma, setLabelPrograma] = useState();
  const [labelGrado, setLabelGrado] = useState();
  const [labelGrupo, setLabelGrupo] = useState();
  const [labelTurno, setLabelTurno] = useState();
  const [labelCiclo, setLabelCiclo] = useState();
  const [labelAsignatura, setLabelAsignatura] = useState();
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
        }
        if (asignaturaId && grupoId) {
          const alumnosAcreditacion = await getAlumnosAcreditacion(
            asignaturaId,
            grupoId,
          );
          if (alumnosAcreditacion.estatus === 1) {
            setAlumnosOrdinario(alumnosAcreditacion);
          } else {
            setAlumnosExtraordinario(alumnosAcreditacion);
          }
        }
      } catch (error) {
        console.error('Error fetching details', error);
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
                  aria-label="Asignatura details tabs"
                >
                  <Tab label="Calificaciones Ordinarias" />
                  <Tab label="Calificaciones Extraordinarios" />
                </Tabs>
              </Box>
            </Grid>
          </Grid>
          {value === 0 && (
            <CalOrdinarias
              disabled={disabled}
              labelAsignatura={labelAsignatura}
              alumnos={alumnosOrdinario}
              asignaturaId={asignaturaId}
              grupoId={grupoId}
            />
          )}
          {value === 1 && (
            <CalExtraordinarias
              disabled={disabled}
              labelAsignatura={labelAsignatura}
              alumnos={alumnosExtraordinario}
              asignaturaId={asignaturaId}
              grupoId={grupoId}
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
