import { getToken } from '@siiges-ui/shared';

export default function submitInstitucion(
  validations,
  sections,
  id,
  setNoti,
  router,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form } = validations;
  const token = getToken();

  fetch(`${url}/api/v1/solicitudes/${id}`, {
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
    .then((data) => {
      setNoti({
        open: true,
        message: 'Exito, no hubo problemas en esta sección',
        type: 'success',
      });

      const newPlantelId = data.data.programa.plantelId;
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, plantel: newPlantelId },
        },
        '/solicitudes/nuevaSolicitud',
      );
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}
