import { Grid } from '@mui/material';
import validateField from '@siiges-ui/revalidaciones/src/utils/ValidateField';
import {
  ButtonSimple, Input, InputFile, Subtitle, fileToFormData,
} from '@siiges-ui/shared';
import React, { useState } from 'react';

const validationRules = {
  'interesado.persona.curp': {
    message: '¡La CURP debe tener 18 caracteres!',
    required: true,
    validate: (value) => value && value.length === 18,
  },
  'interesado.persona.nombre': {
    message: '¡Este campo es requerido!',
    required: true,
  },
  'interesado.persona.apellidoPaterno': {
    message: '¡Este campo es requerido!',
    required: true,
  },
  'interesado.persona.apellidoMaterno': {
    message: '',
    required: false,
  },
  'interesado.institucion': {
    message: '¡Este campo es requerido!',
    required: true,
  },
  'interesado.carrera': {
    message: '¡Este campo es requerido!',
    required: true,
  },
  'interesado.correo': {
    message: '¡Ingrese un correo electrónico válido!',
    required: true,
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  'interesado.telefono': {
    message: '¡Este campo es requerido!',
    required: true,
  },
};

const INITIAL_FORM = {
  interesado: {
    persona: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      curp: '',
    },
    institucion: '',
    carrera: '',
    correo: '',
    telefono: '',
  },
};

// Documento requerido para la solicitud de reimpresión
const DOCUMENTO = { label: 'Documento de solicitud', key: 'REIMPRESION_TITULO' };

export default function ReimpresionTituloPublic() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [filesData, setFilesData] = useState({});

  const handleOnChange = (event, path = []) => {
    const { name, value } = event.target;
    const fieldName = [...path, name].join('.');

    setForm((prevForm) => {
      const updateNestedValue = (obj, nestedPath) => {
        if (nestedPath.length === 0) return { ...obj, [name]: value };
        const [firstKey, ...restPath] = nestedPath;
        return {
          ...obj,
          [firstKey]: updateNestedValue(obj[firstKey] || {}, restPath),
        };
      };
      return updateNestedValue(prevForm, path);
    });

    const error = validateField(fieldName, value, validationRules);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const getError = (path, name) => {
    const fieldName = [...path, name].join('.');
    return errors[fieldName] || '';
  };

  const handleFileChange = async (files, key) => {
    try {
      const formData = await fileToFormData(files[0]);
      setFilesData((prev) => ({
        ...prev,
        [key]: { formData, url: URL.createObjectURL(files[0]) },
      }));
    } catch (error) {
      console.error('¡Error al procesar el archivo!:', error);
    }
  };

  const formatUrl = (key) => {
    const fileUrl = filesData[key]?.url || '';
    return fileUrl.startsWith('blob:') ? fileUrl.replace('blob:', '') : fileUrl;
  };

  const isFileUploaded = (key) => !!filesData[key]?.formData;

  const validateAll = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach((fieldName) => {
      const parts = fieldName.split('.');
      let value = form;
      parts.forEach((part) => { value = value?.[part]; });
      const error = validateField(fieldName, value, validationRules);
      if (error) newErrors[fieldName] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;

    setLoading(true);
    try {
      // TODO: reemplazar con el endpoint real cuando esté disponible
      const payload = new FormData();
      payload.append('data', JSON.stringify(form));

      // Adjuntar archivos al payload si existen
      Object.entries(filesData).forEach(([key, { formData }]) => {
        formData.forEach((value, name) => {
          payload.append(`${key}_${name}`, value);
        });
      });

      const response = await fetch('/api/reimpresion-titulo', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) throw new Error('Error al enviar la solicitud');

      // TODO: manejar respuesta exitosa (redirect, snackbar, etc.)
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      // TODO: mostrar error al usuario con el sistema de notificaciones del proyecto
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Subtitle>Datos del Solicitante</Subtitle>
      </Grid>
      <Grid item xs={3}>
        <Input
          id="nombre"
          label="Nombre"
          name="nombre"
          value={form.interesado.persona.nombre}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
          required
          errorMessage={getError(['interesado', 'persona'], 'nombre')}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="apellidoPaterno"
          label="Primer Apellido"
          name="apellidoPaterno"
          value={form.interesado.persona.apellidoPaterno}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
          required
          errorMessage={getError(['interesado', 'persona'], 'apellidoPaterno')}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="apellidoMaterno"
          label="Segundo Apellido"
          name="apellidoMaterno"
          value={form.interesado.persona.apellidoMaterno}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="curp"
          label="CURP"
          name="curp"
          value={form.interesado.persona.curp}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
          required
          errorMessage={getError(['interesado', 'persona'], 'curp')}
          inputProps={{ maxLength: 18 }}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="institucion"
          label="Nombre de la Institución"
          name="institucion"
          value={form.interesado.institucion}
          onChange={(e) => handleOnChange(e, ['interesado'])}
          required
          errorMessage={getError(['interesado'], 'institucion')}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="carrera"
          label="Carrera"
          name="carrera"
          value={form.interesado.carrera}
          onChange={(e) => handleOnChange(e, ['interesado'])}
          required
          errorMessage={getError(['interesado'], 'carrera')}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="correo"
          label="Correo de contacto"
          name="correo"
          value={form.interesado.persona.correo}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
          required
          errorMessage={getError(['interesado', 'persona'], 'correo')}
        />
      </Grid>
      <Grid item xs={3}>
        <Input
          id="telefono"
          label="Teléfono de contacto"
          name="telefono"
          value={form.interesado.persona.telefono}
          onChange={(e) => handleOnChange(e, ['interesado', 'persona'])}
          required
          errorMessage={getError(['interesado', 'persona'], 'telefono')}
        />
      </Grid>
      <Grid item xs={12}>
        <InputFile
          label={DOCUMENTO.label}
          id="reimpresion-titulo-doc"
          tipoDocumento={DOCUMENTO.key}
          tipoEntidad="interesado"
          url={formatUrl(DOCUMENTO.key)}
          onChange={(files) => handleFileChange(files, DOCUMENTO.key)}
          isUploaded={isFileUploaded(DOCUMENTO.key)}
          fileType={['application/pdf']}
        />
      </Grid>
      <Grid item xs={12}>
        <ButtonSimple
          align="right"
          text={loading ? 'Enviando...' : 'Enviar Solicitud'}
          design="enviar"
          onClick={handleSubmit}
          disabled={loading}
        />
      </Grid>
    </Grid>
  );
}
