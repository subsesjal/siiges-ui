import { useEffect, useState } from 'react';

export default function useShowFooter() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const container = document.getElementById('main-scroll');

    if (!container) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop } = container;
      const visibleHeight = container.clientHeight;
      const fullHeight = container.scrollHeight;

      const hasScroll = fullHeight > visibleHeight;
      const isBottom = scrollTop + visibleHeight >= fullHeight - 5;

      setShow(!hasScroll || isBottom);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return show;
}
