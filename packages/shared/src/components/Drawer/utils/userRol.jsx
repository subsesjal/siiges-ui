import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { optionsMenuFilter } from './menuUsers';

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
        text: 'Mi institución',
        icon: <BusinessIcon />,
        route: '/instituciones/miInstitucion',
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
  if (session.rol === 'capturista_opd') {
    setUsers([
      {
        text: 'Instituciones',
        icon: <BusinessIcon />,
        route: '/opds/instituciones',
        key: 'intitutions',
      },
      {
        text: 'Órganos colegiados',
        icon: <GroupsIcon />,
        route: '/opds/organosColegiados',
        key: 'organosColegiados',
      },
      {
        text: 'Fortalecimiento',
        icon: <ArticleIcon />,
        route: '/opds/fortalecimiento',
        key: 'fortalecimeiento',
      },
      {
        text: 'Presupuesto',
        icon: <RequestQuoteIcon />,
        route: '/opds/presupuesto',
        key: 'presupuesto',
      },
    ]);
  }

  if (session.rol === 'admin') {
    setUsers(optionsMenuFilter[section]);
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
