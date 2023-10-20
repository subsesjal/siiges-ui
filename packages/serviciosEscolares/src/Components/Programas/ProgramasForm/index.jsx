import { Grid } from '@mui/material';
import { getInstituciones, getPlantelesByInstitucion, getProgramas } from '@siiges-ui/instituciones';
import { Select } from '@siiges-ui/shared';
import React, { useState, useEffect } from 'react';

export default function ProgramasForm({ setProgramas }) {
  const [selectedInstitucion, setSelectedInstitucion] = useState('');
  const [selectedPlantel, setSelectedPlantel] = useState('');
  const [planteles, setPlanteles] = useState([]);
  const [isPlantelesDisabled, setIsPlantelesDisabled] = useState(true);

  const { instituciones } = getInstituciones();

  useEffect(() => {
    if (selectedInstitucion) {
      getPlantelesByInstitucion(selectedInstitucion, (error, data) => {
        if (error) {
          console.error("Failed to fetch planteles:", error);
          setPlanteles([]);
          setIsPlantelesDisabled(true);
        } else {
          const transformedPlanteles = data.planteles.map(plantel => ({
            id: plantel.id,
            nombre: `${plantel.domicilio.calle} ${plantel.domicilio.numeroExterior}`
          }));
          setPlanteles(transformedPlanteles);
          setIsPlantelesDisabled(false);
        }
      });
    } else {
      setPlanteles([]);
      setIsPlantelesDisabled(true);
    }
    if (selectedPlantel) {
      getProgramas(selectedPlantel, (error, data) => {
        if (error) {
          console.error("Failed to fetch programas:", error);
          setProgramas([]);
        } else {
          setProgramas(data.programas);
        }
      });
    }
  }, [selectedInstitucion, selectedPlantel]);


  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Select
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={instituciones}
          onchange={(event) => setSelectedInstitucion(event.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          title="Planteles"
          name="planteles"
          value={selectedPlantel}
          options={planteles || []}
          onchange={(event) => setSelectedPlantel(event.target.value)}
          disabled={isPlantelesDisabled}
        />
      </Grid>
    </Grid>
  );
}
