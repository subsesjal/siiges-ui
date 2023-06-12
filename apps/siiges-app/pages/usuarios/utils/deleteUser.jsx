export default function deleteUser(id) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
    method: 'DELETE',
    headers: { api_key: apikey },
  });
}
