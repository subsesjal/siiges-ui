import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ButtonLogin from '../src/components/Button';

describe('Tests for the Button', () => {
  test('Test Button component render', () => {
    const component = render(<ButtonLogin href="/" type="submit" color="secondary" text="test" />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
