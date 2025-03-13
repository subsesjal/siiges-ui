import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Select, Context } from '@siiges-ui/shared';
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
    <Grid container spacing={2} sx={{ m: 1 }}>
      <Typography variant="h6" sx={{ mt: 5 }}>
        Datos de la Solicitud
      </Typography>
      <Grid
        container
        rowSpacing={1}
        sx={{ my: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
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
      </Grid>
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
  }),
};
