function submitNewLogin(form, errors, setErrorMessages, activateAuth) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  if (form.usuario !== '' && form.contrasena !== '') {
    fetch(`${url}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', api_key: apikey },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 404) {
          setErrorMessages({ usuario: errors.usuario });
          throw new Error('Not Found');
        }
        if (response.status === 401) {
          setErrorMessages({ contrasena: errors.contrasena });
          throw new Error('Unauthorized');
        }

        throw new Error(response.status);
      })
      .then((data) => {
        activateAuth(data);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }
}

export default submitNewLogin;
