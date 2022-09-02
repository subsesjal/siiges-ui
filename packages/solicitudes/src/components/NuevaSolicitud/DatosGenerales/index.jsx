import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import InstitucionData from './Sections/institucionData';
import SectionLayout from '../../SectionLayout';
import RepresentanteLegalData from './Sections/representanteLegalData';
import DiligenciasData from './Sections/diligenciasData';
import pagination from '../../../events/pagination';

export default function DatosGenerales() {
  const {
    next,
    prev,
    section,
    position,
    porcentaje,
  } = pagination(useState, 3);
  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <SectionLayout
          sections={section}
          position={position}
          total="3"
          porcentage={porcentaje}
          next={next}
          prev={prev}
        >
          {section === 1 && <InstitucionData />}
          {section === 2 && <RepresentanteLegalData />}
          {section === 3 && <DiligenciasData />}
        </SectionLayout>
      </CardContent>
    </Card>
  );
}
