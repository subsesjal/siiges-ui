export default function SubmitDocument(formData, setUrl) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  if (formData !== undefined) {
    fetch('http://localhost:3000/api/v1/files/', {
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
