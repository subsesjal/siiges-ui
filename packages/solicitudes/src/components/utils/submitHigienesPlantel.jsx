import { getToken } from '@siiges-ui/shared';

export default function submitHigienesPlantel(
  validations,
  setNoti,
  setLoading,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form, plantelId } = validations;
  const token = getToken();

  fetch(`${url}/api/v1/planteles/${plantelId}/higienes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form[3]),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error submitting the request');
    })
    .then(() => {
      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: 'Éxito, no hubo problemas en esta sección',
          type: 'success',
        });
      }, 1000);
    })
    .catch((err) => {
      console.error('Error:', err);
      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: 'Hubo un problema, revise que los campos estén correctos',
          type: 'error',
        });
      }, 1000);
    });
}
