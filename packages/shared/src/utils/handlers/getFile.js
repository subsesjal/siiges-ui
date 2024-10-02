export default function GetFile(fileData, callback) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const url = `${baseUrl}/api/v1/files/?tipoEntidad=${fileData.tipoEntidad}&entidadId=${fileData.entidadId}&tipoDocumento=${fileData.tipoDocumento}`;

  fetch(url, {
    method: 'GET',
    headers: {
      api_key: apikey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('¡La respuesta de la red no fue correcta!');
      }
      return response.json();
    })
    .then((data) => {
      callback(data.data ? data.data.ubicacion : null, null);
    })
    .catch((error) => {
      callback(null, error);
    });
}
