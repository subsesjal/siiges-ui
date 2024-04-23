import { getToken } from '@siiges-ui/shared';
import DiligenciasToRows from './Components/DiligenciasToRows';

const handleCreate = (
  form,
  setDiligencias,
  setDiligenciasRows,
  hideModal,
  setNoti,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

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
      hideModal();
      setNoti({
        open: true,
        message: 'Exito, no hubo problemas en esta sección',
        type: 'success',
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    });
};

export default handleCreate;
