import React from 'react';
import { RecoverPass } from '@siiges-ui/authentication';
import { LoginLayout } from '@siiges-ui/shared';

function Password() {
  return (
    <LoginLayout>
      <RecoverPass />
    </LoginLayout>
  );
}

export default Password;
