import React, { useState } from 'react';
import { LoginLayout } from '@siiges-ui/shared';
import { RecoverPass, SignIn } from '@siiges-ui/authentication';

export default function Home() {
  const [password, setPassword] = useState(false);

  return (
    <LoginLayout>
      {!password ? (
        <SignIn setPassword={setPassword} />
      ) : (
        <RecoverPass setPassword={setPassword} />
      )}
    </LoginLayout>
  );
}
