export default function deleteUser(id) {
  fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
    method: 'DELETE',
  });
}
