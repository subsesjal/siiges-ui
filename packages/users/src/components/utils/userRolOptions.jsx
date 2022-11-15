import { Context } from '@siiges-ui/shared';
import { useContext, useEffect } from 'react';

export default function userRolOptions(setUserrol) {
  const { session } = useContext(Context);
  useEffect(() => {
    if (session.rol === 'representante') {
      setUserrol([
        {
          id: '4',
          name: 'Gestor',
        },
        {
          id: '12',
          name: 'Control escolar IES',
        },
      ]);
    }

    if (session.rol === 'admin') {
      setUserrol([
        {
          id: '1',
          name: 'Usuario Nuevo',
        },
        {
          id: '2',
          name: 'Administrador',
        },
        {
          id: '3',
          name: 'Representante Legal',
        },
        {
          id: '4',
          name: 'Gestor',
        },
        {
          id: '5',
          name: 'Evaluador',
        },
        {
          id: '6',
          name: 'Inspector',
        },
        {
          id: '7',
          name: 'Revisión de documentos',
        },
        {
          id: '8',
          name: 'Sicyt de consulta',
        },
        {
          id: '9',
          name: 'Sicyt de editar',
        },
        {
          id: '10',
          name: 'Comite de evaluación',
        },
        {
          id: '11',
          name: 'Jefe de inspectores',
        },
        {
          id: '12',
          name: 'Control escolar IES',
        },
        {
          id: '13',
          name: 'Control escolar SICYT',
        },
        {
          id: '14',
          name: 'Equivalencia SICYT',
        },
      ]);
    }
  }, [session]);
  return setUserrol;
}
