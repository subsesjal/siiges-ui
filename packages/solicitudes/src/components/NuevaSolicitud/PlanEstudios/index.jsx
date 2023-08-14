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
import { TablesPlanEstudiosProvider } from '../../utils/Context/tablesPlanEstudiosProviderContext';

export default function PlanEstudios({ nextModule, id, setId }) {
  const { session } = useContext(Context);
  const router = useRouter();
  const { query } = router;
  const [form, setForm] = useState({
    1: {
      tipoSolicitudId: 1,
      usuarioId: parseInt(session.id, 10),
      estatusSolicitudId: 1,
      programa: {
        plantelId: parseInt(query.plantel, 10),
        modalidadId: parseInt(query.modalidad, 10),
      },
    },
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
  });
  const [programaId, setProgramaId] = useState();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });

  useEffect(() => {
    if (id !== undefined) {
      setDisabled(false);
    }
  }, [id]);

  const value = useMemo(
    () => ({
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
    [form, error, errors, noti, id, programaId],
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
              {section === 1 && <DatosPlanEstudios />}
              {section === 2 && <FundamentosPlanEstudios disabled={disabled} />}
              {section === 3 && <Ingreso disabled={disabled} />}
              {section === 4 && <Egreso disabled={disabled} />}
              {section === 5 && <Curricula disabled={disabled} />}
              {section === 6 && <Asignaturas disabled={disabled} />}
              {section === 7 && (
                <AsignaturasFormacionElectiva disabled={disabled} />
              )}
              {section === 8 && <Docentes disabled={disabled} />}
              {section === 9 && <TrayectoriaEducativa disabled={disabled} />}
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

PlanEstudios.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])]).isRequired,
  setId: PropTypes.func.isRequired,
};
