import React from 'react';
import { render } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), back: jest.fn() })),
}));

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useNotification: jest.fn(() => ({ error: jest.fn(), success: jest.fn() })),
  Layout: ({ children }) => <div>{children}</div>,
  Loading: () => <div>loading</div>,
  ButtonSimple: ({ text, onClick }) => <button type="button" onClick={onClick}>{text}</button>,
}));

jest.mock('@siiges-ui/users', () => ({
  UsuarioAvatar: () => <div data-testid="usuario-avatar">Avatar</div>,
}));

jest.mock('../../../v2/hooks/useUserDetail', () => jest.fn(() => ({
  data: {
    id: 1,
    correo: 'user@test.com',
    usuario: 'testuser',
    estatus: 1,
    rol: { descripcion: 'Admin' },
    persona: { nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'G' },
  },
  loading: false,
  error: null,
})));

jest.mock('../../../v2/components/UserProfileSkeleton', () => () => <div>skeleton</div>);
jest.mock('../../../v2/components/UserProfileViewSections', () => () => <div>sections</div>);

// eslint-disable-next-line import/first
import UserProfilePage from '../../../v2/components/UserProfilePage';

describe('UserProfilePage', () => {
  it('renders without crashing', () => {
    const { container } = render(<UserProfilePage />);
    expect(container).toBeTruthy();
  });

  it('renders the user sections when data is loaded', () => {
    const { getByText } = render(<UserProfilePage />);
    expect(getByText('sections')).toBeInTheDocument();
  });
});
