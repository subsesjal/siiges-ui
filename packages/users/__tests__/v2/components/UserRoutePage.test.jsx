import React from 'react';
import PropTypes from 'prop-types';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockNotifyError = jest.fn();
const mockNotifySuccess = jest.fn();

function mockUserPanel({
  mode,
  onCreate,
  onUpdate,
  onClose,
}) {
  return (
    <div data-testid="user-panel">
      <span>{mode}</span>
      <button type="button" onClick={onClose}>Close</button>
      <button type="button" onClick={() => onCreate({ correo: 'create@test.com' })}>Create</button>
      <button type="button" onClick={() => onUpdate(1, { correo: 'edit@test.com' })}>Update</button>
    </div>
  );
}

mockUserPanel.propTypes = {
  mode: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

function mockLayout({ title, children }) {
  return (
    <div>
      <span>{title}</span>
      {children}
    </div>
  );
}

mockLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function mockLoading() {
  return <div>loading</div>;
}

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    back: mockBack,
    isReady: true,
    query: { usuarioId: '1' },
  })),
}));

jest.mock('@siiges-ui/shared', () => ({
  useAuth: jest.fn(),
  useNotification: jest.fn(() => ({ error: mockNotifyError, success: mockNotifySuccess })),
  Layout: mockLayout,
  Loading: mockLoading,
}));

jest.mock('../../../v2/hooks/useUserDetail', () => jest.fn());

jest.mock('../../../v2/utils/permissions', () => ({
  getUserPermissions: jest.fn(),
}));

jest.mock('../../../v2/services/usuarios.service', () => ({
  createUser: jest.fn().mockResolvedValue({}),
  updateUser: jest.fn().mockResolvedValue({}),
}));

jest.mock('../../../v2/components/UserPanel', () => mockUserPanel);

const mockUseAuth = jest.requireMock('@siiges-ui/shared').useAuth;
const mockUseUserDetail = jest.requireMock('../../../v2/hooks/useUserDetail');
const mockGetUserPermissions = jest.requireMock('../../../v2/utils/permissions').getUserPermissions;
const mockCreateUser = jest.requireMock('../../../v2/services/usuarios.service').createUser;
const mockUpdateUser = jest.requireMock('../../../v2/services/usuarios.service').updateUser;

// eslint-disable-next-line import/first
import UserRoutePage from '../../../v2/components/UserRoutePage';

describe('UserRoutePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({ session: { id: 1, token: 'abc', rol: 'admin' } });
    mockGetUserPermissions.mockReturnValue({
      canCreate: true,
      canEdit: true,
      canView: true,
    });
    mockUseUserDetail.mockReturnValue({
      data: {
        id: 1,
        correo: 'user@test.com',
        rol: { id: 2, descripcion: 'Admin' },
        persona: { nombre: 'Juan', apellidoPaterno: 'Perez', apellidoMaterno: 'G' },
      },
      loading: false,
      error: null,
    });
  });

  it('renders VIEW mode without crashing', () => {
    const { container } = render(<UserRoutePage mode="VIEW" />);
    expect(container).toBeTruthy();
    expect(screen.getByText('Consultar usuario')).toBeInTheDocument();
  });

  it('renders CREATE mode without crashing', () => {
    const { container } = render(<UserRoutePage mode="CREATE" />);
    expect(container).toBeTruthy();
    expect(screen.getByText('Agregar usuario')).toBeInTheDocument();
  });

  it('renders EDIT mode without crashing', () => {
    const { container } = render(<UserRoutePage mode="EDIT" />);
    expect(container).toBeTruthy();
    expect(screen.getByText('Modificar usuario')).toBeInTheDocument();
  });

  it('shows the loading state when session is not ready', () => {
    mockUseAuth.mockReturnValueOnce({ session: { id: 1, token: 'abc' } });

    render(<UserRoutePage mode="VIEW" />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('shows permission error when access is denied', () => {
    mockGetUserPermissions.mockReturnValueOnce({
      canCreate: false,
      canEdit: false,
      canView: false,
    });

    render(<UserRoutePage mode="VIEW" />);

    expect(screen.getByText('No tienes permisos para acceder a esta vista de usuarios.')).toBeInTheDocument();
  });

  it('notifies when detail loading fails', () => {
    mockUseUserDetail.mockReturnValueOnce({ data: null, loading: false, error: { message: 'Boom' } });

    render(<UserRoutePage mode="VIEW" />);

    expect(mockNotifyError).toHaveBeenCalledWith('Boom');
  });

  it('creates a user and redirects in CREATE mode', async () => {
    render(<UserRoutePage mode="CREATE" />);

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        session: { id: 1, token: 'abc', rol: 'admin' },
        data: { correo: 'create@test.com' },
        signal: expect.any(AbortSignal),
      });
    });

    await waitFor(() => {
      expect(mockNotifySuccess).toHaveBeenCalledWith('Usuario creado correctamente.');
    });
    expect(mockPush).toHaveBeenCalledWith('/usuarios');
  });

  it('updates a user and redirects in EDIT mode', async () => {
    render(<UserRoutePage mode="EDIT" />);

    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        session: { id: 1, token: 'abc', rol: 'admin' },
        usuarioId: 1,
        data: { correo: 'edit@test.com' },
        signal: expect.any(AbortSignal),
      });
    });

    await waitFor(() => {
      expect(mockNotifySuccess).toHaveBeenCalledWith('Usuario actualizado correctamente.');
    });
    expect(mockPush).toHaveBeenCalledWith('/usuarios');
  });

  it('renders the loading state when detail is still loading', () => {
    mockUseUserDetail.mockReturnValueOnce({ data: null, loading: true, error: null });

    render(<UserRoutePage mode="EDIT" />);

    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});
