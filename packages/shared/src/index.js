// ============================================================================
// COMPONENTES UI
// ============================================================================
import Title from './components/Title';
import Input from './components/Input';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Select from './components/Select';
import Loading from './components/Loading';
import Logo from './components/Images/Logo';
import SnackAlert from './components/Alert';
import HomePage from './components/HomePage';
import Carousel from './components/Carousel';
import DefaultModal from './components/Modal';
import LabelData from './components/LabelData';
import DataTable from './components/DataTable';
import Layout from './components/Layout/Layout';
import LinkButton from './components/LinkButton';
import Button from './components/Buttons/Button';
import StepperComponent from './components/Stepper';
import InputFile from './components/Input/InputFile';
import InputDate from './components/Input/InputDate';
import Overlay from './components/Resources/Overlay';
import PaperHome from './components/Paper/PaperHome';
import LogoWhite from './components/Images/LogoWhite';
import MenuDrawer from './components/Drawer/MenuDrawer';
import MainNavbar from './components/Navbar/MainNavbar';
import ListTitle from './components/ListItems/ListTitle';
import InputNumber from './components/Input/InputNumber';
import ButtonIcon from './components/Buttons/ButtonIcon';
import LoginLayout from './components/Layout/LoginLayout';
import ButtonsForm from './components/Buttons/ButtonsForm';
import ButtonLogin from './components/Buttons/ButtonLogin';
import Background from './components/Resources/Background';
import LoadCircle from './components/Resources/LoadCircle';
import InputDateTime from './components/Input/InputDateTime';
import InputPassword from './components/Input/InputPassword';
import ButtonStyled from './components/Buttons/ButtonStyled';
import ButtonsModal from './components/Buttons/ButtonsModal';
import ButtonSimple from './components/Buttons/ButtonSimple';
import ActionButtons from './components/Buttons/ActionButtons';
import ListSubtitle from './components/ListItems/ListSubtitle';
import SubmitDocument from './components/Submit/SubmitDocument';
import fileToFormData from './components/Submit/FileToFormData';
import PaperInstitucion from './components/Paper/PaperInstitucion';
import ButtonsSections from './components/Buttons/ButtonsSections';
import ButtonFile from './components/Buttons/ButtonFile';
import ButtonsInspeccionSection from './components/Buttons/ButtonsInspeccionSection';
import SelectAdd from './components/Select/SelectAdd';
import InputTime from './components/Input/InputTime';
import PositionDisplay from './components/PositionDisplay';
import Subtitle from './components/Subtitle';
import BinarySelect from './components/Select/BinarySelect';
import NavigationButtons from './components/Buttons/NavigationButtons';
import InputSearch from './components/Input/InputSearch';
import ButtonFileDownload from './components/Buttons/ButtonFileDownload';

// ============================================================================
// UTILIDADES
// ============================================================================
import GetFile from './utils/handlers/getFile';
import getTurnoById from './utils/handlers/turnos';
import ParseCookies from './utils/handlers/cookieHandler';
import getCurrentUser from './utils/handlers/getCurrentUser';
import { setToken, getToken } from './utils/handlers/globals';
import formattedDate from './utils/handlers/formattedDate';
import { validateFormData } from './utils/handlers/validateFormData';
import validateField from './utils/handlers/validateField';
import {
  getData,
  createRecord,
  updateRecord,
  deleteRecord,
} from './utils/handlers/apiUtils';
import estadosMexico from './utils/mocks/estadosMexico';
import getParentUserById from './utils/handlers/getParentUserById';

// ============================================================================
// CONTEXTOS (NUEVOS)
// ============================================================================
export {
  AppProvider,
  useAuth,
  useUI,
  useUser,
  useNavigation,
  Context, // Legacy - mantener para retrocompatibilidad
} from './contexts';

// ============================================================================
// HOOKS PERSONALIZADOS (NUEVOS)
// ============================================================================
export {
  useApi,
  useNotification,
  useCheckMobileScreen,
  usePlantel,
} from './hooks';

// ============================================================================
// EXPORTS
// ============================================================================
export {
  // Componentes UI
  Logo,
  Input,
  Title,
  Header,
  Navbar,
  Layout,
  Select,
  Button,
  Loading,
  GetFile,
  Overlay,
  Carousel,
  HomePage,
  LabelData,
  InputFile,
  DataTable,
  LogoWhite,
  ListTitle,
  InputDate,
  PaperHome,
  SnackAlert,
  Background,
  MenuDrawer,
  LoadCircle,
  MainNavbar,
  LinkButton,
  ButtonIcon,
  InputNumber,
  ButtonsForm,
  ButtonLogin,
  LoginLayout,
  ButtonsModal,
  ButtonSimple,
  ListSubtitle,
  ParseCookies,
  DefaultModal,
  ButtonStyled,
  InputPassword,
  ActionButtons,
  InputDateTime,
  SubmitDocument,
  fileToFormData,
  getCurrentUser,
  StepperComponent,
  PaperInstitucion,
  ButtonsSections,
  ButtonFile,
  ButtonsInspeccionSection,
  SelectAdd,
  InputTime,
  PositionDisplay,
  Subtitle,
  BinarySelect,
  NavigationButtons,
  InputSearch,
  ButtonFileDownload,
  getParentUserById,

  // Utilidades
  setToken,
  getToken,
  getTurnoById,
  formattedDate,
  validateFormData,
  validateField,
  getData,
  updateRecord,
  createRecord,
  deleteRecord,
  estadosMexico,
};
