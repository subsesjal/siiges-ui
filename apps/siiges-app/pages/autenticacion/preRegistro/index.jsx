import React from 'react';
import { Register } from '@siiges-ui/authentication';
import { LoginLayout } from '@siiges-ui/shared';

function SignUpPage() {
  return (
    <LoginLayout>
      <Register />
    </LoginLayout>
  );
}

export default SignUpPage;
