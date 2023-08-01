import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import { Context } from '@siiges-ui/shared';
import { useRouter } from 'next/router';
import InstitucionData from '../../Sections/InstitucionData';
import RepresentanteLegalData from '../../Sections/RepresentanteLegalData';
import DiligenciasData from '../../Sections/DiligenciasData';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import DatosGeneralesContext from '../../utils/Context/datosGeneralesContext';

export default function DatosGenerales({ nextModule, id }) {
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
  });
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
    }),
    [form, error, errors, noti],
  );
  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 3);
  return (
    <DatosGeneralesContext.Provider value={value}>
      <Card sx={{ mt: 3, mb: 3 }}>
        <CardContent>
          <SectionLayout
            sectionTitle="Datos Generales"
            sections={section}
            position={position}
            total="3"
            porcentage={porcentaje}
            nextModule={nextModule}
            next={next}
            prev={prev}
          >
            {section === 1 && <InstitucionData disabled={disabled} />}
            {section === 2 && <RepresentanteLegalData disabled={disabled} />}
            {section === 3 && <DiligenciasData disabled={disabled} />}
          </SectionLayout>
        </CardContent>
      </Card>
    </DatosGeneralesContext.Provider>
  );
}

DatosGenerales.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
