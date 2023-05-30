/* export default function GetFile(fileType, setForm, setLoaded) {
  fetch(
    `http://localhost:3000/api/v1/files?tipoEntidad=${fileType.tipoEntidad}&entidadId=${fileType.entidadId}&tipoDocumento=${fileType.tipoDocumento}`,
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
