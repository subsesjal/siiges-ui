import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';
import SectionLayout from '../../SectionLayout';
import pagination from '../../../events/pagination';
import AnexosSeccion from '../../Sections/AnexosSeccion';

export default function Anexos({ nextModule, id }) {
  const [form, setForm] = useState([]);
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
          {section === 1 && (
            <AnexosSeccion
              form={form}
              setForm={setForm}
              disabled={disabled}
              id={id}
            />
          )}
        </SectionLayout>
      </CardContent>
    </Card>
  );
}

Anexos.defaultProps = {
  id: null,
};

Anexos.propTypes = {
  nextModule: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
