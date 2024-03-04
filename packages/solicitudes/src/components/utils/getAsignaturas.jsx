import { useContext, useEffect, useState } from 'react';
import { Context, getToken } from '@siiges-ui/shared';
import { grados } from './Mocks/mockAsignaturas';

export default function useAsignaturas(programaId) {
  const { session } = useContext(Context);
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturasFormacion, setAsignaturasFormacion] = useState([]);
  const [asignaturasTotal, setAsignaturasTotal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedGrade = grados.semestral;

  useEffect(() => {
    let isMounted = true;
    if (session && programaId) {
      const token = getToken();
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      const url = process.env.NEXT_PUBLIC_URL;

      fetch(`${url}/api/v1/asignaturas/programas/${programaId}`, {
        method: 'GET',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (isMounted && data && data.data) {
            const updatedAsignaturas = data.data.map((asignatura) => {
              const matchingGrade = selectedGrade.find(
                (grade) => grade.id === asignatura.gradoId,
              );
              return {
                ...asignatura,
                grado: matchingGrade ? matchingGrade.nombre : 'Unknown',
              };
            });
            const asignaturasTipo1 = updatedAsignaturas.filter(
              (asignatura) => asignatura.tipo === 1,
            );
            const asignaturasTipo2 = updatedAsignaturas.filter(
              (asignatura) => asignatura.tipo === 2,
            );

            setAsignaturas(asignaturasTipo1);
            setAsignaturasFormacion(asignaturasTipo2);
            setAsignaturasTotal(updatedAsignaturas);
          }
          setLoading(false);
        })

        .catch((err) => {
          if (isMounted) {
            console.error('Error fetching asignaturas:', err);
            setError(err);
            setLoading(false);
          }
        });
    } else if (isMounted) {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [programaId, session]);

  return {
    asignaturas,
    asignaturasFormacion,
    asignaturasTotal,
    loading,
    error,
  };
}
