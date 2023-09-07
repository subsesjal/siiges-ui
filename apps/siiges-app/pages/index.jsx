import React from 'react';
import { LoginLayout } from '@siiges-ui/shared';
import { SignIn } from '@siiges-ui/authentication';

export default function Home() {
  return (
    <LoginLayout>
      <SignIn />
    </LoginLayout>
  );
}
