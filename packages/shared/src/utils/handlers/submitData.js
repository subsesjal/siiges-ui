/* eslint-disable valid-typeof */
/* eslint-disable no-lonely-if */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import router from 'next/router';
import Ajv from 'ajv';
import getToken from './getToken';

const ajv = new Ajv();

const errorMessages = {
  404: 'Not Found',
  401: 'Unauthorized',
  409: 'Conflict',
};

const handleResponse = async (response, setNoti) => {
  if (response.status === 200 || response.status === 201) {
    const { data } = await response.json();

    setNoti({
      open: true,
      message: 'Registro exitoso',
      type: 'success',
    });

    setTimeout(() => {
      router.back();
    }, 3000);

    return data;
  }

  const errorMessage = errorMessages[response.status] || `Response status: ${response.status}`;

  setNoti({
    open: true,
    message: errorMessage,
    type: 'error',
  });

  return false;
};

const cleanFormData = (data, schema) => {
  const cleanedData = {};

  for (const property in schema.properties) {
    if (data.hasOwnProperty(property)) {
      const value = data[property];
      const propertySchema = schema.properties[property];

      if (propertySchema.type === 'object' && typeof value === 'object') {
        cleanedData[property] = cleanFormData(value, propertySchema);
      } else {
        cleanedData[property] = value;
      }
    }
  }

  return cleanedData;
};

const submitData = async (form, schema, path, method, setNoti) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { token } = getToken();
  const basePath = '/api/v1';

  const validate = ajv.compile(schema);

  const valid = validate(form);

  if (!valid) {
    setNoti({
      open: true,
      message: 'Revisa que los campos requeridos hayan sido llenados correctamente',
      type: 'error',
    });

    return false;
  }

  const cleanedData = cleanFormData(form, schema);

  const response = await fetch(`${url}${basePath}${path}`, {
    method,
    headers: {
      api_key: apikey,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cleanedData),
  });

  return handleResponse(response, setNoti);
};

export default submitData;
