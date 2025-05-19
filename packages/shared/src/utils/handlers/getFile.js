export default function GetFile(fileData) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const url = `${baseUrl}/api/v1/files/?tipoEntidad=${fileData.tipoEntidad}&entidadId=${fileData.entidadId}&tipoDocumento=${fileData.tipoDocumento}`;

  return fetch(url, {
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
      if (!data.data || !data.data.ubicacion) {
        throw new Error('¡No se encontró el archivo!');
      }
      return data.data.ubicacion;
    });
}
