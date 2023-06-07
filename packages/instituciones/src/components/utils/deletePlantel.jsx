export default function deletePlantel(institucion, id, handleDeleteClick) {
  fetch(
    `http://localhost:3000/api/v1/instituciones/${institucion}/planteles/${id}`,
    {
      method: 'DELETE',
      headers: { api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
    },
  ).then(
    handleDeleteClick(id),
  );
}
