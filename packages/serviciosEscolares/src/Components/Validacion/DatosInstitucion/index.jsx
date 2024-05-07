import { Divider, Grid, Typography } from '@mui/material';
import {
  ButtonsForm,
  Context,
  GetFile,
  Input,
  InputDate,
  InputFile,
  Select,
  estadosMexico,
} from '@siiges-ui/shared';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

export default function DatosInstitucion({ alumno }) {
  const { setNoti } = useContext(Context);
  const [url, setUrl] = useState();
  const [form, setForm] = useState({
    nombreInstitucionEmisora: '',
    estadoId: '',
    claveCentroTrabajoEmisor: '',
    nivelId: '',
    fechaInicioAntecedente: '',
    fechaFinAntecedente: '',
    folio: '',
    fechaExpedicion: '',
    situacionValidacionId: 1,
    tipoValidacionId: '',
    fechaValidacion: '',
  });
  const [errors, setErrors] = useState({});

  const fileData = {
    entidadId: alumno.id,
    tipoEntidad: 'PERSONA',
    tipoDocumento: 'VALIDACION_ALUMNO',
  };

  useEffect(() => {
    if (alumno) {
      GetFile(fileData, setUrl);
    }
  }, [alumno]);

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
  };

  const handleSelectChange = (name) => (event) => {
    setForm((prevForm) => ({ ...prevForm, [name]: event.target.value }));
  };

  const handleBlur = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !form[field] ? 'Este campo es obligatorio' : '',
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
      'situacionValidacionId',
      'tipoValidacionId',
      'fechaValidacion',
    ];

    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });

    if (!url) {
      newErrors.archivoValidacion = 'El archivo de validación es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      console.log('Form data:', form);
    } else {
      setNoti({
        open: true,
        message: 'Error: Verifique los campos',
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
      <Grid item xs={4}>
        <Input
          label="Institución de procedencia"
          name="nombreInstitucionEmisora"
          id="nombreInstitucionEmisora"
          value={form.nombreInstitucionEmisora}
          onchange={handleChange}
          onblur={() => handleBlur('nombreInstitucionEmisora')}
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
          onchange={handleSelectChange('estadoId')}
          onblur={() => handleBlur('estadoId')}
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
          onchange={handleChange}
          onblur={() => handleBlur('claveCentroTrabajoEmisor')}
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
          onchange={handleSelectChange('nivelId')}
          onblur={() => handleBlur('nivelId')}
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
          onchange={handleChange}
          onblur={() => handleBlur('fechaInicioAntecedente')}
          errorMessage={errors.fechaInicioAntecedente}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          label="Fecha de finalización de antecedentes"
          name="fechaFinAntecedente"
          id="fechaFinAntecedente"
          value={form.fechaFinAntecedente}
          onchange={handleChange}
          onblur={() => handleBlur('fechaFinAntecedente')}
          errorMessage={errors.fechaFinAntecedente}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <Input
          label="Folio de certificado"
          name="folio"
          id="folio"
          value={form.folio}
          onchange={handleChange}
          onblur={() => handleBlur('folio')}
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
          onchange={handleChange}
          onblur={() => handleBlur('fechaExpedicion')}
          errorMessage={errors.fechaExpedicion}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Situación de documento"
          name="situacionValidacionId"
          options={situacionDocumento}
          value={form.situacionValidacionId}
          onchange={handleSelectChange('situacionValidacionId')}
          onblur={() => handleBlur('situacionValidacionId')}
          errorMessage={errors.situacionValidacionId}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Tipo de validación"
          name="tipoValidacionId"
          options={tipoValidacion}
          value={form.tipoValidacionId}
          onchange={handleSelectChange('tipoValidacionId')}
          onblur={() => handleBlur('tipoValidacionId')}
          errorMessage={errors.tipoValidacionId}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ mt: 1 }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Validación de Documentos</Typography>
      </Grid>
      <Grid item xs={8}>
        <InputFile
          label="Archivo de validación"
          id={1}
          tipoDocumento="VALIDACION_ALUMNO"
          tipoEntidad="PERSONA"
          url={url}
          setUrl={setUrl}
          disabled={false}
          required
        />
      </Grid>
      <Grid item xs={4} sx={{ marginTop: '-15px' }}>
        <InputDate
          label="Fecha de archivo de validación"
          name="fechaValidacion"
          id="fechaValidacion"
          value={form.fechaValidacion}
          onchange={handleChange}
          size="normal"
          onblur={() => handleBlur('fechaValidacion')}
          errorMessage={errors.fechaValidacion}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonsForm confirm={handleConfirm} cancel={() => {}} />
      </Grid>
    </Grid>
  );
}

DatosInstitucion.propTypes = {
  alumno: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
