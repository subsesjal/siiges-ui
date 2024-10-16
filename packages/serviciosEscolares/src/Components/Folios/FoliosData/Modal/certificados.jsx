import { Grid } from '@mui/material';
import {
  ButtonsForm,
  Context,
  DefaultModal,
  Input,
  InputDate,
  LabelData,
  createRecord,
  getData,
  updateRecord,
} from '@siiges-ui/shared';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function ModalCertificado({
  open,
  setOpen,
  type,
  id,
  programaId,
  setAlumnoResponse,
  rowData,
  title,
}) {
  const [form, setForm] = useState({});
  const [alumno, setAlumno] = useState(null);
  const [alumnoId, setAlumnoId] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { setNoti, setLoading } = useContext(Context);

  const validateForm = () => {
    const isValid = alumno
      && form.fechaElaboracion
      && form.fechaTerminacion;

    setDisabled(!isValid);
  };

  useEffect(() => {
    validateForm();
  }, [form, alumnoId]);

  useEffect(() => {
    if (type === 'edit' && rowData) {
      setForm(rowData);
      if (rowData.alumno) {
        const fullName = `${rowData.alumno.persona.nombre} ${rowData.alumno.persona.apellidoPaterno} ${rowData.alumno.persona.apellidoMaterno}`;
        setAlumno(fullName);
      }
      setAlumnoId(rowData.alumnoId);
    } else {
      setForm({});
      setAlumno();
      setAlumnoId();
    }
  }, [type, rowData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === 'matricula' && value) {
      setLoading(true);
      getData({
        endpoint: `/alumnos/programas/${programaId}?matricula=${value}`,
      })
        .then((response) => {
          if (response.data) {
            const fullName = `${response.data.persona.nombre} ${response.data.persona.apellidoPaterno} ${response.data.persona.apellidoMaterno}`;
            setAlumno(fullName);
            setAlumnoId(response.data.id);
          }
        })
        .catch((error) => {
          console.error(error);
          setNoti({
            open: true,
            message: '¡No se encontró el Alumno!',
            type: 'error',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleConfirm = () => {
    setLoading(true);

    const formattedForm = {
      matricula: form.matricula,
      fechaTerminacion: dayjs(form.fechaTerminacion).format('YYYY-MM-DDTHH:mm:ssZ'),
      fechaElaboracion: dayjs(form.fechaElaboracion).format(
        'YYYY-MM-DDTHH:mm:ssZ',
      ),
    };

    const endpoint = type === 'edit'
      ? `/solicitudesFolios/solicitudesFoliosAlumnos/${form.id}`
      : `/solicitudesFolios/${id}/alumnos/${alumnoId}`;

    const action = type === 'edit' ? updateRecord : createRecord;

    action({ data: formattedForm, endpoint })
      .then(() => {
        setNoti({
          open: true,
          message:
              type === 'edit'
                ? 'Registro actualizado exitosamente'
                : 'Registro creado exitosamente',
          type: 'success',
        });
        setAlumnoResponse(true);
        setOpen(false);
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `¡Ocurrió un error inesperado!: ${error}`,
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `¡Ocurrió un error inesperado!: ${error}`,
          type: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    setAlumno(null);
  };

  return (
    <DefaultModal title={title} open={open} setOpen={setOpen}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            label="Matrícula"
            id="matricula"
            name="matricula"
            value={form.alumno?.matricula || ''}
            onblur={handleBlur}
            onchange={handleChange}
          />
        </Grid>
        {alumno && (
          <Grid item xs={12}>
            <LabelData title="Alumno" subtitle={alumno} />
          </Grid>
        )}
        <Grid item xs={6}>
          <InputDate
            label="Fecha de elaboración de certificado"
            id="fechaElaboracion"
            name="fechaElaboracion"
            type="datetime"
            value={form.fechaElaboracion || ''}
            onchange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputDate
            label="Fecha de terminación plan de estudios"
            id="fechaTerminacion"
            name="fechaTerminacion"
            type="datetime"
            value={form.fechaTerminacion || ''}
            onchange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm
            confirm={handleConfirm}
            confirmDisabled={disabled}
            cancel={handleCancel}
          />
        </Grid>
      </Grid>
    </DefaultModal>
  );
}

ModalCertificado.defaultProps = {
  id: null,
  programaId: null,
  rowData: {},
};

ModalCertificado.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setAlumnoResponse: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number,
  programaId: PropTypes.number,
  rowData: PropTypes.shape({
    alumno: PropTypes.shape({
      id: PropTypes.number,
      matricula: PropTypes.string,
      persona: PropTypes.shape({
        nombre: PropTypes.string,
        apellidoPaterno: PropTypes.string,
        apellidoMaterno: PropTypes.string,
      }),
    }),
    alumnoId: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    fechaTermino: PropTypes.string,
    fechaElaboracion: PropTypes.string,
    fechaInicio: PropTypes.string,
    fechaTerminacion: PropTypes.string,
    fechaExpedicion: PropTypes.string,
    fechaExamenProfesional: PropTypes.string,
    fechaExencionExamenProfesional: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
};
