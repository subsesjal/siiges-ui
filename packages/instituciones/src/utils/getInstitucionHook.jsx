import { useEffect } from 'react';
import { getData } from '@siiges-ui/shared';

const NOT_FOUND = null;

const getInstitucionHook = ({
  setInstitucion, session, setLoading, setNoti,
}) => {
  const { id, rol } = session;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (id && rol === 'representante') {
          const response = await getData({
            endpoint: `/instituciones/usuarios/${id}`,
          });

          if (response.statusCode === 404 || response.statusCode === 200) {
            setInstitucion(response.statusCode === 200
              ? response.data
              : NOT_FOUND);
          } else {
            throw new Error(response.errorMessage);
          }

          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        setNoti({
          open: true,
          message: error.message,
          type: 'error',
        });
      }
    };

    fetchData();
  }, [session]);
};

export default getInstitucionHook;
