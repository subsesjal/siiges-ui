import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import RatificacionNombre from '../../Sections/AnexosSeccion';

export default function Anexos({ nextModule }) {
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
          sectionTitle="Anexos"
          sections={section}
          position={position}
          total="1"
          porcentage={porcentaje}
          nextModule={nextModule}
          next={next}
          prev={prev}
        >
          {section === 1 && <RatificacionNombre />}
        </SectionLayout>
      </CardContent>
    </Card>
  );
}

Anexos.propTypes = {
  nextModule: PropTypes.func.isRequired,
};
