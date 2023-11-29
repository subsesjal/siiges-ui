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
import Calificaciones from './Components/Acreditacion/Calificaciones/index';
import getAlumnosAcreditacion from './Components/utils/getAlumnosAcreditacion';
import ModalAlumnosInscritos from './Components/utils/ModalAlumnosInscritos';
import Asignaturas from './Components/Programas/ProgramasSections/Asignaturas';
import InscripcionesTable from './Components/Inscripciones/InscripcionesTable';
import DocumentosAlumno from './Components/Alumnos/FormAlumno/DocumentosAlumno';
import columnsInstitucionesAutorizadas from './Tables/institucionesAutorizadas';
import ActionsAlumnosInscritos from './Components/utils/ActionsAlumnosInscritos';
import FechaExamenInput from './Components/utils/Calificaciones/FechaExamenInput';
import ProgramasData from './Components/Programas/ProgramasSections/ProgramasData';
import CalificacionInput from './Components/utils/Calificaciones/CalificacionInput';
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
  Calificaciones,
  ProgramasTable,
  InscripcionForm,
  CiclosEscolares,
  columnsProgramas,
  DocumentosAlumno,
  FechaExamenInput,
  getAsignaturaById,
  CalificacionInput,
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
