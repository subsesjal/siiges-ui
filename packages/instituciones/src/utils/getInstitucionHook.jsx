import { useEffect, useState } from 'react';
import { getData } from '@siiges-ui/shared';
import { useRouter } from 'next/router';

const NOT_FOUND = {};

const getInstitucionHook = ({
  setInstitucion, setNoti, institucion, session, setLoading,
}) => {
  const router = useRouter();
  const [responseReceived, setResponseReceived] = useState(false);

  useEffect(() => {
    const fetchData = async (endpoint) => {
      try {
        const response = await getData({
          endpoint,
        });
        if (response.statusCode === 404 || response.statusCode === 200) {
          setInstitucion(response.statusCode === 200
            ? response.data
            : NOT_FOUND);

          setResponseReceived(true);
        } else {
          setResponseReceived(true);
          throw new Error(response.errorMessage);
        }
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        setNoti({
          open: true,
          message: error.message,
          type: 'error',
        });
      }
    };

    if ((session.rol === 'representante' || session.rol === 'gestor') && !responseReceived) {
      const endpoint = `/instituciones/usuarios/${session.id}`;
      fetchData(endpoint);
    } else if ((session.rol === 'admin') && !responseReceived) {
      if (router.isReady) {
        const { institucionId } = router.query;
        const endpoint = `/instituciones/${institucionId}`;
        fetchData(endpoint);
      }
    }
  }, [institucion, session, responseReceived]);
};

export default getInstitucionHook;
