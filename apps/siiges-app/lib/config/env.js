/**
 * Utilidad genérica para extraer variables de entorno
 * con validación opcional
 */

/**
 * Obtiene una variable de entorno con valor por defecto
 * @param {string} key - Nombre de la variable de entorno
 * @param {*} defaultValue - Valor por defecto si no existe
 * @returns {*} Valor de la variable o defaultValue
 */
export const getEnvVar = (key, defaultValue = null) => (process.env[key] !== undefined
  ? process.env[key] : defaultValue);

/**
 * Obtiene una variable de entorno y valida que esté en una lista de valores permitidos
 * @param {string} key - Nombre de la variable de entorno
 * @param {array} validValues - Valores permitidos
 * @param {*} defaultValue - Valor por defecto si no existe o es inválido
 * @returns {*} Valor válido de la variable o defaultValue
 */
export const getEnvVarValidated = (key, validValues = [], defaultValue = null) => {
  const value = process.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  if (validValues.length > 0 && !validValues.includes(value)) {
    console.warn(
      `Valor inválido para ${key}: "${value}". Valores permitidos: ${validValues.join(', ')}. Usando: "${defaultValue}"`,
    );
    return defaultValue;
  }

  return value;
};

export default {
  getEnvVar,
  getEnvVarValidated,
};
