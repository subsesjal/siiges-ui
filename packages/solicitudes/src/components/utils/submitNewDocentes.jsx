import { getToken } from '@siiges-ui/shared';
import { transformDataForTable } from '../Sections/Mocks/Docentes/utils';

const handleCreate = (
  form,
  setForm,
  setInitialValues,
  setDocentesList,
  hideModal,
  setNoti,
  programaId,
  setCurrentSection,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  fetch(`${url}/api/v1/docentes`, {
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
      const transformedData = transformDataForTable([data.data]);
      setDocentesList((prevList) => [...prevList, ...transformedData]);
      setForm({ programaId, esAceptado: true, asignaturasDocentes: [] });
      setInitialValues({});
      setCurrentSection(1);
      hideModal();
      setNoti({
        open: true,
        message: 'Éxito, no hubo problemas en esta sección',
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
