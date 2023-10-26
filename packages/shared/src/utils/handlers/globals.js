let Token = null;

export function setToken(initialToken) {
  Token = initialToken;
}

export function getToken() {
  if (typeof window !== 'undefined') {
    Token = JSON.parse(window.localStorage.getItem('token') || 'null');
  }
  return Token;
}
