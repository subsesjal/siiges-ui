import React from 'react';
import { render, waitFor } from '@testing-library/react';
import InputPassword from '../src/components/inputPassword';

describe('Tests for the general input', () => {
  test('Test Input Password component render', () => {
    const component = render(<InputPassword id="test" label="test" name="test" auto="user" />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
