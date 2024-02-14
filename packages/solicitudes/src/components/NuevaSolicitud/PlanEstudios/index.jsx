import React, {
  useState, useMemo, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import { Context, SnackAlert } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import pagination from '../../../events/pagination';
import SectionLayout from '../../SectionLayout';
import DatosPlanEstudios from '../../Sections/DatosPlanEstudios';
import FundamentosPlanEstudios from '../../Sections/FundamentosPlanEstudios';
import Ingreso from '../../Sections/Ingreso';
import Egreso from '../../Sections/Egreso';
import Curricula from '../../Sections/Curricula';
import Asignaturas from '../../Sections/Asignaturas';
import AsignaturasFormacionElectiva from '../../Sections/AsignaturasFormacionElectiva';
import Docentes from '../../Sections/Docentes';
import TrayectoriaEducativa from '../../Sections/TrayectoriaEducativa';
import SolicitudContext from '../../utils/Context/solicitudContext';
import getSolicitudesById from '../../utils/getSolicitudesById';
import { TablesPlanEstudiosProvider } from '../../utils/Context/tablesPlanEstudiosProviderContext';

export default function PlanEstudios({
  nextModule,
  id,
  setId,
  programaId,
  setProgramaId,
  type,
}) {
  const { session } = useContext(Context);
  const router = useRouter();
  const { query } = router;
  const [form, setForm] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [modalidad, setModalidad] = useState();
  const { solicitudes, loading } = getSolicitudesById(id);

  useEffect(() => {
    setDisabled(id !== undefined && type !== 'editar');
    if (query.modalidad) {
      setModalidad(query.modalidad);
    }
    if (!loading && solicitudes.programa && type === 'editar') {
      setProgramaId(solicitudes.programa.id);
      setModalidad(solicitudes.programa.modalidadId);
      const programaTurnosIds = solicitudes.programa.programaTurnos.map(
        (turno) => turno.turnoId,
      );
      setForm((prevForm) => ({
        ...prevForm,
        1: {
          ...prevForm[1],
          programa: {
            ...prevForm[1].programa,
            nivelId: solicitudes.programa.nivelId,
            nombre: solicitudes.programa.nombre,
            modalidadId: solicitudes.programa.modalidadId,
            cicloId: solicitudes.programa.cicloId,
            programaTurnos: programaTurnosIds,
            duracionPeriodos: solicitudes.programa.duracionPeriodos,
            creditos: solicitudes.programa.creditos,
            antecedenteAcademico: solicitudes.programa.antecedenteAcademico,
            objetivoGeneral: solicitudes.programa.objetivoGeneral,
            objetivosParticulares: solicitudes.programa.objetivosParticulares,
          },
        },
        3: {
          ...prevForm[3],
          programa: {
            metodosInduccion: '',
            perfilIngresoConocimientos:
              solicitudes.programa.perfilIngresoConocimientos,
            perfilIngresoHabilidades:
              solicitudes.programa.perfilIngresoHabilidades,
            perfilIngresoActitudes: solicitudes.programa.perfilIngresoActitudes,
            procesoSeleccion: solicitudes.programa.procesoSeleccion,
          },
        },
        4: {
          ...prevForm[4],
          programa: {
            perfilEgresoConocimientos:
              solicitudes.programa.perfilEgresoConocimientos,
            perfilEgresoHabilidades:
              solicitudes.programa.perfilEgresoHabilidades,
            perfilEgresoActitudes: solicitudes.programa.perfilEgresoActitudes,
            seguimientoEgresados: solicitudes.programa.seguimientoEgresados,
          },
        },
        5: {
          ...prevForm[5],
          programa: {
            mapaCurricular: solicitudes.programa.mapaCurricular,
            flexibilidadCurricular: solicitudes.programa.flexibilidadCurricular,
            lineasGeneracionAplicacionConocimiento:
              solicitudes.programa.lineasGeneracionAplicacionConocimiento,
            actualizacion: solicitudes.programa.actualizacion,
            conveniosVinculacion: solicitudes.programa.conveniosVinculacion,
          },
        },
      }));
    } else if (query.modalidad && query.plantel) {
      setForm((prevForm) => ({
        ...prevForm,
        1: {
          ...prevForm[1],
          tipoSolicitudId: 1,
          usuarioId: parseInt(session.id, 10),
          estatusSolicitudId: 1,
          programa: {
            ...prevForm[1].programa,
            plantelId: query.plantel ? parseInt(query.plantel, 10) : undefined,
            modalidadId: query.modalidad
              ? parseInt(query.modalidad, 10)
              : undefined,
          },
        },
      }));
    }
  }, [
    id,
    type,
    solicitudes,
    loading,
    session.id,
    query.plantel,
    query.modalidad,
  ]);

  const value = useMemo(
    () => ({
      modalidad,
      form,
      setForm,
      error,
      setError,
      errors,
      setErrors,
      noti,
      setNoti,
      id,
      setId,
      programaId,
      setProgramaId,
    }),
    [form, error, errors, noti, id, programaId, modalidad],
  );
  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 9);

  return (
    <SolicitudContext.Provider value={value}>
      <TablesPlanEstudiosProvider>
        <Card sx={{ mt: 3, mb: 3 }}>
          <CardContent>
            <SectionLayout
              type={type}
              id={id}
              sectionTitle="Plan de estudios"
              sections={section}
              position={position}
              total="9"
              porcentage={porcentaje}
              nextModule={nextModule}
              next={next}
              prev={prev}
            >
              {section === 1 && <DatosPlanEstudios type={type} />}
              {section === 2 && (
                <FundamentosPlanEstudios disabled={disabled} type={type} />
              )}
              {section === 3 && <Ingreso disabled={disabled} type={type} />}
              {section === 4 && <Egreso disabled={disabled} type={type} />}
              {section === 5 && <Curricula disabled={disabled} type={type} />}
              {section === 6 && <Asignaturas disabled={disabled} type={type} />}
              {section === 7 && (
                <AsignaturasFormacionElectiva disabled={disabled} type={type} />
              )}
              {section === 8 && <Docentes disabled={disabled} type={type} />}
              {section === 9 && <TrayectoriaEducativa disabled={disabled} type={type} />}
            </SectionLayout>
          </CardContent>
        </Card>
        <SnackAlert
          open={noti.open}
          close={() => {
            setNoti(false);
          }}
          type={noti.type}
          mensaje={noti.message}
        />
      </TablesPlanEstudiosProvider>
    </SolicitudContext.Provider>
  );
}

PlanEstudios.defaultProps = {
  type: null,
};

PlanEstudios.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])])
    .isRequired,
  programaId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([undefined]),
  ]).isRequired,
  setId: PropTypes.func.isRequired,
  setProgramaId: PropTypes.func.isRequired,
  type: PropTypes.string,
};
