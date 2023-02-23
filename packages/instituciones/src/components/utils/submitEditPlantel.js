import router from 'next/router';

export default function submitEditPlantel(
  plantelErrors,
  error,
  form,
  setNoti,
) {
  if (
    Object.values(plantelErrors).every((validation) => validation()) !== false
  ) {
    const { institucionId, plantelId } = router.query;
    if (Object.values(error).every((x) => x === null || x === '')) {
      fetch(
        `http://localhost:3000/api/v1/instituciones/${institucionId}/planteles/${plantelId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        },
      );
      setNoti({
        open: true,
        message: 'Se edito el usuario exitosamente',
        type: 'success',
      });
      setTimeout(() => {
        router.back();
      }, 3000);
    } else {
      setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    }
  } else {
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
  }
}
