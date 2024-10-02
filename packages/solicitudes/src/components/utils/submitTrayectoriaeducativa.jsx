import { getToken } from '@siiges-ui/shared';

async function submitTrayectoriaEducativa(validations, setLoading, setSections, solicitudId) {
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

  const trayectoriaData = form[9];

  const isValid = requiredFields.some(
    (field) => trayectoriaData[field] !== undefined && trayectoriaData[field] !== '',
  );

  if (!isValid) {
    console.error('Submission criteria not met. Required fields missing.');
    setNoti({
      open: true,
      message: '¡No es posible continuar, falta completar información obligatoria en la sección de Trayectoria Educativa!.',
      type: 'error',
    });
    setLoading(false);
    return;
  }

  const token = getToken();
  const method = trayectoriaStatus === 'edit' ? 'PATCH' : 'POST';
  const endpoint = `${url}/api/v1/trayectorias${trayectoriaStatus === 'edit' ? `/${trayectoriaData.id}` : ''}`;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(trayectoriaData),
    });

    if (!response.ok) {
      throw new Error(`Error ${method === 'POST' ? 'creating' : 'updating'} Trayectoria: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();

    setLoading(false);
    setNoti({
      open: true,
      message: '¡Éxito, no hubo problemas en esta sección!',
      type: 'success',
    });

    if (method === 'POST') {
      setTrayectoriaStatus('edit');
      setForm((prevForm) => {
        const updatedForm = { ...prevForm };
        updatedForm[9] = responseData;
        return updatedForm;
      });
    }

    await fetch(`${url}/api/v1/solicitudes/${solicitudId}/secciones/9`, {
      method: 'POST',
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw new Error(error.message || '¡Error al recuperar los datos de la sección!');
        });
      }
      return res.json();
    }).then(() => {
      setSections((prevSections) => prevSections.map((section) => {
        if (section.id === 9) {
          return { ...section, disabled: true };
        }
        return section;
      }));
    });
  } catch (err) {
    console.error('Error:', err.message);
    setLoading(false);
    setNoti({
      open: true,
      message: '¡Hubo un problema, revise que los campos estén correctos!',
      type: 'error',
    });
  }
}

export default submitTrayectoriaEducativa;
