import Institucion from './components/Institucion';
import NewInstitutionForm from './components/Institucion/newInstitutionForm';
import EditInstitutionForm from './components/Institucion/editInstitutionForm';
import NewPlantelForm from './components/Planteles/newPlantelForm';
import EditPlantelForm from './components/Planteles/editPlantelForm';
import ConsultPlantelesForm from './components/Planteles/consultPlantelesForm';
import Planteles from './components/Planteles';
import getInstitucionUsuario from './components/utils/getInstitucionUsuario';
import getPlanteles from './components/utils/getPlanteles';
import getPlantelesByInstitucion from './utils/getPlantelesByInstitucion';
import getInstitucion from './components/utils/getInstitucion';
import getInstituciones from './utils/getInstituciones';
import getProgramas from './utils/getProgramas';
import PlantelesInstitucionesAuth from './components/Planteles/plantelesInstitucionesAuth';

export {
  Institucion,
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
};
