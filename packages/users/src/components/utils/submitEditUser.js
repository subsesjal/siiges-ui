import router from 'next/router';

export default function submitEditUser(userErrors, error, form, setNoti, id) {
  if (Object.values(userErrors).every((validation) => validation()) !== false) {
    if (Object.values(error).every((x) => x === null || x === '')) {
      fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
        method: 'PATCH',
        headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
        body: JSON.stringify(form),
      });
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
