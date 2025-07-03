export default async function SubmitDocument(formData, setUrl) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  if (!formData) {
    throw new Error('¡No se proporcionaron datos de formulario!.');
  }

  const response = await fetch(`${url}/api/v1/files/`, {
    method: 'POST',
    headers: { api_key: apikey },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`¡No se pudo cargar el documento!: ${response.statusText}`);
  }

  const data = await response.json();

  if (data && data.ubicacion) {
    setUrl(data.ubicacion);
  } else {
    throw new Error('¡No se encontró "ubicación" en la respuesta.!');
  }
}
