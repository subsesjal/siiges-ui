import { React } from 'react';
import { SignIn } from '@siiges-ui/authentication';
import { LoginLayout } from '@siiges-ui/shared';

function LogInPage() {
  return (
    <LoginLayout>
      <SignIn />
    </LoginLayout>
  );
}

export default LogInPage;
