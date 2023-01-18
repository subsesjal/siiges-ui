export default function deleteInstitucion(id) {
  fetch(`http://localhost:3000/api/v1/instituciones/${id}`, {
    method: 'DELETE',
  });
}
