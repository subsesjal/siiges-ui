export default function submitDescripcionPlantel(
  validations,
  token,
  setNoti,
  plantelId,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { selectedCheckboxes } = validations;

  fetch(`${url}/api/v1/planteles/${plantelId}/niveles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(selectedCheckboxes),
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
