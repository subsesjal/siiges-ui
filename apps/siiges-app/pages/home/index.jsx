import React, { useEffect, useState } from 'react';
import { HomePage, Layout } from '@siiges-ui/shared';

export default function HomeView() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout title="Bienvenido" loading={loading}>
      <HomePage />
    </Layout>
  );
}
