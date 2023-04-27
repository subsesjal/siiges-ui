/* eslint-disable no-param-reassign */
export default function validateForm(setForm, plantel) {
  const director = plantel.directores[0];
  const propToReplace = 'directores';
  const newPropName = 'director';

  plantel = {
    ...plantel,
    [newPropName]: plantel[propToReplace],
    [propToReplace]: undefined,
  };

  plantel.director = director;

  delete plantel.createdAt;
  delete plantel.deletedAt;
  delete plantel.updatedAt;
  delete plantel.directores;
  delete plantel.director.createdAt;
  delete plantel.director.deletedAt;
  delete plantel.director.updatedAt;
  delete plantel.director.persona.createdAt;
  delete plantel.director.persona.deletedAt;
  delete plantel.director.persona.updatedAt;
  delete plantel.domicilio.createdAt;
  delete plantel.domicilio.deletedAt;
  delete plantel.domicilio.updatedAt;
  delete plantel.domicilio.estado.createdAt;
  delete plantel.domicilio.estado.deletedAt;
  delete plantel.domicilio.estado.updatedAt;
  delete plantel.domicilio.municipio.createdAt;
  delete plantel.domicilio.municipio.deletedAt;
  delete plantel.domicilio.municipio.updatedAt;

  setForm(plantel);
}
