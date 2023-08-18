export default function SubmitDocument(formData, setUrl) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  if (formData !== undefined) {
    fetch(`${url}/api/v1/files/`, {
      method: 'POST',
      headers: { api_key: apikey },
      body: formData,
    })
      .then((data) => {
        setUrl(data.ubicacion);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }
}
