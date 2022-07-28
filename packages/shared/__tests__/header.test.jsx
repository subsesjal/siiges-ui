import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Header from '../src/components/header';

describe('Tests for the header', () => {
  test('Test Header component render', () => {
    const component = render(<Header />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
