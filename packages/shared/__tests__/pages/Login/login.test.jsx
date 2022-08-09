import React from 'react';
import { render } from '@testing-library/react';
import MockLogin from '../../setupTest';

jest.mock('next/link', () => ({ children }) => children);

describe('Login', () => {
  it('should render the login page', async () => {
    render(<MockLogin />);
  });
});
