import { getToken } from '@siiges-ui/shared';

async function submitTrayectoriaEducativa(validations) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form, setNoti } = validations;

  const token = getToken();

  try {
    const response = await fetch(`${url}/api/v1/trayectorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form[1]),
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
  } catch (err) {
    console.error('Error:', err);
    // Optionally, update the notification for the user here as well
  }
}

export default submitTrayectoriaEducativa;
