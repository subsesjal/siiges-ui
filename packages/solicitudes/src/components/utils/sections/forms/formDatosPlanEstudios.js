export default function formDatosPlanEstudios(name, value, form, setForm) {
  if (name === 'programaTurnos') {
    const currentTurnos = form['1'].programa.programaTurnos || [];
    let updatedTurnos;

    if (currentTurnos.includes(value)) {
      updatedTurnos = currentTurnos.filter((turno) => turno !== value);
    } else {
      updatedTurnos = currentTurnos.length < 4 ? [...currentTurnos, value] : currentTurnos;
    }

    setForm({
      ...form,
      1: { ...form['1'], programa: { ...form['1'].programa, programaTurnos: updatedTurnos } },
    });
  } else {
    setForm({
      ...form,
      1: { ...form['1'], programa: { ...form['1'].programa, [name]: value } },
    });
  }
}
