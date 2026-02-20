import { getToken } from '@siiges-ui/shared';
import router from 'next/router';

export default function submitEditPlantel({
  form, setNoti, setLoading,
}) {
  const token = getToken();
  const { institucionId, plantelId } = router.query;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  fetch(
    `${url}/api/v1/instituciones/${institucionId}/planteles/${plantelId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('¡Error al enviar la solicitud!');
    })
    .then(() => {
      setNoti({
        open: true,
        message: '¡Se actualizó el plantel exitosamente!',
        type: 'success',
      });

      setTimeout(() => {
        setLoading(true);
      }, 2000);

      setTimeout(() => {
        setLoading(false);
        router.back();
      }, 3000);
    })
    .catch(() => {
      setNoti({
        open: true,
        message: '¡Algo salió mal, revisa que los campos estén correctos!',
        type: 'error',
      });
    });
}
