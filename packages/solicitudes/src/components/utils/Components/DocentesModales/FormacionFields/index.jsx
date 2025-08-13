import React from 'react';
import { Grid, Typography } from '@mui/material';
import {
  Input,
  Select,
  InputDate,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';

export default function FormacionFields({
  index,
  formDocentes,
  handleOnChange,
  handleOnBlur,
  handleInputFocus,
  error,
  isConsultMode,
  nivel,
  documentosPresentados,
}) {
  const prefix = `formacion_${index}_`;
  const formacion = formDocentes?.formacionesDocentes?.[index - 1] || {};

  return (
    <>
      <Grid item xs={1} sx={{ mt: 3 }}>
        <Typography variant="subtitle">{index}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Select
          title="Nivel"
          name={`${prefix}nivelId`}
          value={formacion?.nivelId || ''}
          options={nivel}
          onChange={handleOnChange}
          onblur={handleOnBlur}
          errorMessage={error[`${prefix}nivelId`]}
          required
          disabled={isConsultMode}
        />
      </Grid>
      <Grid item xs={8}>
        <Input
          id={`${prefix}nombre`}
          label="Nombre del grado"
          name={`${prefix}nombre`}
          value={formacion?.nombre || ''}
          onChange={handleOnChange}
          onblur={handleOnBlur}
          onfocus={handleInputFocus}
          required
          errorMessage={error[`${prefix}nombre`]}
          disabled={isConsultMode}
        />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={5}>
        <Select
          title="Documento presentado"
          name={`${prefix}descripcion`}
          value={formacion.descripcion || ''}
          options={documentosPresentados}
          onChange={handleOnChange}
          onblur={handleOnBlur}
          textValue
          required
          errorMessage={error[`${prefix}descripcion`]}
          disabled={isConsultMode}
        />
      </Grid>
      <Grid item xs={6}>
        <InputDate
          label="Fecha de graduado"
          name={`${prefix}fechaGraduado`}
          value={formacion?.fechaGraduado || ''}
          onChange={handleOnChange}
          onblur={handleOnBlur}
          onfocus={handleInputFocus}
          type="datetime"
          required
          errorMessage={error[`${prefix}fechaGraduado`]}
          disabled={isConsultMode}
        />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={11}>
        <Input
          id={`${prefix}institucion`}
          label="Nombre de la Institución"
          name={`${prefix}institucion`}
          value={formacion?.institucion || ''}
          onChange={handleOnChange}
          onblur={handleOnBlur}
          onfocus={handleInputFocus}
          required
          errorMessage={error[`${prefix}institucion`]}
          disabled={isConsultMode}
        />
      </Grid>
    </>
  );
}

FormacionFields.propTypes = {
  index: PropTypes.number.isRequired,
  formDocentes: PropTypes.shape({
    formacionesDocentes: PropTypes.arrayOf(
      PropTypes.shape({
        nivelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombre: PropTypes.string,
        descripcion: PropTypes.string,
        fechaGraduado: PropTypes.string,
        institucion: PropTypes.string,
      }),
    ),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  handleInputFocus: PropTypes.func.isRequired,
  error: PropTypes.objectOf(PropTypes.string).isRequired,
  isConsultMode: PropTypes.bool,
  nivel: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nombre: PropTypes.string,
    }),
  ).isRequired,
  documentosPresentados: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nombre: PropTypes.string,
    }),
  ).isRequired,
};

FormacionFields.defaultProps = {
  isConsultMode: false,
};
