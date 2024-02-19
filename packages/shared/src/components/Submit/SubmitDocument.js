export default async function SubmitDocument(formData, setUrl, setNoti) {
  try {
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const url = process.env.NEXT_PUBLIC_URL;

    if (!formData) {
      throw new Error('No FormData provided.');
    }

    const response = await fetch(`${url}/api/v1/files/`, {
      method: 'POST',
      headers: { api_key: apikey },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload document: ${response.statusText}`);
    }

    const data = await response.json();

    if (data && data.url) {
      setUrl(data.url);
    } else {
      throw new Error('No se encontro "ubicación" en la respuesta.');
    }
  } catch (err) {
    setNoti({
      open: true,
      message: err.message || 'Algo salió mal, revise su documento',
      type: 'error',
    });
  }
}
