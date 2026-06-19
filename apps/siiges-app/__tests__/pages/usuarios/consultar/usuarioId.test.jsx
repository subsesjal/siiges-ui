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

function MockButtonSimple({ text, onClick }) {
  return <button type="button" onClick={onClick}>{text}</button>;
}

MockButtonSimple.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

MockButtonSimple.defaultProps = {
  text: '',
  onClick: () => {},
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
  ButtonSimple: MockButtonSimple,
}));

jest.mock('@siiges-ui/users', () => ({
  UsuarioAvatar: () => <div>Avatar</div>,
  UsuarioView: () => <div>UsuarioView</div>,
}));

jest.mock('@siiges-ui/users/v2', () => ({
  UserRoutePage: MockUserRoutePage,
}));

// eslint-disable-next-line global-require, import/no-unresolved, import/extensions
const ConsultarUsuario = require('../../../../../pages/usuarios/consultar/[usuarioId]/index.jsx').default;

describe('Consultar Usuario page (v2)', () => {
  it('renders without crashing', () => {
    const { container } = render(<ConsultarUsuario />);
    expect(container).toBeTruthy();
  });

  it('renders v2 UserRoutePage with VIEW mode', () => {
    const { getByTestId } = render(<ConsultarUsuario />);
    expect(getByTestId('user-route-page').textContent).toBe('VIEW');
  });
});
