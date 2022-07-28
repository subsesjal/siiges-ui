import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import MenuNavbar from '../src/components/menuNavbar';
import setHandler from '../src/utils/handlers/set-anchor';

let value = true;
const setValue = () => { value = false; };

describe('Tests for the general input', () => {
  test('Test MainNavbar component render', () => {
    const component = render(<MenuNavbar />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });

  test('Test onclick function', async () => {
    const component = render(<MenuNavbar />);
    const menu = component.getByTestId('menu-test');
    fireEvent.click(menu);
  });

  test('testing the closing function', () => {
    expect(setHandler(setValue, value)).toBeFalsy();
  });
});
