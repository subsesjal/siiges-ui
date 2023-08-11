import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { DefaultModal, ButtonStyled, Context } from '@siiges-ui/shared';
import Input from '@siiges-ui/shared/src/components/Input';
import PropTypes from 'prop-types';
import errorDatosDiligencias from '../../sections/errors/errorDatosDiligencias';
import handleEdit from '../../submitEditDiligencias';
import DatosGeneralesContext from '../../Context/datosGeneralesContext';

export default function DiligenciasEditModal({
  open,
  hideModal,
  edit,
  rowItem,
}) {
  const {
    initialValues,
    error,
    setError,
    formDiligencias,
    setFormDiligencias,
    setInitialValues,
    setDiligencias,
  } = useContext(DatosGeneralesContext);

  const { setNoti } = useContext(Context);

  const errorsAsignatura = errorDatosDiligencias(
    formDiligencias,
    setError,
    error,
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDiligencias((prevData) => {
      if (
        name === 'nombre'
        || name === 'apellidoPaterno'
        || name === 'apellidoMaterno'
        || name === 'tituloCargo'
        || name === 'correo_primario'
        || name === 'telefono'
        || name === 'celular'
      ) {
        return {
          ...prevData,
          persona: {
            ...prevData.persona,
            [name]: value,
          },
        };
      } if (name === 'horaInicio' || name === 'horaFin') {
        const timeArray = value.split(':');
        const date = new Date();
        date.setHours(parseInt(timeArray[0], 10));
        date.setMinutes(parseInt(timeArray[1], 10));

        return {
          ...prevData,
          [name]: date,
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
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
      formDiligencias,
      setInitialValues,
      setDiligencias,
      hideModal,
      setNoti,
      rowItem.id,
    );
  };

  return (
    <DefaultModal open={open} setOpen={hideModal} title={edit}>
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
            required
            value={rowItem.persona.nombre ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            errorMessage={error.nombre}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="apellidoPaterno"
            label="Apellido Paterno"
            name="apellidoPaterno"
            auto="apellidoPaterno"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            value={rowItem.persona.apellidoPaterno ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            errorMessage={error.apellidoPaterno}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="apellidoMaterno"
            label="Apellido Materno"
            name="apellidoMaterno"
            auto="apellidoMaterno"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            value={rowItem.persona.apellidoMaterno ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            errorMessage={error.apellidoMaterno}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="tituloCargo"
            label="Cargo"
            name="tituloCargo"
            auto="tituloCargo"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            value={rowItem.persona.tituloCargo ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            errorMessage={error.tituloCargo}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="correo_primario"
            label="Correo"
            name="correo_primario"
            auto="correo_primario"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            value={rowItem.persona.correo_primario ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            errorMessage={error.correo_primario}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="telefono"
            label="Telefono"
            name="telefono"
            auto="telefono"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            value={rowItem.persona.telefono ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            errorMessage={error.telefono}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            id="celular"
            label="Celular"
            name="celular"
            auto="celular"
            onchange={handleOnChange}
            onfocus={handleInputFocus}
            value={rowItem.persona.celular ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="horaInicio"
            label="Hora Inicio"
            name="horaInicio"
            auto="horaInicio"
            type="time"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            value={rowItem.horaInicio ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            errorMessage={error.horaInicio}
          />
        </Grid>
        <Grid item xs={3}>
          <Input
            id="horaFin"
            label="Hora Fin"
            name="horaFin"
            auto="horaFin"
            type="time"
            onchange={handleOnChange}
            onblur={handleOnBlur}
            onfocus={handleInputFocus}
            required
            value={rowItem.horaFin ?? ''}
            disabled={edit === 'Consultar Diligencia'}
            errorMessage={error.horaFin}
          />
        </Grid>
        <Grid container justifyContent="flex-end" marginTop={2}>
          <ButtonStyled
            text={edit === 'Consultar Diligencia' ? 'Cerrar' : 'Cancelar'}
            alt={edit === 'Consultar Diligencia' ? 'Cerrar' : 'Cancelar'}
            design="error"
            onclick={hideModal}
          >
            {edit === 'Consultar Diligencia' ? 'Cerrar' : 'Cancelar'}
          </ButtonStyled>
          {edit !== 'Consultar Diligencia' && (
            <ButtonStyled
              text="Confirmar"
              alt="Confirmar"
              onclick={handleOnSubmit}
            >
              Confirmar
            </ButtonStyled>
          )}
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

DiligenciasEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  edit: PropTypes.string.isRequired,
  hideModal: PropTypes.func.isRequired,
  rowItem: PropTypes.shape({
    id: PropTypes.number,
    persona: PropTypes.shape({
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      tituloCargo: PropTypes.string,
      correo_primario: PropTypes.string,
      telefono: PropTypes.number,
      celular: PropTypes.number,
    }),
    horaFin: PropTypes.objectOf(PropTypes.string),
    horaInicio: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
