import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Context } from '@siiges-ui/shared';
import MainNavbar from '../../../src/components/Navbar/MainNavbar';

test.todo('Some test I still need to do');

const testFunction = jest.fn();

describe('Tests for the general input', () => {
  test('Test MainNavbar component render', () => {
    const component = render(
      <Context.Provider value={testFunction}>
        <MainNavbar />
      </Context.Provider>,
    );
    waitFor(() => expect(component.toBeInTheDocument()));
  });
});
