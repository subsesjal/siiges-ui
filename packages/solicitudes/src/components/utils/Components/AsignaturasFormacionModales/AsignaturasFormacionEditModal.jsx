import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled, validateField } from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import errorDatosAsignaturas from '../../sections/errors/errorDatosAsignaturas';
import handleEdit from '../../submitEditAsignaturas';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import { grados } from '../../Mocks/mockAsignaturas';

export default function AsignaturasFormacionEditModal({
  open,
  hideModal,
  edit,
  rowItem,
}) {
  const {
    error,
    setError,
    formAsignaturasFormacion,
    setFormAsignaturasFormacion,
    setInitialValues,
    asignaturasTotalList,
    setAsignaturasFormacionList,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);
  const selectedGrade = grados.semestral;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAsignaturasFormacion((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    validateField(formAsignaturasFormacion, name, setError, errorDatosAsignaturas);
  };

  useEffect(() => {
    setFormAsignaturasFormacion(rowItem);
  }, [rowItem]);

  const handleOnSubmit = () => {
    const {
      createdAt, deletedAt, updatedAt, ...submissionData
    } = formAsignaturasFormacion;

    const matchingGrade = selectedGrade.find(
      (grade) => grade.id === submissionData.gradoId,
    );

    const updatedFormAsignaturas = matchingGrade
      ? { ...submissionData, grado: matchingGrade.nombre }
      : submissionData;

    handleEdit(
      updatedFormAsignaturas,
      setFormAsignaturasFormacion,
      setInitialValues,
      setAsignaturasFormacionList,
      hideModal,
      setNoti,
      rowItem.id,
      1,
    );
  };

  const cancelButtonText = edit === 'Consultar Asignatura' ? 'Cerrar' : 'Cancelar';

  return (
    <DefaultModal open={open} setOpen={hideModal} title={edit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BasicSelect
            title="Grado"
            name="gradoId"
            value={rowItem.gradoId ?? ''}
            options={selectedGrade}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.grado}
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
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.nombre}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="clave"
            label="Clave"
            name="clave"
            auto="clave"
            value={rowItem.clave}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.clave}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="creditos"
            label="Creditos"
            name="creditos"
            auto="creditos"
            value={rowItem.creditos}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.creditos}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            id="academia"
            label="Academia"
            name="academia"
            auto="academia"
            value={rowItem.academia}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.academia}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            title="Seriacion"
            name="seriacion"
            value={rowItem.seriacion}
            options={asignaturasTotalList || []}
            onchange={handleOnChange}
            disabled={edit === 'Consultar Asignatura'}
            textValue
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
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.horasIndependiente}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" marginTop={2}>
        <Grid item xs={2}>
          <ButtonStyled
            text={cancelButtonText}
            alt={cancelButtonText}
            design="error"
            onclick={hideModal}
          />
        </Grid>
        {edit !== 'Consultar Asignatura' && (
          <Grid item xs={2}>
            <ButtonStyled
              text="Confirmar"
              alt="Confirmar"
              onclick={handleOnSubmit}
            />
          </Grid>
        )}
      </Grid>
    </DefaultModal>
  );
}

AsignaturasFormacionEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  edit: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  rowItem: PropTypes.shape({
    id: PropTypes.number,
    gradoId: PropTypes.number,
    area: PropTypes.number,
    nombre: PropTypes.string,
    clave: PropTypes.string,
    creditos: PropTypes.string,
    academia: PropTypes.string,
    seriacion: PropTypes.string,
    horasDocente: PropTypes.number,
    horasIndependiente: PropTypes.number,
  }).isRequired,
};
