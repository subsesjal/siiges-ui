import React from 'react';
import {
  render,
  waitFor,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import ButtonLogin from '../src/components/Buttons/Button';

afterEach(cleanup);

describe('Tests for the Button', () => {
  test('Test Button component render', () => {
    const component = render(<ButtonLogin href="/" type="submit" color="secondary" text="test" />);
    waitFor(() => expect(component.toBeInTheDocument()));
  });
  test('Props work', () => {
    const component = render(<ButtonLogin href="/" type="submit" color="secondary" text="test" />);
    expect(component.getByText(/test/i));
  });
  test('Test that the button can be clicked', () => {
    const clicked = jest.fn();
    const component = render(<ButtonLogin href="/" type="submit" color="secondary" text="test" click={clicked} />);
    const button = component.getByText(/test/i);
    fireEvent.click(button);
    expect(clicked).toBeCalled();
  });
});
