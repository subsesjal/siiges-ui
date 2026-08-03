import React from 'react';
import PropTypes from 'prop-types';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

const mockPush = jest.fn();
const mockNotifyError = jest.fn();
const mockNotifySuccess = jest.fn();
const mockDeleteUser = jest.fn();
const mockUseUsersData = jest.fn();
const mockUseAuth = jest.fn();
const mockGetUserPermissions = jest.fn();

function MockLayout({ children }) {
  return <div>{children}</div>;
}

MockLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

function MockLoading({ loading }) {
  return <div>{loading ? 'loading:true' : 'loading:false'}</div>;
}

MockLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function MockButtonSimple({ text, onClick, disabled }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

MockButtonSimple.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

MockButtonSimple.defaultProps = {
  disabled: false,
};

function MockDefaultModal({ open, children }) {
  return open ? <div>{children}</div> : null;
}

MockDefaultModal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

function MockUsersTable({ onDelete }) {
  return (
    <button
      type="button"
      onClick={() => onDelete({ id: 7, usuario: 'usuario_eliminar' })}
    >
      open-delete
    </button>
  );
}

MockUsersTable.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

function MockUsersSkeleton() {
  return <div>skeleton</div>;
}

function MockUsersEmptyState() {
  return <div>empty</div>;
}

function MockUsersErrorState({ message }) {
  return <div>{message}</div>;
}

MockUsersErrorState.propTypes = {
  message: PropTypes.string.isRequired,
};

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    isReady: true,
    query: {},
  })),
}));

jest.mock('@siiges-ui/shared', () => ({
  useAuth: () => mockUseAuth(),
  useNotification: () => ({ error: mockNotifyError, success: mockNotifySuccess }),
  Layout: MockLayout,
  Loading: MockLoading,
  ButtonSimple: MockButtonSimple,
  DefaultModal: MockDefaultModal,
}));

jest.mock('../../../v2/hooks/useUsersData', () => () => mockUseUsersData());

jest.mock('../../../v2/utils/permissions', () => ({
  getUserPermissions: () => mockGetUserPermissions(),
}));

jest.mock('../../../v2/services/usuarios.service', () => ({
  deleteUser: (...args) => mockDeleteUser(...args),
}));

jest.mock('../../../v2/components/UsersTable', () => MockUsersTable);
jest.mock('../../../v2/components/UsersSkeleton', () => MockUsersSkeleton);
jest.mock('../../../v2/components/UsersEmptyState', () => MockUsersEmptyState);
jest.mock('../../../v2/components/UsersErrorState', () => MockUsersErrorState);

// eslint-disable-next-line import/first
import UsersPage from '../../../v2/components/UsersPage';

describe('UsersPage behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockReturnValue({ session: { id: 1, token: 'abc', rol: 'admin' } });
    mockGetUserPermissions.mockReturnValue({
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    });
    mockUseUsersData.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });
    mockDeleteUser.mockResolvedValue({});
  });

  it('renders skeleton when session role is not ready', () => {
    mockUseAuth.mockReturnValueOnce({ session: { id: 1, token: 'abc' } });

    render(<UsersPage />);

    expect(screen.getByText('skeleton')).toBeInTheDocument();
  });

  it('renders permission error when user cannot view', () => {
    mockGetUserPermissions.mockReturnValueOnce({
      canView: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    });

    render(<UsersPage />);

    expect(screen.getByText('No tienes permisos para ver usuarios.')).toBeInTheDocument();
  });

  it('renders empty state when there is no data', () => {
    render(<UsersPage />);

    expect(screen.getByText('empty')).toBeInTheDocument();
  });

  it('shows list error and notifies', () => {
    mockUseUsersData.mockReturnValueOnce({
      data: [],
      loading: false,
      error: { message: 'Boom list' },
    });

    render(<UsersPage />);

    expect(screen.getByText('Boom list')).toBeInTheDocument();
    expect(mockNotifyError).toHaveBeenCalledWith('Boom list');
  });

  it('opens delete modal and confirms deletion successfully', async () => {
    mockUseUsersData.mockReturnValueOnce({
      data: [{ id: 7, usuario: 'usuario_eliminar' }],
      loading: false,
      error: null,
    });

    render(<UsersPage />);

    fireEvent.click(screen.getByText('open-delete'));
    await screen.findByText(/\u00BFDesea eliminar el usuario/);
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith({
        session: { id: 1, token: 'abc', rol: 'admin' },
        usuarioId: 7,
        signal: expect.any(AbortSignal),
      });
    });

    await waitFor(() => {
      expect(mockNotifySuccess).toHaveBeenCalledWith('Usuario eliminado correctamente.');
    });
  });

  it('shows delete error notification when deletion fails', async () => {
    mockDeleteUser.mockRejectedValueOnce(new Error('delete failed'));
    mockUseUsersData.mockReturnValueOnce({
      data: [{ id: 7, usuario: 'usuario_eliminar' }],
      loading: false,
      error: null,
    });

    render(<UsersPage />);

    fireEvent.click(screen.getByText('open-delete'));
    await screen.findByText(/\u00BFDesea eliminar el usuario/);
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(mockNotifyError).toHaveBeenCalledWith('delete failed');
    });
  });
});
