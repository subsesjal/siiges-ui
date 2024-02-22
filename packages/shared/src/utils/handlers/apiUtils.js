import getToken from './getToken';

const ERROR_MAPPING = {
  400: { statusCode: 400, errorMessage: 'Revisa que los campos sean correctos' },
  401: { statusCode: 401, errorMessage: 'Usuario no autorizado' },
  404: { statusCode: 404, errorMessage: 'Registro no encontrado' },
};

const makeCall = async ({
  method, endpoint, data, query,
}) => {
  const { token } = getToken();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const domain = process.env.NEXT_PUBLIC_URL;
  const basePath = '/api/v1';
  const url = `${domain}${basePath}${endpoint}${query || ''}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        api_key: apiKey,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      const errorData = ERROR_MAPPING[response.status] || { statusCode: response.status, errorMessage: 'Network response was not ok' };
      return {
        ...errorData,
        data: [], // Set data to empty array for consistency
      };
    }

    const responseData = await response.json();
    return {
      statusCode: response.status,
      data: responseData.data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      errorMessage: 'Internal Server Error',
      data: [],
    };
  }
};

const getData = ({ endpoint, query }) => {
  if (!endpoint) {
    const errorData = ERROR_MAPPING[400];
    return {
      ...errorData,
      data: [],
    };
  }
  return makeCall({ method: 'GET', endpoint, query });
};

const createRecord = ({ data, endpoint }) => {
  console.log(data);
  if (!endpoint) {
    const errorData = ERROR_MAPPING[400];
    return {
      ...errorData,
      data: [],
    };
  }
  return makeCall({ data, method: 'POST', endpoint });
};

const deleteRecord = ({ endpoint }) => {
  if (!endpoint) {
    const errorData = ERROR_MAPPING[400];
    return {
      ...errorData,
      data: [],
    };
  }
  return makeCall({ method: 'DELETE', endpoint });
};

export {
  getData,
  deleteRecord,
  createRecord,
};
