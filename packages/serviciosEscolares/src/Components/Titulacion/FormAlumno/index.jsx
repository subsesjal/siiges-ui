import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import {
  Select, Input, Context,
} from '@siiges-ui/shared';
import {
  campos,
  mailValidator,
  curpValidator,
  generos,
  nacionalidad,
} from '../../Alumnos/FormAlumno/dataAlumnos';

export default function FormAlumnoTitulacion({ alumno }) {
  const [form, setForm] = useState();
  const { session, setNoti } = useContext(Context);
  const [formSelect, setFormSelect] = useState({
    situacionId: alumno?.situacionId || 2,
  });
  const [errorMail, setErrorMail] = useState('');
  const [errorCurp, setErrorCurp] = useState('');
  const ifRepresentantes = (session.rol === 'representante' || session.rol === 'ce_ies');

  const getErrorMessage = (campoId) => {
    if (campoId === 'correoPrimario') return errorMail;
    if (campoId === 'curp') return errorCurp;
    return false;
  };

  const findId = (param, search) => {
    const Obj = param.find((n) => n.nombre === alumno[search]);
    return Obj ? Obj.id : '';
  };

  useEffect(() => {
    if (alumno) {
      setFormSelect((prevForm) => ({
        ...prevForm,
        sexo: findId(generos, 'sexo'),
        nacionalidad: findId(nacionalidad, 'nacionalidad'),
        situacionId: alumno.situacionId ? alumno.situacionId : '',
      }));
    }
    if (ifRepresentantes) {
      setForm((prevForm) => ({
        ...prevForm,
      }));
    }
  }, [alumno, session.rol]);

  const validator = (name, value) => {
    if (name === 'correoPrimario') {
      if (mailValidator(value)) {
        setErrorMail('');
        return true;
      }
      setErrorMail('¡El campo Correo no es válido!.');
      return false;
    }

    if (name === 'curp') {
      if (curpValidator(value)) {
        setErrorCurp('');
        return true;
      }
      setErrorCurp('¡El CURP debe tener 18 caracteres!.');
      return false;
    }

    if (value === '' || value === undefined) {
      setNoti({
        open: true,
        message: `El campo ${name} es obligatorio.`,
        type: 'error',
      });
      return false;
    }

    if (name === 'situacionId' && ifRepresentantes && (value === 1 || value === 3)) {
      setNoti({
        open: true,
        message: '¡Solo puede seleccionar Situación: Inactivo o Baja.!',
        type: 'error',
      });
      setForm((prevForm) => ({
        ...prevForm,
        situacionId: alumno?.situacionId,
      }));
      return false;
    }

    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const isValid = validator(name, value);
    if (isValid) {
      setForm({ ...form, [name]: value.toString().trim() });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        {campos.map((campo) => (
          <Grid item xs={4} key={campo.id}>
            {campo.type === 'text' || campo.type === 'date' ? (
              <Input
                id={campo.id}
                label={campo.label}
                name={campo.id}
                auto={campo.id}
                onChange={handleOnChange}
                value={form?.[campo.id] || alumno?.[campo.id]}
                type={campo.type}
                disabled
                errorMessage={getErrorMessage(campo.id)}
              />
            ) : (
              <Select
                title={campo.label}
                name={campo.id}
                value={formSelect?.[campo.id] || ''}
                options={campo.options}
                onChange={handleOnChange}
                disabled
              />
            )}
          </Grid>
        ))}
        <Grid item xs={4}>
          <Input
            id="fechaRegistro"
            label="Fecha de registro"
            name="fechaRegistro"
            autoComplete="fechaRegistro"
            onChange={handleOnChange}
            value={alumno?.fechaRegistro}
            type="date"
            disabled
          />
        </Grid>

        <Grid item xs={9} />
      </Grid>
    </div>
  );
}

FormAlumnoTitulacion.propTypes = {
  alumno: PropTypes.shape({
    id: PropTypes.number,
    fechaRegistro: PropTypes.string,
    situacionId: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};
