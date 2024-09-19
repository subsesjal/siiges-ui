export default function pagination(useState, sections) {
  const lastSection = sections;
  const firstSection = 1;

  const calcularPorcentaje = (currentSection) => Math.round((currentSection / sections) * 100);

  const [position, setPosition] = useState(sections === 1 ? 'only' : 'first');
  const [porcentaje, setPorcentaje] = useState(calcularPorcentaje(firstSection));
  const [section, setSection] = useState(firstSection);

  const next = () => {
    setSection((prevSection) => {
      const newSection = Math.min(prevSection + 1, lastSection);
      setPorcentaje(calcularPorcentaje(newSection));

      if (newSection === lastSection) {
        setPosition('last');
      } else {
        setPosition('middle');
      }
      return newSection;
    });
  };

  const prev = () => {
    setSection((prevSection) => {
      const newSection = Math.max(prevSection - 1, firstSection);
      setPorcentaje(calcularPorcentaje(newSection));

      if (newSection === firstSection) {
        setPosition('first');
      } else {
        setPosition('middle');
      }
      return newSection;
    });
  };

  return {
    next,
    prev,
    position,
    porcentaje,
    section,
  };
}
