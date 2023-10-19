import { Grid } from '@mui/material';
import { getInstituciones, getPlantelesByInstitucion } from '@siiges-ui/instituciones';
import { ButtonIcon } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import React, { useState, useEffect } from 'react';
import FindInPageIcon from '@mui/icons-material/FindInPage';

export default function ProgramasForm() {
  const [selectedInstitucion, setSelectedInstitucion] = useState("");
  const [planteles, setPlanteles] = useState([]);
  const [isPlantelesDisabled, setIsPlantelesDisabled] = useState(true);

  const { instituciones } = getInstituciones();

  console.log(getPlantelesByInstitucion);

  useEffect(() => {
    if (selectedInstitucion) {
      console.log(selectedInstitucion);
      const { planteles } = getPlantelesByInstitucion(selectedInstitucion);
      setPlanteles(planteles);
      setIsPlantelesDisabled(false);
    } else {
      setPlanteles([]);
      setIsPlantelesDisabled(true);
    }
  }, [selectedInstitucion]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <BasicSelect
          title="Instituciones"
          name="instituciones"
          value={selectedInstitucion}
          options={instituciones}
          onchange={(event) => setSelectedInstitucion(event.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <BasicSelect
          title="Planteles"
          name="planteles"
          value=""
          options={planteles}
          onchange={() => { }}
          disabled={isPlantelesDisabled}
        />
      </Grid>
      <Grid item xs={4}>
        <ButtonIcon
          text="Mostrar registros"
          onclick={() => { }}
          icon={<FindInPageIcon />}
          disabled
        />
      </Grid>
    </Grid>
  );
}
