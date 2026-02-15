import { useContext } from 'react';
import PlantelContext from '../components/utils/Context/plantelContext';

export function usePlantel() {
  const context = useContext(PlantelContext);
  if (!context) {
    throw new Error('usePlantel debe usarse dentro de PlantelProvider');
  }
  return context;
}
