/* eslint-disable no-param-reassign */
import { getToken } from '@siiges-ui/shared';

export default async function alumnosService({ id, dataBody, method }) {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const endpoint = id
    ? `${url}/api/v1/alumnos/${id}`
    : `${url}/api/v1/alumnos/`;
  if (method === 'PATCH') {
    delete dataBody.programaId;
    delete dataBody.estatus;
  }
  const response = await fetch(endpoint, {
    method,
    body: JSON.stringify(dataBody),
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(
      `Error: ${response.status} ${response.statusText} ${message}`,
    );
  }

  const result = await response.text();
  const { data } = JSON.parse(result);

  const dataForm = {
    id: data?.id,
    personaId: data?.personaId,
    programaId: data?.programaId,
    programa: data?.programa?.nombre,
    creditos: data?.programa?.creditos,
    claveCentroTrabajo: data?.programa?.plantel?.claveCentroTrabajo,
    institucion: data?.programa?.plantel?.institucion?.nombre,
    plantel: `${data?.programa?.plantel?.domicilio?.calle} ${
      data?.programa?.plantel?.domicilio?.numeroExterior
    }`.trim(),
    nombre: data?.persona?.nombre,
    apellidoPaterno: data?.persona?.apellidoPaterno,
    apellidoMaterno: data?.persona?.apellidoMaterno,
    fechaNacimiento: new Date(
      data?.persona?.fechaNacimiento,
    ).toLocaleDateString('en-CA'),
    sexo: data?.persona?.sexo,
    nacionalidad: data?.persona?.nacionalidad,
    telefono: data?.persona?.telefono,
    celular: data?.persona?.celular,
    curp: data?.persona?.curp,
    correoPrimario: data?.persona?.correoPrimario,
    matricula: data?.matricula,
    situacionId: data?.situacionId,
    fechaRegistro: new Date(data?.createdAt).toLocaleDateString('en-CA'),
    tipoTramiteId: data?.tipoTramiteId,
    equivalenciaId: data?.equivalencia?.id,
    equivalencia: data?.equivalencia,
  };

  return { data, dataForm };
}
