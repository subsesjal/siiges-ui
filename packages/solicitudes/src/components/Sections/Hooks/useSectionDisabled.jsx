import { useContext, useMemo } from 'react';
import { ObservacionesContext } from '../../utils/Context/observacionesContext';

const useSectionDisabled = (sectionId) => {
  const { sections } = useContext(ObservacionesContext);

  return useMemo(() => {
    const section = sections.find((s) => s.id === sectionId);
    return section ? section.disabled : false;
  }, [sections, sectionId]);
};

export default useSectionDisabled;
