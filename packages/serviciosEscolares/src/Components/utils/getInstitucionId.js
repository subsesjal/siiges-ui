import { getParentUserById } from '@siiges-ui/shared';

/**
 * Obtiene el ID de institución vinculado a un usuario, considerando su rol.
 * Si es "ce_ies", obtiene el usuario padre antes de buscar.
 *
 * @param {Object} params
 * @param {Array} params.instituciones - Lista de instituciones (con usuarioId).
 * @param {Object} params.session - Objeto de sesión actual.
 * @returns {Promise<string>} - ID de la institución o cadena vacía si no se encuentra.
 */
const getInstitucionIdFromSession = async ({
  instituciones,
  session,
}) => {
  const rolesPermitidos = ['representante', 'ce_ies'];
  if (!instituciones || !Array.isArray(instituciones) || !instituciones.length) return '';
  if (!rolesPermitidos.includes(session.rol)) return '';

  let idParaBuscar = session.id;

  if (session.rol === 'ce_ies') {
    const { data, statusCode } = await getParentUserById(session.id);
    if (statusCode === 200 && data?.id) {
      idParaBuscar = data.id;
    } else {
      console.error('Error obteniendo usuario padre:', data);
      return '';
    }
  }

  const index = instituciones.findIndex(
    ({ usuarioId }) => usuarioId === idParaBuscar,
  );
  return instituciones[index]?.id || '';
};

export default getInstitucionIdFromSession;
