export default function deletePlantel(institucion, id, router) {
  fetch(`http://localhost:3000/api/v1/instituciones/${institucion}/planteles/${id}`, {
    method: 'DELETE',
  });
  router.reload();
}
