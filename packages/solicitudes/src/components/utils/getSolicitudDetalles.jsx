import { useEffect, useState } from 'react';
import { getData } from '@siiges-ui/shared';
import { useRouter } from 'next/router';

const getSolicitudDetalles = async ({
  setNoti, setLoading, setSolicitud,
}) => {
  const router = useRouter();
  const [responseReceived, setResponseReceived] = useState(false);

  useEffect(() => {
    const fetchData = async (endpoint) => {
      try {
        const response = await getData({
          endpoint,
        });

        if (response.statusCode === 200) {
          setSolicitud(response.data);
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

    if (!responseReceived) {
      if (router.isReady) {
        const { solicitudId } = router.query;

        const endpoint = `/solicitudes/${solicitudId}/detalles`;
        fetchData(endpoint);
      }
    }
  });
};

export default getSolicitudDetalles;
