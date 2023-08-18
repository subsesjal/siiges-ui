/* export default function GetFile(fileType, setForm, setLoaded) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  fetch(
    `http://localhost:3000/api/v1/files?tipoEntidad=${fileType.tipoEntidad}&entidadId=${fileType.entidadId}&tipoDocumento=${fileType.tipoDocumento}`,
    { headers: { api_key: apikey } }
    {
      method: 'GET',
    }
      .then((response) => response.json())
      .then((data) => {
        setLoaded(true);
        if (data !== undefined) {
          solicitudData = data.data;
        }
        setForm(solicitudData);
      }),
  );
} */
