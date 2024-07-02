import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import {
  DefaultModal, ButtonStyled, Context, Select,
  getData,
} from '@siiges-ui/shared';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import handleEdit from '../../submitEditInfraestructuras';
import PlantelContext from '../../Context/plantelContext';
import errorDatosInfraestructuras from '../../sections/errors/errorDatosInfraestructuras';
import getAsignaturas from '../../getAsignaturas';

export default function InfraestructuraEditModal({
  open,
  hideModal,
  edit,
  id,
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
  const disabled = edit === 'Consultar Infraestructura';
  const { setNoti, setLoading } = useContext(Context);
  const { plantelId } = useContext(PlantelContext);
  const { asignaturasTotal } = getAsignaturas(programaId);

  useEffect(() => {
    if (plantelId && id && programaId) {
      const endpoint = `/planteles/${plantelId}/infraestructuras/${id}`;

      const fetchData = async () => {
        try {
          const data = await getData({ endpoint, query: '' });
          if (data && data.data) {
            const infraestructuraValues = {
              id: data.data.id,
              plantelId: data.data.plantelId,
              programaId: data.data.programaId,
              tipoInstalacionId: data.data.tipoInstalacionId,
              nombre: data.data.nombre,
              ubicacion: data.data.ubicacion,
              capacidad: data.data.capacidad,
              metros: data.data.metros,
              recursos: data.data.recursos,
              asignaturasInfraestructura: data.data.asignaturasInfraestructura?.map(
                (asignatura) => asignatura.asignaturaId,
              ),
            };
            setFormInfraestructuras(infraestructuraValues);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, [plantelId, programaId, id, setFormInfraestructuras]);

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
    setFormInfraestructuras((prevData) => {
      const newData = { ...prevData };
      if (name === 'tipoInstalacionId' && value === 1) {
        newData.programaId = programaId;
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

  const handleOnSubmit = () => {
    handleEdit(
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

  return (
    <DefaultModal open={open} setOpen={hideModal} title={edit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Select
            title="Instalación"
            name="tipoInstalacionId"
            value={formInfraestructuras.tipoInstalacionId}
            options={instalacion}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.tipoInstalacionId}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre"
            name="nombre"
            auto="nombre"
            value={formInfraestructuras.nombre}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.nombre}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="capacidad"
            label="Capacidad"
            name="capacidad"
            auto="capacidad"
            value={formInfraestructuras.capacidad}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.capacidad}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="metros"
            label="Metros cuadrados"
            name="metros"
            auto="metros"
            value={formInfraestructuras.metros}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            errorMessage={error.metros}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="ubicacion"
            label="Ubicación"
            name="ubicacion"
            auto="ubicacion"
            value={formInfraestructuras.ubicacion}
            onchange={handleOnChange}
            errorMessage={error.ubicacion}
            required
            disabled={disabled}
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
            value={formInfraestructuras.recursos}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            helperText={error.recursos}
            error={!!error.recursos}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            title="Asignatura que atiende"
            name="asignaturasInfraestructura"
            multiple
            value={formInfraestructuras.asignaturasInfraestructura || []}
            options={asignaturasTotal}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.asignaturasInfraestructura}
            required
            disabled={disabled}
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
  id: PropTypes.number.isRequired,
  programaId: PropTypes.number.isRequired,
};
