import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
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

export default function PlanEstudios({ nextModule }) {
  const {
    next, prev, section, position, porcentaje,
  } = pagination(
    useState,
    10,
  );

  const [fetch, setFetch] = useState(false);
  const [newSolicitud, setNewSolicitud] = useState(true);
  useEffect(() => {
    if (
      newSolicitud === true
      && (position === 'first' || position === 'only')
    ) {
      setFetch(true);
      setNewSolicitud(false);
    }
  }, [position]);

  return (
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
          fetch={fetch}
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
  );
}

PlanEstudios.propTypes = {
  nextModule: PropTypes.func.isRequired,
};
