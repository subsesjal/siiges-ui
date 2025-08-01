import React, {
  useState, useMemo, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import { Context, SnackAlert, Loading } from '@siiges-ui/shared';
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
import Observaciones from '../../Sections/Observaciones';
import HerramientaEducativa from '../../Sections/HerramientaEducativa';

export default function PlanEstudios({
  nextModule,
  id,
  setId,
  programaId,
  setProgramaId,
  type,
  isDisabled: parentDisabled,
}) {
  const { session, loading } = useContext(Context);
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
    10: {},
  });
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });
  const [modalidad, setModalidad] = useState();
  const { solicitudes, loading: loadingSolicitud } = getSolicitudesById(id);
  const [trayectoriaStatus, setTrayectoriaStatus] = useState('new');
  const [sectionLength, setSectionLength] = useState(10);

  useEffect(() => {
    let isMounted = true;

    if (id && isMounted) {
      setDisabled(false);
    }

    if (query.modalidad) {
      setModalidad(query.modalidad);
    }

    if (
      !loadingSolicitud
      && solicitudes.programa
      && (type === 'editar' || type === 'consultar' || type === 'observaciones')
    ) {
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
            metodosInduccion: solicitudes.programa.metodosInduccion,
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

    return () => {
      isMounted = false;
    };
  }, [
    id,
    type,
    solicitudes,
    query.modalidad,
    query.plantel,
    session.id,
    loadingSolicitud,
  ]);

  const value = useMemo(
    () => ({
      id,
      form,
      noti,
      error,
      setId,
      errors,
      setNoti,
      setForm,
      setError,
      modalidad,
      setErrors,
      programaId,
      setProgramaId,
      trayectoriaStatus,
      setTrayectoriaStatus,
    }),
    [form, error, errors, noti, id, programaId, modalidad, trayectoriaStatus],
  );
  const {
    next, prev, section, position, porcentaje,
  } = pagination(
    useState,
    sectionLength,
  );

  useEffect(() => {
    const modalidadNumber = Number(modalidad);
    if (modalidadNumber === 1) {
      setSectionLength(9);
    } else {
      setSectionLength(10);
    }
  }, [modalidad]);

  const isDisabled = parentDisabled || disabled;

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
              total={sectionLength}
              porcentaje={porcentaje}
              nextModule={nextModule}
              next={next}
              prev={prev}
            >
              <Loading loading={loading} />
              {section === 1 && (
                <DatosPlanEstudios disabled={isDisabled} type={type} />
              )}
              {section === 2 && (
                <FundamentosPlanEstudios disabled={isDisabled} type={type} />
              )}
              {section === 3 && <Ingreso disabled={isDisabled} type={type} />}
              {section === 4 && <Egreso disabled={isDisabled} type={type} />}
              {section === 5 && (
                <Curricula
                  disabled={isDisabled}
                  type={type}
                  programaId={programaId}
                />
              )}
              {section === 6 && (
                <Asignaturas disabled={isDisabled} type={type} />
              )}
              {section === 7 && (
                <AsignaturasFormacionElectiva
                  disabled={isDisabled}
                  type={type}
                />
              )}
              {section === 8 && <Docentes disabled={isDisabled} type={type} />}
              {section === 9 && (
                <TrayectoriaEducativa disabled={isDisabled} type={type} />
              )}
              {section === 10 && (
                <HerramientaEducativa disabled={isDisabled} type={type} />
              )}
              <Observaciones id={id} section={section} />
            </SectionLayout>
          </CardContent>
        </Card>
        <SnackAlert
          open={noti.open}
          close={() => {
            setNoti({ open: false, message: '', type: '' });
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
  id: null,
  programaId: null,
};

PlanEstudios.propTypes = {
  nextModule: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
  setProgramaId: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  programaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
