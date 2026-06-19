import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

jest.mock('../../../../../lib/config/env', () => ({
  config: { usersVersion: 'v2' },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), back: jest.fn(), replace: jest.fn() })),
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

function MockLoading({ loading }) {
  return <div data-testid="loading">{String(loading)}</div>;
}

MockLoading.propTypes = {
  loading: PropTypes.bool,
};

MockLoading.defaultProps = {
  loading: false,
};

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  Layout: MockLayout,
  Loading: MockLoading,
}));

jest.mock('@siiges-ui/users/v2', () => ({
  UserProfileEditPage: () => <div data-testid="profile-edit-page">EditPage</div>,
}));

// eslint-disable-next-line global-require
const UserProfileEditRoute = require('../../../../../pages/usuarios/perfilUsuario/editar/index').default;

describe('PerfilUsuario Editar page (v2)', () => {
  it('renders without crashing', () => {
    const { container } = render(<UserProfileEditRoute />);
    expect(container).toBeTruthy();
  });

  it('renders v2 UserProfileEditPage', () => {
    const { getByTestId } = render(<UserProfileEditRoute />);
    expect(getByTestId('profile-edit-page')).toBeInTheDocument();
  });
});
