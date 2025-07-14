import React, { useEffect } from 'react';
import { LoginLayout } from '@siiges-ui/shared';
import { useRouter } from 'next/router';

function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);
  return (
    <LoginLayout />
  );
}

export default SignUpPage;
