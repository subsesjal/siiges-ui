import { Grid } from '@mui/material';
import { PositionDisplay } from '@siiges-ui/shared';
import React, { useState } from 'react';
import DatosSolicitante from './Pages/DatosSolicitante';
import DatosInstitucion from './Pages/DatosInstitucion';
import CargaMaterias from './Pages/CargaMaterias';
import CargaMateriasEquivalentes from './Pages/CargaMateriasEquivalentes';
import NavigationButtons from '../../utils/NavigationButtons';

export default function FormEquivalencias() {
  const [currentPosition, setCurrentPosition] = useState(1);
  const [form, setForm] = useState({});
  const totalPositions = 4;

  const handleNext = () => {
    if (currentPosition < totalPositions) {
      setCurrentPosition((prevPosition) => prevPosition + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPosition > 1) {
      setCurrentPosition((prevPosition) => prevPosition - 1);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOnSubmit = () => {
    console.log('Form submitted:', form);
  };

  const renderCurrentPage = () => {
    switch (currentPosition) {
      case 1:
        return (
          <DatosSolicitante
            form={form}
            handleOnChange={handleOnChange}
          />
        );
      case 2:
        return (
          <DatosInstitucion
            form={form}
            handleOnChange={handleOnChange}
          />
        );
      case 3:
        return (
          <CargaMaterias
            form={form}
            handleOnChange={handleOnChange}
          />
        );
      case 4:
        return (
          <CargaMateriasEquivalentes
            form={form}
            handleOnChange={handleOnChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <PositionDisplay
          currentPosition={currentPosition}
          totalPositions={totalPositions}
        />
      </Grid>
      <Grid item xs={12}>
        {renderCurrentPage()}
      </Grid>
      <Grid item xs={12}>
        <NavigationButtons
          currentPosition={currentPosition}
          totalPositions={totalPositions}
          onNext={handleNext}
          onPrevious={handlePrevious}
          handleOnSubmit={handleOnSubmit}
        />
      </Grid>
    </Grid>
  );
}
