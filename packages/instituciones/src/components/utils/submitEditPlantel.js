import router from 'next/router';

export default function submitEditPlantel(form, setNoti) {
  const { institucionId, plantelId } = router.query;
  fetch(`http://localhost:3000/api/v1/instituciones/${institucionId}/planteles/${plantelId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
    .then(
      setNoti({
        open: true,
        message: 'Se creo el plantel exitosamente',
        type: 'success',
      }),
    )
    .catch((err) => {
      console.log(err);

      setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    });
}
