import React from 'react';
import { render } from '@testing-library/react';
import { Context } from '@siiges-ui/shared';
import MockLogin from '../../setupTest';

jest.mock(
  'next/link',
  () => ({ children }) => children,
);

const testFunction = jest.fn();

test.todo('Some test I still need to do');

describe('Login', () => {
  it('should render the login page', async () => {
    render(
      <Context.Provider value={testFunction}>
        <MockLogin />
      </Context.Provider>,
    );
  });
});
