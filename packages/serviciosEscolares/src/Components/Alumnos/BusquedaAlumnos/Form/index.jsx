import { Grid } from '@mui/material';
import { ButtonSimple, Context, Input } from '@siiges-ui/shared';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

const SINGLE_FIELDS = ['curp', 'matricula'];

const isValidSearch = (formData) => {
  const filled = Object.entries(formData).filter(
    ([, value]) => value && value.trim() !== '',
  );
  const hasSingleField = filled.some(([key]) => SINGLE_FIELDS.includes(key));
  return hasSingleField || filled.length >= 2;
};

export default function BusquedaAlumnosForm({ formData, onChange, onSearch }) {
  const { setNoti } = useContext(Context);

  const handleSearch = () => {
    if (!isValidSearch(formData)) {
      setNoti({
        open: true,
        type: 'warning',
        message: 'Ingresa al menos 2 datos, o bien la CURP o Matrícula completa.',
      });
      return;
    }
    onSearch();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Input
          id="nombre"
          name="nombre"
          label="Nombre"
          value={formData.nombre || ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="apellidoPaterno"
          name="apellidoPaterno"
          label="Apellido Paterno"
          value={formData.apellidoPaterno || ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="apellidoMaterno"
          name="apellidoMaterno"
          label="Apellido Materno"
          value={formData.apellidoMaterno || ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="curp"
          name="curp"
          label="CURP"
          value={formData.curp || ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="claveCentroTrabajo"
          name="claveCentroTrabajo"
          label="Clave Centro Trabajo"
          value={formData.claveCentroTrabajo || ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="matricula"
          name="matricula"
          label="Matricula"
          value={formData.matricula || ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonSimple
          text="Buscar"
          onClick={handleSearch}
          design="buscar"
          fullWidth
        >
          <SearchIcon />
        </ButtonSimple>
      </Grid>
    </Grid>
  );
}

BusquedaAlumnosForm.propTypes = {
  formData: PropTypes.shape({
    nombre: PropTypes.string,
    apellidoPaterno: PropTypes.string,
    apellidoMaterno: PropTypes.string,
    curp: PropTypes.string,
    claveCentroTrabajo: PropTypes.string,
    matricula: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
