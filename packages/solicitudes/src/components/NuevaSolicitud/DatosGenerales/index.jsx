import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import InstitucionData from '../../Sections/InstitucionData';
import RepresentanteLegalData from '../../Sections/RepresentanteLegalData';
import DiligenciasData from '../../Sections/DiligenciasData';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import { DatosGeneralesProvider } from '../../utils/Context/datosGeneralesContext';
import Observaciones from '../../Sections/Observaciones';

export default function DatosGenerales({
  nextModule, id, type,
}) {
  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 3);

  const isDisabled = type === 'consultar';

  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <DatosGeneralesProvider>
          <SectionLayout
            type={type}
            sectionTitle="Datos Generales"
            sections={section}
            position={position}
            total="3"
            porcentaje={porcentaje}
            nextModule={nextModule}
            id={id}
            next={next}
            prev={prev}
          >
            {section === 1 && <InstitucionData disabled={isDisabled} id={id} type={type} />}
            {section === 2 && <RepresentanteLegalData disabled={isDisabled} id={id} type={type} />}
            {section === 3 && <DiligenciasData disabled={isDisabled} id={id} type={type} />}
            <Observaciones
              id={id}
              section={section + 9}
              type={type}
            />
          </SectionLayout>
        </DatosGeneralesProvider>
      </CardContent>
    </Card>
  );
}

DatosGenerales.defaultProps = {
  id: null,
};

DatosGenerales.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  type: PropTypes.string.isRequired,
};
