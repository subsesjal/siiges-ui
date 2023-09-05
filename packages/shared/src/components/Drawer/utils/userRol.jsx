import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';

export default function userRol(session, setUsers, section) {
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
        route: '/institucion/nuevaInstitucion',
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
    if (section === 1) {
      setUsers([
        {
          text: 'Mis usuarios',
          icon: <GroupIcon />,
          route: '/usuarios',
          key: 'users',
        },
        {
          text: 'Mis instituciones',
          icon: <BusinessIcon />,
          route: '/institucion/instituciones',
          key: 'intitutions',
        },
        {
          text: 'Mis solicitudes',
          icon: <DescriptionIcon />,
          route: '/solicitudes',
          key: 'solicitudes',
        },
      ]);
    } else if (section === 2) {
      setUsers([
        {
          text: 'Servicios escolares',
          icon: <SchoolIcon />,
          route: '/serviciosEscolares',
          key: 'serviciosEscolares',
        },
      ]);
    }
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
