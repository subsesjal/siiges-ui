import React from 'react';
import { render, waitFor } from '@testing-library/react';
import LinkButton from '../../../src/components/LinkButton';

describe('Tests for the general input', () => {
  test('Test Link component render', () => {
    const component = render(<LinkButton href="/" text="test" />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
