import router from 'next/router';

export default function deleteUser(id, token) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  fetch(`${url}/api/v1/usuarios/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      api_key: apikey,
    },
  });

  setTimeout(() => {
    router.push('/home');
  }, 1000);
}
