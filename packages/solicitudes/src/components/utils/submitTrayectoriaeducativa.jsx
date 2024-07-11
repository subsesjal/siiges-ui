import { getToken } from '@siiges-ui/shared';

async function submitTrayectoriaEducativa(validations, setLoading) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const {
    form, setForm, setNoti, trayectoriaStatus, setTrayectoriaStatus,
  } = validations;

  const requiredFields = [
    'programaSeguimiento',
    'tipoTutoria',
    'estadisticasTitulacion',
    'funcionTutorial',
    'modalidadesTitulacion',
    'tasaEgreso',
  ];

  const isValid = requiredFields.some(
    (field) => form[9][field] !== undefined && form[9][field] !== '',
  );

  if (!isValid) {
    console.error(
      'Submission criteria not met. At least one required field must be present.',
    );
    setNoti({
      open: true,
      message:
        '¡No es posible continuar, falta completar información obligatoria en la sección de Trayectoria Educativa!.',
      type: 'error',
    });
    return;
  }

  const token = getToken();
  const method = trayectoriaStatus === 'edit' ? 'PATCH' : 'POST';
  const endpoint = trayectoriaStatus === 'edit'
    ? `${url}/api/v1/trayectorias/${form[9].id}`
    : `${url}/api/v1/trayectorias`;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form[9]),
    });

    if (!response.ok) {
      throw new Error(
        `Error submitting the request: ${response.status} ${response.statusText}`,
      );
    }

    setTimeout(() => {
      setLoading(false);
      setNoti({
        open: true,
        message: '¡Éxito, no hubo problemas en esta sección!',
        type: 'success',
      });
    }, 1000);
    if (method === 'POST') {
      const responseData = await response.json();
      setTrayectoriaStatus('edit');
      setForm((prevForm) => {
        const updatedForm = { ...prevForm };
        updatedForm[9] = responseData;
        return updatedForm;
      });
    }
  } catch (err) {
    console.error('Error:', err);
    setTimeout(() => {
      setLoading(false);
      setNoti({
        open: true,
        message: '¡Hubo un problema, revise que los campos estén correctos!',
        type: 'error',
      });
    }, 1000);
  }
}

export default submitTrayectoriaEducativa;
