import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {
  DefaultModal,
  ButtonStyled,
  validateField,
  Context,
} from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import errorDatosAsignaturas from '../../sections/errors/errorDatosAsignaturas';
import handleEdit from '../../submitEditAsignaturas';
import { TablesPlanEstudiosContext } from '../../Context/tablesPlanEstudiosProviderContext';
import { grados } from '../../Mocks/mockAsignaturas';
import SolicitudContext from '../../Context/solicitudContext';

export default function AsignaturasFormacionEditModal({
  open,
  hideModal,
  edit,
  rowItem,
}) {
  const {
    error,
    setError,
    programaId,
    formAsignaturasFormacion,
    setFormAsignaturasFormacion,
    setInitialValues,
    asignaturasTotalList,
    setAsignaturasFormacionList,
    setNoti,
  } = useContext(TablesPlanEstudiosContext);
  const { form } = useContext(SolicitudContext);
  const [selectedGrade, setSelectedGrade] = useState(grados.semestral);

  useEffect(() => {
    if (form) {
      const cicloIdMap = {
        1: grados.semestral,
        2: grados.cuatrimestral,
        3: grados.flexibleSemestral,
        4: grados.flexibleCuatrimestral,
        5: grados.optativa,
      };

      const selectedGradeValue = cicloIdMap[form[1].programa.cicloId] || grados.semestral;
      setSelectedGrade(selectedGradeValue);
    }
  }, [form]);

  const { setLoading } = useContext(Context);

  useEffect(() => {
    const rowItemValues = {
      id: rowItem.id,
      gradoId: rowItem.gradoId,
      nombre: rowItem.nombre,
      clave: rowItem.clave,
      creditos: rowItem.creditos,
      academia: rowItem.academia,
      seriacion: rowItem.seriacion,
      horasDocente: rowItem.horasDocente,
      horasIndependiente: rowItem.horasIndependiente,
    };
    setFormAsignaturasFormacion(rowItemValues);
  }, [rowItem]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAsignaturasFormacion((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    validateField(
      formAsignaturasFormacion,
      name,
      setError,
      errorDatosAsignaturas,
    );
  };

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
      programaId,
      1,
      setLoading,
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
