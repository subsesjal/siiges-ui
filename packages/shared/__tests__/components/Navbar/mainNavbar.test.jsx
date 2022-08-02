import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MainNavbar from '../../../src/components/Navbar/MainNavbar';

describe('Tests for the general input', () => {
  test('Test MainNavbar component render', () => {
    const component = render(<MainNavbar />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
