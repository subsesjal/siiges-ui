import { getToken } from '@siiges-ui/shared';
import { transformDataForTable } from '../Sections/Mocks/Docentes/utils';

const handleSubmit = (
  form,
  setForm,
  setInitialValues,
  setDocentesList,
  hideModal,
  setNoti,
  programaId,
  setCurrentSection,
  mode,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  const isEditMode = mode === 'edit';
  const method = isEditMode ? 'PATCH' : 'POST';
  const endpoint = isEditMode ? `${url}/api/v1/docentes/${form.id}` : `${url}/api/v1/docentes`;

  console.log(form);

  fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      if (isEditMode) {
        setDocentesList(
          (prevList) => prevList.map(
            (item) => (item.id === form.id ? transformDataForTable([data.data])[0] : item),
          ),
        );
        setNoti({
          open: true,
          message: 'Docente editado con éxito',
          type: 'success',
        });
      } else {
        const transformedData = transformDataForTable([data.data]);
        setDocentesList((prevList) => [...prevList, ...transformedData]);
        setForm({ programaId, esAceptado: true, asignaturasDocentes: [] });
        setInitialValues({});
        setNoti({
          open: true,
          message: 'Docente creado con éxito',
          type: 'success',
        });
      }
      setCurrentSection(1);
      hideModal();
    })
    .catch((error) => {
      setNoti({
        open: true,
        message: `Error al enviar Docente: ${error.message}`,
        type: 'error',
      });
    });
};

export default handleSubmit;
