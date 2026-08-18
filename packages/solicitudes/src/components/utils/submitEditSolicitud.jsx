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
  const {
    form, setNoti, errors,
  } = validations;
  const token = getToken();

  if (errors && Object.keys(errors).length > 0) {
    const isSectionValid = Object.values(errors)
      .map((validate) => validate())
      .every(Boolean);

    if (!isSectionValid) {
      setLoading(false);
      setNoti({
        open: true,
        message: '¡Revisa los campos marcados en rojo antes de continuar!',
        type: 'error',
      });
      return;
    }
  }

  setLoading(true);

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
        return response.json().then((error) => {
          throw new Error(error.message || '¡Error al enviar la solicitud!');
        });
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
        return response.json().then((error) => {
          throw new Error(error.message || '¡Error al recuperar los datos de la sección!');
        });
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

      setLoading(false);
      setNoti({
        open: true,
        message: 'Éxito, no hubo problemas en esta sección',
        type: 'success',
      });
    })
    .catch((err) => {
      setLoading(false);
      setNoti({
        open: true,
        message: `¡Hubo un problema!, revise que los campos estén correctos: ${err.message}`,
        type: 'error',
      });
    });
}
