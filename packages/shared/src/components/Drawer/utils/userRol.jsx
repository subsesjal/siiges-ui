import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';

export default function userRol(session, setUsers) {
  if (session.rol === 'representante') {
    setUsers([
      {
        text: 'Mis usuarios',
        icon: <GroupIcon />,
        route: '/usuarios',
        key: 'users',
      },
      {
        text: 'Mi institucion',
        icon: <BusinessIcon />,
        route: '/institucion',
        key: 'intitutions',
      },
      {
        text: 'Mis solicitudes',
        icon: <DescriptionIcon />,
        route: '/solicitudes',
        key: 'solicitudes',
      },
    ]);
  }

  if (session.rol === 'admin') {
    setUsers([
      {
        text: 'Mis usuarios',
        icon: <GroupIcon />,
        route: '/usuarios',
        key: 'users',
      },
      {
        text: 'Mi institucion',
        icon: <BusinessIcon />,
        route: '/institucion',
        key: 'intitutions',
      },
      {
        text: 'Mis solicitudes',
        icon: <DescriptionIcon />,
        route: '/solicitudes',
        key: 'solicitudes',
      },
    ]);
  }
  if (session.rol === 'jefe_inspector') {
    setUsers([
      {
        text: 'Inspeccion',
        icon: <SearchIcon />,
        route: '/inspecciones',
        key: 'inspecciones',
      },
    ]);
  }
}
