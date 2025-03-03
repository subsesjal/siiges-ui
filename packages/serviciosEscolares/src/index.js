import columnsProgramas from './Tables/programas';
import FormAlumno from './Components/Alumnos/FormAlumno';
import AlumnosForm from './Components/Alumnos/AlumnosForm';
import getGrupoById from './Components/utils/getGrupoById';
import columnsAsignaturas from './Tables/inscripcionesTable';
import AlumnosTable from './Components/Alumnos/AlumnosTable';
import FoliosData from './Components/Folios/FoliosData/index';
import FoliosForm from './Components/Folios/FoliosForm/index';
import FoliosTable from './Components/Folios/FoliosTable/index';
import ProgramasForm from './Components/Programas/ProgramasForm';
import HistorialTable from './Components/Alumnos/HistorialTable';
import ProgramasTable from './Components/Programas/ProgramasTable';
import DatosAlumno from './Components/Validacion/DatosAlumno/index';
import AdminTable from './Components/Folios/FoliosTable/adminTable';
import Grupos from './Components/Programas/ProgramasSections/Grupos';
import Reglas from './Components/Programas/ProgramasSections/Reglas';
import getAsignaturaById from './Components/utils/getAsignaturaById';
import ModalTitulo from './Components/Folios/FoliosData/Modal/titulos';
import ValidacionForm from './Components/Validacion/ValidacionForm/index';
import InscripcionForm from './Components/Inscripciones/InscripcionesForm';
import submitCalificaciones from './Components/utils/submitCalificaciones';
import Calificaciones from './Components/Acreditacion/Calificaciones/index';
import ValidacionTable from './Components/Validacion/ValidacionTable/index';
import BecasComponent from './Components/BecasServiciosSociales/Becas/index';
import ModalAlumnosInscritos from './Components/utils/ModalAlumnosInscritos';
import DatosInstitucion from './Components/Validacion/DatosInstitucion/index';
import ButtonsFoliosAdmin from './Components/Folios/ButtonsFoliosAdmin/index';
import getAlumnosAcreditacion from './Components/utils/getAlumnosAcreditacion';
import Asignaturas from './Components/Programas/ProgramasSections/Asignaturas';
import InscripcionesTable from './Components/Inscripciones/InscripcionesTable';
import DocumentosAlumno from './Components/Alumnos/FormAlumno/DocumentosAlumno';
import columnsInstitucionesAutorizadas from './Tables/institucionesAutorizadas';
import RevalidacionEquivalencias from './Components/RevalidacionesEquivalencias';
import ActionsAlumnosInscritos from './Components/utils/ActionsAlumnosInscritos';
import ModalCertificado from './Components/Folios/FoliosData/Modal/certificados';
import FechaExamenInput from './Components/utils/Calificaciones/FechaExamenInput';
import ProgramasData from './Components/Programas/ProgramasSections/ProgramasData';
import CalificacionInput from './Components/utils/Calificaciones/CalificacionInput';
import DetallesAsignatura from './Components/Acreditacion/DetallesAsignatura/index';
import CiclosEscolares from './Components/Programas/ProgramasSections/CiclosEscolares';
import AsignarBecas from './Components/BecasServiciosSociales/Becas/utils/AsignarBecas';
import AcreditacionAsignaturas from './Components/Acreditacion/AcreditacionAsignaturas.jsx';
import ActionsAcreditacionAsignaturas from './Components/utils/ActionsAcreditacionAsignaturas';
import ButtonsInstitucionesAutorizadas from './Components/utils/ButtonsInstitucionesAutorizadas';
import ServicioSocialComponent from './Components/BecasServiciosSociales/ServiciosSociales/index';

export {
  Grupos,
  Reglas,
  AdminTable,
  FormAlumno,
  FoliosData,
  FoliosForm,
  ModalTitulo,
  FoliosTable,
  Asignaturas,
  AlumnosForm,
  DatosAlumno,
  AsignarBecas,
  AlumnosTable,
  getGrupoById,
  ProgramasForm,
  ProgramasData,
  BecasComponent,
  Calificaciones,
  HistorialTable,
  ProgramasTable,
  ValidacionForm,
  InscripcionForm,
  CiclosEscolares,
  ValidacionTable,
  DatosInstitucion,
  ModalCertificado,
  columnsProgramas,
  DocumentosAlumno,
  FechaExamenInput,
  getAsignaturaById,
  CalificacionInput,
  ButtonsFoliosAdmin,
  columnsAsignaturas,
  InscripcionesTable,
  DetallesAsignatura,
  submitCalificaciones,
  ModalAlumnosInscritos,
  getAlumnosAcreditacion,
  ActionsAlumnosInscritos,
  AcreditacionAsignaturas,
  ServicioSocialComponent,
  RevalidacionEquivalencias,
  ActionsAcreditacionAsignaturas,
  columnsInstitucionesAutorizadas,
  ButtonsInstitucionesAutorizadas,
};
