export default function SubmitDocument(formData, setUrl) {
  if (formData !== undefined) {
    fetch('http://localhost:3000/api/v1/files/', {
      method: 'POST',
      headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
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
