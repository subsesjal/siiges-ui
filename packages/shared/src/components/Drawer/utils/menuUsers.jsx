import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SchoolIcon from '@mui/icons-material/School';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

const options = [
  { id: 1, nombre: 'Incorporación' },
  { id: 2, nombre: 'Servicios escolares' },
  { id: 3, nombre: "OPD'S" },
];

const usersMenu = [
  {
    userId: 1,
    text: 'Usuarios',
    icon: <GroupIcon />,
    route: '/usuarios',
    key: 'users',
  },
  {
    userId: 1,
    text: 'Instituciones',
    icon: <BusinessIcon />,
    route: '/instituciones',
    key: 'intitutions',
  },
  {
    userId: 1,
    text: 'Solicitudes',
    icon: <DescriptionIcon />,
    route: '/solicitudes',
    key: 'solicitudes',
  },
  {
    userId: 2,
    text: 'Programas',
    icon: <AssignmentIcon />,
    route: '/serviciosEscolares/programas',
    key: 'programas',
  },
  {
    userId: 2,
    text: 'Alumnos',
    icon: <PersonIcon />,
    route: '/serviciosEscolares/alumnos',
    key: 'alumnos',
  },
  {
    userId: 2,
    text: 'Validación',
    icon: <AssignmentTurnedInIcon />,
    route: '/serviciosEscolares/validacion',
    key: 'validacion',
  },
  {
    userId: 2,
    text: 'Inscripción',
    icon: <PersonAddIcon />,
    route: '/serviciosEscolares/inscripcion',
    key: 'inscripcion',
  },
  {
    userId: 2,
    text: 'Acreditación',
    icon: <HistoryEduIcon />,
    route: '/serviciosEscolares/acreditacion',
    key: 'acreditacion',
  },
  {
    userId: 2,
    text: 'Titulación',
    icon: <SchoolIcon />,
    route: '/serviciosEscolares/titulacion',
    key: 'titulacion',
  },
  {
    userId: 2,
    text: 'Otros Tramites',
    icon: <MoreHorizIcon />,
    type: 'dropdown',
    options: [
      {
        text: 'Revalidación y Equivalencias',
        route: '/serviciosEscolares/revalidacionEquivalencias',
      },
      {
        text: 'Becas y Servicio Social',
        route: '/serviciosEscolares/becasServicioSocial',
      },
    ],
    key: 'otrosTramites',
  },
  {
    userId: 2,
    text: 'Reporte',
    icon: <AssignmentLateIcon />,
    route: '/serviciosEscolares/reporte',
    key: 'reporte',
  },
  {
    userId: 3,
    text: 'Instituciones',
    icon: <BusinessIcon />,
    route: '/opds/instituciones',
    key: 'intitutions',
  },
  {
    userId: 3,
    text: 'Órganos colegiados',
    icon: <GroupsIcon />,
    route: '/opds/organosColegiados',
    key: 'organosColegiados',
  },
  {
    userId: 3,
    text: 'Fortalecimiento',
    icon: <ArticleIcon />,
    route: '/opds/fortalecimiento',
    key: 'fortalecimeiento',
  },
  {
    userId: 3,
    text: 'Presupuesto',
    icon: <RequestQuoteIcon />,
    route: '/opds/presupuesto',
    key: 'presupuesto',
  },
];

const optionsMenuFilter = options.map(({ id }) => usersMenu.filter(({ userId }) => userId === id));
optionsMenuFilter.unshift(null);

/**
 * Finds the userId associated with a given path.
 *
 * @param {string} path - The path to search for.
 * @returns {number} - The userId associated with the path.
 */
const findRoute = (path) => {
  const wordSearch = path.split('/')[1];
  const { userId } = usersMenu.find(
    ({ route }) => route && route.startsWith(`/${wordSearch}`),
  );
  return userId;
};

export { findRoute, optionsMenuFilter, usersMenu };
