import { getToken } from '@siiges-ui/shared';

export default async function submitInstitucion(
  validations,
  sections,
  id,
  setNoti,
  router,
  setLoading,
  setSections,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form } = validations;
  const token = getToken();

  try {
    setLoading(true);

    const patchResponse = await fetch(`${url}/api/v1/solicitudes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form[sections]),
    });

    if (!patchResponse.ok) {
      const errorData = await patchResponse.json();
      throw new Error(errorData.message || 'Error submitting the request');
    }

    const data = await patchResponse.json();

    const postResponse = await fetch(`${url}/api/v1/solicitudes/${id}/secciones/14`, {
      method: 'POST',
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(errorData.message || 'Error fetching the section data');
    }

    setSections((prevSections) => prevSections.map((section) => {
      if (section.id === 14) {
        return { ...section, disabled: true };
      }
      return section;
    }));

    setNoti({
      open: true,
      message: '¡Éxito, no hubo problemas en esta sección!',
      type: 'success',
    });

    const newPlantelId = data.data.programa.plantelId;
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, plantel: newPlantelId },
      },
      '/solicitudes/nuevaSolicitud',
    );
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
