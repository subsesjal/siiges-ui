import React from 'react';
import { Grid } from '@mui/material';
import { BinarySelect, ButtonSimple, Input } from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

export default function MatriculaActivaForm({
  formData, onChange, onSearch, setBusquedaGeneral, busquedaGeneral,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <BinarySelect
          id="busquedaGeneral"
          name="busquedaGeneral"
          title="Tipo de Búsqueda"
          value={busquedaGeneral}
          onChange={(e) => {
            setBusquedaGeneral(e.target.value === 1);
          }}
          options={[
            { id: 0, nombre: 'Busqueda General' },
            { id: 1, nombre: 'Busqueda por Programa' },
          ]}
        />
      </Grid>

      {!busquedaGeneral ? (
        <Grid item xs={5}>
          <Input
            id="busquedaGeneralTexto"
            name="busquedaGeneralTexto"
            label="Búsqueda"
            value={formData.busquedaGeneralTexto || ''}
            onChange={onChange}
          />
        </Grid>
      ) : (
        <>
          <Grid item xs={9}>
            <Input
              id="institucion"
              name="institucion"
              label="Institución"
              value={formData.institucion || ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              id="plantel"
              name="plantel"
              label="Plantel"
              value={formData.plantel || ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              id="programa"
              name="programa"
              label="Programa"
              value={formData.programa || ''}
              onChange={onChange}
            />
          </Grid>
        </>
      )}

      <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonSimple
          text="Buscar"
          onClick={onSearch}
          design="buscar"
          fullWidth
        >
          <SearchIcon />
        </ButtonSimple>
      </Grid>
    </Grid>
  );
}

MatriculaActivaForm.propTypes = {
  formData: PropTypes.shape({
    programa: PropTypes.string,
    institucion: PropTypes.string,
    plantel: PropTypes.string,
    busquedaGeneralTexto: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  busquedaGeneral: PropTypes.bool.isRequired,
  setBusquedaGeneral: PropTypes.func.isRequired,
};
