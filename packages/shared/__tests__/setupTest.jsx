import React from 'react';
import { SignIn } from '@siiges-ui/authentication';

jest.mock('next/link', () => ({ children }) => children);

function MockLogin() {
  return (
    <SignIn />
  );
}

export default MockLogin;
