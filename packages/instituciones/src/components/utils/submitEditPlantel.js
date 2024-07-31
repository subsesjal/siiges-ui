import { getToken } from '@siiges-ui/shared';
import router from 'next/router';

export default function submitEditPlantel(form, setNoti) {
  const token = getToken();
  const { institucionId, plantelId } = router.query;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  fetch(
    `${url}/api/v1/instituciones/${institucionId}/planteles/${plantelId}`,
    {
      method: 'PATCH',
      headers: { api_key: apikey, Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    },
  )
    .then(
      setNoti({
        open: true,
        message: '¡Se editó el plantel exitosamente!',
        type: 'success',
      }),
    )
    .catch(() => {
      setNoti({
        open: true,
        message: '¡Algo salió mal, revisa que los campos estén correctos!',
        type: 'error',
      });
    });
}
