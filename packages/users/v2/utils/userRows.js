import { formattedDate } from '@siiges-ui/shared';
import { getUserDisplayName } from './userForm';

const STATUS_LABELS = { 0: 'Desactivado', 1: 'Activado' };

const mapUsersToRows = (usuarios = []) => usuarios.map((usuario) => ({
  id: usuario.id,
  nombre: getUserDisplayName(usuario),
  usuario: usuario.usuario,
  correo: usuario.correo,
  rol: usuario.rol?.descripcion || usuario.rol?.nombre || '',
  fecha: formattedDate(usuario.createdAt),
  estatus: STATUS_LABELS[usuario.estatus] || 'Sin estatus',
  raw: usuario,
}));

export default mapUsersToRows;
