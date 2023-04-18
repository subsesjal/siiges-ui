import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import pagination from '../../../events/pagination';
import SectionLayout from '../../SectionLayout';
import DatosPlanEstudios from '../../Sections/DatosPlanEstudios';
import CoordinadorPrograma from '../../Sections/CoordinadorPrograma';
import FundamentosPlanEstudios from '../../Sections/FundamentosPlanEstudios';
import Ingreso from '../../Sections/Ingreso';
import Egreso from '../../Sections/Egreso';
import Curricula from '../../Sections/Curricula';
import Asignaturas from '../../Sections/Asignaturas';
import AsignaturasFormacionElectiva from '../../Sections/AsignaturasFormacionElectiva';
import Docentes from '../../Sections/Docentes';
import TrayectoriaEducativa from '../../Sections/TrayectoriaEducativa';
import SolicitudContext from '../../utils/Context/solicitudContext';

export default function PlanEstudios({ nextModule }) {
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [errors, setErrors] = useState([]);
  const [noti, setNoti] = useState({ open: false, message: '', type: '' });

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
  } = pagination(
    useState,
    10,
  );

  return (
    <SolicitudContext.Provider value={value}>
      <Card sx={{ mt: 3, mb: 3 }}>
        <CardContent>
          <SectionLayout
            sectionTitle="Plan de estudios"
            sections={section}
            position={position}
            total="10"
            porcentage={porcentaje}
            nextModule={nextModule}
            next={next}
            prev={prev}
          >
            {section === 1 && <DatosPlanEstudios />}
            {section === 2 && <CoordinadorPrograma />}
            {section === 3 && <FundamentosPlanEstudios />}
            {section === 4 && <Ingreso />}
            {section === 5 && <Egreso />}
            {section === 6 && <Curricula />}
            {section === 7 && <Asignaturas />}
            {section === 8 && <AsignaturasFormacionElectiva />}
            {section === 9 && <Docentes />}
            {section === 10 && <TrayectoriaEducativa />}
          </SectionLayout>
        </CardContent>
      </Card>
    </SolicitudContext.Provider>
  );
}

PlanEstudios.propTypes = {
  nextModule: PropTypes.func.isRequired,
};
