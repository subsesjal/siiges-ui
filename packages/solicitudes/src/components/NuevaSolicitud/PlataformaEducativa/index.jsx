import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import DescripcionPlataformaEducativa from '../../Sections/DescripcionPlataformaEducativa';
import CaracteristicasHardwareSoftware from '../../Sections/CaracteristicasHardwareSoftware';
import RolesUsuarios from '../../Sections/RolesUsuarios';
import SeguridadPlataformaEducativa from '../../Sections/SeguridadPlataformaEducativa';
import LicenciasPlataformaEducativa from '../../Sections/LicenciasPlataformaEducativa';

export default function PlataformaEducativa({ nextModule, isLoading, setIsLoading }) {
  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 5);
  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <SectionLayout
          sectionTitle="Plataforma Educativa"
          sections={section}
          position={position}
          total="5"
          porcentage={porcentaje}
          nextModule={nextModule}
          next={next}
          prev={prev}
          loading={isLoading}
          setLoading={setIsLoading}
        >
          {section === 1 && <DescripcionPlataformaEducativa />}
          {section === 2 && <CaracteristicasHardwareSoftware />}
          {section === 3 && <RolesUsuarios />}
          {section === 4 && <SeguridadPlataformaEducativa />}
          {section === 5 && <LicenciasPlataformaEducativa />}
        </SectionLayout>
      </CardContent>
    </Card>
  );
}

PlataformaEducativa.propTypes = {
  nextModule: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
