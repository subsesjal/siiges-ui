export default function submitRepresentante(validations, sections, token, setNoti) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const { form } = validations;

  fetch(`http://localhost:3000/api/v1/usuarios/${form[sections].id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form[sections]),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error submitting the request');
    })
    .then(() => {
      setNoti({
        open: true,
        message: 'Exito, no hubo problemas en esta sección',
        type: 'success',
      });
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}
