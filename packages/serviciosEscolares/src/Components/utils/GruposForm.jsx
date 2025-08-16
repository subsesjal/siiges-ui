import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Select from '@siiges-ui/shared/src/components/Select';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import getGrupos from './GetGrupos';
import getCiclosEscolares from './getCiclosEscolares';
import getGrados from './GetGrados';

const getGradoName = (grados, id) => grados.find((g) => g.id === id)?.nombre || '';
const getCicloName = (ciclos, id) => ciclos.find((g) => g.id === id)?.nombre || '';

export default function GruposForm({
  setGrupos, setParametros, setNoti, fetchGrupos,
}) {
  const router = useRouter();
  const { query } = router;
  const [selectedCicloEscolar, setSelectedCicloEscolar] = useState('');
  const [selectedGrado, setSelectedGrado] = useState('');
  const [ciclos, setCiclos] = useState([]);
  const [grados, setGrados] = useState([]);
  const turnos = [null, 'Matutino', 'Vespertino', 'Nocturno', 'Mixto'];

  // Fetch ciclosEscolares and grados when component mounts or query.id changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ciclosEscolaresData = await getCiclosEscolares(query.id);
        const gradosData = await getGrados(query.id);

        const ciclosFiltered = ciclosEscolaresData;
        const ciclosSorted = ciclosFiltered
          .slice()
          .sort((a, b) => {
            if (a.nombre === 'EQUIV') return 1;
            if (b.nombre === 'EQUIV') return -1;
            return a.nombre.localeCompare(b.nombre);
          });

        setCiclos(ciclosSorted);
        setGrados(gradosData);
      } catch (error) {
        setNoti({
          open: true,
          message: 'Error al consultar los ciclos escolares',
          type: 'error',
        });
      }
    };

    if (query.id) fetchData();
  }, [query.id]);

  // Fetch grupos when cicloEscolar or grado changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gruposData = await getGrupos(selectedCicloEscolar, selectedGrado);
        setGrupos(
          gruposData?.map((grupo) => ({
            ...grupo,
            gradoNombre: getGradoName(grados, grupo.gradoId),
            turno: turnos[grupo.turnoId],
          })),
        );
        setParametros({
          cicloEscolarId: selectedCicloEscolar,
          cicloNombre: getCicloName(ciclos, selectedCicloEscolar),
          gradoId: selectedGrado,
          gradoNombre: getGradoName(grados, selectedGrado),
        });
      } catch (error) {
        setNoti({
          open: true,
          message: 'Error al consultar los grupos',
          type: 'error',
        });
      }
    };

    if (selectedCicloEscolar && selectedGrado) fetchData();
  }, [selectedGrado, fetchGrupos]);

  // Reset grado when ciclo changes
  useEffect(() => {
    setSelectedGrado('');
    setGrupos([]);
  }, [selectedCicloEscolar]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Select
          title="Ciclos Escolares"
          name="ciclosEscolares"
          value={selectedCicloEscolar}
          options={ciclos || []}
          onChange={(event) => setSelectedCicloEscolar(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          title="Grados"
          name="grados"
          value={selectedGrado}
          options={grados || []}
          onChange={(e) => setSelectedGrado(e.target.value)}
          disabled={!selectedCicloEscolar}
        />
      </Grid>
    </Grid>
  );
}

GruposForm.propTypes = {
  setNoti: PropTypes.func.isRequired,
  setGrupos: PropTypes.shape({
    id: PropTypes.number,
    cicloEscolarId: PropTypes.number,
    turnoId: PropTypes.number,
    gradoId: PropTypes.number,
    descripcion: PropTypes.string,
    generacion: PropTypes.string,
    generacionFechaInicio: PropTypes.string,
    generacionFechaFin: PropTypes.string,
  }).isRequired,
  setParametros: PropTypes.shape({
    id: PropTypes.number,
    cicloEscolarId: PropTypes.number,
    turnoId: PropTypes.number,
    gradoId: PropTypes.number,
    descripcion: PropTypes.string,
    generacion: PropTypes.string,
    generacionFechaInicio: PropTypes.string,
    generacionFechaFin: PropTypes.string,
  }).isRequired,
  fetchGrupos: PropTypes.bool.isRequired,
};
