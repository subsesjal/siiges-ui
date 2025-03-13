import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Select, Context, Input } from '@siiges-ui/shared';
import React, { useContext, useState, useEffect } from 'react';
import { fetchCiclosData } from '../../../utils';

export default function DatosSolicitud({
  programa, setReqData, formData, disabled,
}) {
  const { setNoti, setLoading } = useContext(Context);
  const [ciclos, setCiclos] = useState([]);

  useEffect(() => {
    fetchCiclosData(setNoti, setLoading, setCiclos, programa.id);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReqData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mt: 5 }}>
          Datos de la Solicitud
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Ciclos Escolares"
          name="cicloEscolarId"
          value={formData?.cicloEscolarId}
          options={ciclos}
          onChange={handleChange}
          disabled={disabled}
        />
      </Grid>
      {formData.observaciones !== '' && (
      <Grid item xs={12} sx={{ mr: 3 }}>
        <Input id="observaciones" label="Observaciones" name="observaciones" value={formData.observaciones} multiline rows={4} disabled />
      </Grid>
      )}
    </Grid>
  );
}

DatosSolicitud.defaultProps = {
  formData: {} || null,
};

DatosSolicitud.propTypes = {
  setReqData: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  programa: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  formData: PropTypes.shape({
    cicloEscolarId: PropTypes.number,
    observaciones: PropTypes.string,
  }),
};
