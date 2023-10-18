import { Grid } from '@mui/material';
import { getInstituciones, getPlantelesByInstitucion } from '@siiges-ui/instituciones';
import { ButtonStyled } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import React from 'react';
import FindInPageIcon from '@mui/icons-material/FindInPage';

export default function ProgramasForm() {
  const { instituciones } = getInstituciones();
  const { planteles } = getPlantelesByInstitucion();
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <BasicSelect
          title="Instituciones"
          name="instituciones"
          value=""
          options={instituciones}
          onchange={() => {}}
        />
      </Grid>
      <Grid item xs={4}>
        <BasicSelect
          title="Planteles"
          name="planteles"
          value=""
          options={[]}
          onchange={() => {}}
        />
      </Grid>
      <Grid item xs={4}>
        <ButtonStyled
          text="Mostrar registros"
          alt="Mostrar registros"
          type="success"
          icon={<FindInPageIcon />}
        />
      </Grid>
    </Grid>
  );
}
