import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import {
  Select, Input, ButtonsForm, Context,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import {
  campos,
  setAndValidateFormData,
  mailValidator,
  generos,
  nacionalidad,
} from './dataAlumnos';
import alumnosService from '../../utils/alumnosService';

export default function FormAlumno({ type, alumno, setId }) {
  const router = useRouter();
  const { query } = router;
  const [form, setForm] = useState();
  const { session, setLoading, setNoti } = useContext(Context);
  const [formSelect, setFormSelect] = useState({
    situacionId: alumno?.situacionId,
  });
  const [error, setError] = useState('');
  const [errorMail, setErrorMail] = useState('');

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
    if (session.rol === 'representante') {
      setForm((prevForm) => ({
        ...prevForm,
        situacionId: 2,
      }));
    }
  }, [alumno, session.rol]);

  const validator = (name, value) => {
    if (name === 'correoPrimario') {
      if (mailValidator(value)) {
        setErrorMail('');
      } else setErrorMail('El campo Correo no es válido.');
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    validator(name, value);
    setForm({ ...form, [name]: value.toString().trim() });
    setError('');
  };

  const saveButtonAction = async () => {
    setLoading(true);
    try {
      const dataBody = setAndValidateFormData({ ...form, ...query }).formData;
      let response;
      if (type === 'edit') {
        response = await alumnosService({
          id: query.alumnoId,
          dataBody,
          method: 'PATCH',
        });
        setNoti({
          open: true,
          message: '¡Alumno actualizado con éxito!',
          type: 'success',
        });
        setLoading(false);
      } else {
        response = await alumnosService({ dataBody, method: 'POST' });
        setId(response.data.id); // Set ID only when creating a new alumno
        setNoti({
          open: true,
          message: '¡Alumno registrado con éxito!',
          type: 'success',
        });
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setNoti({
        open: true,
        message: '¡Error al registrar alumno!',
        type: 'error',
      });
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {error && (
        <Typography variant="body2" style={{ color: 'red' }}>
          {error}
        </Typography>
      )}
      <Typography variant="body1">
        ¡Nota importante!. El nombre del alumno se debe registrar tal y como
        aparece en el acta de nacimiento, en mayúsculas y en caso de tener
        acentos, letra Ñ (poner N), diéresis o algún otro caracter especial, favor de omitirlos.
      </Typography>
      <br />
      <Grid container spacing={2}>
        {campos.map((campo) => (
          <Grid item xs={4} key={campo.id}>
            {campo.type === 'text' || campo.type === 'date' ? (
              <Input
                id={campo.id}
                label={campo.label}
                name={campo.id}
                auto={campo.id}
                onchange={handleOnChange}
                value={alumno?.[campo.id]}
                type={campo.type}
                disabled={campo.disabled}
                errorMessage={campo.id === 'correoPrimario' ? errorMail : false}
              />
            ) : (
              <Select
                title={campo.label}
                name={campo.id}
                value={
                  campo.id === 'situacionId' && session.rol === 'representante'
                    ? 2
                    : formSelect?.[campo.id] || ''
                }
                options={campo.options}
                onChange={handleOnChange}
                disabled={
                  campo.id === 'situacionId' && session.rol === 'representante'
                }
              />
            )}
          </Grid>
        ))}

        {type === 'edit' && (
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
        )}

        <Grid item xs={9} />
        <Grid item xs={3}>
          <ButtonsForm
            confirm={saveButtonAction}
            cancel={() => {
              router.back();
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

FormAlumno.propTypes = {
  type: PropTypes.string.isRequired,
  setId: PropTypes.func.isRequired,
  alumno: PropTypes.shape({
    id: PropTypes.number,
    fechaRegistro: PropTypes.string,
    situacionId: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
};
