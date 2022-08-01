import React from 'react';
import { waitFor } from '@testing-library/react';
import Logo from '../src/components/Images/logo';

describe('Tests for the logo', () => {
  test('correct render of logo', () => {
    const component = (<Logo />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
