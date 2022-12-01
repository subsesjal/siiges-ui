import router from 'next/router';

export default function submitNewUser(userErrors, error, form, setNoti, session) {
  if (Object.values(userErrors).every((validation) => validation()) !== false) {
    if (Object.values(error).every((x) => x === null || x === '')) {
      if (session.rol === 'admin') {
        fetch('http://localhost:3000/api/v1/usuarios/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else if (session.rol === 'representante') {
        fetch(`http://localhost:3000/api/v1/usuarios/${session.id}/usuario`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        setNoti({
          open: true,
          message: 'No tienes acceso para crear nuevos usuarios',
          type: 'error',
        });
      }
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
