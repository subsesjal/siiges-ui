import { Divider, Grid, Typography } from '@mui/material';
import {
  ButtonsForm,
  Context,
  GetFile,
  Input,
  InputDate,
  InputFile,
  Select,
  createRecord,
  estadosMexico,
  getData,
  updateRecord,
} from '@siiges-ui/shared';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function DatosInstitucion({ alumno }) {
  const { setNoti, session, setLoading } = useContext(Context);
  const [url, setUrl] = useState();
  const [formSent, setFormSent] = useState(false);
  const [openDropzone, setOpenDropzone] = useState(false);
  const [cancelText, setCancelText] = useState();
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState({
    nombreInstitucionEmisora: '',
    claveCentroTrabajoEmisor: '',
    folio: '',
    estatus: 0,
    estadoId: '',
    alumnoId: alumno.id,
    nivelId: '',
    fechaInicioAntecedente: '',
    fechaFinAntecedente: '',
    fechaExpedicion: '',
    situacionValidacionId: 4,
    fechaValidacion: dayjs(),
    usuarioId: session?.id,
    tipoValidacionId: '',
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const fileData = {
    entidadId: alumno.id,
    tipoEntidad: 'ALUMNO',
    tipoDocumento: 'ARCHIVO_VALIDACION_ALUMNO',
  };

  useEffect(() => {
    if (formSent) {
      setCancelText('Regresar');
    }
  }, [formSent]);

  useEffect(() => {
    if (alumno) {
      const fetchValidationData = async () => {
        const endpoint = `/alumnos/${alumno.id}/validaciones`;
        const response = await getData({ endpoint });

        if (response && response.statusCode === 200) {
          const validation = response.data;
          setFormSent(true);
          setForm((prevForm) => ({
            ...prevForm,
            nombreInstitucionEmisora: validation.nombreInstitucionEmisora || '',
            claveCentroTrabajoEmisor: validation.claveCentroTrabajoEmisor || '',
            folio: validation.folio || '',
            estatus: validation.estatus || 0,
            estadoId: validation.estadoId || '',
            nivelId: validation.nivelId || '',
            fechaInicioAntecedente: validation.fechaInicioAntecedente
              ? dayjs(validation.fechaInicioAntecedente).format(
                'YYYY-MM-DDTHH:mm:ss',
              )
              : '',
            fechaFinAntecedente: validation.fechaFinAntecedente
              ? dayjs(validation.fechaFinAntecedente).format(
                'YYYY-MM-DDTHH:mm:ss',
              )
              : '',
            fechaExpedicion: validation.fechaExpedicion
              ? dayjs(validation.fechaExpedicion).format('YYYY-MM-DDTHH:mm:ss')
              : '',
            situacionValidacionId: validation.situacionValidacionId || 4,
            fechaValidacion: validation.fechaValidacion
              ? dayjs(validation.fechaValidacion).format('YYYY-MM-DDTHH:mm:ss')
              : dayjs().format('YYYY-MM-DDTHH:mm:ss'),
            tipoValidacionId: validation.tipoValidacionId || '',
          }));
        }
      };

      fetchValidationData();
      GetFile(fileData, setUrl);
    }
  }, [alumno]);

  useEffect(() => {
    if (session.rol === 'admin' || session.rol === 'ce_sicyt') {
      setDisabled(false);
    }
  }, [session]);

  const situacionDocumento = [
    { id: 1, nombre: 'Auténtico' },
    { id: 2, nombre: 'Apócrifo' },
    { id: 3, nombre: 'En trámite' },
    { id: 4, nombre: 'Pendiente' },
  ];
  const nivelEstudios = [
    { id: 1, nombre: 'Bachillerato' },
    { id: 2, nombre: 'Licenciatura' },
    { id: 3, nombre: 'Maestría' },
  ];
  const tipoValidacion = [
    { id: 1, nombre: 'Constancia de validación' },
    { id: 2, nombre: 'Oficio de validación' },
    { id: 3, nombre: 'Validación electronica (QR)' },
    { id: 4, nombre: 'Registro Nacional de profesionistas' },
    { id: 5, nombre: 'Validación por consulta de registros UDG' },
    { id: 6, nombre: 'Validación por legalización o certificación' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (name === 'situacionValidacionId') {
      setForm((prevForm) => ({ ...prevForm, estatus: 1 }));
    }
  };

  const handleSelectChange = (name) => (event) => {
    setForm((prevForm) => ({ ...prevForm, [name]: event.target.value }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value ? '¡Este campo es obligatorio!' : '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'nombreInstitucionEmisora',
      'estadoId',
      'claveCentroTrabajoEmisor',
      'nivelId',
      'fechaInicioAntecedente',
      'fechaFinAntecedente',
      'folio',
      'fechaExpedicion',
      'tipoValidacionId',
    ];

    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = '¡Este campo es obligatorio!';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        let response;
        const endpoint = `/alumnos/${alumno.id}/validaciones`;
        const data = {
          ...form,
          archivoValidacion: url,
        };

        if (!formSent) {
          response = await createRecord({ data, endpoint });
        } else {
          response = await updateRecord({ data, endpoint });
        }

        if (
          response
          && (response.statusCode === 200 || response.statusCode === 201)
        ) {
          setFormSent(true);
          setLoading(false);
          setNoti({
            open: true,
            message: '¡Datos guardados correctamente!',
            type: 'success',
          });
          setOpenDropzone(true);
        } else {
          throw new Error('¡La API no obtuvo éxito!');
        }
      } catch (error) {
        console.error('¡Error en la llamda a la API!:', error);
        setLoading(false);
        setNoti({
          open: true,
          message: '¡Error: No se pudo guardar la información!',
          type: 'error',
        });
      }
    } else {
      setNoti({
        open: true,
        message: '¡Error: Verifique los campos!',
        type: 'error',
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">
          Archivo Certificado de Bachillerato o equivalente (PDF)
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Input
          label="Institución de procedencia"
          name="nombreInstitucionEmisora"
          id="nombreInstitucionEmisora"
          value={form.nombreInstitucionEmisora}
          onChange={handleChange}
          onblur={handleBlur}
          errorMessage={errors.nombreInstitucionEmisora}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Estado de procedencia"
          name="estadoId"
          options={estadosMexico}
          value={form.estadoId}
          onChange={handleSelectChange('estadoId')}
          onblur={handleBlur}
          errorMessage={errors.estadoId}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          label="CCT de Institución de procedencia"
          name="claveCentroTrabajoEmisor"
          id="claveCentroTrabajoEmisor"
          value={form.claveCentroTrabajoEmisor}
          onChange={handleChange}
          onblur={handleBlur}
          errorMessage={errors.claveCentroTrabajoEmisor}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Nivel de estudios cursado"
          name="nivelId"
          options={nivelEstudios}
          value={form.nivelId}
          onChange={handleSelectChange('nivelId')}
          onblur={handleBlur}
          errorMessage={errors.nivelId}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          label="Fecha de inicio de antecedentes"
          name="fechaInicioAntecedente"
          id="fechaInicioAntecedente"
          value={form.fechaInicioAntecedente}
          onChange={handleChange}
          onblur={handleBlur}
          errorMessage={errors.fechaInicioAntecedente}
          type="datetime"
          required
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          label="Fecha de finalización de antecedentes"
          name="fechaFinAntecedente"
          id="fechaFinAntecedente"
          value={form.fechaFinAntecedente}
          onChange={handleChange}
          onblur={handleBlur}
          errorMessage={errors.fechaFinAntecedente}
          type="datetime"
          required
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          label="Folio de certificado"
          name="folio"
          id="folio"
          value={form.folio}
          onChange={handleChange}
          onblur={handleBlur}
          errorMessage={errors.folio}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          label="Fecha de expedición"
          name="fechaExpedicion"
          id="fechaExpedicion"
          value={form.fechaExpedicion}
          onChange={handleChange}
          onblur={handleBlur}
          errorMessage={errors.fechaExpedicion}
          type="datetime"
          required
        />
      </Grid>
      {!disabled && (
        <Grid item xs={4}>
          <Select
            title="Situación de documento"
            name="situacionValidacionId"
            options={situacionDocumento}
            value={form.situacionValidacionId}
            onChange={handleSelectChange('situacionValidacionId')}
            onblur={handleBlur}
            errorMessage={errors.situacionValidacionId}
            required
            disabled={disabled}
          />
        </Grid>
      )}
      <Grid item xs={4}>
        <Select
          title="Tipo de validación"
          name="tipoValidacionId"
          options={tipoValidacion}
          value={form.tipoValidacionId}
          onChange={handleSelectChange('tipoValidacionId')}
          onblur={handleBlur}
          errorMessage={errors.tipoValidacionId}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          label="Fecha de validación"
          name="fechaValidacion"
          id="fechaValidacion"
          value={form.fechaValidacion}
          onChange={handleChange}
          onblur={handleBlur}
          errorMessage={errors.fechaValidacion}
          required
        />
      </Grid>
      {formSent && (
        <>
          <Grid item xs={12}>
            <Divider sx={{ mt: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Validación de Documentos</Typography>
          </Grid>
          <Grid item xs={12}>
            <InputFile
              label="Archivo de validación"
              id={alumno.id}
              tipoDocumento="ARCHIVO_VALIDACION_ALUMNO"
              tipoEntidad="ALUMNO"
              url={url}
              setUrl={setUrl}
              disabled={false}
              title="Suba su archivo de validación"
              openDropzone={openDropzone}
              required
            />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <ButtonsForm confirm={handleConfirm} cancel={() => router.back()} cancelText={cancelText} />
      </Grid>
    </Grid>
  );
}

DatosInstitucion.propTypes = {
  alumno: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
