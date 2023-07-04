import router from 'next/router';

export default function submitEditUser(userErrors, error, form, setNoti, id, token) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  if (Object.values(userErrors).every((validation) => validation()) !== false) {
    if (Object.values(error).every((x) => x === null || x === '')) {
      fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          api_key: apikey,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form),
      })
        .then((response) => {
          if(response.status === 200) {
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
            return response.json();
          }
      })
        .catch((err) => {
        console.error('Error:', err);
      });
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
