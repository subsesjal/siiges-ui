import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import DatosPlantel from '../../Sections/DatosPlantel';
import UbicacionPlantel from '../../Sections/UbicacionPlantel';
import DescripcionPlantel from '../../Sections/DescripcionPlantel';
import HigienePlantel from '../../Sections/HigienePlantel';
import InstitucionesAledanas from '../../Sections/InstitucionesAledanas';
import Infraestructura from '../../Sections/Infraestructura';
import RatificacionNombre from '../../Sections/RatificacionNombre';

export default function Plantel({ nextModule }) {
  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 7);
  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <SectionLayout
          sectionTitle="Plantel"
          sections={section}
          position={position}
          total="7"
          porcentage={porcentaje}
          nextModule={nextModule}
          next={next}
          prev={prev}
        >
          {section === 1 && <DatosPlantel />}
          {section === 2 && <UbicacionPlantel />}
          {section === 3 && <DescripcionPlantel />}
          {section === 4 && <HigienePlantel />}
          {section === 5 && <InstitucionesAledanas />}
          {section === 6 && <Infraestructura />}
          {section === 7 && <RatificacionNombre />}
        </SectionLayout>
      </CardContent>
    </Card>
  );
}

Plantel.propTypes = {
  nextModule: PropTypes.func.isRequired,
};
