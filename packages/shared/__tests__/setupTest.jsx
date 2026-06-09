import React from 'react';

jest.mock('next/link', () => ({ children }) => children);

function MockLogin() {
  return (
    <div>Mock SignIn</div>
  );
}

export default MockLogin;
