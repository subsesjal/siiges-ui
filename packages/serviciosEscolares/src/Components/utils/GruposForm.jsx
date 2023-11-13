import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Select from '@siiges-ui/shared/src/components/Select';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import useGrupos from '../Programas/ProgramasSections/useGrupos';
import getCiclosEscolares from './getCiclosEscolares';
import getGrados from './GetGrados';

export default function GruposForm({ setGrupos, setParametros }) {
  const router = useRouter();
  const { query } = router;
  const [selectedCicloEscolar, setSelectedCicloEscolar] = useState('');
  const [selectedGrado, setSelectedGrado] = useState('');
  const [ciclos, setCiclos] = useState([]);
  const turnos = [null, 'Matutino', 'Vespertino', 'Nocturno', 'Mixto'];
  const { grados } = getGrados(query.id);

  const { grupos } = useGrupos(selectedCicloEscolar, selectedGrado);
  const getGradoNameFunction = (id) => {
    const gradoNombre = grados.find((grado) => grado.id === id);
    return gradoNombre?.nombre;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ciclosEscolaresData = await getCiclosEscolares(query.id);
        setCiclos(ciclosEscolaresData);
      } catch (error) {
        console.error('Error fetching ciclos escolares:', error);
      }
    };

    fetchData();
  }, []);
  // Cuando los grupos cambien debido al custom hook, actualizamos el estado que se pasa como prop
  useEffect(() => {
    setGrupos(
      grupos?.map((grupo) => ({
        ...grupo,
        gradoNombre: getGradoNameFunction(grupo.gradoId),
        turno: turnos[grupo.turnoId],
      })),
    );
    setParametros({
      cicloEscolarId: selectedCicloEscolar,
      gradoId: selectedGrado,
      gradoNombre: getGradoNameFunction(selectedGrado),
    });
  }, [grupos, setGrupos]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Select
          title="Ciclos Escolares"
          name="ciclosEscolares"
          value={selectedCicloEscolar}
          options={ciclos || []}
          onchange={(event) => setSelectedCicloEscolar(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          title="Grados"
          name="grados"
          value={selectedGrado}
          options={grados || []}
          onchange={(e) => setSelectedGrado(e.target.value)}
          disabled={!selectedCicloEscolar}
        />
      </Grid>
    </Grid>
  );
}

GruposForm.propTypes = {
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
};
