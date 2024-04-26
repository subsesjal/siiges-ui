import React, { useEffect, useContext } from 'react';
import { Grid } from '@mui/material';
import {
  DefaultModal, ButtonStyled, Context, Input,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import errorDatosInstitucionAledanas from '../../sections/errors/errorDatosInstitucionAledanas';
import handleCreate from '../../submitNewInstitucionAledanas';
import PlantelContext from '../../Context/plantelContext';

export default function InstitucionesAledanasCreateModal({
  open,
  hideModal,
  title,
}) {
  const {
    setInstitucionesAledanas,
    formInstitucionesAledanas,
    setFormInstitucionesAledanas,
    setError,
    error,
    errors,
    setErrors,
    initialValues,
    setInitialValues,
    plantelId,
  } = useContext(PlantelContext);
  const { setNoti, setLoading } = useContext(Context);

  const errorsInstitucionesAledanas = errorDatosInstitucionAledanas(
    formInstitucionesAledanas,
    setError,
    error,
  );

  useEffect(() => {
    if (errorsInstitucionesAledanas !== undefined) {
      setErrors(errorsInstitucionesAledanas);
    }
  }, [error]);

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tiempo' && !value.endsWith(':00')) {
      setFormInstitucionesAledanas((prevData) => ({
        ...prevData,
        [name]: `${value}:00`,
      }));
    } else {
      setFormInstitucionesAledanas((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errorsInstitucionesAledanas[name]();
    }
  };

  const handleOnSubmit = () => {
    handleCreate(
      formInstitucionesAledanas,
      setFormInstitucionesAledanas,
      setInitialValues,
      setInstitucionesAledanas,
      hideModal,
      errors,
      setNoti,
      plantelId,
      setLoading,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre(s)"
            name="nombre"
            auto="nombre"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.nombre}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="tiempo"
            label="Tiempo"
            name="tiempo"
            auto="tiempo"
            type="time"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.tiempo}
            required
          />
        </Grid>
        <Grid item>
          <ButtonStyled
            text="Cancelar"
            alt="Cancelar"
            design="error"
            onclick={hideModal}
          />
        </Grid>
        <Grid item>
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={handleOnSubmit}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

InstitucionesAledanasCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
};
