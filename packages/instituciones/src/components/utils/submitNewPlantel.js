import { getToken } from '@siiges-ui/shared';
import router from 'next/router';

export default function submitNewPlantel({
  errors, form, setNoti, setLoading,
}) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const isValid = Object.keys(errors).every((campo) => errors[campo]());

  if (!isValid) {
    setNoti({
      open: true,
      message: '¡Algo salió mal, revisa que los campos estén correctos!',
      type: 'error',
    });
    return;
  }

  const { institucionId } = router.query;
  fetch(
    `${url}/api/v1/instituciones/${institucionId}/planteles`,
    {
      method: 'POST',
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
      throw new Error('Error submitting the request');
    })
    .then(
      setNoti({
        open: true,
        message: '¡Se creó el plantel exitosamente!',
        type: 'success',
      }),
      setTimeout(() => {
        setLoading(true);
      }, 2000),
      setTimeout(() => {
        setLoading(false);
        router.back();
      }, 3000),
    )
    .catch(() => {
      setNoti({
        open: true,
        message: 'Algo salió mal, revisa que los campos estén correctos',
        type: 'error',
      });
    });
}
