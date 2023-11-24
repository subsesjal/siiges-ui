import columnsProgramas from './Tables/programas';
import FormAlumno from './Components/Alumnos/FormAlumno';
import AlumnosForm from './Components/Alumnos/AlumnosForm';
import getGrupoById from './Components/utils/getGrupoById';
import columnsAsignaturas from './Tables/inscripcionesTable';
import AlumnosTable from './Components/Alumnos/AlumnosTable';
import ProgramasForm from './Components/Programas/ProgramasForm';
import ProgramasTable from './Components/Programas/ProgramasTable';
import Grupos from './Components/Programas/ProgramasSections/Grupos';
import Reglas from './Components/Programas/ProgramasSections/Reglas';
import getAsignaturaById from './Components/utils/getAsignaturaById';
import InscripcionForm from './Components/Inscripciones/InscripcionesForm';
import submitCalificaciones from './Components/utils/submitCalificaciones';
import getAlumnosAcreditacion from './Components/utils/getAlumnosAcreditacion';
import ModalAlumnosInscritos from './Components/utils/ModalAlumnosInscritos';
import Asignaturas from './Components/Programas/ProgramasSections/Asignaturas';
import InscripcionesTable from './Components/Inscripciones/InscripcionesTable';
import DocumentosAlumno from './Components/Alumnos/FormAlumno/DocumentosAlumno';
import columnsInstitucionesAutorizadas from './Tables/institucionesAutorizadas';
import ActionsAlumnosInscritos from './Components/utils/ActionsAlumnosInscritos';
import ProgramasData from './Components/Programas/ProgramasSections/ProgramasData';
import DetallesAsignatura from './Components/Acreditacion/DetallesAsignatura/index';
import CiclosEscolares from './Components/Programas/ProgramasSections/CiclosEscolares';
import AcreditacionAsignaturas from './Components/Acreditacion/AcreditacionAsignaturas.jsx';
import ActionsAcreditacionAsignaturas from './Components/utils/ActionsAcreditacionAsignaturas';
import ButtonsInstitucionesAutorizadas from './Components/utils/ButtonsInstitucionesAutorizadas';

export {
  Grupos,
  Reglas,
  FormAlumno,
  Asignaturas,
  AlumnosForm,
  AlumnosTable,
  getGrupoById,
  ProgramasForm,
  ProgramasData,
  ProgramasTable,
  InscripcionForm,
  CiclosEscolares,
  columnsProgramas,
  DocumentosAlumno,
  getAsignaturaById,
  columnsAsignaturas,
  InscripcionesTable,
  DetallesAsignatura,
  submitCalificaciones,
  ModalAlumnosInscritos,
  getAlumnosAcreditacion,
  ActionsAlumnosInscritos,
  AcreditacionAsignaturas,
  ActionsAcreditacionAsignaturas,
  columnsInstitucionesAutorizadas,
  ButtonsInstitucionesAutorizadas,
};
