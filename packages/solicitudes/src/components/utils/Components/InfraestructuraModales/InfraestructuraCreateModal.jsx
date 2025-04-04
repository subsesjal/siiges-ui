import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@mui/material';
import {
  DefaultModal, Context, Select,
  ButtonsForm,
} from '@siiges-ui/shared';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import errorDatosInfraestructuras from '../../sections/errors/errorDatosInfraestructuras';
import handleCreate from '../../submitNewInfraestructuras';
import PlantelContext from '../../Context/plantelContext';
import getAsignaturas from '../../getAsignaturas';

export default function InfraestructuraCreateModal({
  open,
  hideModal,
  title,
  programaId,
}) {
  const {
    setInfraestructuras,
    formInfraestructuras,
    setFormInfraestructuras,
    setError,
    error,
    errors,
    setErrors,
    initialValues,
    setInitialValues,
    plantelId,
  } = useContext(PlantelContext);

  const [tipoInstalacion, setTipoInstalacion] = useState('');
  const [asignaturasDisabled, setAsignaturasDisabled] = useState(false);

  useEffect(() => {
    setFormInfraestructuras({});
  }, []);

  const { setNoti, setLoading } = useContext(Context);
  const { asignaturasTotal } = getAsignaturas(programaId);

  const errorsInfraestructura = errorDatosInfraestructuras(
    formInfraestructuras,
    setError,
    error,
  );

  const instalacion = [
    { id: 1, nombre: 'Aula' },
    { id: 2, nombre: 'Cubículo' },
    { id: 3, nombre: 'Auditorio' },
    { id: 4, nombre: 'Laboratorio físico' },
    { id: 5, nombre: 'Laboratorio virtual' },
    { id: 6, nombre: 'Taller físico' },
    { id: 7, nombre: 'Taller virtual' },
    { id: 8, nombre: 'Laboratorio de cómputo' },
    { id: 9, nombre: 'Biblioteca física' },
    { id: 10, nombre: 'Biblioteca virtual' },
    { id: 11, nombre: 'Otros' },
    { id: 12, nombre: 'Área administrativa' },
    { id: 13, nombre: 'Archivo muerto' },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormInfraestructuras((prevData) => {
      const newData = { ...prevData };

      if (name === 'tipoInstalacionId') {
        setTipoInstalacion(value);
        if (value === 1) {
          newData.programaId = programaId;
          setAsignaturasDisabled(false);
        } else {
          newData.asignaturasInfraestructura = [0];
          setAsignaturasDisabled(true);
        }
      }

      if (name === 'asignaturasInfraestructura') {
        const newValue = Array.isArray(value) ? value : [value];
        newData.asignaturasInfraestructura = newValue;
      } else {
        newData[name] = value;
      }

      return newData;
    });
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errorsInfraestructura[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (errorsInfraestructura !== undefined) {
      setErrors(errorsInfraestructura);
    }
  }, [error]);

  const handleOnSubmit = () => {
    handleCreate(
      formInfraestructuras,
      setFormInfraestructuras,
      setInitialValues,
      setInfraestructuras,
      hideModal,
      errors,
      setNoti,
      plantelId,
      setLoading,
    );
  };

  const adjustedAsignaturasOptions = tipoInstalacion !== 1
    ? [{ id: 0, nombre: 'Uso común' }, ...asignaturasTotal]
    : asignaturasTotal;

  return (
    <DefaultModal open={open} setOpen={hideModal} title={title}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BasicSelect
            title="Instalación"
            name="tipoInstalacionId"
            value={tipoInstalacion}
            options={instalacion}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.tipoInstalacionId}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre"
            name="nombre"
            auto="nombre"
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.nombre}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="capacidad"
            label="Capacidad"
            name="capacidad"
            auto="capacidad"
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.capacidad}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="metros"
            label="Metros cuadrados"
            name="metros"
            auto="metros"
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.metros}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="ubicacion"
            label="Ubicación"
            name="ubicacion"
            auto="ubicacion"
            onChange={handleOnChange}
            errorMessage={error.ubicacion}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="recursos"
            name="recursos"
            label="Recursos materiales"
            rows={4}
            multiline
            sx={{ width: '100%' }}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            helperText={error.recursos}
            error={!!error.recursos}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            title="Asignatura que atiende"
            name="asignaturasInfraestructura"
            multiple
            options={adjustedAsignaturasOptions}
            onChange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.asignaturasInfraestructura}
            required
            value={formInfraestructuras.asignaturasInfraestructura || []}
            disabled={asignaturasDisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm confirm={handleOnSubmit} cancel={hideModal} />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

InfraestructuraCreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  programaId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]).isRequired,
};
