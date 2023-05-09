export default function SubmitDocument(formData) {
  if (formData !== undefined) {
    fetch('http://localhost:3000/api/v1/files/', {
      method: 'POST',
      body: formData,
    });
  }
}
