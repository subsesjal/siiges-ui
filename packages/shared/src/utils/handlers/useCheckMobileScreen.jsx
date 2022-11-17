import { useEffect, useState } from 'react';

const useCheckMobileScreen = () => {
  const [width, setWidth] = useState();

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = width <= 768;
  return isMobile;
};

export default useCheckMobileScreen;
