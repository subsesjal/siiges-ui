import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import DatosGeneralesEvaluacion from '../../Sections/DatosGeneralesEvaluacion';
import { EvaluacionCurricularProvider } from '../../utils/Context/evaluacionCurricularContext';

export default function EvaluacionCurricular({
  nextModule,
  id,
  programaId,
  isLoading,
  setIsLoading,
  type,
}) {
  const [disabled, setDisabled] = useState(true);

  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 1);

  useEffect(() => {
    if (id !== undefined) {
      setDisabled(false);
    }
  }, [id]);

  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <EvaluacionCurricularProvider programaId={programaId}>
          <SectionLayout
            sectionTitle="Evaluación Curricular"
            sections={section}
            position={position}
            total="1"
            porcentage={porcentaje}
            nextModule={nextModule}
            next={next}
            prev={prev}
            loading={isLoading}
            setLoading={setIsLoading}
          >
            {section === 1 && (
              <DatosGeneralesEvaluacion disabled={disabled} id={id} type={type} />
            )}
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
  setIsLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};
