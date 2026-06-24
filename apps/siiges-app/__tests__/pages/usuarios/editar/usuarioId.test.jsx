import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

jest.mock('../../../../../lib/config/env', () => ({
  config: { usersVersion: 'v2' },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(), back: jest.fn(), isReady: true, query: { usuarioId: '1' },
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

function MockUserRoutePage({ mode }) {
  return <div data-testid="user-route-page">{mode}</div>;
}

MockUserRoutePage.propTypes = {
  mode: PropTypes.string,
};

MockUserRoutePage.defaultProps = {
  mode: '',
};

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useApi: jest.fn(() => ({ data: null, loading: false })),
  Layout: MockLayout,
}));

jest.mock('@siiges-ui/users', () => ({
  UsuarioForm: () => <div>UsuarioForm</div>,
}));

jest.mock('@siiges-ui/users/v2', () => ({
  UserRoutePage: MockUserRoutePage,
}));

// eslint-disable-next-line global-require, import/no-unresolved, import/extensions
const EditUser = require('../../../../../pages/usuarios/editar/[usuarioId]/index.jsx').default;

describe('Editar Usuario page (v2)', () => {
  it('renders without crashing', () => {
    const { container } = render(<EditUser />);
    expect(container).toBeTruthy();
  });

  it('renders v2 UserRoutePage with EDIT mode', () => {
    const { getByTestId } = render(<EditUser />);
    expect(getByTestId('user-route-page').textContent).toBe('EDIT');
  });
});
