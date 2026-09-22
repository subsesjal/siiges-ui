import React, { useMemo, useState } from 'react';
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
  nextModule, id, type, solicitud, isDisabled, tipoSolicitudId,
}) {
  const allowedSections = useMemo(() => {
    if (tipoSolicitudId === 5) return [2];
    if (tipoSolicitudId === 6) return [1];
    return [1, 2, 3];
  }, [tipoSolicitudId]);

  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, allowedSections.length);

  const realSection = allowedSections[section - 1];

  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <DatosGeneralesProvider solicitud={solicitud}>
          <SectionLayout
            type={type}
            sectionTitle="Datos Generales"
            sections={section}
            position={position}
            total={String(allowedSections.length)}
            porcentaje={porcentaje}
            nextModule={nextModule}
            id={id}
            next={next}
            prev={prev}
          >
            {realSection === 1 && (
              <InstitucionData disabled={isDisabled} id={id} type={type} />
            )}
            {realSection === 2 && (
              <RepresentanteLegalData disabled={isDisabled} id={id} type={type} />
            )}
            {realSection === 3 && (
              <DiligenciasData disabled={isDisabled} id={id} type={type} />
            )}
            <Observaciones id={id} section={realSection + 10} type={type} />
          </SectionLayout>
        </DatosGeneralesProvider>
      </CardContent>
    </Card>
  );
}

DatosGenerales.defaultProps = {
  id: null,
  solicitud: {},
};

DatosGenerales.propTypes = {
  tipoSolicitudId: PropTypes.number.isRequired,
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  type: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  solicitud: PropTypes.shape({
    id: PropTypes.number,
    programa: PropTypes.shape({
      plantel: PropTypes.shape({
        institucion: PropTypes.shape({
          id: PropTypes.number,
        }),
      }),
    }),
  }),
};
