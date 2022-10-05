import React from 'react';
import {
  render,
  waitFor,
  fireEvent,
  cleanup,
  createEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InputPassword from '../../../src/components/Input/inputPassword';
import ButtonVisibility from '../../../src/components/Buttons/buttonVisibility';

afterEach(cleanup);

let value = true;

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

const messageTest = 'test';

describe('Tests for the general input', () => {
  test('Test Input Password component render', () => {
    const component = render(
      <InputPassword
        id={messageTest}
        label={messageTest}
        name={messageTest}
        auto="user"
        errorMessage={messageTest}
      />,
    );
    waitFor(() => expect(component).toBeInTheDocument());
  });

  test('Test Label for the Input Password component render', () => {
    const component = render(
      <InputPassword
        id={messageTest}
        label={messageTest}
        name={messageTest}
        auto="user"
        errorMessage={messageTest}
      />,
    );
    const label = component.getByLabelText('test');
    expect(label).toBeInTheDocument();
  });

  test('Test the input when writting text', async () => {
    const component = render(
      <InputPassword
        id={messageTest}
        label={messageTest}
        name={messageTest}
        auto="user"
        errorMessage={messageTest}
      />,
    );
    const inputPassword = component.getByLabelText('test');
    await userEvent.type(inputPassword, 'pruebasxd');

    waitFor(() => expect(inputPassword.value).toEqual('pruebasxd'));
  });

  test('Test the function to show password', async () => {
    const button = render(
      <ButtonVisibility
        showPassword={value}
        onPress={() => {
          value = false;
        }}
        onMouse={handleMouseDownPassword}
      />,
    );
    const buttonIcon = button.getByTestId('visButton');
    fireEvent.click(buttonIcon);
    expect(value).toBeFalsy();
  });

  test('Test MouseDown in the Button Visibility', () => {
    const component = render(
      <ButtonVisibility
        showPassword={value}
        onPress={() => {
          value = false;
        }}
        onMouse={handleMouseDownPassword}
      />,
    );
    const button = component.getByTestId('visButton');
    const mouseDownEvent = createEvent.mouseDown(button);

    fireEvent(button, mouseDownEvent);

    expect(mouseDownEvent.defaultPrevented).toBe(true);
  });
});
