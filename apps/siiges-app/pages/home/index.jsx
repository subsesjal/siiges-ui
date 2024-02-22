import React, { useContext, useEffect } from 'react';
import { HomePage, Layout, Context } from '@siiges-ui/shared';

export default function HomeView() {
  const { setLoading } = useContext(Context);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout title="Bienvenido">
      <HomePage />
    </Layout>
  );
}
