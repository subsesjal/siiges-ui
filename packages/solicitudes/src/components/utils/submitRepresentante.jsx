import { getToken } from '@siiges-ui/shared';

export default async function submitRepresentante(
  validations,
  sections,
  setNoti,
  setLoading,
  setSections,
  id,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form } = validations;
  const token = getToken();

  try {
    const patchResponse = await fetch(`${url}/api/v1/usuarios/${form[sections].id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form[sections]),
    });

    if (!patchResponse.ok) {
      throw new Error('Error submitting the request');
    }

    const postResponse = await fetch(`${url}/api/v1/solicitudes/${id}/secciones/12`, {
      method: 'POST',
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(errorData.message || '¡Error al recuperar los datos de la sección!');
    }

    setSections((prevSections) => prevSections.map((section) => {
      if (section.id === 12) {
        return { ...section, disabled: true };
      }
      return section;
    }));

    setNoti({
      open: true,
      message: '¡Éxito, no hubo problemas en esta sección!',
      type: 'success',
    });
  } catch (error) {
    console.error('Error:', error);

    setNoti({
      open: true,
      message: '¡Hubo un problema, revise que los campos estén correctos!',
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
}
