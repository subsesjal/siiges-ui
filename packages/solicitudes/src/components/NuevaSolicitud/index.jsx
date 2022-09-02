import React from 'react';
import DatosGenerales from './DatosGenerales';
import EvaluacionCurricular from './EvaluacionCurricular';
import PlanEstudios from './PlanEstudios';
import Plantel from './Plantel';

export default function NuevaSolicitudModules() {
  return (
    <>
      <DatosGenerales />
      <Plantel />
      <EvaluacionCurricular />
      <PlanEstudios />
      <Plantel />
    </>
  );
}
