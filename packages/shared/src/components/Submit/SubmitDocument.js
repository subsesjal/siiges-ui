export default function SubmitDocument(formData, setUrl) {
  if (formData !== undefined) {
    fetch('http://localhost:3000/api/v1/files/', {
      method: 'POST',
      body: formData,
    })
      .then((data) => {
        console.log(data);
        setUrl(data.ubicacion);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }
}
