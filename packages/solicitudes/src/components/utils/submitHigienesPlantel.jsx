import { getToken } from '@siiges-ui/shared';

export default async function submitHigienesPlantel(
  validations,
  setNoti,
  setLoading,
  setSections,
  id,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form, plantelId } = validations;
  const token = getToken();

  try {
    setLoading(true);

    const postHigienesResponse = await fetch(`${url}/api/v1/planteles/${plantelId}/higienes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form[3]),
    });

    if (!postHigienesResponse.ok) {
      const errorData = await postHigienesResponse.json();
      throw new Error(errorData.message || 'Error submitting the higienes data');
    }

    const postSectionResponse = await fetch(`${url}/api/v1/solicitudes/${id}/secciones/16`, {
      method: 'POST',
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!postSectionResponse.ok) {
      const errorData = await postSectionResponse.json();
      throw new Error(errorData.message || 'Error disabling section 11');
    }

    setSections((prevSections) => prevSections.map((section) => {
      if (section.id === 16) {
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
      message: `¡Hubo un problema!: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
}
