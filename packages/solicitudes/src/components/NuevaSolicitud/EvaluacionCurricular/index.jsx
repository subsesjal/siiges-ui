import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import DatosGeneralesEvaluacion from '../../Sections/DatosGeneralesEvaluacion';
import { EvaluacionCurricularProvider } from '../../utils/Context/evaluacionCurricularContext';
import Observaciones from '../../Sections/Observaciones';

export default function EvaluacionCurricular({
  nextModule,
  id,
  programaId,
  type,
}) {
  const [disabled, setDisabled] = useState(true);

  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 1);

  useEffect(() => {
    // Determine if the component should be disabled
    const isDisabled = type === 'consultar' || id === undefined;
    setDisabled(isDisabled);
  }, [id, type]);

  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <EvaluacionCurricularProvider programaId={programaId}>
          <SectionLayout
            type={type}
            sectionTitle="Evaluación Curricular"
            sections={section}
            position={position}
            total="1"
            porcentaje={porcentaje}
            nextModule={nextModule}
            next={next}
            prev={prev}
          >
            {section === 1 && (
              <DatosGeneralesEvaluacion
                disabled={disabled}
                id={id}
                type={type}
              />
            )}
            <Observaciones
              id={id}
              section={section + 19}
            />
          </SectionLayout>
        </EvaluacionCurricularProvider>
      </CardContent>
    </Card>
  );
}

EvaluacionCurricular.defaultProps = {
  id: null,
  programaId: null,
};

EvaluacionCurricular.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  programaId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string.isRequired,
};
