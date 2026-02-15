import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import {
  DefaultModal, ButtonSimple, useUI, Input,
  InputTime,
  usePlantel,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import errorDatosInstitucionAledanas from '../../sections/errors/errorDatosInstitucionAledanas';
import handleCreate from '../../submitNewInstitucionAledanas';

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
  } = usePlantel();
  const { setNoti, setLoading } = useUI();

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
    if (name === 'tiempo') {
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
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.nombre}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputTime
            id="tiempo"
            label="Tiempo en llegar (hh:mm)"
            name="tiempo"
            auto="tiempo"
            ampm={false}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.tiempo}
            required
          />
        </Grid>
        <Grid item>
          <ButtonSimple
            text="Cancelar"
            design="cancel"
            onClick={hideModal}
          />
        </Grid>
        <Grid item>
          <ButtonSimple
            text="Guardar"
            onClick={handleOnSubmit}
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
