import { getTokenLocalStorage } from '@siiges-ui/shared';

export default function GetFilePdf(endpoint, params = {}) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { token } = getTokenLocalStorage();

  if (!apikey || !baseUrl) {
    return Promise.reject(new Error('API configuration is missing'));
  }

  const query = new URLSearchParams(params).toString();
  const url = `${baseUrl}/api/v1${endpoint}${query ? `?${query}` : ''}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      api_key: apikey,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.blob();
    })
    .then((blob) => {
      if (!blob || blob.size === 0) throw new Error('Empty file received');
      return URL.createObjectURL(blob);
    })
    .catch((error) => {
      console.error('GetFilePdf error:', error);
      throw error;
    });
}
