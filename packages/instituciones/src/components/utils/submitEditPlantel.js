import router from 'next/router';

export default function submitEditPlantel(form, setNoti, token) {
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
        message: 'Se edito el plantel exitosamente',
        type: 'success',
      }),
    )
    .catch(() => {
      setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    });
}
