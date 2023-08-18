import { useRouter } from 'next/router';

export default function submitEditUser(
  userErrors,
  error,
  form,
  setNoti,
  id,
  token,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();

  const isSuccessResponse = (response) => response.status === 200;

  if (!Object.values(userErrors).every((validation) => validation() !== false)) {
    setNoti({
      open: true,
      message: 'Algo salió mal, revisa que los campos estén correctos',
      type: 'error',
    });
    return;
  }

  if (!Object.values(error).every((x) => x === null || x === '')) {
    setNoti({
      open: true,
      message: 'Algo salió mal, revisa que los campos estén correctos',
      type: 'error',
    });
    return;
  }

  fetch(`${url}/api/v1/usuarios/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      if (isSuccessResponse(response)) {
        setNoti({
          open: true,
          message: 'Se editó el usuario exitosamente',
          type: 'success',
        });
        setTimeout(() => {
          router.back();
        }, 3000);
      } else {
        setNoti({
          open: true,
          message: 'Algo salió mal, revisa que los campos estén correctos',
          type: 'error',
        });
      }
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}
