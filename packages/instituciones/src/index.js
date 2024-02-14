import Institucion from './Components/Instituciones';
import InstitucionesTable from './Components/Instituciones/InstitucionesTable';
import NewInstitutionForm from './Components/Instituciones/newInstitutionForm';
import EditInstitutionForm from './Components/Instituciones/editInstitutionForm';
import NewPlantelForm from './Components/Planteles/newPlantelForm';
import EditPlantelForm from './Components/Planteles/editPlantelForm';
import ConsultPlantelesForm from './Components/Planteles/consultPlantelesForm';
import Planteles from './Components/Planteles';
import getInstitucionUsuario from './Components/utils/getInstitucionUsuario';
import getPlanteles from './Components/utils/getPlanteles';
import getPlantelesByInstitucion from './utils/getPlantelesByInstitucion';
import getInstitucion from './Components/utils/getInstitucion';
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
  Institucion,
  InstitucionesTable,
  NewInstitutionForm,
  EditInstitutionForm,
  NewPlantelForm,
  EditPlantelForm,
  ConsultPlantelesForm,
  Planteles,
  getInstitucionUsuario,
  getPlanteles,
  getProgramas,
  getInstitucion,
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
