import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import AnexosSeccion from '../../Sections/AnexosSeccion';
import Observaciones from '../../Sections/Observaciones';

export default function Anexos({
  nextModule, id, type,
}) {
  const [form, setForm] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const {
    next, prev, section, position, porcentaje,
  } = pagination(useState, 1);

  useEffect(() => {
    // Update disabled state based on id and type
    const isDisabled = type === 'consultar' || id === undefined;
    setDisabled(isDisabled); // Debugging line
  }, [id, type]);

  return (
    <Card sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        <SectionLayout
          type={type}
          sectionTitle="Anexos"
          sections={section}
          position={position}
          total="1"
          porcentaje={porcentaje}
          nextModule={nextModule}
          next={next}
          prev={prev}
        >
          {section === 1 && (
            <AnexosSeccion
              form={form}
              setForm={setForm}
              disabled={disabled}
              id={id}
              type={type}
            />
          )}
          <Observaciones
            id={id}
            section={section + 18}
          />
        </SectionLayout>
      </CardContent>
    </Card>
  );
}

Anexos.defaultProps = {
  id: null,
  type: null,
};

Anexos.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  type: PropTypes.string,
};
