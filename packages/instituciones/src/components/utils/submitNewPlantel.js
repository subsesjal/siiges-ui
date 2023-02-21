import router from 'next/router';

export default function submitNewPlantel(
  plantelErrors,
  error,
  form,
  setNoti,
  institucionId,
) {
  if (
    Object.values(plantelErrors).every((validation) => validation()) !== false
  ) {
    if (Object.values(error).every((value) => value === null || value === '')) {
      fetch(
        `http://localhost:3000/api/v1/instituciones/${institucionId}/planteles`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        },
      );
      setNoti({
        open: true,
        message: 'Se creo el plantel exitosamente',
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
