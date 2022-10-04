import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Context } from '@siiges-ui/shared';
import MenuNavbar from '../../../src/components/Navbar/menuNavbar';
import setHandler from '../../../src/utils/handlers/set-anchor';

let value = true;
const setValue = () => {
  value = false;
};

test.todo('Some test I still need to do');

describe('Tests for the general input', () => {
  const testFunction = jest.fn();
  test('Test MainNavbar component render', () => {
    const component = render(
      <Context.Provider value={testFunction}>
        <MenuNavbar />
      </Context.Provider>,
    );
    waitFor(() => expect(component.toBeInTheDocument()));
  });

  test('Test onclick function', async () => {
    const component = render(
      <Context.Provider value={testFunction}>
        <MenuNavbar />
      </Context.Provider>,
    );
    const menu = component.getByTestId('menu-test');
    fireEvent.click(menu);
  });

  test('testing the closing function', () => {
    expect(setHandler(setValue, value)).toBeFalsy();
  });
});
