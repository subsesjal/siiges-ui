import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SchoolIcon from '@mui/icons-material/School';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

export default function userRol(session, setUsers, section, institucionRoute) {
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
        route: institucionRoute,
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
          text: 'Usuarios',
          icon: <GroupIcon />,
          route: '/usuarios',
          key: 'users',
        },
        {
          text: 'Instituciones',
          icon: <BusinessIcon />,
          route: '/institucion/instituciones',
          key: 'intitutions',
        },
        {
          text: 'Solicitudes',
          icon: <DescriptionIcon />,
          route: '/solicitudes',
          key: 'solicitudes',
        },
      ]);
    } else if (section === 2) {
      setUsers([
        {
          text: 'Programas',
          icon: <AssignmentIcon />,
          route: '/serviciosEscolares/programas',
          key: 'programas',
        },
        {
          text: 'Alumnos',
          icon: <PersonIcon />,
          route: '/serviciosEscolares/alumnos',
          key: 'alumnos',
        },
        {
          text: 'Validación',
          icon: <AssignmentTurnedInIcon />,
          route: '/serviciosEscolares/validacion',
          key: 'validacion',
        },
        {
          text: 'Inscripción',
          icon: <PersonAddIcon />,
          route: '/serviciosEscolares/inscripcion',
          key: 'inscripcion',
        },
        {
          text: 'Acreditación',
          icon: <HistoryEduIcon />,
          route: '/serviciosEscolares/acreditacion',
          key: 'acreditacion',
        },
        {
          text: 'Titulación',
          icon: <SchoolIcon />,
          route: '/serviciosEscolares/titulacion',
          key: 'titulacion',
        },
        {
          text: 'Otros Tramites',
          icon: <MoreHorizIcon />,
          type: 'dropdown',
          options: [
            { text: 'Revalidación y Equivalencias', route: '/serviciosEscolares/revalidacionEquivalencias' },
            { text: 'Becas y Servicio Social', route: '/serviciosEscolares/becasServicioSocial' },
          ],
          key: 'otrosTramites',
        },
        {
          text: 'Reporte',
          icon: <AssignmentLateIcon />,
          route: '/serviciosEscolares/reporte',
          key: 'reporte',
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
