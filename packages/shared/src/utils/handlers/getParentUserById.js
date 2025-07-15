import { getData } from './apiUtils';

/**
 * Obtiene un usuario por su ID.
 *
 * @param {string|number} id  - ID del usuario a consultar.
 * @param {string} [query]    - (Opcional) string de parámetros query, por ejemplo '?include=roles'.
 * @returns {Promise<{statusCode:number, data:any, errorMessage?:string}>}
 */
const getParentUserById = async (id, query = '') => {
  if (!id) {
    return {
      statusCode: 400,
      errorMessage: '¡ID de usuario requerido!',
      data: [],
    };
  }

  return getData({ endpoint: `/usuarios/secundario/${id}`, query });
};

export default getParentUserById;
