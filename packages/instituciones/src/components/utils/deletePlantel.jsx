export default function deletePlantel(institucion, id, handleDeleteClick) {
  fetch(
    `http://localhost:3000/api/v1/instituciones/${institucion}/planteles/${id}`,
    {
      method: 'DELETE',
    },
  ).then(
    handleDeleteClick(id),
  );
}
