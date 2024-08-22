import { getToken } from '@siiges-ui/shared';
import router from 'next/router';

export default function submitEditPlantel({
  form,
  setNoti,
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
    .then(
      setNoti({
        open: true,
<<<<<<< HEAD
<<<<<<< HEAD
        message: 'Se editó el plantel exitosamente',
=======
        message: '¡Se editó el plantel exitosamente!',
>>>>>>> 1fbf427 (correcciones de ortografía y archivos)
=======
        message: '¡Se editó el plantel exitosamente!',
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
        type: 'success',
      }),
    )
    .catch(() => {
      setNoti({
        open: true,
<<<<<<< HEAD
<<<<<<< HEAD
        message: 'Algo salió mal, revisa que los campos esten correctos',
=======
        message: '¡Algo salió mal, revisa que los campos estén correctos!',
>>>>>>> 1fbf427 (correcciones de ortografía y archivos)
=======
        message: '¡Algo salió mal, revisa que los campos estén correctos!',
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
        type: 'error',
      });
    });
}
