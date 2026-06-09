import React from 'react';
import { render } from '@testing-library/react';
import MockLogin from '../../setupTest';

jest.mock(
  'next/link',
  () => ({ children }) => children,
);

jest.mock('@siiges-ui/authentication', () => ({
  SignIn: () => <div>Mock SignIn</div>,
}));

test.todo('Some test I still need to do');

describe('Login', () => {
  it('should render the login page', async () => {
    render(<MockLogin />);
  });
});
