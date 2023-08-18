import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import DatosPlantel from '../../Sections/DatosPlantel';
import DescripcionPlantel from '../../Sections/DescripcionPlantel';
import HigienePlantel from '../../Sections/HigienePlantel';
import InstitucionesAledanas from '../../Sections/InstitucionesAledanas';
import Infraestructura from '../../Sections/Infraestructura';
import RatificacionNombre from '../../Sections/RatificacionNombre';
import { PlantelProvider } from '../../utils/Context/plantelContext';

export default function Plantel({ nextModule, id }) {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (id) {
      setDisabled(false);
    }
  }, [id]);

  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 6);
  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <PlantelProvider>
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
            {section === 1 && <DatosPlantel disabled={disabled} />}
            {section === 2 && <DescripcionPlantel disabled={disabled} />}
            {section === 3 && <HigienePlantel disabled={disabled} />}
            {section === 4 && <InstitucionesAledanas disabled={disabled} />}
            {section === 5 && <Infraestructura disabled={disabled} />}
            {section === 6 && <RatificacionNombre disabled={disabled} />}
          </SectionLayout>
        </PlantelProvider>
      </CardContent>
    </Card>
  );
}

Plantel.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([undefined])]).isRequired,
};
