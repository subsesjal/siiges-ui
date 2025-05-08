// Rename to useProgramaById.js
import { useContext, useEffect, useState } from 'react';
import { Context, getData } from '@siiges-ui/shared';

export default function useProgramaById(id) {
  const { setNoti, setLoading } = useContext(Context);
  const [programa, setPrograma] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({ endpoint: `/programas/${id}` });
        if (response.statusCode === 200) {
          setPrograma(response.data);
        } else {
          setNoti({
            open: true,
            message: '¡No se encontró el programa!',
            type: 'error',
          });
        }
      } catch (err) {
        setNoti({
          open: true,
          message: '¡Ocurrió un error al buscar el programa!',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return programa;
}
