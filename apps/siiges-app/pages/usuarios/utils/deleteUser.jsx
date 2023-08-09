import router from 'next/router';

export default function deleteUser(id, token) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
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
