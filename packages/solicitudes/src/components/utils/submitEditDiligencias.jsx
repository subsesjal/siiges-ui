import { getToken } from '@siiges-ui/shared';
import DiligenciasToRows from './Components/DiligenciasToRows';

const handleEdit = (
  form,
  setDiligencias,
  setDiligenciasRows,
  hideModal,
  setNoti,
  id,
  setLoading,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();
  hideModal();

  fetch(`${url}/api/v1/diligencias/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      const updatedDiligencia = data.data;

      setDiligencias(
        (prevList) => prevList.map(
          (item) => (item.id === updatedDiligencia.id ? updatedDiligencia : item),
        ),
      );
      setDiligenciasRows((prevRows) => prevRows.map((row) => (row.id === updatedDiligencia.id
        ? DiligenciasToRows(updatedDiligencia)
        : row)));
      setNoti({
        open: true,
        message: '¡Éxito, no hubo problemas en esta sección!',
        type: 'success',
      });
      setLoading(false);
    })
    .catch((error) => {
      setNoti({
        open: true,
        message: `¡Algo salió mal, revisa que los campos estén correctos!: ${error}`,
        type: 'error',
      });
      setLoading(false);
    });
};

export default handleEdit;
