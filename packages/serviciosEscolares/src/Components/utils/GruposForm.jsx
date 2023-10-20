import { Grid } from '@mui/material';
import Select from '@siiges-ui/shared/src/components/Select';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getCiclosEscolares from './getCiclosEscolares';

export default function GruposForm({ setGrupos }) {
  const router = useRouter();
  const { query } = router;
  const [selectedCicloEscolar, setSelectedCicloEscolar] = useState('');
  const [selectedGrado, setSelectedGrado] = useState('');
  const [grado, setGrado] = useState([]);
  const [isGradoDisabled, setIsGradoDisabled] = useState(true);

  const { ciclosEscolares } = getCiclosEscolares(query.id);

  console.log(ciclosEscolares);

  useEffect(() => {
    if (selectedCicloEscolar) {
      getGradoByInstitucion(selectedCicloEscolar, (error, data) => {
        if (error) {
          console.error("Failed to fetch grado:", error);
          setGrado([]);
          setIsGradoDisabled(true);
        } else {
          const transformedGrado = data.grado.map(Grado => ({
            id: Grado.id,
            nombre: `${Grado.domicilio.calle} ${Grado.domicilio.numeroExterior}`
          }));
          setGrado(transformedGrado);
          setIsGradoDisabled(false);
        }
      });
    } else {
      setGrado([]);
      setIsGradoDisabled(true);
    }
    if (selectedGrado) {
      getGrupos(selectedGrado, (error, data) => {
        if (error) {
          console.error("Failed to fetch grupos:", error);
          setGrupos([]);
        } else {
          setGrupos(data.Grupos);
        }
      });
    }
  }, [selectedCicloEscolar, selectedGrado]);


  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Select
          title="Ciclos Escolares"
          name="ciclosEscolares"
          value={selectedCicloEscolar}
          options={[]}
          onchange={(event) => setSelectedCicloEscolar(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          title="Grados"
          name="grados"
          value={selectedGrado}
          options={grado || []}
          onchange={(event) => setSelectedGrado(event.target.value)}
          disabled={isGradoDisabled}
        />
      </Grid>
    </Grid>
  );
}
