import router from 'next/router';
import Ajv from 'ajv';
import getToken from './getToken';
import cleanData from './cleanData';

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

const submitData = async ({
  schema, endpoint, method, dataBody = null, setNoti,
}) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { token } = getToken();
  const ajv = new Ajv({ allErrors: true });

  const validate = ajv.compile(schema);

  const valid = validate(dataBody);

  if (!valid) {
    setNoti({
      open: true,
      message: 'Revisa que los campos requeridos hayan sido llenados correctamente',
      type: 'error',
    });

    return false;
  }

  const cleanedData = cleanData(dataBody, schema);

  const response = await fetch(`${url}${endpoint}`, {
    method,
    headers: {
      api_key: apikey,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: method ? JSON.stringify(cleanedData) : null,
  });

  return handleResponse(response, setNoti);
};

export default submitData;
