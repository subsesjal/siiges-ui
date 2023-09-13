export default async function SubmitDocument(formData, setUrl) {
  try {
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const url = process.env.NEXT_PUBLIC_URL;

    if (formData !== undefined) {
      const response = await fetch(`${url}/api/v1/files/`, {
        method: 'POST',
        headers: { api_key: apikey },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload document: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.ubicacion) {
        setUrl(data.ubicacion);
      } else {
        throw new Error('No "ubicacion" found in the response data.');
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}
