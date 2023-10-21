import InstitucionData from './components/Sections/InstitucionData';
import DatosGenerales from './components/NuevaSolicitud/DatosGenerales';
import Plantel from './components/NuevaSolicitud/Plantel';
import PlanEstudios from './components/NuevaSolicitud/PlanEstudios';
import PlataformaEducativa from './components/NuevaSolicitud/PlataformaEducativa';
import Anexos from './components/NuevaSolicitud/Anexos';
import EvaluacionCurricular from './components/NuevaSolicitud/EvaluacionCurricular';
import ChangeAddress from './components/ModuleSelector/CambioDomicilio';
import NewRequest from './components/ModuleSelector/NuevaSolicitud';
import Refrendo from './components/ModuleSelector/Refrendo';
import ModuleHeader from './components/ModuleHeader';
import getSolicitudes from './components/utils/getSolicitudes';
import errorDatosPlanEstudios from './components/utils/sections/errors/errorDatosPlanEstudios';
import errorDatosNuevaSolicitud from './components/utils/sections/errors/errorDatosNuevaSolicitud';
import SolicitudContext from './components/utils/Context/solicitudContext';
import modalidades from './components/utils/Mocks/mockModalidades';
import formData from './components/utils/sections/forms/formData';
import getSolicitudforPDF from './components/utils/getSolicitudforPDF';
import getSolicitudforPDFDetalles from './components/utils/getSolicitudforPDFDetalles';

export {
  getSolicitudforPDFDetalles,
  getSolicitudforPDF,
  NewRequest,
  ChangeAddress,
  EvaluacionCurricular,
  Refrendo,
  InstitucionData,
  ModuleHeader,
  DatosGenerales,
  Plantel,
  PlanEstudios,
  PlataformaEducativa,
  Anexos,
  getSolicitudes,
  errorDatosPlanEstudios,
  errorDatosNuevaSolicitud,
  SolicitudContext,
  modalidades,
  formData,
};
