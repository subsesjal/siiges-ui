import React, { useState } from 'react';
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

export default function PlanEstudios({ nextModule, values }) {
  const {
    next,
    prev,
    section,
    position,
    porcentaje,
  } = pagination(
    useState,
    10,
  );

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
        >
          {section === 1 && <DatosPlanEstudios values={values} />}
          {section === 2 && <CoordinadorPrograma values={values} />}
          {section === 3 && <FundamentosPlanEstudios values={values} />}
          {section === 4 && <Ingreso values={values} />}
          {section === 5 && <Egreso values={values} />}
          {section === 6 && <Curricula values={values} />}
          {section === 7 && <Asignaturas values={values} />}
          {section === 8 && <AsignaturasFormacionElectiva values={values} />}
          {section === 9 && <Docentes values={values} />}
          {section === 10 && <TrayectoriaEducativa values={values} />}
        </SectionLayout>
      </CardContent>
    </Card>
  );
}

PlanEstudios.propTypes = {
  nextModule: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.func).isRequired,
};
