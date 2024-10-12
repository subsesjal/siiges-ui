import { RevalidacionEquivalencias } from '@siiges-ui/serviciosescolares';
import { Layout } from '@siiges-ui/shared';
import React from 'react';

export default function index() {
  return (
    <Layout title="Revalidaciones y Equivalencias">
      <RevalidacionEquivalencias />
    </Layout>
  );
}
