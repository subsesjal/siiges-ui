export default function GetFile(fileData, callback) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!apikey || !baseUrl) {
    const error = new Error('API configuration is missing');
    if (callback) return callback(null, error);
    return Promise.reject(error);
  }

  if (!fileData?.tipoEntidad || !fileData?.entidadId || !fileData?.tipoDocumento) {
    const error = new Error('Missing required file parameters');
    if (callback) return callback(null, error);
    return Promise.reject(error);
  }

  const url = `${baseUrl}/api/v1/files/?tipoEntidad=${fileData.tipoEntidad}&entidadId=${fileData.entidadId}&tipoDocumento=${fileData.tipoDocumento}`;

  if (typeof callback === 'function') {
    return fetch(url, {
      method: 'GET',
      headers: { api_key: apikey },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!data?.data?.ubicacion) throw new Error('File location not found');
        callback(data.data.ubicacion, null);
      })
      .catch((error) => {
        console.error('GetFile error:', error);
        callback(null, error);
      });
  }

  return fetch(url, {
    method: 'GET',
    headers: { api_key: apikey },
  })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!data?.data?.ubicacion) throw new Error('File location not found');
      return data.data.ubicacion;
    })
    .catch((error) => {
      console.error('GetFile error:', error);
      throw error;
    });
}
