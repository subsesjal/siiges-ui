import { getToken } from '@siiges-ui/shared';
import DiligenciasToRows from './Components/DiligenciasToRows';

const handleCreate = (
  form,
  setDiligencias,
  setDiligenciasRows,
  hideModal,
  setNoti,
  setLoading,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();
  hideModal();

  fetch(`${url}/api/v1/diligencias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      setDiligencias((prevList) => [...prevList, data.data]);
      const newRow = DiligenciasToRows(data.data);
      setDiligenciasRows((prevRows) => [...prevRows, newRow]);
      setNoti({
        open: true,
        message: 'Éxito, no hubo problemas en esta sección',
        type: 'success',
      });
      setLoading(false);
    })
    .catch((error) => {
      setNoti({
        open: true,
        message: `Algo salió mal, revisa que los campos estén correctos: ${error}`,
        type: 'error',
      });
      setLoading(false);
    });
};

export default handleCreate;
