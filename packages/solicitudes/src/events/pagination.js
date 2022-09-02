export default function pagination(useState, sections) {
  const step = 100 / sections;
  const lastRightSection = Math.round(100 - step);
  const lastLeftSection = Math.round(step * 2);
  const [position, setPosition] = useState('first');
  const [porcentaje, setPorcentaje] = useState(step);
  const [section, setSection] = useState(1);

  const next = () => {
    setSection(section + 1);
    setPorcentaje(Math.round(porcentaje + step));
    if (porcentaje === lastRightSection) {
      setPosition('last');
    } else {
      setPosition('middle');
    }
  };

  const prev = () => {
    setSection(section - 1);
    setPorcentaje(Math.round(porcentaje - step));
    if (porcentaje === lastLeftSection) {
      setPosition('first');
    } else {
      setPosition('middle');
    }
  };

  return ({
    next,
    prev,
    position,
    porcentaje,
    section,
  });
}
