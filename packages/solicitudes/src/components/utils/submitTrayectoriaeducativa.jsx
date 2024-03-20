import { getToken } from '@siiges-ui/shared';

async function submitTrayectoriaEducativa(validations) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const {
    form, setForm, setNoti, trayectoriaStatus, setTrayectoriaStatus,
  } = validations;

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

    setNoti({
      open: true,
      message: 'Exito, no hubo problemas en esta sección',
      type: 'success',
    });
    if (method === 'POST') {
      const responseData = await response.json();
      setTrayectoriaStatus('edit');
      setForm((prevForm) => {
        const updatedForm = [...prevForm];
        updatedForm[9] = responseData;
        return updatedForm;
      });
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

export default submitTrayectoriaEducativa;
