import React from 'react';
import PropTypes from 'prop-types';
import { fireEvent, render, screen } from '@testing-library/react';

const mockBack = jest.fn();
const mockPush = jest.fn();
const mockNotifyError = jest.fn();
const mockNotifySuccess = jest.fn();

function mockLayout({ children }) {
  return <div>{children}</div>;
}

mockLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

function mockLoading() {
  return <div>loading</div>;
}

function mockButtonSimple({ text, onClick }) {
  return <button type="button" onClick={onClick}>{text}</button>;
}

mockButtonSimple.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: mockPush, back: mockBack })),
}));

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(() => ({ session: { id: 1, token: 'abc', rol: 'admin' } })),
  useNotification: jest.fn(() => ({ error: mockNotifyError, success: mockNotifySuccess })),
  Layout: mockLayout,
  Loading: mockLoading,
  ButtonSimple: mockButtonSimple,
}));

jest.mock('@siiges-ui/users', () => ({
  UsuarioAvatar: () => <div data-testid="usuario-avatar">Avatar</div>,
}));

jest.mock('../../../v2/hooks/useUserDetail', () => jest.fn());

jest.mock('../../../v2/components/UserProfileSkeleton', () => function MockUserProfileSkeleton() {
  return <div>skeleton</div>;
});
jest.mock('../../../v2/components/UserProfileViewSections', () => function MockUserProfileViewSections() {
  return <div>sections</div>;
});

const mockUseUserDetail = jest.requireMock('../../../v2/hooks/useUserDetail');

// eslint-disable-next-line import/first
import UserProfilePage from '../../../v2/components/UserProfilePage';

describe('UserProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUserDetail.mockReturnValue({
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
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<UserProfilePage />);
    expect(container).toBeTruthy();
  });

  it('renders the user sections when data is loaded', () => {
    render(<UserProfilePage />);

    expect(screen.getByText('sections')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Editar perfil'));
    expect(mockPush).toHaveBeenCalledWith('/usuarios/perfilUsuario/editar');
  });

  it('renders the skeleton while loading', () => {
    mockUseUserDetail.mockReturnValueOnce({ data: null, loading: true, error: null });

    render(<UserProfilePage />);

    expect(screen.getByText('skeleton')).toBeInTheDocument();
  });

  it('notifies and renders the error state when profile loading fails', () => {
    mockUseUserDetail.mockReturnValueOnce({
      data: null,
      loading: false,
      error: { message: 'Boom' },
    });

    render(<UserProfilePage />);

    expect(mockNotifyError).toHaveBeenCalledWith('Boom');
    expect(screen.getByText('No se pudo cargar el perfil.')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Regresar'));
    expect(mockBack).toHaveBeenCalled();
  });

  it('returns null when there is no profile data yet', () => {
    mockUseUserDetail.mockReturnValueOnce({ data: null, loading: false, error: null });

    const { container } = render(<UserProfilePage />);

    expect(container.firstChild).toBeNull();
  });
});
