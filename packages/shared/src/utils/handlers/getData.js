import getToken from './getToken';

const errorMessages = {
  404: 'Not Found',
  401: 'Unauthorized',
  409: 'Conflict',
};

const handleResponse = async (response) => {
  if (response.status === 200 || response.status === 201) {
    const { data } = await response.json();

    return data;
  }

  return errorMessages[response.status] || `Response status: ${response.status}`;
};

const getData = async (path) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { token } = getToken();
  const basePath = '/api/v1';

  const response = await fetch(`${url}${basePath}${path}`, {
    method: 'GET',
    headers: {
      api_key: apikey,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

export default getData;
