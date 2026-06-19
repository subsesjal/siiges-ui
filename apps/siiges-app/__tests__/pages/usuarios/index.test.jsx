import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

jest.mock('../../../lib/config/env', () => ({
  config: { usersVersion: 'v2' },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(), back: jest.fn(), isReady: true, query: {},
  })),
}));

function MockLayout({ children, title }) {
  return <div aria-label={title}>{children}</div>;
}

MockLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

MockLayout.defaultProps = {
  children: null,
  title: '',
};

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useApi: jest.fn(() => ({ data: [], loading: false })),
  Layout: MockLayout,
  Loading: () => <div>loading</div>,
}));

jest.mock('@siiges-ui/users', () => ({
  UsuariosTable: () => <div>table</div>,
}));

jest.mock('@siiges-ui/users/v2', () => ({
  UsersPage: () => <div data-testid="users-page-v2">UsersPageV2</div>,
}));

// eslint-disable-next-line global-require
const Usuarios = require('../../../pages/usuarios/index').default;

describe('Usuarios page (v2)', () => {
  it('renders without crashing', () => {
    const { container } = render(<Usuarios />);
    expect(container).toBeTruthy();
  });

  it('renders v2 UsersPage component', () => {
    const { getByTestId } = render(<Usuarios />);
    expect(getByTestId('users-page-v2')).toBeInTheDocument();
  });
});
