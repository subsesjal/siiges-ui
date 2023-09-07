import router from 'next/router';

export default function submitNewPlantel(plantelErrors, form, setNoti, token) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const isValid = Object.keys(plantelErrors).every((campo) => plantelErrors[campo]());

  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
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
        message: 'Se creo el plantel exitosamente',
        type: 'success',
      }),
      setTimeout(() => {
        router.back();
      }, 3000),
    )
    .catch(() => {
      setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    });
}
