import React, { useContext, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { DefaultModal, ButtonStyled, Context } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import handleEdit from '../../submitEditAsignaturas';
import PlantelContext from '../../Context/plantelContext';
import errorDatosInfraestructuras from '../../sections/errors/errorDatosInfraestructuras';
import getAsignaturas from '../../getAsignaturas';

export default function InfraestructuraEditModal({
  open,
  hideModal,
  edit,
  rowItem,
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
  } = useContext(PlantelContext);

  const { setNoti } = useContext(Context);
  const { query } = useRouter();
  const asignaturas = getAsignaturas(programaId);

  const instalacion = [
    { id: 1, nombre: 'Aula' },
    { id: 2, nombre: 'Cubiculo' },
    { id: 3, nombre: 'Auditorio' },
    { id: 4, nombre: 'Laboratorio fisico' },
    { id: 5, nombre: 'Laboratorio virtual' },
    { id: 6, nombre: 'Taller fisico' },
    { id: 7, nombre: 'Taller virtual' },
    { id: 8, nombre: 'Laboratorio de computo' },
    { id: 9, nombre: 'Biblioteca fisica' },
    { id: 10, nombre: 'Biblioteca virtual' },
    { id: 11, nombre: 'Otros' },
    { id: 12, nombre: 'Area administrativa' },
    { id: 13, nombre: 'Archivo muerto' },
  ];

  useEffect(() => {
    setFormInfraestructuras(rowItem);
  }, [rowItem]);

  const errorsInfraestructura = errorDatosInfraestructuras(
    formInfraestructuras,
    setError,
    error,
  );

  useEffect(() => {
    if (errorsInfraestructura !== undefined) {
      setErrors(errorsInfraestructura);
    }
  }, [error]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormInfraestructuras((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleOnSubmit = () => {
    handleEdit(
      formInfraestructuras,
      setFormInfraestructuras,
      setInitialValues,
      setInfraestructuras,
      hideModal,
      errors,
      setNoti,
      query.plantel,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={edit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BasicSelect
            title="Instalación"
            name="tipoInstalacionId"
            value=""
            options={instalacion}
            onchange={handleOnChange}
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
            onchange={handleOnChange}
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
            onchange={handleOnChange}
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
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.metros}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="ubicacion"
            label="Ubicacion"
            name="ubicacion"
            auto="ubicacion"
            onchange={handleOnChange}
            errorMessage={error.ubicacion}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="recursos"
            name="recursos"
            label="Recursos materiales"
            rows={4}
            sx={{ width: '100%' }}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleInputFocus}
            helperText={error.recursos}
            error={!!error.recursos}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            title="Asignatura que atiende"
            name="asignaturaInfraestructura"
            multiple
            value={[]}
            options={asignaturas.asignaturas}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.asignaturaInfraestructura}
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

InfraestructuraEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  edit: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  rowItem: PropTypes.shape({
    grado: PropTypes.string,
    area: PropTypes.number,
    nombre: PropTypes.string,
    clave: PropTypes.string,
    creditos: PropTypes.string,
    formacionEspecializada: PropTypes.string,
    seriacion: PropTypes.string,
    horasDocente: PropTypes.number,
    horasIndependiente: PropTypes.number,
  }).isRequired,
  programaId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]).isRequired,
};
