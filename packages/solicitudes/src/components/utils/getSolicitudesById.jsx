import { useContext, useEffect, useState } from 'react';
import { Context } from '@siiges-ui/shared';

export default function getSolicitudesById(id) {
  const { session, setNoti } = useContext(Context);
  const [solicitudes, setSolicitudes] = useState({});
  const [solicitudesInspecciones, setSolicitudesInspecciones] = useState({});
  const [loading, setLoading] = useState(true);

  const modalidad = [null, 'Escolarizada', 'No escolarizada', 'Mixta', 'Dual'];
  const niveles = [
    null,
    'Bachillerato',
    'Licenciatura',
    'Técnico Superior Universitario',
    'Especialidad',
    'Maestría ',
    'Doctorado',
    'Profesional Asociado',
    'Educación Continua',
  ];
  const ciclos = [
    null,
    'Semestral',
    'Cuatrimestral',
    'Anual',
    'Semestral curriculum flexible',
    'Cuatrimestral curriculum flexible',
  ];

  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (session && id !== undefined) {
      setLoading(true);
      fetch(`${url}/api/v1/solicitudes/${id}`, {
        method: 'GET',
        headers: {
          api_key: apikey,
        },
      })
        .then((response) => {
          if (!response.ok) {
            setNoti({
              open: true,
              message: 'Algo salió mal al cargar la información',
              type: 'error',
            });
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((data) => {
          setSolicitudes(data.data);
          const { data: solicitud } = data;
          setSolicitudesInspecciones({
            id: solicitud.id,
            nombre: solicitud.programa.nombre,
            modalidad: modalidad[solicitud.programa.modalidadId],
            nivel: niveles[solicitud.programa.nivelId],
            domicilio: `${solicitud.programa.plantel.domicilio.calle} ${solicitud.programa.plantel.domicilio.numeroExterior}`,
            institucion: `${solicitud.programa.plantel.institucion.nombre}`,
            periodo: ciclos[solicitud.programa.cicloId],
            programaId: solicitud.programa.id,
            folio: solicitud.folio,
            token: session.token,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [session, id, setNoti]);

  return {
    solicitudes,
    loading,
    solicitudesInspecciones,
  };
}
