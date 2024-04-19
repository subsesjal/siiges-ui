import React, { useState } from 'react';
import { Layout } from '@siiges-ui/shared';
import { NuevaSolicitud } from '@siiges-ui/solicitudes';

function NewRequest() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Layout type={false} loading={isLoading}>
      <NuevaSolicitud isLoading={isLoading} setIsLoading={setIsLoading} />
    </Layout>
  );
}

export default NewRequest;
