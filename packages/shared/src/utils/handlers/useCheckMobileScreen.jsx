import { useEffect, useState } from 'react';

const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(console.log('satelag :('));

  useEffect(() => {
    console.log('effectlag :(');
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
