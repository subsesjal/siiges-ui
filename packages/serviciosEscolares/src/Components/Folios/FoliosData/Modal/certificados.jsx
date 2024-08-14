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
  setRows,
  rowData,
}) {
  const [form, setForm] = useState({});
  const [alumno, setAlumno] = useState(null);
  const [alumnoId, setAlumnoId] = useState(null);
  const { setNoti, setLoading } = useContext(Context);

  useEffect(() => {
    if (type === 'edit' && rowData) {
      setForm(rowData);
      setAlumno(rowData.name);
      setAlumnoId(rowData.id);
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
          setNoti({
            open: true,
            message: `Ocurrió un error inesperado: ${error}`,
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
    const endpoint = type === 'edit'
      ? `/solicitudesFolios/${id}/alumnos/${form.id}`
      : `/solicitudesFolios/${id}/alumnos/${alumnoId}`;
    createRecord({ data: form, endpoint })
      .then((response) => {
        if (response.data) {
          const newRow = {
            id: response.data.id,
            name: `${response.data.alumno.persona.nombre} ${response.data.alumno.persona.apellidoPaterno} ${response.data.alumno.persona.apellidoMaterno}`,
            fechaTermino: dayjs(response.data.fechaTermino).format('DD/MM/YYYY'),
            fechaElaboracion: dayjs(response.data.fechaElaboracion).format(
              'DD/MM/YYYY',
            ),
          };
          setNoti({
            open: true,
            message: 'Registro creado exitosamente',
            type: 'success',
          });
          setRows((prevRows) => [...prevRows, newRow]);
          setOpen(false);
        }
      })
      .catch((error) => {
        setNoti({
          open: true,
          message: `Ocurrió un error inesperado: ${error}`,
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
    <DefaultModal title="Alumnos Certificados" open={open} setOpen={setOpen}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            label="Matricula"
            id="matricula"
            name="matricula"
            value={form.matricula || ''}
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
            value={form.fechaElaboracion || ''}
            onchange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputDate
            label="Fecha de terminación plan de estudios"
            id="fechaTermino"
            name="fechaTermino"
            value={form.fechaTermino || ''}
            onchange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonsForm confirm={handleConfirm} cancel={handleCancel} />
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
  setRows: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number,
  programaId: PropTypes.number,
  rowData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    fechaTermino: PropTypes.string,
    fechaElaboracion: PropTypes.string,
  }),
};
