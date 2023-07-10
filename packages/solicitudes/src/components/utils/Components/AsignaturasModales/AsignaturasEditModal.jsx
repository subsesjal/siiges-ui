import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import errorDatosAsignaturas from '../../sections/errors/errorDatosAsignaturas';
import handleEdit from '../../submitEditAsignaturas';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import { area, grados } from '../../Mocks/mockAsignaturas';

export default function AsignaturasEditModal({
  open,
  hideModal,
  edit,
  rowItem,
}) {
  const {
    initialValues,
    error,
    setError,
    errors,
    formAsignaturas,
    setFormAsignaturas,
    setInitialValues,
    setAsignaturasList,
    id,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);

  useEffect(() => {
    setFormAsignaturas(rowItem);
  }, [rowItem]);

  const selectedGrade = grados.semestral;
  const errorsAsignatura = errorDatosAsignaturas(formAsignaturas, setError, error);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAsignaturas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const initialValue = initialValues[name];

    if (value !== initialValue || value === '') {
      errorsAsignatura[name]();
    }
  };

  const handleInputFocus = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleOnSubmit = () => {
    handleEdit(
      formAsignaturas,
      setFormAsignaturas,
      setInitialValues,
      setAsignaturasList,
      hideModal,
      errors,
      setNoti,
      id,
      1,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={edit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BasicSelect
            title="Grado"
            name="grado"
            value={rowItem.grado ?? ''}
            options={selectedGrade}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.grado}
            textValue
            required
            disabled={edit === 'Consultar Asignatura'}
          />
        </Grid>
        <Grid item xs={6}>
          <BasicSelect
            title="Area"
            name="area"
            value={rowItem.area ?? ''}
            options={area}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.area}
            required
            disabled={edit === 'Consultar Asignatura'}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="nombre"
            label="Nombre(s)"
            name="nombre"
            auto="nombre"
            value={rowItem.nombre}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.nombre}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="clave"
            label="Clave"
            name="clave"
            auto="clave"
            value={rowItem.clave}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.clave}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="creditos"
            label="Creditos"
            name="creditos"
            auto="creditos"
            value={rowItem.creditos}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.creditos}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="formacionEspecializada"
            label="Formacion especializada"
            name="formacionEspecializada"
            auto="formacionEspecializada"
            value={rowItem.formacionEspecializada}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.formacionEspecializada}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="seriacion"
            label="Seriacion"
            name="seriacion"
            auto="seriacion"
            value={rowItem.seriacion}
            onchange={handleOnChange}
            onfocus={handleInputFocus}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="horasDocente"
            label="Horas docente"
            name="horasDocente"
            auto="horasDocente"
            value={rowItem.horasDocente}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.horasDocente}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="horasIndependiente"
            label="Horas independiente"
            name="horasIndependiente"
            auto="horasIndependiente"
            value={rowItem.horasIndependiente}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.horasIndependiente}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <ButtonStyled
          text={edit === 'Consultar Asignatura' ? 'Cerrar' : 'Cancelar'}
          alt={edit === 'Consultar Asignatura' ? 'Cerrar' : 'Cancelar'}
          design="error"
          onclick={hideModal}
        >
          {edit === 'Consultar Asignatura' ? 'Cerrar' : 'Cancelar'}
        </ButtonStyled>
        {edit !== 'Consultar Asignatura' && (
          <ButtonStyled
            text="Confirmar"
            alt="Confirmar"
            onclick={handleOnSubmit}
          >
            Confirmar
          </ButtonStyled>
        )}
      </Grid>
    </DefaultModal>
  );
}

AsignaturasEditModal.propTypes = {
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
};
