export default function deleteInstitucion(id) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  fetch(`http://localhost:3000/api/v1/instituciones/${id}`, {
    method: 'DELETE',
    headers: { api_key: apikey },
  });
}
