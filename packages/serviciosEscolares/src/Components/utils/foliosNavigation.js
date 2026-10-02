const CREATE_KEY = 'foliosCrear';
const MODO_KEY = 'foliosModo';

const getStorage = () => (typeof window !== 'undefined' ? window.sessionStorage : null);

const readJson = (key) => {
  try {
    const raw = getStorage()?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const writeJson = (key, value) => {
  try {
    getStorage()?.setItem(key, JSON.stringify(value));
  } catch (error) {
    // sessionStorage no disponible: la pantalla cae a sus valores por defecto
  }
};

export const saveCreateContext = (data) => writeJson(CREATE_KEY, data);

export const readCreateContext = () => readJson(CREATE_KEY);

export const saveModo = (id, modo) => writeJson(MODO_KEY, { id: String(id), modo });

export const readModo = (id) => {
  const saved = readJson(MODO_KEY);
  return saved && saved.id === String(id) ? saved.modo : null;
};
