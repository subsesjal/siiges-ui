import React from 'react';
import { waitFor } from '@testing-library/react';
import LogoWhite from '../../../src/components/Images/LogoWhite';

describe('Tests for the general input', () => {
  test('Test LogoWhite component render', () => {
    const component = <LogoWhite />;
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
