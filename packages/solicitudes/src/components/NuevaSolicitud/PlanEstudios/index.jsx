import React, { useState } from 'react';
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

export default function PlanEstudios() {
  const {
    next,
    prev,
    section,
    position,
    porcentaje,
  } = pagination(useState, 10);
  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <SectionLayout
          sectionTitle="Plan de estudios"
          sections={section}
          position={position}
          total="10"
          porcentage={porcentaje}
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
  );
}
