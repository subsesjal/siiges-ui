import React from 'react';
import {
  render,
  waitFor,
  cleanup,
  fireEvent,
  createEvent,
} from '@testing-library/react';
import ButtonVisibility from '../../../src/components/Buttons/ButtonVisibility';

afterEach(cleanup);

let value = true;

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

describe('Tests for the Button Visibility', () => {
  test('Test Button component render', () => {
    const component = render(<ButtonVisibility
      showPassword={value}
      onPress={() => { }}
      onMouse={handleMouseDownPassword}
    />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
  test('Test Click the Button Visibility', () => {
    const component = render(<ButtonVisibility
      showPassword={value}
      onPress={() => { value = false; }}
      onMouse={handleMouseDownPassword}
    />);
    const button = component.getByTestId('visButton');
    fireEvent.click(button);
    expect(value).toBeFalsy();
  });
  test('Test MouseDown the Button Visibility', () => {
    const component = render(<ButtonVisibility
      showPassword={value}
      onPress={() => { value = false; }}
      onMouse={handleMouseDownPassword}
    />);
    const button = component.getByTestId('visButton');
    const mouseDownEvent = createEvent.mouseDown(button);

    fireEvent(button, mouseDownEvent);

    expect(mouseDownEvent.defaultPrevented).toBe(true);
  });
});
