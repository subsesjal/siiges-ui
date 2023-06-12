export default function deletePlantel(institucion, id, handleDeleteClick) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  fetch(
    `http://localhost:3000/api/v1/instituciones/${institucion}/planteles/${id}`,
    {
      method: 'DELETE',
      headers: { api_key: apikey },
    },
  ).then(
    handleDeleteClick(id),
  );
}
