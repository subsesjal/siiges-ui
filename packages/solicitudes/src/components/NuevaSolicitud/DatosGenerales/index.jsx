import React, { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import InstitucionData from '../../Sections/InstitucionData';
import RepresentanteLegalData from '../../Sections/RepresentanteLegalData';
import DiligenciasData from '../../Sections/DiligenciasData';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';

export default function DatosGenerales() {
  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 3);
  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <SectionLayout
          sectionTitle="Datos Generales"
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
