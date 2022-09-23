export default function pagination(useState, sections) {
  const step = 100 / sections;
  const lastSection = sections - 1;
  const firstSection = 2;
  const [position, setPosition] = useState('first');
  const [porcentaje, setPorcentaje] = useState(step);
  const [section, setSection] = useState(1);

  const next = () => {
    setSection(section + 1);
    setPorcentaje(Math.round(porcentaje + step));
    if (section === lastSection) {
      setPosition('last');
    } else {
      setPosition('middle');
    }
  };

  const prev = () => {
    setSection(section - 1);
    setPorcentaje(Math.round(porcentaje - step));
    if (section === firstSection) {
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
