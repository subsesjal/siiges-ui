import InstitucionBox from './Components/Instituciones/InstitucionBox';
import InstitucionView from './Components/Instituciones/InstitucionView';
import InstitucionesTable from './Components/Instituciones/InstitucionesTable';
import InstitucionForm from './Components/Instituciones/InstitucionForm';
import EditInstitutionForm from './Components/Instituciones/editInstitutionForm';
import NewPlantelForm from './Components/Planteles/newPlantelForm';
import EditPlantelForm from './Components/Planteles/editPlantelForm';
import ConsultPlantelesForm from './Components/Planteles/consultPlantelesForm';
import PlantelesTable from './Components/Planteles/PlantelesTable';
import getInstitucionUsuario from './Components/utils/getInstitucionUsuario';
import getPlanteles from './Components/utils/getPlanteles';
import getPlantelesByInstitucion from './utils/getPlantelesByInstitucion';
import getInstitucionHook from './utils/getInstitucionHook';
import getInstituciones from './utils/getInstituciones';
import getProgramas from './utils/getProgramas';
import getGrados from './utils/getGrados';
import getCiclosEscolares from './utils/getCiclosEscolares';
import getGrupos from './utils/getGrupos';
import getAlumnoByMatricula from './utils/getAlumnoByMatricula';
import PlantelesInstitucionesAuth from './Components/Planteles/plantelesInstitucionesAuth';
import postAsignaturasAlumno from './utils/postAsignaturasAlumno';
import getInscripcionesAlumnos from './utils/getInscripcionesAlumnos';

export {
  InstitucionBox,
  InstitucionView,
  InstitucionesTable,
  InstitucionForm,
  EditInstitutionForm,
  NewPlantelForm,
  EditPlantelForm,
  ConsultPlantelesForm,
  PlantelesTable,
  getInstitucionUsuario,
  getPlanteles,
  getProgramas,
  getInstitucionHook,
  getInstituciones,
  PlantelesInstitucionesAuth,
  getPlantelesByInstitucion,
  getGrados,
  getCiclosEscolares,
  getGrupos,
  getAlumnoByMatricula,
  postAsignaturasAlumno,
  getInscripcionesAlumnos,
};
