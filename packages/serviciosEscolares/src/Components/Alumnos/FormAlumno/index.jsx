import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import {
  Select,
  Input,
  ButtonsForm,
  Context,
  DefaultModal,
} from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import {
  campos,
  setAndValidateFormData,
  mailValidator,
  curpValidator,
  generos,
  nacionalidad,
} from './dataAlumnos';
import alumnosService from '../../utils/alumnosService';
import SituacionSelect from '../../utils/SituacionSelect';

export default function FormAlumno({ type, alumno, setId }) {
  const router = useRouter();
  const { query } = router;
  const [form, setForm] = useState();
  const { session, setLoading, setNoti } = useContext(Context);
  const [formSelect, setFormSelect] = useState({
    situacionId: alumno?.situacionId || 2,
  });
  const [errorMail, setErrorMail] = useState('');
  const [errorCurp, setErrorCurp] = useState('');
  const ifRepresentantes = session.rol === 'representante' || session.rol === 'ce_ies';
  const [open, setOpen] = useState(false);

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
        situacionId: alumno.situacionId || '',
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

    return true;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const isValid = validator(name, value);
    if (isValid) {
      setForm({ ...form, [name]: value.toString().trim() });
      const field = campos.find((campo) => campo.id === name);
      if (field?.type === 'select') {
        setFormSelect({ ...formSelect, [name]: value });
      }
    }
  };

  const validateFormBeforeSubmit = () => {
    let isValid = true;

    campos.forEach((field) => {
      const value = form?.[field.id] || alumno?.[field.id];
      if (field.type !== 'select' && (!value || value.trim() === '')) {
        setNoti({
          open: true,
          message: `El campo ${field.label} es obligatorio.`,
          type: 'error',
        });
        isValid = false;
      }
    });

    if (Number(formSelect?.situacionId) === 4) {
      if (!form?.fechaBaja || !form?.observacionesBaja) {
        setNoti({
          open: true,
          message: 'Debe llenar los campos de fecha y observaciones de baja.',
          type: 'error',
        });
        isValid = false;
      }
    }

    return isValid;
  };

  const actualSubmit = async () => {
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
      } else {
        response = await alumnosService({ dataBody, method: 'POST' });
        setId(response.data.id);
        setNoti({
          open: true,
          message: '¡Alumno registrado con éxito!',
          type: 'success',
        });
      }
    } catch (err) {
      setNoti({
        open: true,
        message: `¡Error al registrar alumno! ${err.message}`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);
    if (!validateFormBeforeSubmit()) {
      setLoading(false);
      return;
    }

    if (Number(formSelect?.situacionId) === 4) {
      setOpen(true);
      setLoading(false);
      return;
    }

    await actualSubmit();
  };

  const handleModalConfirm = async () => {
    const fechaBaja = form?.fechaBaja || alumno?.fechaBaja;
    const observacionesBaja = form?.observacionesBaja || alumno?.observacionesBaja;

    if (!fechaBaja || !observacionesBaja) {
      setNoti({
        open: true,
        message: 'Por favor complete la fecha y observaciones de baja.',
        type: 'error',
      });
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      fechaBaja,
      observacionesBaja,
    }));

    setOpen(false);
    await actualSubmit();
  };

  const renderCampo = (campo) => {
    const value = formSelect?.[campo.id] || '';
    const errorMessage = getErrorMessage(campo.id);

    if (campo.type === 'text' || campo.type === 'date') {
      return (
        <Input
          id={campo.id}
          label={campo.label}
          name={campo.id}
          auto={campo.id}
          onChange={handleOnChange}
          value={form?.[campo.id] || alumno?.[campo.id]}
          type={campo.type}
          disabled={campo.disabled}
          errorMessage={errorMessage}
        />
      );
    }

    if (campo.id === 'situacionId') {
      return (
        <SituacionSelect
          title={campo.label}
          options={campo.options}
          disabled={!(type === 'edit')}
          ifRepresentantes={ifRepresentantes}
          name={campo.id}
          value={value}
          onChange={handleOnChange}
          errorMessage={errorMessage}
        />
      );
    }

    return (
      <Select
        title={campo.label}
        options={campo.options}
        disabled={campo.disabled}
        name={campo.id}
        value={value}
        onChange={handleOnChange}
        errorMessage={errorMessage}
      />
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="body1">
        ¡Nota importante!. El nombre del alumno se debe registrar tal y como
        aparece en el acta de nacimiento, en mayúsculas y en caso de tener
        acentos, letra Ñ (poner N), diéresis o algún otro caracter especial,
        favor de omitirlos.
      </Typography>
      <br />
      <Grid container spacing={2}>
        {campos.map((campo) => (
          <Grid item xs={4} key={campo.id}>
            {renderCampo(campo)}
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
            confirm={handleConfirmSubmit}
            cancel={() => {
              router.back();
            }}
          />
        </Grid>
      </Grid>

      <DefaultModal title="Baja de Alumno" open={open} setOpen={setOpen}>
        <Typography>
          Está por dar de baja este alumno, la baja deberá estar fundamentada
          con reglamento. ¿Está usted seguro?
        </Typography>
        <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Input
              id="fechaBaja"
              label="Fecha de baja"
              name="fechaBaja"
              autoComplete="fechaBaja"
              onChange={handleOnChange}
              value={form?.fechaBaja || alumno?.fechaBaja || ''}
              type="date"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              id="observacionesBaja"
              label="Observaciones"
              name="observacionesBaja"
              autoComplete="observacionesBaja"
              multiline
              rows={4}
              onChange={handleOnChange}
              value={form?.observacionesBaja || alumno?.observacionesBaja || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonsForm
              confirm={handleModalConfirm}
              cancel={() => {
                setOpen(false);
              }}
            />
          </Grid>
        </Grid>
      </DefaultModal>
    </div>
  );
}

FormAlumno.propTypes = {
  type: PropTypes.string.isRequired,
  setId: PropTypes.func.isRequired,
  alumno: PropTypes.shape({
    id: PropTypes.number,
    fechaRegistro: PropTypes.string,
    fechaBaja: PropTypes.string,
    observacionesBaja: PropTypes.string,
    situacionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    search: PropTypes.string,
  }).isRequired,
};
