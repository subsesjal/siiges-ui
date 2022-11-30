import router from 'next/router';

export default function submitNewUser(userErrors, error, form, setNoti) {
  if (Object.values(userErrors).every((validation) => validation()) !== false) {
    if (Object.values(error).every((x) => x === null || x === '')) {
      fetch('http://localhost:3000/api/v1/usuarios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setNoti({
        open: true,
        message: 'Se añadio un usuario exitosamente',
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
