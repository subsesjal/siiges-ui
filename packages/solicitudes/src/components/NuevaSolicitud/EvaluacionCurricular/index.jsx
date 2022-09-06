import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import DatosGeneralesEvaluacion from './Sections/DatosGeneralesEvaluacion';

export default function EvaluacionCurricular() {
  const {
    next,
    prev,
    section,
    position,
    porcentaje,
  } = pagination(useState, 1);
  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <SectionLayout
          sections={section}
          position={position}
          total="1"
          porcentage={porcentaje}
          next={next}
          prev={prev}
        >
          {section === 1 && <DatosGeneralesEvaluacion />}
        </SectionLayout>
      </CardContent>
    </Card>
  );
}
