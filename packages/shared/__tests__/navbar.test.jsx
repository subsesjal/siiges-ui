import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Navbar from '../src/components/Navbar/navbar';

describe('Tests for the general input', () => {
  test('Test Navbar component render', () => {
    const component = render(<Navbar />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
