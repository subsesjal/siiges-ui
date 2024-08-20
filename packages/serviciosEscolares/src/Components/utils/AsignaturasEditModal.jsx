import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {
  DefaultModal, ButtonStyled, validateField,
} from '@siiges-ui/shared';
import BasicSelect from '@siiges-ui/shared/src/components/Select';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import errorDatosAsignaturas from '@siiges-ui/solicitudes/src/components/utils/sections/errors/errorDatosAsignaturas';
import handleEdit from '@siiges-ui/solicitudes/src/components/utils/submitEditAsignaturas';
import { area, grados } from '@siiges-ui/solicitudes/src/components/utils/Mocks/mockAsignaturas';

export default function AsignaturasEditModal({
  open,
  hideModal,
  edit,
  rowItem,
  programaId,
  asignaturasList,
  setAsignaturasList,
  setNoti,
  setLoading,
  cicloId,
}) {
  const [formAsignaturas, setFormAsignaturas] = useState({});
  const [error, setError] = useState({});
  const [selectedGrade, setSelectedGrade] = useState(grados.semestral);

  useEffect(() => {
    const cicloIdMap = {
      1: grados.semestral,
      2: grados.cuatrimestral,
      3: grados.flexibleSemestral,
      4: grados.flexibleCuatrimestral,
      5: grados.optativa,
    };

    const selectedGradeValue = cicloIdMap[cicloId] || grados.semestral;
    setSelectedGrade(selectedGradeValue);
  }, [cicloId]);

  useEffect(() => {
    const rowItemValues = {
      id: rowItem.id,
      gradoId: rowItem.gradoId,
      areaId: rowItem.areaId,
      nombre: rowItem.nombre,
      clave: rowItem.clave,
      creditos: rowItem.creditos,
      academia: rowItem.academia,
      seriacion: rowItem.seriacion,
      horasDocente: rowItem.horasDocente,
      horasIndependiente: rowItem.horasIndependiente,
    };
    setFormAsignaturas(rowItemValues);
  }, [rowItem]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormAsignaturas((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    validateField(formAsignaturas, name, setError, errorDatosAsignaturas);
  };

  const handleOnSubmit = () => {
    const {
      createdAt, deletedAt, updatedAt, ...submissionData
    } = formAsignaturas;

    const matchingGrade = selectedGrade.find(
      (grade) => grade.id === submissionData.gradoId,
    );

    const updatedFormAsignaturas = matchingGrade
      ? { ...submissionData, grado: matchingGrade.nombre }
      : submissionData;

    handleEdit(
      updatedFormAsignaturas,
      setFormAsignaturas,
      () => {},
      setAsignaturasList,
      hideModal,
      setNoti,
      programaId,
      1,
      setLoading,
    );
  };

  const cancelButtonText = edit === 'Consultar Asignatura' ? 'Regresar' : 'Cancelar';

  return (
    <DefaultModal open={open} setOpen={hideModal} title={edit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BasicSelect
            title="Grado"
            name="gradoId"
            value={formAsignaturas.gradoId}
            options={selectedGrade}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.gradoId}
            required
            disabled={edit === 'Consultar Asignatura'}
          />
        </Grid>
        <Grid item xs={6}>
          <BasicSelect
            title="Área"
            name="areaId"
            value={formAsignaturas.areaId}
            options={area}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            errorMessage={error.areaId}
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
            value={formAsignaturas.nombre}
            onchange={handleOnChange}
            onblur={handleOnBlur}
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
            value={formAsignaturas.clave}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.clave}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="creditos"
            label="Créditos"
            name="creditos"
            auto="creditos"
            value={formAsignaturas.creditos}
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
            value={formAsignaturas.academia}
            onchange={handleOnChange}
            onblur={handleOnBlur}
            required
            disabled={edit === 'Consultar Asignatura'}
            errorMessage={error.academia}
          />
        </Grid>
        <Grid item xs={12}>
          <BasicSelect
            title="Seriación"
            name="seriacion"
            value={formAsignaturas.seriacion || ''}
            options={[{ value: '', label: '' }, ...(asignaturasList || [])]}
            onchange={handleOnChange}
            textValue
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="horasDocente"
            label="Horas docente"
            name="horasDocente"
            auto="horasDocente"
            value={formAsignaturas.horasDocente}
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
            value={formAsignaturas.horasIndependiente}
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
              text="Guardar"
              alt="Guardar"
              onclick={handleOnSubmit}
            />
          </Grid>
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
    id: PropTypes.number,
    gradoId: PropTypes.number,
    areaId: PropTypes.number,
    cicloId: PropTypes.number,
    nombre: PropTypes.string,
    clave: PropTypes.string,
    creditos: PropTypes.number,
    academia: PropTypes.string,
    seriacion: PropTypes.string,
    horasDocente: PropTypes.number,
    horasIndependiente: PropTypes.number,
  }).isRequired,
  programaId: PropTypes.number.isRequired,
  asignaturasList: PropTypes.array.isRequired,
  setAsignaturasList: PropTypes.func.isRequired,
  setNoti: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  cicloId: PropTypes.number.isRequired,
};
