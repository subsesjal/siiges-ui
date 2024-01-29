export default function GetFile(fileData, setFile) {
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
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data.data) {
        setFile(data.data.url);
      }
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
