import { getToken } from '@siiges-ui/shared';

export default function submitEditSolicitud(
  validations,
  sectionId,
  id,
  setLoading,
  setSections,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form, setNoti } = validations;
  const token = getToken();

  fetch(`${url}/api/v1/solicitudes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form[sectionId]),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error submitting the request');
      }
      return response.json();
    })
    .then(() => fetch(`${url}/api/v1/solicitudes/${id}/secciones/${sectionId}`, {
      method: 'POST',
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    }))
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching the section data');
      }
      return response.json();
    })
    .then(() => {
      // Update the sections state
      setSections((prevSections) => prevSections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, disabled: true };
        }
        return section;
      }));

      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: 'Exito, no hubo problemas en esta sección',
          type: 'success',
        });
      }, 1000);
    })
    .catch((err) => {
      console.error('Error:', err);
      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: `Hubo un problema, revise que los campos estén correctos: ${err}`,
          type: 'error',
        });
      }, 1000);
    });
}
