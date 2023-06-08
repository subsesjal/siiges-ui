function submitNewLogin(form, errors, setErrorMessages, activateAuth) {
  if (form.usuario !== '' && form.contrasena !== '') {
    fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        activateAuth(data);
      })
      .catch((err) => {
        console.error('Error:', err);
        setErrorMessages({ name: 'usuario', message: errors.usuario });
      });
  }
}

export default submitNewLogin;
