import rowsAcuerdos from './Tables/rowsAcuerdos';

const findAcuerdoById = (id) => rowsAcuerdos.find((acuerdo) => acuerdo.id === id);

export default findAcuerdoById;
